import HeroSection from '@/components/home/HeroSection';
import QuickActions from '@/components/home/QuickActions';
import PurposeJourney from '@/components/home/PurposeJourney';
import RouteMap from '@/components/map/RouteMap';
import { getMajorCities } from '@/lib/data-helpers';
import Link from 'next/link';

export default function Home() {
  const majorCities = getMajorCities();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <QuickActions />
      </section>

      {/* Purpose Journey Section */}
      <PurposeJourney />

      {/* Interactive Route Map */}
      <section id="map" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Explore Our Route
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Click on any city to see arrival dates, population, and local Team RWB chapter information.
          </p>
          <RouteMap />
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why We Roll
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Team RWB (Red, White & Blue) empowers veterans through physical and social engagement.
              Our cross-country journey connects 80+ communities and celebrates the resilience of America's veterans.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <span className="font-semibold">Not broken, still moving.</span> Every mile represents gratitude,
              every city represents connection, and every veteran matters.
            </p>
            <a
              href="https://teamrwb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Learn More About Team RWB
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">173,768</div>
                <p className="text-gray-700">Event check-ins in 2025</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">18,490</div>
                <p className="text-gray-700">Total events nationwide</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">80+</div>
                <p className="text-gray-700">Communities on our route</p>
              </div>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Join Team RWB Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities Section */}
      <section id="cities" className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Major Stops
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            19 key cities along our 4,434-mile journey from Key West to the Grand Canyon
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majorCities.map((city) => (
              <Link key={city.slug} href={`/roll4veterans/${city.slug}`}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer h-full">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-12 flex items-center px-6">
                    <span className="text-white font-bold">Day {city.dayNumber}</span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {city.name}, {city.state}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>
                        <span className="font-semibold">Arrival:</span> {new Date(city.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p>
                        <span className="font-semibold">Population:</span> {city.population.toLocaleString()}
                      </p>
                      <p>
                        <span className="font-semibold">Distance from start:</span> {city.distanceFromStart} miles
                      </p>
                    </div>

                    {city.rwbChapter && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs mb-4">
                        <p className="font-bold text-blue-900">{city.rwbChapter.name}</p>
                        <p className="text-blue-700">{city.rwbChapter.contactEmail}</p>
                      </div>
                    )}

                    <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Be Part of the Journey?
          </h2>

          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Whether you want to donate, volunteer with Team Bravo, or join us in your city—your support matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zeffy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition inline-block"
            >
              Donate Now
            </a>
            <Link
              href="/team-bravo"
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition inline-block"
            >
              Join Team Bravo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
