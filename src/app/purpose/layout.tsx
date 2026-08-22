import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Purpose Guidebook | Roll 4 Nature',
  description:
    "Download JT's free Purpose Pathfinder guidebook — a certified integrative health coach's framework for discovering purpose through nature, movement, and reflection.",
  openGraph: {
    title: 'Free Purpose Guidebook | Roll 4 Nature',
    description: "Download JT's free Purpose Pathfinder guidebook — a certified integrative health coach's framework for discovering purpose through nature, movement, and reflection.",
    url: 'https://r4v.songseekers.org/purpose',
  },
};

export default function PurposeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
