import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "SynX - Biomedical AI Innovation",
    template: "%s | SynX",
  },
  description:
    "Revolutionizing healthcare through cutting-edge AI and machine learning solutions. SynX delivers innovative biomedical technologies that transform patient care and medical research.",
  keywords: [
    "SynX",
    "biomedical AI",
    "healthcare innovation",
    "machine learning",
    "medical technology",
    "AI healthcare",
    "biomedical research",
    "healthcare solutions",
    "medical AI",
    "biomedical engineering",
  ],
  authors: [{ name: "SynX Team" }],
  creator: "SynX",
  publisher: "SynX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://synxai.it"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SynX - Biomedical AI Innovation",
    description:
      "Revolutionizing healthcare through cutting-edge AI and machine learning solutions.",
    url: "/",
    siteName: "SynX",
    images: [
      {
        url: "/logo_bg.png",
        width: 1200,
        height: 630,
        alt: "SynX - Biomedical AI Innovation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SynX - Biomedical AI Innovation",
    description:
      "Revolutionizing healthcare through cutting-edge AI and machine learning solutions.",
    images: ["/logo_bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>{children}</Providers>

        {/* Cookiebot */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="fbfeca0d-b0d7-437a-9f9f-cd662ad74b15"
          strategy="afterInteractive"
          async
        />

        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-4PZ4YDLPW2"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4PZ4YDLPW2');
          `}
        </Script>
      </body>
    </html>
  );
}
