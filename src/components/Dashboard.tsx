'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function Dashboard() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      const fetchBalance = async () => {
        try {
          const bal = await connection.getBalance(publicKey);
          setBalance(bal / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Error fetching balance", error);
        }
      };

      fetchBalance();
      
      // Update balance on account change
      const id = connection.onAccountChange(
        publicKey,
        (accountInfo) => {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        },
        'confirmed'
      );

      return () => {
        connection.removeAccountChangeListener(id);
      };
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, connection]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cookie Dashboard</h2>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">Wallet Status</p>
          <div className="flex items-center gap-4">
            <WalletMultiButton className="!bg-orange-500 hover:!bg-orange-600 !transition-colors !rounded-xl" />
            {connected && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
            )}
          </div>
        </div>

        {connected && publicKey && (
          <div className="flex-1 bg-orange-50 p-4 rounded-xl border border-orange-100">
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {balance !== null ? balance.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '...'}
              </span>
              <span className="text-lg font-semibold text-orange-600">COOKIE</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 truncate" title={publicKey.toBase58()}>
              {publicKey.toBase58()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
