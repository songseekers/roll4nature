'use client';

import Link from 'next/link';

export default function PathwayCards() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Guidebook Card */}
          <Link href="/guidebook">
            <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center h-full justify-between">
                {/* Icon */}
                <div className="text-6xl mb-6">🌸</div>

                {/* Content */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Discover Your Purpose
                  </h2>
                  <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Explore the 8-petal framework for whole-person health across Physical, Mental, Emotional, and Lifestyle domains.
                  </p>
                  <div className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                    → Explore Guidebook
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-6 text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  8 Dimensions of Health
                </div>
              </div>
            </div>
          </Link>

          {/* Roll 4 Nature Card */}
          <Link href="/roll-for-veterans">
            <div className="group rounded-xl bg-gradient-to-br from-green-50 to-blue-50 p-8 border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
              <div className="flex flex-col items-center text-center h-full justify-between">
                {/* Icon */}
                <div className="text-6xl mb-6">🚴</div>

                {/* Content */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Roll 4 Nature 2026
                  </h2>
                  <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Join our 4,463-mile cross-country bike journey from Key West to Grand Canyon, connecting with veterans in 42+ communities.
                  </p>
                  <div className="text-lg font-semibold text-green-600 group-hover:text-green-700 transition-colors">
                    → View Journey
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-6 text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  4,463 Miles • 107 Days
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
