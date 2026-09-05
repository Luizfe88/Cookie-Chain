import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CookieHub 🍪 | Cookie Chain cApp",
  description: "Next-gen SVM cApp on Cookie Chain with sub-second finality and Nightly wallet integration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07090e] text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
