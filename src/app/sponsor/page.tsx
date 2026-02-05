'use client';

import { Building2, DollarSign, Fuel, UtensilsCrossed, ExternalLink, MapPin, Phone as PhoneIcon, Globe } from 'lucide-react';
import Image from 'next/image';
import { useState, FormEvent } from 'react';

export default function SponsorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedSponsor, setSelectedSponsor] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      bestTime: formData.get('bestTime'),
      sponsorshipInterest: formData.get('sponsorshipInterest'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        e.currentTarget.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#C1592B] to-[#8B4513] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/images/R4VLogo.png"
              alt="Roll for Veterans Logo"
              width={200}
              height={200}
              className="mx-auto object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6">Become a Sponsor</h1>
          <p className="text-xl text-[#E8C9A1] mb-8">
            Help us roll across America in support of our nation's veterans
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="bg-gradient-to-br from-[#E8C9A1] to-[#D4A574] dark:from-[#8B4513] dark:to-[#A0522D] rounded-lg p-8 border-2 border-[#C1592B] mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Support the Mission
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Roll for Veterans is a fundraising journey to raise awareness and support for Team Red, White & Blue,
            a nonprofit organization dedicated to enriching the lives of America's veterans through physical and
            social engagement. Every dollar donated goes directly to Team RWB's mission.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            Beyond supporting Team RWB, the operation of this 4,463-mile journey requires significant resources.
            From fuel for support vehicles to food for our cycling team, from bike maintenance to primitive camping
            gear—these operational costs add up quickly.
          </p>
          <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
            <span className="font-semibold text-gray-900 dark:text-white">
              If you're interested in sponsoring Roll for Veterans directly,
            </span>{' '}
            we would be grateful for your support. Whether it's fuel, food, equipment, or financial assistance
            for operational expenses, every contribution helps us focus on what matters most: connecting with
            veterans and strengthening communities across America.
          </p>
        </div>

        {/* Support Types */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          How You Can Help
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 border-2 border-[#C1592B] rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Fuel size={32} className="text-[#C1592B] mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fuel Support</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Help keep our support vehicles moving across 4,463 miles of American roads.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-[#C1592B] rounded-lg p-6">
            <div className="flex items-center mb-3">
              <UtensilsCrossed size={32} className="text-[#C1592B] mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Food & Supplies</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Support our team with meals and essential supplies throughout the journey.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-[#C1592B] rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Building2 size={32} className="text-[#C1592B] mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Lodging & Equipment</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Assist with accommodations, bike maintenance, and gear for the ride.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-[#C1592B] rounded-lg p-6">
            <div className="flex items-center mb-3">
              <DollarSign size={32} className="text-[#C1592B] mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">General Operations</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Flexible support for unexpected costs and operational expenses along the way.</p>
          </div>
        </div>
      </section>

      {/* Sponsors Display Section */}
      <section id="sponsors" className="bg-gray-50 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Thank You to Our Sponsors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* 10BitWorks Sponsor */}
            <div
              onClick={() => setSelectedSponsor('10bitworks')}
              className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="relative h-32 mb-4">
                <Image
                  src="/images/10bitworks.png"
                  alt="10BitWorks Makerspace logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                10BitWorks Makerspace
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
                Click to learn more
              </p>
            </div>

            {/* Placeholder for future sponsors - can be easily added */}
          </div>
        </div>
      </section>

      {/* 10BitWorks Sponsor Modal */}
      {selectedSponsor === '10bitworks' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSponsor(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">10BitWorks Makerspace</h2>
                <button
                  onClick={() => setSelectedSponsor(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <Image
                  src="/images/10bitworks.png"
                  alt="10BitWorks Makerspace logo"
                  width={400}
                  height={200}
                  className="w-full h-auto max-h-40 object-contain"
                />
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#C1592B] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Location:</p>
                    <p className="text-gray-700 dark:text-gray-300">San Antonio, Texas</p>
                    <p className="text-gray-700 dark:text-gray-300">130 W. LaChapelle St, San Antonio, TX 78204</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneIcon size={20} className="text-[#C1592B] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone:</p>
                    <a href="tel:2105470221" className="text-[#C1592B] hover:underline">(210) 547-0221</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe size={20} className="text-[#C1592B] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Website:</p>
                    <a
                      href="https://10bitworks.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C1592B] hover:underline"
                    >
                      10bitworks.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  10BitWorks is a 501(c)(3) nonprofit makerspace and San Antonio's most comprehensive hands-on workshop. Founded in 2010, they empower innovators, technologists, and creatives to bring their ideas to life through access to professional-grade tools, dedicated workspace, and a supportive community. From woodworking and metalworking to electronics, laser cutting, and textiles - 10BitWorks provides the resources and expertise for makers of all skill levels to learn, create, and grow.
                </p>
              </div>

              <div className="flex justify-center">
                <a
                  href="https://10bitworks.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#C1592B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#E07B4F] transition"
                >
                  <ExternalLink size={20} />
                  Visit 10BitWorks
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      <section className="bg-gradient-to-b from-[#E8C9A1] to-[#D4A574] dark:from-[#8B4513] dark:to-[#A0522D] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-200 mb-12 text-lg">
            Interested in sponsoring? Fill out the form below and we'll be in touch to discuss how we can work together.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Full Name / Organization *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Your name or company name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Best Time to Contact *
                  </label>
                  <select
                    name="bestTime"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (8am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 5pm)</option>
                    <option value="evening">Evening (5pm - 8pm)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Type of Sponsorship Interest *
                  </label>
                  <select
                    name="sponsorshipInterest"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                  >
                    <option value="">Select sponsorship type</option>
                    <option value="fuel">Fuel Support</option>
                    <option value="food">Food & Supplies</option>
                    <option value="lodging">Lodging & Equipment</option>
                    <option value="financial">General Financial Support</option>
                    <option value="in-kind">In-Kind Donation</option>
                    <option value="other">Other / Multiple Areas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us more about your sponsorship interests or questions..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C1592B] hover:bg-[#E07B4F] text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-800 dark:text-green-200 font-semibold">
                    ✓ Thank you for your interest!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    We'll be in touch within 24 hours to discuss sponsorship opportunities.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4 text-center">
                  <p className="text-red-800 dark:text-red-200 font-semibold">
                    Failed to submit inquiry
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Please try again or contact us directly at rollforveterans@gmail.com
                  </p>
                </div>
              )}

              {submitStatus === 'idle' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  We'll be in touch within 24 hours to discuss how we can work together.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#C1592B] to-[#8B4513] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Questions About Sponsorship?
          </h2>

          <p className="text-xl text-[#E8C9A1]">
            Reach out any time to discuss how your support can make a difference by using the Connect With Us buttons below. We look forward to hearing from you!
          </p>
        </div>
      </section>
    </div>
  );
}
