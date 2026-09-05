'use client';

import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

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
      const recipientPubKey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      if (isNaN(lamports) || lamports <= 0) {
        throw new Error('Invalid amount');
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports,
        })
      );

      // Fetch the latest blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      setTxHash(signature);

      // Confirm transaction
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      if (confirmation.value.err) {
        throw new Error('Transaction failed during confirmation');
      }

      setStatus('success');
      setRecipient('');
      setAmount('');
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || 'An unknown error occurred');
    }
  };

  if (!connected) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Send COOKIE</h3>
      
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Paste Solana/Cookie address here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            disabled={status === 'processing'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (COOKIE)
          </label>
          <input
            type="number"
            required
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            disabled={status === 'processing'}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'processing'}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all ${
            status === 'processing' 
              ? 'bg-orange-400 cursor-not-allowed' 
              : 'bg-orange-600 hover:bg-orange-700 active:scale-95'
          }`}
        >
          {status === 'processing' ? 'Processing Transaction...' : 'Send Tokens'}
        </button>
      </form>

      {/* User Feedback Status */}
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
          <p className="font-semibold flex items-center gap-2">
            <span className="text-xl">✅</span> Transaction Successful!
          </p>
          <a 
            href={`https://cookiescan.io/tx/${txHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm underline mt-1 block hover:text-green-900"
          >
            View on CookieScan
          </a>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
          <p className="font-semibold flex items-center gap-2">
            <span className="text-xl">❌</span> Transaction Failed
          </p>
          <p className="text-sm mt-1">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
