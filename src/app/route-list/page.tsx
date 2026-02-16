import Link from 'next/link';
import { getAllCities } from '@/lib/data-helpers';

export const metadata = {
  title: 'Route Schedule | Roll for Veterans',
  description: 'Complete route schedule for Roll for Veterans 2026 — 42+ communities from Key West, FL to Flagstaff, AZ.',
};

export default function RouteListPage() {
  const cities = getAllCities().sort((a, b) => a.dayNumber - b.dayNumber || a.distanceFromStart - b.distanceFromStart);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">
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
            className="inline-block mt-4 text-[#E07B4F] hover:text-[#C1592B] transition font-semibold"
          >
            &larr; Back to Map
          </Link>
        </div>

        {/* Route Table */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#8B4513] text-white">
                  <th className="px-4 py-3 text-sm font-semibold">#</th>
                  <th className="px-4 py-3 text-sm font-semibold">City</th>
                  <th className="px-4 py-3 text-sm font-semibold">State</th>
                  <th className="px-4 py-3 text-sm font-semibold whitespace-nowrap">Est. Arrival</th>
                  <th className="px-4 py-3 text-sm font-semibold text-right whitespace-nowrap">Miles from Start</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, index) => (
                  <tr
                    key={city.id}
                    className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition ${
                      index === 0 || index === cities.length - 1
                        ? 'bg-[#C1592B]/10'
                        : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{city.name}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{city.state}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {new Date(city.arrivalDate + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300 text-right">
                      {city.distanceFromStart.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Dates and distances are estimates and subject to change.
          </p>
          <Link
            href="/#map"
            className="inline-block mt-4 bg-[#C1592B] text-white px-6 py-2 rounded-lg hover:bg-[#E07B4F] transition font-semibold"
          >
            View on Map
          </Link>
        </div>
      </div>
    </div>
  );
}
