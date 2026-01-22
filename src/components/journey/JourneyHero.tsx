'use client';

import CountdownTimer from '@/components/home/CountdownTimer';

export default function JourneyHero() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Roll for Veterans 2026
        </h1>

        <p className="text-2xl md:text-3xl text-blue-700 font-bold mb-6">
          4,434 Miles of Purpose in Motion
        </p>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
          Join us on an epic cross-country bike journey from Key West, Florida to the Grand Canyon, Arizona,
          supporting Team RWB and connecting with veterans in every community along the way.
        </p>

        {/* Key Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm max-w-md mx-auto mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">4,434</div>
              <div className="text-xs text-gray-600">Miles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">107</div>
              <div className="text-xs text-gray-600">Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">80+</div>
              <div className="text-xs text-gray-600">Cities</div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 text-xs text-gray-600">
            <p><span className="font-semibold">Feb 27 - Jun 13, 2026</span></p>
            <p>Key West, FL → Grand Canyon, AZ</p>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <CountdownTimer />
      </div>
    </div>
  );
}
