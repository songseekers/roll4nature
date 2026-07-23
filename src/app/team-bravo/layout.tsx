import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Team Bravo | Roll 4 Nature 2026',
  description:
    'Meet the team behind Roll 4 Nature 2026 — the cyclists, crew, and support team riding 4,463 miles from Key West, Florida to Flagstaff, Arizona for Team RWB.',
  openGraph: {
    title: 'Meet Team Bravo | Roll 4 Nature 2026',
    description: 'The team riding 4,463 miles for Team RWB veterans',
    url: 'https://r4v.songseekers.org/team-bravo',
  },
};

export default function TeamBravoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
