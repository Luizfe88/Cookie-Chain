# CookieHub 🍪 - Built on Cookie Chain

CookieHub is an innovative, fast, and community-driven Web3 application built exclusively on the **Cookie Chain (SVM)**. It demonstrates the power of sub-second finality, extremely low transaction fees (~$0.05), and seamless integration with the **Nightly Wallet**.

> **Live Application URL**: [Insert your Vercel/Netlify URL here]
> **GitHub Repository**: [https://github.com/Luizfe88/Cookie-Chain](https://github.com/Luizfe88/Cookie-Chain)

## 🎯 Features

CookieHub was built strictly following the Cookie Chain cApp specifications:
- **Nightly Wallet Support**: Seamlessly connect your Nightly Wallet.
- **On-chain Dashboard**: Read real-time Cookie balances and wallet state.
- **Transaction Execution**: Send COOKIE tokens on the network with sub-second finality.
- **Transaction Feedback**: Real-time processing states, confirmation handling, and robust error feedback.
- **Fast Infrastructure**: Integrates the official RPC Endpoint (`https://rpc.cookiescan.io`).

## ⚙️ Technical Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Blockchain**: `@solana/web3.js`, SVM architecture
- **Wallet Adapter**: `@solana/wallet-adapter-react`, `NightlyWalletAdapter`

## 📦 Setup Instructions

To run this project locally, make sure you have Node.js installed, then follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Luizfe88/Cookie-Chain.git
   cd Cookie-Chain
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # Also ensure wallet dependencies are installed:
   npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎥 Demo / X (Twitter) Thread Template

Below is a template you can use to fulfill the Demo Requirements:

---
**Tweet 1:**
Just built CookieHub 🍪 on the blazing-fast @TheCookieChain! 🚀 
CookieHub is a decentralized dashboard that lets you manage your balances and send transactions with sub-second finality. 
Built using the SVM infrastructure. Check it out! 👇
[Link to your Live URL] #CookieChain #BuildOnCookie

**Tweet 2:**
🔌 Wallet Connection: CookieHub fully integrates with @Nightly_App. Just one click and your wallet is synced up, reading real-time on-chain data straight from the CookieScan RPC! ⚡️

**Tweet 3:**
💸 Try it out! You can send COOKIE tokens to any address on the network for just ~$0.05 in fees. The UI gives you real-time transaction feedback and links your success directly to CookieScan! 
Need some test COOKIE? Check out the Cookie Chain Bridge: [Bridge Link] 🌉

**Tweet 4:**
All source code is Open Source and available here for builders: 🛠️ https://github.com/Luizfe88/Cookie-Chain 
Let's build epic things on @TheCookieChain! 🍪🔥
---

## 📚 Resources Used
- [Cookie Chain Homepage](https://www.cookiechain.wtf/)
- [Cookie Chain Documentation](https://docs.cookiechain.wtf/)
- [Cookie DAS API](https://api.cookiescan.io/)
- [CookieScan Explorer](https://cookiescan.io/)
