'use client';

import { Users, Camera, Share2, Bike, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState, FormEvent } from 'react';

export default function TeamBravoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Auto-format phone number
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 10) return value;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      const formatted = formatPhoneNumber(target.value);
      target.value = formatted;
    }
  };

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
      requirements: ['Photography and video experience', 'Your own equipment a bonus', 'Creative vision'],
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

    // Save form reference before async operation
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: formData.get('role'),
      availability: formData.get('availability'),
      comments: formData.get('comments'),
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
        form.reset();
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
            Be part of our support crew and make a difference in the lives of America&apos;s veterans
          </p>
          <p className="text-[#D4A574] text-lg leading-relaxed mb-8">
            Team Bravo is our support crew that keeps the Roll for Veterans moving. From drivers to photographers
            to cyclists, we need passionate people like you to help us connect with veterans across 42+ communities.
          </p>
          <a
            href="https://youtube.com/@roll4veterans"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#C1592B] px-10 py-3 rounded-lg font-bold hover:bg-[#E8C9A1] transition text-lg whitespace-nowrap"
          >
            <ExternalLink size={20} />
            Roll4Veterans YouTube Channel
          </a>
        </div>
      </div>

      {/* Team Bravo Ground Crew Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Team Bravo Ground Crew
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* JT - Active Profile */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedMember('jt')}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full"
              >
                <div className="relative h-40">
                  <Image
                    src="/images/TeamBravo/JT.PNG"
                    alt="JT, Roll for Veterans team member and endurance cyclist"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">JT</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click to learn more</p>
                </div>
              </div>
            </div>

            {/* Placeholder Team Members */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg opacity-75 w-full">
                  <div className="relative h-40">
                    <Image
                      src="/images/TeamBravo/sil.png"
                      alt="Team member profile coming soon"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Team Member</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Coming Soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Bravo Air Support Section */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Team Bravo Air Support
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Janelle - Active Profile */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedMember('janelle')}
                className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full border border-gray-200 dark:border-gray-600"
              >
                <div className="relative h-40">
                  <Image
                    src="/images/TeamBravo/JDR.png"
                    alt="Janelle, Team Bravo Air Support crew member"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Janelle</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click to learn more</p>
                </div>
              </div>
            </div>

            {/* Placeholder Air Support Members */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg opacity-75 w-full border border-gray-200 dark:border-gray-600">
                  <div className="relative h-40">
                    <Image
                      src="/images/TeamBravo/sil.png"
                      alt="Team member profile coming soon"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Team Member</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Coming Soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JT Profile Modal */}
      {selectedMember === 'jt' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">JT</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Endurance Cyclist &bull; Coach &bull; Builder &bull; Fixer &bull; Contemplator &bull; Friend
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              <div className="mb-6">
                <Image
                  src="/images/TeamBravo/JT.PNG"
                  alt="JT, Roll for Veterans team member"
                  width={300}
                  height={200}
                  className="w-1/2 h-auto rounded-lg mx-auto"
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Somewhere between the mountains of Utah where I was born, the valleys of Idaho where I grew up, and the California Inland Empire where I came of age, I learned to see the world as a place worth exploring, restoring, and cherishing. As one of seven children, I discovered early the value of connection, resilience, and showing up for others. Yet for much of my life, I struggled to be fully authentic or vulnerable, uncertain of who I truly was, why I was here, or what I was meant to contribute.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Today, I carry those lessons—and that hard-earned awareness—into everything I do. I am a handyman who restores what&apos;s broken, a health coach who nurtures growth, an inspirational thinker who sparks reflection, and an aspiring podcaster who listens deeply. I build not just with tools, but with words, ideas, and relationships, striving always to show up fully, honestly, and with heart.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Life&apos;s journey has carried me around the world, yet not until 3 January 2023 did my internal compass begin to learn how to function. Now, it aligns with my eternal purpose, guiding me to live deliberately, embrace authenticity, and serve others with integrity. Everything I create—whether in wood, thought, or heart—is my way of honoring the journey that brought me here, navigating the questions of purpose, and leaving a spark of light for those still seeking their own path.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>If anything on this website resonates with you, I invite you to reach out to me.</strong>
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Too many dwell in silent despair; their true purpose unrealized, songs yet unsung. Let&apos;s sing a duet!
                </p>

                <div className="flex justify-center">
                  <a
                    href="mailto:jt.songseeker@gmail.com"
                    className="inline-flex items-center gap-2 bg-[#C1592B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#E07B4F] transition"
                    aria-label="Email JT at jt.songseeker@gmail.com"
                  >
                    <Mail size={20} />
                    Email JT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Janelle Profile Modal */}
      {selectedMember === 'janelle' && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Janelle</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Air Support &bull; Coordinator &bull; Seamstress &bull; Artist &bull; Poet
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              <div className="mb-6">
                <Image
                  src="/images/TeamBravo/JDR.png"
                  alt="Janelle, Team Bravo Air Support crew member"
                  width={300}
                  height={200}
                  className="w-1/2 h-auto rounded-lg mx-auto"
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Her Role on Team Bravo</h3>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Janelle is a vital member of Team Bravo&apos;s Air Support crew, keeping the mission running smoothly behind the scenes. She handles phone outreach, manages correspondence, coordinates team activities, sets schedules, and contributes to mission planning — the kind of steady, reliable work that makes everything else possible.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Janelle</h3>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Creativity has always been a part of Janelle&apos;s life, whether through sewing, drawing, or simply noticing the beauty woven into everyday moments. As a seamstress, she loves forming fabric with care and detail, and as an artist, she is inspired by color, texture, and the joy of learning new ways to express ideas. For her, creativity isn&apos;t only about making things — it&apos;s also about the learning, order, and delight in the process. Boogalie Bear was born in her fabric laboratory in 2023.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Beyond her work with fabric, Janelle enjoys writing poetry, exploring watercolor and colored pencil, and listening to music that stirs the heart. Her faith and family shape who she is and keep her grounded in compassion and purpose. Being part of Team Bravo is meaningful to her because it offers a place where creators can share, encourage one another, and discover the joy that comes when imagination and community meet.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                        <span className="text-[#C1592B] font-bold mr-2">&#10003;</span>
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
                    onBlur={handlePhoneInput}
                    onKeyDown={handlePhoneKeyDown}
                    title="Enter 10 digits - will be auto-formatted"
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

                {/* Comments */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    name="comments"
                    placeholder="Any additional information you'd like to share..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                  />
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
                      <span>Yes, I&apos;m a veteran</span>
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
                  Why do you want to join Team Bravo? *
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us why you're passionate about this mission..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-[#C1592B] focus:border-transparent"
                />
              </div>

              {/* SMS Consent Checkbox */}
              <div className="flex justify-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4 max-w-2xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sms_consent"
                      required
                      className="mt-1 w-4 h-4 text-[#C1592B] border-gray-300 rounded focus:ring-[#C1592B] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      I consent to receive a follow-up SMS message from Roll for Veterans at the number provided to discuss potential involvement. Message and data rates may apply.
                    </span>
                  </label>
                </div>
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
                    &#10003; Application submitted successfully!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    We&apos;ll review your application and be in touch within 48 hours!
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
                  We&apos;ll review your application and be in touch within 48 hours!
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
              a: "Only if you're interested in being a segment cyclist. Our support crew roles have different skill requirements, and we provide training as needed.",
            },
            {
              q: 'What about travel and accommodation?',
              a: "We cover most travel expenses for core team members. We'll discuss specifics during the application review process.",
            },
            {
              q: 'Can I join for just a few days?',
              a: 'Absolutely! We have roles available for various time commitments, from single-day volunteers to full-journey team members.',
            },
            {
              q: 'When do applications close?',
              a: "We're accepting applications throughout the ride. It's never too late to apply until we reach Flagstaff!",
            },
            {
              q: "What's the Team RWB mission?",
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
            Questions? Let&apos;s Talk!
          </h2>

          <p className="text-xl text-[#E8C9A1] mb-10 max-w-2xl mx-auto leading-relaxed">
            Email or call us to talk more about Team Bravo opportunities using the links under Connect With Us below. We look forward to hearing from you!
          </p>
        </div>
      </section>
    </div>
  );
}
