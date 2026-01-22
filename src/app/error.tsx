'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">⚠️</h1>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h2>

        <p className="text-lg text-gray-600 mb-4">
          We encountered an unexpected error. Try refreshing the page or returning home.
        </p>

        {error.message && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-6 text-left">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition inline-block"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg transition inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
