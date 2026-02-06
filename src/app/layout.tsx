import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spurs Portal | 案件・要員マッチングプラットフォーム",
  description: "Spurs Inc.（スパーズ株式会社）のポータルサイトです。システム開発・SES事業における案件・人材のマッチングを、最短1時間・平均3時間のスピード回答でサポートします。掲載案件の80％以上が再委託可能・商流不問。",
  openGraph: {
    title: "Spurs Portal | 案件・要員マッチングプラットフォーム",
    description: "最短1時間・平均3時間のスピード回答。掲載案件の80％以上が再委託可能・商流不問。Spurs Inc.の案件・要員検索ポータル。",
    type: "website",
    locale: "ja_JP",
    siteName: "Spurs Portal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
