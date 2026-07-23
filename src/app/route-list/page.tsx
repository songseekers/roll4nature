import Button from '@/components/ui/Button';
import Link from 'next/link';
import { getAllCities } from '@/lib/data-helpers';
import { City } from '@/types/city';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Route Schedule | Roll 4 Nature',
  description: 'Complete route schedule for Roll 4 Nature — 78 communities across the Coast to Coast to Canyon and Mountain States Exploration routes.',
};

interface StopRow {
  city: City;
  stop: number;
}

function formatDate(arrivalDate: string) {
  return new Date(arrivalDate + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function RouteListPage() {
  const sortedByDay = getAllCities().slice().sort((a, b) => a.dayNumber - b.dayNumber);
  const stops: StopRow[] = sortedByDay.map((city, index) => ({ city, stop: index + 1 }));

  // Flagstaff (route: "both") is the dividing point — it closes out the
  // MSE section (Rigby -> Flagstaff) and is not repeated in the C2C2C section.
  const mseStops = stops
    .filter((s) => s.city.route === 'mse' || s.city.route === 'both')
    .slice()
    .reverse();
  const c2c2cStops = stops
    .filter((s) => s.city.route === 'c2c2c')
    .slice()
    .reverse();

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });

  const renderRow = ({ city, stop }: StopRow, accent: 'sage' | 'orange') => {
    const isVisited = city.arrivalDate <= today;

    const borderClass = accent === 'sage' ? 'border-l-4 border-r4n-sage' : 'border-l-4 border-r4v-primary';
    const stopClass = isVisited
      ? 'text-gray-400 dark:text-gray-500'
      : accent === 'sage'
      ? 'text-r4n-sage font-bold'
      : 'text-r4v-primary font-bold';

    const textClass = isVisited
      ? 'text-gray-400 dark:text-gray-500'
      : 'text-gray-900 dark:text-white';

    const cellClass = isVisited
      ? 'text-gray-400 dark:text-gray-500'
      : 'text-gray-700 dark:text-gray-300';

    return (
      <tr
        key={city.id}
        className={`${borderClass} border-b border-gray-200 dark:border-gray-700 transition ${
          isVisited ? 'opacity-60 hover:opacity-80' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
        }`}
      >
        <td className={`px-4 py-3 text-sm ${stopClass}`}>{stop}</td>
        <td className={`px-4 py-3 font-medium ${textClass}`}>{city.name}</td>
        <td className={`px-4 py-3 ${cellClass}`}>{city.state}</td>
        <td className={`px-4 py-3 whitespace-nowrap ${cellClass}`}>{formatDate(city.arrivalDate)}</td>
        <td className={`px-4 py-3 ${cellClass}`}>{city.dayNumber}</td>
      </tr>
    );
  };

  const sectionHeader = (label: string, bgClass: string) => (
    <tr>
      <td colSpan={5} className={`px-4 py-2 text-sm font-bold uppercase tracking-wider text-white ${bgClass}`}>
        {label}
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Route Schedule
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            78 communities across two routes — Coast to Coast to Canyon and Mountain States Exploration
          </p>
          <Link
            href="/#map"
            className="inline-block mt-4 text-r4v-primary-hover hover:text-r4v-primary transition font-semibold"
          >
            &larr; Back to Map
          </Link>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center mb-6 text-sm">
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <span className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-600 inline-block" aria-hidden="true" />
            Visited
          </span>
          <span className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
            <span className="w-4 h-4 rounded-full bg-r4n-sage inline-block" aria-hidden="true" />
            Mountain States Exploration
          </span>
          <span className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
            <span className="w-4 h-4 rounded-full bg-r4v-primary inline-block" aria-hidden="true" />
            Coast to Coast to Canyon
          </span>
        </div>

        {/* Route Table */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="bg-r4v-secondary text-white">
                  <th className="px-4 py-3 text-sm font-semibold">#</th>
                  <th className="px-4 py-3 text-sm font-semibold">City</th>
                  <th className="px-4 py-3 text-sm font-semibold">State</th>
                  <th className="px-4 py-3 text-sm font-semibold whitespace-nowrap">Arrival Date</th>
                  <th className="px-4 py-3 text-sm font-semibold">Day</th>
                </tr>
              </thead>
              <tbody>
                {sectionHeader('Mountain States Exploration — Flagstaff to Rigby', 'bg-r4n-sage')}
                {mseStops.map((row) => renderRow(row, 'sage'))}
                {sectionHeader('Coast to Coast to Canyon — Key West to Flagstaff', 'bg-r4v-primary')}
                {c2c2cStops.map((row) => renderRow(row, 'orange'))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Dates are estimates and subject to change.
          </p>
          <Button variant="primary" size="sm" href="/#map" className="mt-4">
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
}
