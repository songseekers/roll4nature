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
  title: "Roll for Veterans 2026 | Bike Ride for Team RWB",
  description: "Join us on an epic cross-country journey from Key West to the Grand Canyon supporting Team RWB veterans organization. 4,545 miles of stories, community, and gratitude.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://songseekers.org"),
  openGraph: {
    title: "Roll for Veterans 2026",
    description: "Cross-country bike ride supporting Team RWB",
    url: "https://songseekers.org",
    siteName: "Roll for Veterans",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
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
