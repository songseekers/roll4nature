import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sponsor Roll for Veterans 2026 | Support Team RWB',
  description:
    'Become a sponsor of Roll for Veterans 2026 — a 4,463-mile cross-country cycling journey from Key West to Flagstaff supporting Team RWB veterans. Join us in making a difference.',
  openGraph: {
    title: 'Sponsor Roll for Veterans 2026',
    description: 'Support a 4,463-mile journey for Team RWB veterans',
    url: 'https://r4v.songseekers.org/sponsor',
  },
};

export default function SponsorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
