export const metadata = {
  title: 'Cycling Stats | Roll 4 Nature 2026',
  description:
    'Live cycling stats for the Roll 4 Nature 2026 cross-country journey — 4,434 miles from Key West, FL to Flagstaff, AZ supporting Team RWB.',
  openGraph: {
    title: 'Cycling Stats | Roll 4 Nature 2026',
    description:
      'Track the miles: Key West to Flagstaff, 4,434 miles for Team RWB veterans.',
    url: 'https://r4v.songseekers.org/stats',
  },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
