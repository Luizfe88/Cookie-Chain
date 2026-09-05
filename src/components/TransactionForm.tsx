'use client';

import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function TransactionForm() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) return;

    setStatus('processing');
    setErrorMessage('');
    setTxHash('');

    try {
      const recipientPubKey = new PublicKey(recipient.trim());
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      if (isNaN(lamports) || lamports <= 0) {
        throw new Error('Please enter a valid positive amount.');
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction with Nightly / Connected wallet
      const signature = await sendTransaction(transaction, connection);
      setTxHash(signature);

      // Await confirmation on Cookie Chain SVM
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error('Transaction was processed but failed confirmation on-chain.');
      }

      setStatus('success');
      setRecipient('');
      setAmount('');
    } catch (error: any) {
      console.error("Transfer error:", error);
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred during execution.');
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Instant Transfer</h3>
          <p className="text-xs text-slate-400 mt-0.5">Sub-second SVM on-chain execution</p>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          Fee: ~$0.05
        </div>
      </div>

      {/* Form Content */}
      <div className="mt-6 relative z-10">
        {!connected ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto text-xl">
              🔒
            </div>
            <h4 className="text-base font-bold text-white">Wallet Locked</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Connect your Nightly wallet above to unlock instant token transfers on the Cookie Chain.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            
            {/* Recipient Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Recipient Address
              </label>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Solana / Cookie Chain public address"
                disabled={status === 'processing'}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all disabled:opacity-50"
              />
            </div>

            {/* Amount Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Amount
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Token: COOKIE</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  required
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  disabled={status === 'processing'}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all disabled:opacity-50 pr-20"
                />
                <button
                  type="button"
                  onClick={() => setAmount('0.1')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-orange-400 border border-white/10 transition-colors"
                >
                  Test 0.1
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'processing'}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {status === 'processing' ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Executing On-Chain...</span>
                </>
              ) : (
                <span>Send COOKIE Instantly ⚡</span>
              )}
            </button>

          </form>
        )}

        {/* Live Feedback: Success */}
        {status === 'success' && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <span className="text-base">✅</span>
              <span>Transaction Confirmed!</span>
            </div>
            <p className="text-xs text-slate-300">
              Your transaction was validated in sub-second finality on Cookie Chain.
            </p>
            {txHash && (
              <a
                href={`https://cookiescan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline pt-1"
              >
                <span>View Transaction on CookieScan</span>
                <span>↗</span>
              </a>
            )}
          </div>
        )}

        {/* Live Feedback: Error */}
        {status === 'error' && (
          <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 space-y-1 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <span className="text-base">❌</span>
              <span>Execution Failed</span>
            </div>
            <p className="text-xs text-red-200/80 leading-relaxed font-mono break-all">
              {errorMessage}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
