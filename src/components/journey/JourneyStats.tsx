'use client';

export default function JourneyStats() {
  const stats = [
    {
      value: '4,434',
      label: 'Miles',
      description: 'Across continental USA',
    },
    {
      value: '107',
      label: 'Days',
      description: 'Feb 27 - Jun 13, 2026',
    },
    {
      value: '80+',
      label: 'Cities',
      description: 'Communities visited',
    },
    {
      value: '~41',
      label: 'Miles/Day',
      description: 'Average daily distance',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          By the Numbers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
