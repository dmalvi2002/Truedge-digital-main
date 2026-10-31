import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageImageProvider from "@/components/sanity/PageImageProvider";
import { getPageImageSettings } from "@/lib/sanity/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.truedgedigital.co.uk"),
  title: "Truedge Digital",
  description: "Professional web development agency website built with Next.js",
  verification: {
    google: "gjfpTaJTXiciJUjMdFtH9F0GcoKCZWBsPoTUEFXtvJE",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const imageSettings = await getPageImageSettings();
  return (
    <html lang="en">
      <head>
        <Script id="google-analytics-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XEMD0L8770');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XEMD0L8770"
          strategy="beforeInteractive"
          async
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageImageProvider settings={imageSettings}><div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div></PageImageProvider>
      </body>
    </html>
  );
}
