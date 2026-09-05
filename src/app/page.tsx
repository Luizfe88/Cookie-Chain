'use client';

import { WalletContextProvider } from '@/components/WalletContextProvider';
import { Dashboard } from '@/components/Dashboard';
import { TransactionForm } from '@/components/TransactionForm';

export default function Home() {
  return (
    <WalletContextProvider>
      <main className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-orange-500 selection:text-white">
        
        {/* Glowing atmospheric gradient orbs in background */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-orange-600/20 via-amber-500/10 to-transparent blur-[120px] pointer-events-none -z-0"></div>
        <div className="absolute top-[600px] -left-40 w-[400px] h-[400px] bg-orange-700/10 blur-[140px] pointer-events-none -z-0"></div>

        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-orange-950/60 via-orange-900/40 to-orange-950/60 border-b border-orange-500/20 py-2 px-4 text-xs font-medium text-orange-200 text-center flex items-center justify-center gap-2 relative z-20">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span>Cookie Chain Hackathon Demo • Powered by SVM & Nightly Wallet</span>
          <a 
            href="https://bridge.cookiechain.wtf" 
            target="_blank" 
            rel="noreferrer" 
            className="underline hover:text-white font-semibold ml-1 inline-flex items-center gap-1"
          >
            Bridge Funds →
          </a>
        </div>

        {/* Header */}
        <header className="border-b border-white/5 bg-[#0a0d15]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-600/20 ring-1 ring-orange-400/30">
                <span className="text-2xl">🍪</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-200 bg-clip-text text-transparent">
                    CookieHub
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    SVM
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono -mt-0.5">rpc.cookiescan.io</p>
              </div>
            </div>

            {/* Nav links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
              <a href="https://docs.cookiechain.wtf" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Docs</a>
              <a href="https://cookiescan.io" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Explorer</a>
              <a href="https://cookiebox.app" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Cookiebox</a>
              <a href="https://cookieswap.fun" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">CookieSwap</a>
              <a href="https://github.com/Luizfe88/Cookie-Chain" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-200 hover:text-orange-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 transition-all hover:border-orange-500/30">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>

          </div>
        </header>

        {/* Real-time Network Metrics Strip */}
        <div className="border-b border-white/5 bg-[#0c101b]/50 py-2.5 px-4 text-xs font-mono">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>RPC: <strong className="text-slate-200">Online</strong></span>
            </div>
            <div className="flex items-center gap-6">
              <span>Finality: <strong className="text-orange-400">&lt; 400ms</strong></span>
              <span>Avg Fee: <strong className="text-emerald-400">~$0.05</strong></span>
              <span>VM: <strong className="text-amber-400">Solana SVM</strong></span>
              <span className="hidden sm:inline">Standards: <strong className="text-slate-200">SPL / Token-2022</strong></span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12 space-y-10 relative z-10">
          
          {/* Hero Section */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wide uppercase">
              <span>⚡ Fast • Cheap • Community-Driven</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Experience the Power of <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Cookie Chain SVM
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Sub-second finality, minimal transaction fees, and instant wallet connectivity with Nightly. Deploy, interact, and send tokens in a snap.
            </p>
          </div>

          {/* Quick Ecosystem Apps Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <a 
              href="https://bridge.cookiechain.wtf" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/[0.05] transition-all group"
            >
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">🌉</div>
              <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">Cookie Bridge</div>
              <p className="text-[11px] text-slate-400">Transfer funds to SVM</p>
            </a>

            <a 
              href="https://cookieswap.fun" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/[0.05] transition-all group"
            >
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">🔄</div>
              <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">CookieSwap</div>
              <p className="text-[11px] text-slate-400">Trade meme & SPL tokens</p>
            </a>

            <a 
              href="https://cookiebox.app" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/[0.05] transition-all group"
            >
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">📦</div>
              <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">Cookiebox</div>
              <p className="text-[11px] text-slate-400">Explore dApps & launch</p>
            </a>

            <a 
              href="https://cookiescan.io" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/[0.05] transition-all group"
            >
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">🔍</div>
              <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">CookieScan</div>
              <p className="text-[11px] text-slate-400">Real-time block explorer</p>
            </a>
          </div>

          {/* Core Interactive Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Dashboard & Account Panel */}
            <div className="lg:col-span-7">
              <Dashboard />
            </div>

            {/* Transfer / Action Panel */}
            <div className="lg:col-span-5">
              <TransactionForm />
            </div>

          </div>

        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#07090e] py-8 text-center text-xs text-slate-500 mt-auto">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span>🍪</span>
              <span className="font-semibold text-slate-400">CookieHub</span>
              <span>• Built on Cookie Chain (SVM)</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://docs.cookiechain.wtf" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Documentation</a>
              <a href="https://api.cookiescan.io" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">DAS API</a>
              <a href="https://t.me/TheCookieNetChain" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Telegram</a>
              <a href="https://x.com/TheCookieChain" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition-colors">Twitter @TheCookieChain</a>
            </div>
          </div>
        </footer>

      </main>
    </WalletContextProvider>
  );
}
