import React from 'react';

export default function SecurityPage() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      {/* Navbar Header */}
      <header className="bg-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-6 shadow-md">
        <span className="text-xl font-extrabold tracking-wider text-blue-400">Elite Web Services</span>
        <nav className="space-x-6 text-sm font-medium text-slate-300">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/services" className="hover:text-white transition">Services</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/security" className="text-blue-400 font-semibold border-b-2 border-blue-500 pb-1">Security</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Security & Trust Architecture</h1>
          <p className="text-slate-400 mt-2">How EWS-Lite guarantees zero-credential cloud evaluation security.</p>
        </div>

        <div className="space-y-6">
          {/* Data Security Overview */}
          <section className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">📋 Data Security Overview</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our design architecture prioritizes isolation. EWS-Lite acts as an analytics viewport overlay, pulling raw metric structures without aggregating or modifying sensitive metadata arrays.
            </p>
          </section>

          {/* IAM AssumeRole Model */}
          <section className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">🔑 IAM AssumeRole Model</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Cross-account authentication is secured via standardized AWS IAM AssumeRole configurations utilizing crisp External ID strings. This eliminates the need for access keys entirely.
            </p>
          </section>

          {/* Read-Only Access & No Credential Storage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">Read‑Only Access</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Permissions are strictly bound to read-only metadata scanning configurations. EWS cannot create, alter, or terminate cloud instances.
              </p>
            </section>

            <section className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">No Credential Storage</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                No static credentials, keys, or user tokens are ever processed, transferred, or recorded within database repositories.
              </p>
            </section>
          </div>

          {/* Audit & Logging */}
          <section className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-white mb-2">🛡️ Audit & Logging (Future Roadmap)</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Upcoming update modules will integrate complete CloudTrail event pipelines to provide transparent tracking logs of all analysis checks.
            </p>
          </section>

          {/* Mandatory Compliance Disclaimer */}
          <div className="bg-amber-950/40 border border-amber-900/60 p-4 rounded-xl flex items-start space-x-3 mt-6">
            <span className="text-amber-400 mt-0.5">⚠️</span>
            <p className="text-xs text-amber-300 leading-relaxed font-semibold">
              “EWS-Lite provides visibility and recommendations only. No customer changes are made without approval.”
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-6 text-center text-xs text-slate-500 mt-12">
        <p>&copy; 2026 Elite Web Services LLC. All rights reserved. Contact: Elitewebservicesllc@gmail.com</p>
      </footer>
    </div>
  );
}