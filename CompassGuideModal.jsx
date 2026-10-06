import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, Terminal, ShieldCheck, RefreshCw } from 'lucide-react';

export default function CompassGuideModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const uri = 'mongodb://127.0.0.1:27017';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(uri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compass-guide-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 id="compass-guide-title" className="text-lg font-bold text-slate-900">
                MongoDB Compass Guide
              </h2>
              <p className="text-xs text-slate-500">
                How to inspect & manage your data locally
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600">
          {/* Quick Connection Box */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Connection String for Compass
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 text-xs text-emerald-700 hover:text-emerald-900 font-medium px-2 py-1 bg-white rounded-md border border-emerald-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy String'}</span>
              </button>
            </div>
            <code className="text-sm font-mono text-emerald-950 font-bold block select-all">
              {uri}
            </code>
          </div>

          {/* Step by step */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Step-by-Step Instructions</h3>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-800">Launch MongoDB Compass</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Open the MongoDB Compass desktop app installed on your machine.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-800">Connect to Local Database</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Paste <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">mongodb://127.0.0.1:27017</code> in the connection string input, then click <strong>Connect</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-800">Find Database & Collection</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  In the left sidebar, click on database <strong className="text-slate-800">expense_tracker</strong>, then click the collection <strong className="text-slate-800">transactions</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <p className="font-semibold text-slate-800">Real-Time Sync</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Whenever you add, edit, or delete transactions in this web application, click the <strong>Refresh</strong> button in Compass to instantly view the updated MongoDB documents.
                </p>
              </div>
            </div>
          </div>

          {/* Quick tips */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center space-x-2 text-slate-800 font-medium text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Environment Security Note</span>
            </div>
            <p className="text-xs text-slate-500">
              Your connection string is managed safely via <code className="text-slate-700 font-mono">server/.env</code> and never hardcoded in source code.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold shadow-sm transition"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}

