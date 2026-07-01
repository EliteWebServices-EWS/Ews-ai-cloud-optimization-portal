const { STSClient, AssumeRoleCommand }               = require("@aws-sdk/client-sts");
const { CostExplorerClient, GetCostAndUsageCommand }  = require("@aws-sdk/client-cost-explorer");
const { EC2Client, DescribeInstancesCommand }         = require("@aws-sdk/client-ec2");

async function syncFromAws(tenant) {

  // ── GUARD: Validate required fields before touching AWS ──────────────────
  // Fix #4: If roleArn or externalId are missing (e.g. client not fully
  // onboarded yet), throw a clear actionable error instead of a generic
  // SDK exception that is hard to debug in CloudWatch.
  if (!tenant.roleArn || !tenant.externalId) {
    throw new Error(
      `Tenant ${tenant.id} missing roleArn or externalId — cannot sync`
    );
  }

  // Track per-source failures so partial failures surface in CloudWatch
  // Fix #1: syncErrors lets the response carry a partial: true signal
  // instead of returning $0 silently labeled as live AWS data.
  const syncErrors = [];

  // ── STEP 1: Assume the client's read-only IAM role via STS ──────────────
  let cfg;
  try {
    const sts   = new STSClient({});
    const creds = await sts.send(new AssumeRoleCommand({
      RoleArn:         tenant.roleArn,
      RoleSessionName: `ews-sync-${tenant.id}`,
      ExternalId:      tenant.externalId
    }));

    cfg = {
      credentials: {
        accessKeyId:     creds.Credentials.AccessKeyId,
        secretAccessKey: creds.Credentials.SecretAccessKey,
        sessionToken:    creds.Credentials.SessionToken
      },
      region: tenant.primaryRegion || "us-east-1"
    };
  } catch (err) {
    // Fail-fast: cfg is undefined so Steps 2 and 3 cannot run.
    // Log then rethrow so the EventBridge loop marks this tenant Failed
    // and moves on without crashing other tenants.
    console.error(`STS AssumeRole failed for tenant ${tenant.id}: ${err.message}`);
    throw err;
  }

  // ── STEP 2: Pull month-to-date spend from Cost Explorer ─────────────────
  // end date advanced +1 day: Cost Explorer End is exclusive, and
  // start === end on the 1st of the month throws ValidationException.
  // Cost Explorer is a global service — always use us-east-1 endpoint
  // regardless of tenant.primaryRegion (EC2 uses tenant region below).
  let monthlySpend = 0;
  let breakdown    = [];
  try {
    const now      = new Date();
    const start    = new Date(now.getFullYear(), now.getMonth(), 1)
                       .toISOString().split("T")[0];

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const end      = tomorrow.toISOString().split("T")[0];

    const ce   = new CostExplorerClient({ ...cfg, region: "us-east-1" });
    const cost = await ce.send(new GetCostAndUsageCommand({
      TimePeriod:  { Start: start, End: end },
      Granularity: "MONTHLY",
      Metrics:     ["UnblendedCost"],
      GroupBy:     [{ Type: "DIMENSION", Key: "SERVICE" }]
    }));

    const groups = cost.ResultsByTime?.[0]?.Groups || [];
    monthlySpend = groups.reduce(
      (sum, g) => sum + parseFloat(g.Metrics?.UnblendedCost?.Amount || "0"), 0
    );

    breakdown = groups
      .map(g => ({
        service: g.Keys?.[0] || "Unknown",
        amount:  parseFloat(g.Metrics?.UnblendedCost?.Amount || "0"),
        percent: 0
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map(item => ({
        ...item,
        percent: monthlySpend > 0
          ? Math.round((item.amount / monthlySpend) * 100)
          : 0
      }));

  } catch (err) {
    // Fix #1: record the failure instead of swallowing it silently.
    // The response will still return but partial: true tells the
    // frontend and CloudWatch logs that cost data is unreliable.
    const msg = `Cost Explorer failed for tenant ${tenant.id}: ${err.message}`;
    console.error(`Failed: ${tenant.id} — ${msg}`);
    syncErrors.push({ source: "CostExplorer", error: err.message });
  }

  // ── STEP 3: Count running EC2 instances ──────────────────────────────────
  // EC2 uses tenant.primaryRegion (not forced to us-east-1 like CE above).
  let activeEc2 = 0;
  try {
    const ec2       = new EC2Client(cfg);
    const instances = await ec2.send(new DescribeInstancesCommand({
      Filters: [{ Name: "instance-state-name", Values: ["running"] }]
    }));

    activeEc2 = instances.Reservations?.reduce(
      (sum, r) => sum + (r.Instances?.length || 0), 0
    ) || 0;

  } catch (err) {
    // Fix #1: same pattern — record failure, don't swallow silently.
    const msg = `EC2 DescribeInstances failed for tenant ${tenant.id}: ${err.message}`;
    console.error(`Failed: ${tenant.id} — ${msg}`);
    syncErrors.push({ source: "EC2", error: err.message });
  }

  // ── STEP 4: Return the full dashboard snapshot ───────────────────────────
  // partial: true when any AWS source failed — frontend and CloudWatch
  // can use this to show a warning instead of silently displaying $0.
  const partial = syncErrors.length > 0;
  if (partial) {
    console.error(
      `Partial sync for tenant ${tenant.id}: ` +
      syncErrors.map(e => `${e.source}: ${e.error}`).join(" | ")
    );
  } else {
    console.log(`Synced: ${tenant.id}`);
  }

  return {
    clientId:     tenant.id,
    clientName:   tenant.name,
    awsAccountId: tenant.awsAccountId,
    lastSync:     new Date().toISOString(),

    // partial: true means STS succeeded but one or more AWS sources failed.
    // dataSource stays "aws" because credentials worked — but cost/EC2
    // data may be $0 or 0 due to the partial failure above.
    dataSource: "aws",
    partial,
    syncErrors,

    cost: {
      monthlySpend:     parseFloat(monthlySpend.toFixed(2)),
      forecastedSpend:  parseFloat((monthlySpend * 1.05).toFixed(2)),
      estimatedSavings: parseFloat((monthlySpend * 0.15).toFixed(2)),
      // Fix #3: spendDeltaPercent removed — requires prior-period snapshot
      // comparison via a second GetCostAndUsageCommand call.
      // Scope: implement in Sprint 3 when monthly review feature is built.
      breakdown
    },

    // Fix #2: security and insights are intentional stubs for this sprint.
    // They return hardcoded values — not derived from AWS Security Hub or
    // Trusted Advisor yet. dataSource: "aws" refers to cost + EC2 data only.
    // Scope: Security Hub integration planned for Sprint 3.
    security: {
      healthScore: 80,
      openAlerts:  0,
      alerts:      [],
      stub: true
    },
    resources: {
      activeEc2,
      s3StorageTb:   0,
      uptimePercent: 99.9
    },
    insights: {
      executiveSummary: partial
        ? `Partial sync for ${tenant.name} — some AWS data unavailable. Check CloudWatch logs.`
        : `Live data synced for ${tenant.name}. Review recommendations below.`,
      recommendations: [],
      stub: true
    }
  };
}

module.exports = { syncFromAws };
