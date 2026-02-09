import "./globals.css";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Content Calendar Builder",
  description: "SEO-first content planning for Web3 affiliate sites"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <div className="min-h-screen bg-grid">
          <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
