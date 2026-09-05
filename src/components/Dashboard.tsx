'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function Dashboard() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      let isMounted = true;
      setIsLoading(true);

      const fetchBalance = async () => {
        try {
          const bal = await connection.getBalance(publicKey);
          if (isMounted) {
            setBalance(bal / LAMPORTS_PER_SOL);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
          if (isMounted) setIsLoading(false);
        }
      };

      fetchBalance();

      // Listen for balance updates on-chain in real-time
      const subId = connection.onAccountChange(
        publicKey,
        (accountInfo) => {
          if (isMounted) {
            setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
          }
        },
        'confirmed'
      );

      return () => {
        isMounted = false;
        connection.removeAccountChangeListener(subId);
      };
    } else {
      setBalance(null);
      setIsLoading(false);
    }
  }, [connected, publicKey, connection]);

  const copyToClipboard = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Wallet Overview</h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Connected to Cookie Chain SVM</p>
        </div>

        {/* Connect Button */}
        <div>
          <WalletMultiButton className="!bg-gradient-to-r !from-orange-500 !to-amber-500 hover:!from-orange-600 hover:!to-amber-600 !transition-all !rounded-2xl !font-bold !text-sm !h-11 !px-5 shadow-lg shadow-orange-500/25" />
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-6 space-y-6">
        
        {/* Balance Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/15 via-amber-500/5 to-transparent border border-orange-500/30 relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">
              Live On-Chain Balance
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 text-[11px] font-mono border border-orange-500/30">
              <span>COOKIE</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            {isLoading ? (
              <div className="h-10 w-36 bg-white/10 animate-pulse rounded-lg"></div>
            ) : (
              <span className="text-4xl md:text-5xl font-black tracking-tight text-white font-mono">
                {connected 
                  ? (balance !== null ? balance.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0.0000') 
                  : '0.00'}
              </span>
            )}
            <span className="text-base font-bold text-slate-400">COOKIE</span>
          </div>

          <p className="text-[12px] text-slate-400 mt-2">
            Native gas token for transactions and smart contract deployments.
          </p>
        </div>

        {/* Account Details or Connect Prompt */}
        {connected && publicKey ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Address box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <span className="text-xs font-medium text-slate-400">Public Key</span>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-slate-200">
                  {formatAddress(publicKey.toBase58())}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1 border border-white/5"
                  title="Copy full address"
                >
                  {copied ? (
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
            </div>

            {/* Explorer box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <span className="text-xs font-medium text-slate-400">Explorer Details</span>
              <a
                href={`https://cookiescan.io/address/${publicKey.toBase58()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors mt-2"
              >
                <span>View on CookieScan</span>
                <span>↗</span>
              </a>
            </div>

          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-black/30 border border-dashed border-white/10 text-center space-y-2">
            <div className="text-3xl">🔌</div>
            <h4 className="text-sm font-bold text-slate-200">No Wallet Connected</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Please connect your <strong className="text-orange-400">Nightly Wallet</strong> above to read your live balance and interact on Cookie Chain.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
