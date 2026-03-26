import Button from '@/components/ui/Button';
import Link from 'next/link';
import { getAllCities } from '@/lib/data-helpers';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Route Schedule | Roll for Veterans',
  description: 'Complete route schedule for Roll for Veterans 2026 — 42+ communities from Key West, FL to Flagstaff, AZ.',
};

export default function RouteListPage() {
  const cities = getAllCities().sort((a, b) => a.dayNumber - b.dayNumber || a.distanceFromStart - b.distanceFromStart);
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' }); // YYYY-MM-DD, Central time

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Route Schedule
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Key West, FL to Flagstaff, AZ — 4,463 miles across 42+ communities
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
            Cities passed
          </span>
          <span className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
            <span className="w-4 h-4 rounded-full bg-r4v-primary inline-block" aria-hidden="true" />
            Upcoming cities
          </span>
        </div>

        {/* Route Table */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-r4v-secondary text-white">
                  <th className="px-4 py-3 text-sm font-semibold">#</th>
                  <th className="px-4 py-3 text-sm font-semibold">City</th>
                  <th className="px-4 py-3 text-sm font-semibold">State</th>
                  <th className="px-4 py-3 text-sm font-semibold whitespace-nowrap">Est. Arrival</th>
                  <th className="px-4 py-3 text-sm font-semibold text-right whitespace-nowrap">Miles from Start</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, index) => {
                  const isPassed = city.arrivalDate < today;
                  const isToday = city.arrivalDate === today;
                  const isEndpoint = index === 0 || index === cities.length - 1;

                  const rowClass = [
                    'border-b border-gray-200 dark:border-gray-700 transition',
                    isPassed
                      ? 'opacity-60 hover:opacity-80'
                      : isToday
                      ? 'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                      : isEndpoint
                      ? 'bg-r4v-primary/10 hover:bg-r4v-primary/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50',
                  ].join(' ');

                  const cityNameClass = isPassed
                    ? 'text-gray-400 dark:text-gray-500'
                    : isToday
                    ? 'text-amber-800 dark:text-amber-300 font-bold'
                    : 'text-gray-900 dark:text-white font-medium';

                  const cellClass = isPassed
                    ? 'text-gray-400 dark:text-gray-500'
                    : isToday
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-gray-700 dark:text-gray-300';

                  return (
                    <tr key={city.id} className={rowClass}>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                        {isPassed ? (
                          <span aria-label="Passed" title="Already passed">✓</span>
                        ) : isToday ? (
                          <span className="text-amber-600 dark:text-amber-400" aria-label="Today">★</span>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className={`px-4 py-3 ${cityNameClass}`}>
                        {city.name}
                        {isToday && (
                          <span className="ml-2 text-xs bg-amber-500 text-white px-1.5 py-0.5 rounded font-semibold">
                            TODAY
                          </span>
                        )}
                      </td>
                      <td className={`px-4 py-3 ${cellClass}`}>{city.state}</td>
                      <td className={`px-4 py-3 whitespace-nowrap ${cellClass}`}>
                        {new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className={`px-4 py-3 text-right ${cellClass}`}>
                        {city.distanceFromStart.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Dates and distances are estimates and subject to change.
          </p>
          <Button variant="primary" size="sm" href="/#map" className="mt-4">
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
}
