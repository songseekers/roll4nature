import Image from 'next/image';
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
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/GoFundMe_logo.svg/320px-GoFundMe_logo.svg.png',
    description: 'Our primary fundraising page — donate to support the ride directly.',
    buttonText: 'Donate on GoFundMe',
    buttonColor: '#02A95C',
  },
  {
    name: 'PayPal',
    url: 'https://www.paypal.me/roll4veterans',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/320px-PayPal.svg.png',
    description: 'Quick and secure payments via PayPal.',
    buttonText: 'Send via PayPal',
    buttonColor: '#003087',
  },
  {
    name: 'Venmo',
    url: 'https://www.venmo.com/u/roll4veterans',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Venmo_Logo.svg/320px-Venmo_Logo.svg.png',
    description: 'Fast and easy payments via Venmo.',
    buttonText: 'Send via Venmo',
    buttonColor: '#008CFF',
  },
  {
    name: 'Cash App',
    url: 'https://cash.app/$roll4veterans',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/240px-Square_Cash_app_logo.svg.png',
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
          Every dollar supports JT on The Path — 4,463 miles from Key West to Flagstaff for Team
          RWB veterans. Choose your preferred platform below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex flex-col items-center text-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
            >
              <div className="h-12 flex items-center justify-center">
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width={120}
                  height={40}
                  className="object-contain h-10 w-auto"
                  unoptimized
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
          All donations are received by JT directly and used to fund the Roll for Veterans 2026
          expedition. Donations to Team RWB can be made at{' '}
          <a
            href="https://teamrwb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 dark:hover:text-gray-400"
          >
            teamrwb.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}
