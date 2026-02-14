'use client';

export default function HubHero() {
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Branding */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Songseekers
          </h1>
          <p className="text-xl text-blue-600 font-semibold">Purpose in Motion</p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
            "Too many dwell in silent despair—their true purpose unrealized,{' '}
            <span className="font-bold text-blue-700">songs yet unsung!</span>"
          </p>
          <p className="text-base text-gray-600 mt-4">
            Choose your path: Discover your purpose, or join us on a journey that changes lives.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 bg-white rounded-lg p-6 shadow-sm max-w-md mx-auto">
          <div>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs text-gray-600">Dimensions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">4,463</div>
            <div className="text-xs text-gray-600">Miles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">80+</div>
            <div className="text-xs text-gray-600">Communities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
