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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Roll 4 Nature",
  "url": "https://r4v.songseekers.org",
  "logo": "https://r4v.songseekers.org/images/R4VLogo.png",
  "description": "Veteran-founded, purpose-driven outdoor community. Get outside, discover purpose in nature.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "JT Tracy",
    "jobTitle": "Integrative Health Coach",
    "description": "Army veteran, endurance cyclist, and certified integrative health coach",
  },
  "sameAs": [
    "https://instagram.com/roll4veterans",
    "https://facebook.com/roll4veterans",
    "https://youtube.com/@roll4veterans",
    "https://tiktok.com/@roll4veterans",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "roll4veterans@gmail.com",
    "contactType": "General Inquiries",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "JT Tracy",
  "jobTitle": "Integrative Health Coach",
  "description": "Army veteran, endurance cyclist, and certified UHP integrative health coach. Founder of Roll 4 Nature.",
  "url": "https://r4v.songseekers.org/team-bravo",
  "email": "roll4veterans@gmail.com",
  "affiliation": {
    "@type": "Organization",
    "name": "Roll 4 Nature",
  },
  "knowsAbout": [
    "Integrative Health Coaching",
    "Veterans Wellness",
    "Nature Therapy",
    "Endurance Cycling",
    "Purpose Discovery",
    "Mental Health",
  ],
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Mountain States Exploration — Roll 4 Nature 2026",
  "description": "A purpose-driven cycling journey through the mountain states of the American West, supporting Team Red White and Blue (Team RWB) veterans wellness.",
  "startDate": "2026-07-01",
  "endDate": "2026-09-03",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "American West — Flagstaff, AZ to Rigby, ID",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
    },
  },
  "organizer": {
    "@type": "Organization",
    "name": "Roll 4 Nature",
    "url": "https://r4v.songseekers.org",
  },
  "url": "https://r4v.songseekers.org",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      </head>
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
