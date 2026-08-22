import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Team Bravo | Roll 4 Nature',
  description:
    "Meet JT Tracy and the Roll 4 Nature team — veteran cyclists, coaches, and crew riding through America's wild places supporting Team RWB veterans wellness.",
  openGraph: {
    title: 'Meet Team Bravo | Roll 4 Nature',
    description: "Meet JT Tracy and the Roll 4 Nature team — veteran cyclists, coaches, and crew riding through America's wild places supporting Team RWB veterans wellness.",
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
