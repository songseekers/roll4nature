import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with Roll 4 Nature 2026 | Support Team RWB',
  description:
    'Become a partner of Roll 4 Nature 2026 — a 4,545-mile cross-country cycling journey from Key West to Los Angeles supporting Team RWB veterans. Join us in making a difference.',
  openGraph: {
    title: 'Partner with Roll 4 Nature 2026',
    description: 'Support a 4,545-mile journey for Team RWB veterans',
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
