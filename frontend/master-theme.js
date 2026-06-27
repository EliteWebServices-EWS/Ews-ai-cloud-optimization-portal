// master-theme.js — Homepage main content (header/footer via ews-nav.js)
(function () {
    function renderHomeContent() {
        var main = document.querySelector('main');
        if (!main || main.dataset.sanitized) return;
        main.dataset.sanitized = 'true';
        main.className = 'flex-1';

        main.innerHTML =
            '<section class="ews-hero">' +
                '<div class="ews-hero-bg" aria-hidden="true"></div>' +
                '<div class="ews-hero-overlay" aria-hidden="true"></div>' +
                '<div class="ews-hero-inner">' +
                    '<span class="ews-hero-eyebrow">AWS Partner Advisory Network</span>' +
                    '<h1>AWS Cloud Strategy, <span>Innovation</span> &amp; Transformation</h1>' +
                    '<p class="ews-hero-lead">Elite Web Services architects, automates, and manages enterprise AWS environments — reducing complexity, ensuring compliance, and minimizing cloud spend through AI-assisted FinOps.</p>' +
                    '<div class="ews-hero-actions">' +
                        '<a href="pages/assessment.html" class="ews-btn-primary">Book Free Assessment</a>' +
                        '<a href="pages/contact.html" class="ews-btn-outline">Contact Us</a>' +
                    '</div>' +
                    '<figure class="ews-hero-photo">' +
                        '<img src="assets/images/team-collaboration.png" alt="EWS cloud engineering team collaborating on AWS architecture">' +
                        '<figcaption>Certified specialists — strategy, security &amp; FinOps</figcaption>' +
                    '</figure>' +
                '</div>' +
            '</section>' +

            '<section class="ews-section" id="benefits">' +
                '<h2 class="ews-section-title">Why Elite Web Services</h2>' +
                '<div class="ews-benefits-grid">' +
                    '<div class="ews-benefit-card"><h3>Cost Optimization</h3><p>AI-assisted FinOps analysis surfaces idle spend, right-sizing opportunities, and reserved capacity savings.</p></div>' +
                    '<div class="ews-benefit-card"><h3>Security First</h3><p>Read-only cross-account access with External ID protection — we never touch your data or credentials.</p></div>' +
                    '<div class="ews-benefit-card"><h3>One Engagement</h3><p>Strategy, architecture, migration, and managed services under one team — no vendor handoffs.</p></div>' +
                    '<div class="ews-benefit-card"><h3>Executive Visibility</h3><p>Our AI Cloud Optimization Portal delivers spend dashboards, savings estimates, and executive summaries.</p></div>' +
                '</div>' +
            '</section>' +

            '<section class="ews-section" id="matrix" style="padding-top:0;">' +
                '<h2 class="ews-section-title">Core Capabilities</h2>' +
                '<div class="ews-benefits-grid">' +
                    '<div class="ews-benefit-card"><h3>Strategy &amp; Readiness</h3><p>Cloud roadmapping and Well-Architected reviews before any work begins.</p></div>' +
                    '<div class="ews-benefit-card"><h3>Cloud Migrations</h3><p>Rehost, replatform, and refactor pipelines with security built in from day one.</p></div>' +
                    '<div class="ews-benefit-card"><h3>FinOps Advisory</h3><p>Continuous cost monitoring designed to purge idle cloud spend.</p></div>' +
                    '<div class="ews-benefit-card"><h3>Managed Services</h3><p>Ongoing environment operations and engineering support after go-live.</p></div>' +
                    '<div class="ews-benefit-card"><h3>DevOps Automation</h3><p>Infrastructure-as-Code pipelines with automated, reproducible deployments.</p></div>' +
                    '<div class="ews-benefit-card"><h3>Security &amp; Compliance</h3><p>Guardrails for SOC 2, HIPAA, and ISO across healthcare, finance, and SaaS.</p></div>' +
                    '<div class="ews-benefit-card"><h3>Data &amp; Analytics</h3><p>High-performance processing engines built directly on AWS.</p></div>' +
                    '<div class="ews-benefit-card"><h3>AI Cloud Portal</h3><p>Customer-facing optimization dashboard with mock AWS data and demo reports.</p></div>' +
                '</div>' +
            '</section>' +

            '<section class="ews-cta-band">' +
                '<h2>Ready to optimize your AWS footprint?</h2>' +
                '<p>Start with a free read-only assessment — no obligation, no access keys stored.</p>' +
                '<a href="pages/assessment.html" class="ews-btn-primary">Book Free Assessment</a>' +
            '</section>';
    }

    document.body.className = 'min-h-screen flex flex-col antialiased';
    renderHomeContent();
})();
