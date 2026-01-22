import { Users, Camera, Share2, Bike } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Join Team Bravo | Roll for Veterans 2026',
  description:
    'Be part of our support crew! We need drivers, photographers, social media experts, and segment cyclists for the Roll for Veterans journey.',
};

export default function TeamBravoPage() {
  const roles = [
    {
      icon: Users,
      title: 'Support Drivers',
      description:
        'Help transport our team and support vehicles across all 4,434 miles. Experience the journey from behind the wheel.',
      requirements: ['Valid driver license', 'Available for extended periods', 'Reliable vehicle or transportation'],
    },
    {
      icon: Camera,
      title: 'Camera Operators',
      description:
        'Document the journey through photos and video. Your storytelling will inspire thousands of supporters.',
      requirements: ['Photography or video experience', 'Your own equipment', 'Creative vision'],
    },
    {
      icon: Share2,
      title: 'Social Media Team',
      description:
        'Keep our community engaged with live updates, stories, and behind-the-scenes content across all platforms.',
      requirements: ['Social media expertise', 'Strong writing skills', 'Ability to work with live content'],
    },
    {
      icon: Bike,
      title: 'Segment Cyclists',
      description:
        'Ride with us for specific legs of the journey. Join for a day, a week, or the entire 4,434 miles!',
      requirements: ['Cycling fitness', 'Bike maintenance knowledge', 'Team spirit'],
    },
  ];

  return (
    <div className="bg-white pt-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Join Team Bravo</h1>
          <p className="text-xl text-green-100 mb-8">
            Be part of our support crew and make a difference in the lives of America's veterans
          </p>
          <p className="text-green-50 text-lg leading-relaxed">
            Team Bravo is our support crew that keeps the Roll for Veterans moving. From drivers to photographers
            to cyclists, we need passionate people like you to help us connect with veterans across 80+ cities.
          </p>
        </div>
      </div>

      {/* Roles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          How You Can Help
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.title}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <IconComponent size={40} className="text-green-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">{role.description}</p>

                <div className="bg-gray-50 rounded p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {role.requirements.map((req) => (
                      <li key={req} className="flex items-start text-gray-700">
                        <span className="text-green-600 font-bold mr-2">✓</span>
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
      <section className="bg-green-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Ready to Join?
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(123) 456-7890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Role Interest */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role Interest *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability *
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select availability</option>
                    <option value="full">Full journey (Feb 27 - Jun 13)</option>
                    <option value="weeks">Several weeks</option>
                    <option value="days">Days or segments</option>
                    <option value="flexible">Flexible/TBD</option>
                  </select>
                </div>

                {/* Veteran Status */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Veteran Status
                  </label>
                  <div className="space-y-2">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to join? *
                </label>
                <textarea
                  required
                  placeholder="Tell us why you're passionate about this mission..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
              >
                Submit Application
              </button>

              <p className="text-sm text-gray-600 text-center">
                We'll review your application and be in touch within 48 hours!
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
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
              a: 'We\'re accepting applications on a rolling basis through February 1, 2026. Earlier applications get priority.',
            },
            {
              q: 'What\'s the Team RWB mission?',
              a: 'Team RWB empowers veterans through physical and social engagement. We believe in connecting veterans with community and supporting their wellbeing.',
            },
          ].map((faq, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Questions? Let's Talk!
          </h2>

          <p className="text-xl text-green-100 mb-10">
            Email us or call to learn more about Team Bravo opportunities
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:teambravo@songseekers.org"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition inline-block"
            >
              Email: teambravo@songseekers.org
            </a>
            <a
              href="tel:8282804709"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-400 transition inline-block"
            >
              Call: (828) 280-4709
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
