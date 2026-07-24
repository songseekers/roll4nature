import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Privacy Policy | Roll 4 Nature 2026',
  description: 'Privacy policy for Roll 4 Nature 2026 — how we collect, use, and protect your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white dark:bg-gray-950 pt-24 pb-16 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-r4n-primary to-r4n-secondary text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-200">Last Updated: February 14, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Roll 4 Nature 2026 is operated by JT Tracy. This privacy policy explains how we collect, use, and protect your information when you visit our website and use our services.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have questions about this policy, please contact us at{' '}
              <a href="mailto:rollforveterans@gmail.com" className="text-r4n-primary hover:underline font-semibold">
                rollforveterans@gmail.com
              </a>.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We may collect the following information when you voluntarily submit it through our forms:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Phone number (optional)</li>
              <li>SMS consent status</li>
              <li>Form submission data (sponsor inquiries, team applications)</li>
              <li>Basic analytics data via Vercel Analytics (anonymous, no personal identifiers)</li>
            </ul>
          </section>

          {/* 3. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>To respond to sponsor and team inquiries</li>
              <li>To send a single SMS notification if you have provided consent</li>
              <li>We do not sell or share your information with third parties</li>
              <li>We do not use your information for marketing without explicit consent</li>
            </ul>
          </section>

          {/* 4. SMS Communications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              4. SMS Communications
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>SMS messages are only sent with your explicit consent</li>
              <li>You may opt out at any time by replying <strong>STOP</strong></li>
              <li>Message and data rates may apply</li>
              <li>
                For help, reply <strong>HELP</strong> or contact{' '}
                <a href="mailto:rollforveterans@gmail.com" className="text-r4n-primary hover:underline font-semibold">
                  rollforveterans@gmail.com
                </a>
              </li>
            </ul>
          </section>

          {/* 5. Data Storage and Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              5. Data Storage and Security
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Form submissions are stored securely</li>
              <li>We use industry-standard security practices to protect your data</li>
              <li>We retain data only as long as necessary to fulfill the purposes described in this policy</li>
            </ul>
          </section>

          {/* 6. Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              6. Your Rights
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                You may request deletion of your data at any time by emailing{' '}
                <a href="mailto:rollforveterans@gmail.com" className="text-r4n-primary hover:underline font-semibold">
                  rollforveterans@gmail.com
                </a>
              </li>
              <li>You may request a copy of your data</li>
            </ul>
          </section>

          {/* 7. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              7. Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this policy from time to time. When we do, we will note the date of the last update at the top of this page. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 8. Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              8. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
              If you have any questions or concerns about this privacy policy, please contact us:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                Email:{' '}
                <a href="mailto:rollforveterans@gmail.com" className="text-r4n-primary hover:underline font-semibold">
                  rollforveterans@gmail.com
                </a>
              </li>
              <li>
                Website:{' '}
                <a href="https://r4v.songseekers.org" className="text-r4n-primary hover:underline font-semibold">
                  r4v.songseekers.org
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Button variant="primary" size="md" href="/">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
