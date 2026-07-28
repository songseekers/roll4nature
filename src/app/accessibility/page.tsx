import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Roll 4 Nature 2026',
  description: 'Accessibility statement for Roll 4 Nature 2026 — our commitment to making this site usable for everyone.',
};

export default function AccessibilityPage() {
  return (
    <div className="bg-white dark:bg-gray-950 pt-24 pb-16 transition-colors">
      {/* Header */}
      <div style={{ backgroundColor: '#2a1a08' }} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2 text-r4n-grass">Accessibility Statement</h1>
          <p className="text-r4n-tan">Last Updated: February 16, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {/* 1. Our Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              1. Our Commitment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Roll 4 Nature is committed to ensuring digital accessibility for people of all abilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We believe the web should be accessible to all, and we strive to make our site welcoming and usable for every visitor, including veterans and their families.
            </p>
          </section>

          {/* 2. Standards We Follow */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              2. Standards We Follow
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible for people with disabilities.
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Perceivable — information and interface components are presentable in ways users can perceive</li>
              <li>Operable — interface components and navigation are operable by all users</li>
              <li>Understandable — information and operation of the interface are understandable</li>
              <li>Robust — content is robust enough to be interpreted by a wide variety of user agents and assistive technologies</li>
            </ul>
          </section>

          {/* 3. Accessibility Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              3. Accessibility Features
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              This site includes the following accessibility features:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Semantic HTML for clear document structure and navigation</li>
              <li>Descriptive alt text for all meaningful images</li>
              <li>Sufficient color contrast ratios throughout the site</li>
              <li>Dark mode support for users who prefer reduced brightness</li>
              <li>Responsive design that works on all device sizes</li>
              <li>Keyboard-navigable interactive elements</li>
              <li>ARIA labels on icon-only buttons and controls</li>
            </ul>
          </section>

          {/* 4. Known Limitations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              4. Known Limitations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              While we strive for full accessibility, some areas of the site may have limitations:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>The interactive route map relies on Mapbox GL and may have limited screen reader support</li>
              <li>Some third-party content (embedded videos, external donation pages) may not fully meet accessibility standards</li>
              <li>PDF documents linked from this site may not be fully accessible</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              We provide alternative ways to access route information, including a fully accessible{' '}
              <a href="/route-list" className="text-r4n-primary hover:underline font-semibold">
                Route Schedule
              </a>{' '}
              page as a text-based alternative to the interactive map.
            </p>
          </section>

          {/* 5. Assistive Technology Compatibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              5. Assistive Technology Compatibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              This site is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
              <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>

          {/* 6. Feedback */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              6. Feedback
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              We welcome your feedback on the accessibility of this site. If you encounter any barriers or have suggestions for improvement, please let us know:
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
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
              We aim to respond to accessibility feedback within 5 business days.
            </p>
          </section>

          {/* 7. Continuous Improvement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-r4n-primary pb-2">
              7. Continuous Improvement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We view accessibility as an ongoing effort, not a one-time task. We regularly review our site for accessibility issues, test with assistive technologies, and update our practices as standards evolve. Our goal is to ensure that every visitor—regardless of ability—can access and engage with our mission to support America&apos;s veterans.
            </p>
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
