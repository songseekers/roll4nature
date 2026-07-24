import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might be a city that's not on our route yet!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-r4n-primary hover:bg-r4n-primary-hover text-r4n-tan font-bold py-3 px-6 rounded-lg transition inline-block"
          >
            Back to Home
          </Link>
          <a
            href="/resources/R4V_story_v2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg transition inline-block"
          >
            Our Story
          </a>
        </div>

        <div className="mt-12">
          <p className="text-gray-600 mb-4">
            Looking for a specific city? Try the interactive map:
          </p>
          <Link
            href="/#map"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Open Interactive Map
          </Link>
        </div>
      </div>
    </div>
  );
}
