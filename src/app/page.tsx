import { WalletContextProvider } from '@/components/WalletContextProvider';
import { Dashboard } from '@/components/Dashboard';
import { TransactionForm } from '@/components/TransactionForm';

export default function Home() {
  return (
    <WalletContextProvider>
      <main className="min-h-screen bg-orange-50/50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍪</span>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
                CookieHub
              </h1>
            </div>
            <div className="text-sm font-medium text-gray-500 hidden md:block">
              Built on Cookie Chain
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8">
          
          {/* Left Column: Hero / Info */}
          <div className="flex-1 space-y-6">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 rounded-3xl text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-4">Fast, Community-driven SVM Ecosystem</h2>
              <p className="text-orange-50 text-lg mb-6">
                Experience sub-second finality and minimal transaction fees. CookieHub lets you connect your Nightly wallet and interact seamlessly with the Cookie Chain.
              </p>
              
              <ul className="space-y-3 font-medium text-orange-100">
                <li className="flex items-center gap-2">
                  <span className="bg-orange-400/30 p-1.5 rounded-full">✓</span>
                  Connect via Nightly Wallet
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-orange-400/30 p-1.5 rounded-full">✓</span>
                  Sub-second Finality
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-orange-400/30 p-1.5 rounded-full">✓</span>
                  ~$0.05 Transaction Fees
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href="https://cookiebox.app/" target="_blank" rel="noreferrer" className="block p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center font-bold text-gray-700 hover:text-orange-600">
                📦 Cookiebox
              </a>
              <a href="https://cookieswap.fun/" target="_blank" rel="noreferrer" className="block p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center font-bold text-gray-700 hover:text-orange-600">
                🔄 CookieSwap
              </a>
            </div>
          </div>

          {/* Right Column: Interaction */}
          <div className="flex-1">
            <Dashboard />
            <TransactionForm />
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>Built for the Cookie Chain Hackathon.</p>
            <div className="space-x-4 mt-2 md:mt-0">
              <a href="https://docs.cookiechain.wtf" target="_blank" rel="noreferrer" className="hover:text-orange-500">Docs</a>
              <a href="https://cookiescan.io" target="_blank" rel="noreferrer" className="hover:text-orange-500">Explorer</a>
            </div>
          </div>
        </footer>
      </main>
    </WalletContextProvider>
  );
}
