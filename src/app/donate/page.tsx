import Link from 'next/link';

export const metadata = {
  title: 'Help Fuel the Mission | Roll for Veterans 2026',
  description:
    'Support JT and Roll for Veterans 2026 — donate via GoFundMe, PayPal, Venmo, or Cash App.',
};

const platforms = [
  {
    name: 'GoFundMe',
    url: 'https://gofund.me/fdff623ca',
    logo: '/images/donate/logo_gofundme.jpg',
    description: 'Our primary fundraising page — donate to support the ride directly.',
    buttonText: 'Donate on GoFundMe',
    buttonColor: '#02A95C',
  },
  {
    name: 'PayPal',
    url: 'https://www.paypal.me/roll4veterans',
    logo: '/images/donate/logo_paypal.jpg',
    description: 'Quick and secure payments via PayPal.',
    buttonText: 'Send via PayPal',
    buttonColor: '#003087',
  },
  {
    name: 'Venmo',
    url: 'https://www.venmo.com/u/roll4veterans',
    logo: '/images/donate/logo_venmo.jpg',
    description: 'Fast and easy payments via Venmo.',
    buttonText: 'Send via Venmo',
    buttonColor: '#008CFF',
  },
  {
    name: 'Cash App',
    url: 'https://cash.app/$roll4veterans',
    logo: '/images/donate/logo_cashapp.jpg',
    description: 'Instant transfers via Cash App.',
    buttonText: 'Send via Cash App',
    buttonColor: '#00D64F',
  },
];

export default function DonatePage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-r4v-primary dark:text-r4v-primary-hover hover:underline text-sm font-medium mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Help Fuel the Mission
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          Every dollar supports the mission — 4,463 miles from Key West to Flagstaff for veterans.
          Choose your preferred platform below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="h-12 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{platform.description}</p>
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded-lg font-bold text-white text-sm transition hover:opacity-90"
                style={{ backgroundColor: platform.buttonColor }}
              >
                {platform.buttonText}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-gray-400 dark:text-gray-500 text-center leading-relaxed">
          All donations received are used to fund the Roll4Veterans 2026 expedition expenses and
          growth of Roll4Veterans. Donations to Team RWB can be made using the Donate to Team RWB
          link at the bottom of the website.
        </p>
      </div>
    </div>
  );
}
