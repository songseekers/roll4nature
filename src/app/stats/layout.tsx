export const metadata = {
  title: 'Journey Stats | Roll 4 Nature',
  description:
    'Live journey statistics for Roll 4 Nature 2026 — total miles cycled, days on the path, and activity log.',
  openGraph: {
    title: 'Journey Stats | Roll 4 Nature',
    description:
      'Live journey statistics for Roll 4 Nature 2026 — total miles cycled, days on the path, and activity log.',
    url: 'https://r4v.songseekers.org/stats',
  },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
