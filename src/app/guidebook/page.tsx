import GuidebookHero from '@/components/guidebook/GuidebookHero';
import DimensionsGrid from '@/components/guidebook/DimensionsGrid';
import PurposeFlower from '@/components/home/PurposeFlower';
import Link from 'next/link';

export const metadata = {
  title: 'Purpose Pathfinder Guidebook | Songseekers',
  description: 'Explore the 8-petal framework for whole-person health across Physical, Mental, Emotional, and Lifestyle domains.',
};

export default function GuidebookPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <GuidebookHero />

      {/* Interactive Purpose Flower */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore the 8 Petals
            </h2>
            <p className="text-lg text-gray-600">
              Click on any petal to discover what each dimension means and how it contributes to your whole-person health.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <PurposeFlower interactive={true} size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions Grid */}
      <DimensionsGrid />

      {/* Download CTA Section */}
      <section className="bg-gradient-to-r from-r4n-primary to-r4n-primary-hover text-r4n-tan py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore Deeper?
          </h2>

          <p className="text-lg text-r4n-tan mb-10 max-w-2xl mx-auto">
            Download the full Purpose Pathfinder Guidebook to access worksheets, exercises, and deeper insights into each dimension.
          </p>

          <a
            href="https://songseekers.org/guidebook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-r4n-grass px-10 py-3 rounded-lg font-bold hover:bg-r4n-tan-light transition text-lg"
          >
            Download Full Guidebook
          </a>
        </div>
      </section>

      {/* Connection to Journey Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center border-t border-gray-200 pt-16">
          <p className="text-gray-600 mb-4">
            Want to see these principles in action?
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Living Purpose on Roll 4 Nature 2026
          </h3>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our 4,463-mile cross-country bike journey embodies all 8 dimensions of purpose as we connect with veterans in 42+ communities.
          </p>

          <Link
            href="/roll-for-veterans"
            className="inline-block bg-r4n-primary text-r4n-tan px-8 py-3 rounded-lg font-bold hover:bg-r4n-primary-hover transition"
          >
            Explore the Journey →
          </Link>
        </div>
      </section>
    </div>
  );
}
