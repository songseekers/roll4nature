import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with Roll 4 Nature | Support Veterans Wellness',
  description:
    'Partner with Roll 4 Nature to support veteran wellness through nature, cycling, and community. Sponsorship opportunities for the Mountain States Exploration 2026.',
  openGraph: {
    title: 'Partner with Roll 4 Nature | Support Veterans Wellness',
    description: 'Partner with Roll 4 Nature to support veteran wellness through nature, cycling, and community. Sponsorship opportunities for the Mountain States Exploration 2026.',
    url: 'https://r4v.songseekers.org/partner',
  },
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
