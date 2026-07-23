import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/layout/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roll 4 Nature | Get Outside. Answers Are Found Outdoors.",
  description: "Roll 4 Nature is a veteran-founded, purpose-driven outdoor community. Get outside, discover purpose in nature, and become who you were meant to be.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://roll4nature.org"),
  openGraph: {
    title: "Roll 4 Nature",
    description: "Get Outside. Answers Are Found Outdoors. Discover Purpose in Nature.",
    url: "https://roll4nature.org",
    siteName: "Roll 4 Nature",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-r4n-forest text-gray-900 dark:text-r4n-warm-cream`}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ThemeToggle />
        <Analytics />
      </body>
    </html>
  );
}
