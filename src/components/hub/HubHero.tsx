'use client';

export default function HubHero() {
  return (
    <div className="relative bg-gradient-to-b from-r4n-primary to-r4n-primary-hover py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Branding */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-r4n-grass mb-2">
            Songseekers
          </h1>
          <p className="text-xl text-r4n-grass font-semibold">Purpose in Motion</p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg md:text-xl text-r4n-grass-light italic leading-relaxed">
            "Too many dwell in silent despair—their true purpose unrealized,{' '}
            <span className="font-bold text-r4n-grass">songs yet unsung!</span>"
          </p>
          <p className="text-base text-r4n-grass-light mt-4">
            Choose your path: Discover your purpose, or join us on a journey that changes lives.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 bg-white rounded-lg p-6 shadow-sm max-w-md mx-auto">
          <div>
            <div className="text-2xl font-bold text-r4n-grass">8</div>
            <div className="text-xs text-gray-600">Dimensions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-r4n-grass">4,463</div>
            <div className="text-xs text-gray-600">Miles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-r4n-grass">80+</div>
            <div className="text-xs text-gray-600">Communities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
