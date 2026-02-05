'use client';

import { Users, Camera, Share2, Bike } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, FormEvent } from 'react';

export default function TeamBravoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const roles = [
    {
      icon: Users,
      title: 'Support Drivers',
      description:
        'Help transport our team and support vehicles across all 4,463 miles. Experience the journey from behind the wheel.',
      requirements: ['Valid driver license', 'Experience with pulling trailers', 'Comfortable with primitive camping'],
    },
    {
      icon: Camera,
      title: 'Camera Operators',
      description:
        'Document the journey through photos and video. Your storytelling will inspire thousands of supporters.',
      requirements: ['Photography and video experience', 'Your own equipment (a bonus)', 'Creative vision'],
    },
    {
      icon: Share2,
      title: 'Social Media Team',
      description:
        'Keep our community engaged with live updates, stories, and behind-the-scenes content across all platforms.',
      requirements: ['Social media expertise', 'Ability to work with live content', 'Colocation with ground crew not required'],
    },
    {
      icon: Bike,
      title: 'Segment Cyclists',
      description:
        'Ride with us for specific legs of the journey. Join for a day, a week, or the entire 4,463 miles!',
      requirements: ['Cycling fitness', 'Bike safety and nutrition knowledge', 'Team spirit'],
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      availability: formData.get('availability'),
      veteranStatus: formData.get('veteran'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/team-bravo', {
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
              src="/images/TeamBravoFlag.png"
              alt="Team Bravo Flag"
              width={500}
              height={250}
              className="mx-auto object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6">Join Team Bravo</h1>
          <p className="text-xl text-[#E8C9A1] mb-8">
            Be part of our support crew and make a difference in the lives of America's veterans
          </p>
          <p className="text-[#D4A574] text-lg leading-relaxed">
            Team Bravo is our support crew that keeps the Roll for Veterans moving. From drivers to photographers
            to cyclists, we need passionate people like you to help us connect with veterans across 24 cities.
          </p>
        </div>
      </div>

      {/* Roles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-gray-900 transition-colors">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          How You Can Help
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.title}
                className="bg-white dark:bg-gray-800 border-2 border-[#C1592B] rounded-lg p-8 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <IconComponent size={40} className="text-[#C1592B] mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{role.title}</h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{role.description}</p>

                <div className="bg-[#E8C9A1] dark:bg-gray-700 rounded p-4 mb-6">
                  <ul className="space-y-2">
                    {role.requirements.map((req) => (
                      <li key={req} className="flex items-start text-gray-700 dark:text-gray-200">
                        <span className="text-[#C1592B] font-bold mr-2">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Application Section */}
      <section className="bg-gradient-to-b from-[#E8C9A1] to-[#D4A574] dark:from-[#8B4513] dark:to-[#A0522D] py-20 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Ready to Join?
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                  />
                </div>

                {/* Email */}
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

                {/* Phone */}
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

                {/* Role Interest */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Role Interest *
                  </label>
                  <select name="role" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent">
                    <option value="">Select a role</option>
                    <option value="driver">Support Driver</option>
                    <option value="camera">Camera Operator</option>
                    <option value="social">Social Media Team</option>
                    <option value="cyclist">Segment Cyclist</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Availability */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Availability *
                  </label>
                  <select name="availability" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent">
                    <option value="">Select availability</option>
                    <option value="full">Full journey (Feb 27 - Jun 21)</option>
                    <option value="weeks">Several weeks</option>
                    <option value="days">Days or segments</option>
                    <option value="flexible">Flexible/TBD</option>
                  </select>
                </div>

                {/* Veteran Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Veteran Status
                  </label>
                  <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="veteran"
                        value="yes"
                        className="mr-2"
                      />
                      <span>Yes, I'm a veteran</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="veteran"
                        value="military-family"
                        className="mr-2"
                      />
                      <span>Military family member</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="veteran"
                        value="no"
                        className="mr-2"
                      />
                      <span>No, but I support the mission</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Why Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Why do you want to join? *
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us why you're passionate about this mission..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C1592B] hover:bg-[#E07B4F] text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-800 dark:text-green-200 font-semibold">
                    ✓ Application submitted successfully!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    We'll review your application and be in touch within 48 hours!
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4 text-center">
                  <p className="text-red-800 dark:text-red-200 font-semibold">
                    Failed to submit application
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Please try again or contact us directly at rollforveterans@gmail.com
                  </p>
                </div>
              )}

              {submitStatus === 'idle' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  We'll review your application and be in touch within 48 hours!
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900 transition-colors">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Common Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              q: 'Do I need cycling experience?',
              a: 'Only if you\'re interested in being a segment cyclist. Our support crew roles have different skill requirements, and we provide training as needed.',
            },
            {
              q: 'What about travel and accommodation?',
              a: 'We cover most travel expenses for core team members. We\'ll discuss specifics during the application review process.',
            },
            {
              q: 'Can I join for just a few days?',
              a: 'Absolutely! We have roles available for various time commitments, from single-day volunteers to full-journey team members.',
            },
            {
              q: 'When do applications close?',
              a: 'We\'re accepting applications throughout the ride. It\'s never too late to apply until we reach Flagstaff!',
            },
            {
              q: 'What\'s the Team RWB mission?',
              a: 'Team RWB empowers veterans through physical and social engagement. Find out more about Team RWB at the links at the bottom of the page.',
            },
          ].map((faq, i) => (
            <div key={i} className="bg-[#E8C9A1] dark:bg-gray-800 rounded-lg p-6 border border-[#C1592B]">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{faq.q}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#C1592B] to-[#8B4513] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Questions? Let's Talk!
          </h2>

          <p className="text-xl text-[#E8C9A1] mb-10">
            Email us or call to learn more about Team Bravo opportunities
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:rollforveterans@gmail.com"
              className="bg-white text-[#C1592B] px-8 py-3 rounded-lg font-bold hover:bg-[#E8C9A1] transition inline-block"
            >
              Email: rollforveterans@gmail.com
            </a>
            <a
              href="tel:8282804709"
              className="bg-[#E07B4F] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#D4A574] transition inline-block"
            >
              Call: (828) 280-4709
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
