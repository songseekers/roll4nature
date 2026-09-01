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
  description: "Roll 4 Nature (also known as Roll for Nature or roll4nature) is a veteran-founded, purpose-driven outdoor community and cycling journey. Get outside, discover purpose in nature, and become who you were meant to be.",
  keywords: [
    // Brand name variants
    "Roll 4 Nature",
    "Roll for Nature",
    "roll4nature",
    "R4N",
    "Roll 4 Veterans",
    "Roll for Veterans",
    "roll4veterans",
    "R4V",
    // Cycling and endurance
    "endurance cycling",
    "cycling for a cause",
    "charity bike ride",
    "cross country cycling",
    "cross country bike ride",
    "long distance cycling",
    "coast to coast cycling",
    "transcontinental cycling",
    "cycling charity",
    "bike ride for charity",
    "cycling fundraiser",
    "adventure cycling",
    "bikepacking",
    "touring cyclist",
    "cycling across America",
    "mountain states cycling",
    "mountain states exploration",
    // Veterans
    "veteran cycling",
    "cycling for veterans",
    "veterans outdoor community",
    "veteran wellness",
    "veteran mental health",
    "veterans support",
    "military veteran fitness",
    "veteran community",
    "veterans nature therapy",
    "veteran transition",
    "army veteran cyclist",
    // Nature and health
    "nature therapy",
    "outdoor mental health",
    "nature and mental health",
    "healing in nature",
    "outdoor wellness",
    "get outside",
    "answers found outdoors",
    "purpose in nature",
    "discover purpose in nature",
    "nature therapy veterans",
    "outdoor therapy",
    "ecotherapy",
    // Coaching and purpose
    "integrative health coach",
    "integrative health coaching",
    "purpose discovery",
    "purpose pathfinder",
    "health coaching veterans",
    "life coaching veterans",
    "JT Tracy",
    "JT Tracy cyclist",
    "JT Tracy health coach",
    // Organizations
    "Team RWB",
    "Team Red White Blue",
    "Team RWB cycling",
    "Team RWB support",
    "Roll 4 Nature Team RWB",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://r4v.songseekers.org"),
  alternates: {
    canonical: "https://r4v.songseekers.org",
  },
  openGraph: {
    title: "Roll 4 Nature | Get Outside. Answers Are Found Outdoors.",
    description: "Veteran-founded cycling journey and outdoor community. Roll 4 Nature — discover purpose in nature.",
    url: "https://r4v.songseekers.org",
    siteName: "Roll 4 Nature",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Roll 4 Nature — veteran-founded outdoor community",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roll 4 Nature | Get Outside. Answers Are Found Outdoors.",
    description: "Veteran-founded cycling journey and outdoor community. Discover purpose in nature.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Roll 4 Nature",
  "alternateName": [
    "Roll for Nature",
    "roll4nature",
    "R4N",
    "Roll 4 Veterans",
    "Roll for Veterans",
    "roll4veterans",
    "R4V"
  ],
  "url": "https://r4v.songseekers.org",
  "logo": "https://r4v.songseekers.org/images/R4VLogo.png",
  "description": "Veteran-founded, purpose-driven outdoor community and cycling journey. Get outside, discover purpose in nature.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "JT Tracy",
    "jobTitle": "Integrative Health Coach",
    "description": "Army veteran, endurance cyclist, and certified integrative health coach",
  },
  "sameAs": [
    "https://www.youtube.com/@roll4nature/shorts",
    "https://www.facebook.com/roll4nature",
    "https://www.instagram.com/roll4nature",
    "https://www.tiktok.com/@roll4nature",
    "https://strava.app.link/hW78V3J2u0b",
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
    "alternateName": ["Roll for Nature", "roll4nature", "R4N"],
  },
  "knowsAbout": [
    "Integrative Health Coaching",
    "Veterans Wellness",
    "Nature Therapy",
    "Endurance Cycling",
    "Purpose Discovery",
    "Mental Health",
    "Outdoor Therapy",
    "Team RWB",
  ],
};

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Mountain States Exploration — Roll 4 Nature 2026",
  "alternateName": [
    "R4N Mountain States Exploration",
    "Roll for Nature Mountain States",
    "roll4nature cycling 2026",
  ],
  "description": "A purpose-driven cycling journey through the mountain states of the American West, supporting Team Red White and Blue (Team RWB) veterans wellness. From Flagstaff, Arizona to Rigby, Idaho.",
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
    "alternateName": ["Roll for Nature", "roll4nature"],
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
