import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Roll for Veterans 2026',
  description: 'Terms of service for Roll for Veterans 2026 website.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white dark:bg-gray-900 pt-24 pb-16 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C1592B] to-[#8B4513] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-gray-200">Last Updated: February 14, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              By accessing and using this website, you agree to be bound by these Terms of Service. This site is operated by JT Tracy on behalf of Roll for Veterans 2026.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you do not agree to these terms, please do not use this site.
            </p>
          </section>

          {/* 2. Use of This Site */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              2. Use of This Site
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>This site is for informational purposes and to facilitate Team RWB support</li>
              <li>You agree not to misuse the site or submit false information through our forms</li>
              <li>You must be 13 or older to use this site</li>
            </ul>
          </section>

          {/* 3. Form Submissions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              3. Form Submissions
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>By submitting a form, you confirm that the information provided is accurate</li>
              <li>SMS consent is voluntary and can be withdrawn at any time by replying STOP</li>
              <li>We reserve the right to decline any sponsorship inquiry or team application</li>
            </ul>
          </section>

          {/* 4. Charitable Contributions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              4. Charitable Contributions
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>All donations go directly to Team RWB via their official donation platform</li>
              <li>Roll for Veterans 2026 does not directly handle or process donations</li>
              <li>For donation questions, please contact Team RWB directly</li>
            </ul>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              5. Intellectual Property
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Site content, logos, and branding are property of Roll for Veterans 2026</li>
              <li>Team RWB logo and branding are property of Team Red, White & Blue</li>
              <li>Do not reproduce site content or branding without written permission</li>
            </ul>
          </section>

          {/* 6. Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              6. Disclaimer
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>This site is provided as-is without warranties of any kind</li>
              <li>We make no guarantees about site availability or accuracy of content</li>
              <li>Route and schedule information is subject to change without notice</li>
            </ul>
          </section>

          {/* 7. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Roll for Veterans 2026 and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on any information provided herein.
            </p>
          </section>

          {/* 8. Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              8. Governing Law
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These terms are governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* 9. Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-[#C1592B] pb-2">
              9. Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
              If you have any questions about these terms, please contact us:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>
                Email:{' '}
                <a href="mailto:rollforveterans@gmail.com" className="text-[#C1592B] hover:underline font-semibold">
                  rollforveterans@gmail.com
                </a>
              </li>
              <li>
                Website:{' '}
                <a href="https://r4v.songseekers.org" className="text-[#C1592B] hover:underline font-semibold">
                  r4v.songseekers.org
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-[#C1592B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#E07B4F] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
