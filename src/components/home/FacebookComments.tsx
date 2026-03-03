'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: () => void };
    };
    fbAsyncInit?: () => void;
  }
}

export default function FacebookComments() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
      return;
    }

    window.fbAsyncInit = function () {
      window.FB?.XFBML.parse();
    };

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          Join the Conversation
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-10">
          Follow along and share your support on Facebook
        </p>
        <div id="fb-root" />
        <div
          className="fb-comments"
          data-href="https://r4v.songseekers.org"
          data-width="100%"
          data-numposts="10"
        />
      </div>
    </section>
  );
}
