'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import { Laptop, MapPin, Download, Mic } from 'lucide-react';

// ─── Zone Definitions ──────────────────────────────────────────

const zones = [
  {
    id: 'purpose',
    label: 'Purpose (Spiritual)',
    top: '42%', left: '42%', width: '16%', height: '16%',
    definition: 'Purpose is your spiritual center — a foundation, a connection, and a sacred work all at once. As foundation, it grounds your daily choices and attitudes. As connection, it links you to something larger than yourself. As sacred work, it is the ongoing practice of aligning your life with your deepest values and evolving callings.',
  },
  {
    id: 'physical',
    label: 'Physical (Body)',
    top: '18%', left: '36%', width: '28%', height: '18%',
    definition: 'The practice of caring for your embodied self — the conscious stewardship of the body that carries you through life. It includes how you nourish yourself with intention, how you move with strength and purpose, and how you allow for rest and recovery.',
  },
  {
    id: 'mental',
    label: 'Mental (Mind)',
    top: '36%', left: '8%', width: '20%', height: '28%',
    definition: 'The framework of your understanding — the way you focus, interpret, and expand your awareness to make sense of yourself and the world. It encompasses both clarity to cut through confusion and perspective to see larger patterns.',
  },
  {
    id: 'emotional',
    label: 'Emotional (Heart)',
    top: '36%', left: '72%', width: '20%', height: '28%',
    definition: 'The realm of inner truth and connection — where you learn to live in alignment with your authentic feelings while cultivating bonds of trust, care, and understanding with others.',
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle (World)',
    top: '64%', left: '36%', width: '28%', height: '18%',
    definition: 'The conscious design of your daily life — the way you shape spaces, steward resources, and create rhythms that either nourish or deplete your well-being.',
  },
  {
    id: 'vitality',
    label: 'Vitality',
    top: '4%', left: '22%', width: '20%', height: '12%',
    definition: 'The embodied energy that animates your life — the living current that allows your body to move with strength, recover with grace, and sustain what matters most to you. The harmony between exertion and restoration.',
  },
  {
    id: 'nourishment',
    label: 'Nourishment',
    top: '4%', left: '58%', width: '22%', height: '12%',
    definition: 'The life-giving practice of feeding your body with intention and care. It encompasses the balance of your food choices, the rhythm of your hydration, and the mindful attention you bring to each meal.',
  },
  {
    id: 'perspective',
    label: 'Perspective',
    top: '28%', left: '0%', width: '16%', height: '14%',
    definition: 'The practice of widening your view — stepping back from immediate concerns to see the broader patterns, connections, and possibilities that shape your experience. Balancing close attention with panoramic vision.',
  },
  {
    id: 'clarity',
    label: 'Clarity',
    top: '56%', left: '0%', width: '16%', height: '14%',
    definition: 'The practice of keeping your inner lens clean — cutting through distraction, confusion, and mental fog so you can perceive what truly matters. Cultivating the space for understanding to emerge.',
  },
  {
    id: 'presence',
    label: 'Presence',
    top: '28%', left: '84%', width: '16%', height: '14%',
    definition: 'The ability to attune to others with genuine care and responsiveness — listening with your whole being, responding to unspoken needs, and creating sanctuary in your attention.',
  },
  {
    id: 'regulation',
    label: 'Regulation',
    top: '56%', left: '84%', width: '16%', height: '14%',
    definition: 'The ability to stay grounded in your authentic self — knowing what you feel, honoring why you feel it, and expressing it with consistency while navigating emotional experiences.',
  },
  {
    id: 'environment',
    label: 'Environment',
    top: '84%', left: '22%', width: '20%', height: '12%',
    definition: 'The shaping of your external world — the physical spaces, financial foundation, and social surroundings that hold and influence your daily life.',
  },
  {
    id: 'rhythm',
    label: 'Rhythm',
    top: '84%', left: '58%', width: '22%', height: '12%',
    definition: 'The practice of sustainable pacing — living in alignment with your body\'s natural cycles and honoring the balance between activity and restoration.',
  },
];

type Zone = typeof zones[0];

// ─── PathfinderImage Component ─────────────────────────────────

interface PathfinderImageProps {
  size?: number;
  debug?: boolean;
}

function PathfinderImage({ size = 300, debug = false }: PathfinderImageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeZone, setActiveZone] = useState<Zone | null>(null);

  const closeModal = () => {
    setModalOpen(false);
    setActiveZone(null);
  };

  return (
    <>
      {/* Thumbnail */}
      <div
        className="cursor-pointer hover:opacity-90 hover:scale-105 transition mx-auto"
        style={{ width: size, maxWidth: '100%' }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Open Purpose Pathfinder framework explorer"
        onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
      >
        <Image
          src="/resources/PP_dk.png"
          alt="The Purpose Pathfinder framework"
          width={size}
          height={size}
          className="object-contain dark:hidden rounded-xl w-full h-auto"
        />
        <Image
          src="/resources/PP.png"
          alt="The Purpose Pathfinder framework"
          width={size}
          height={size}
          className="object-contain hidden dark:block rounded-xl w-full h-auto"
        />
        <p className="text-sm text-center mt-2 italic opacity-60">Click to explore the framework</p>
      </div>

      {/* Interactive Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-4 max-h-screen overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {activeZone ? activeZone.label : 'The Purpose Pathfinder'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {activeZone ? (
              /* Zone Definition Panel */
              <div>
                <button
                  onClick={() => setActiveZone(null)}
                  className="mb-4 text-sm text-r4v-primary hover:underline flex items-center gap-1"
                >
                  ← Back to framework
                </button>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{activeZone.label}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{activeZone.definition}</p>
              </div>
            ) : (
              /* Image with Hotspot Overlays */
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
                  Click any zone to learn more
                </p>
                <div
                  className="relative mx-auto"
                  style={{ width: 'min(500px, 90vw)', height: 'min(500px, 90vh)' }}
                >
                  <Image
                    src="/resources/PP_dk.png"
                    alt="The Purpose Pathfinder framework"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain dark:hidden rounded-lg"
                  />
                  <Image
                    src="/resources/PP.png"
                    alt="The Purpose Pathfinder framework"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain hidden dark:block rounded-lg"
                  />
                  {zones.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => setActiveZone(zone)}
                      title={zone.label}
                      aria-label={`Learn about ${zone.label}`}
                      style={{
                        position: 'absolute',
                        top: zone.top,
                        left: zone.left,
                        width: zone.width,
                        height: zone.height,
                      }}
                      className={`cursor-pointer hover:bg-white/20 rounded transition ${
                        debug
                          ? 'bg-red-400/40 border border-red-500'
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Page ──────────────────────────────────────────────────────

export default function PurposePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 10) return value;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatPhoneNumber(e.target.value);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      target.value = formatPhoneNumber(target.value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      guidebookCompleted: formData.get('guidebookCompleted'),
      coachingPreference: formData.get('coachingPreference'),
      availability: formData.get('availability'),
      medicalRestrictions: formData.get('medicalRestrictions'),
      comments: formData.get('comments'),
    };

    try {
      const response = await fetch('/api/purpose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFieldErrors({});
        form.reset();
      } else {
        setSubmitStatus('error');
        if (result.fields) setFieldErrors(result.fields);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 pt-24">

      {/* ── Section 1: Hero ──────────────────────────────────── */}
      <div className="bg-gradient-to-r from-r4v-primary to-r4v-secondary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">The Path</h1>
          <p className="text-xl text-white mb-4">Integrative Health Coaching with JT &amp; Sean</p>
          <p className="text-lg italic text-gray-200">
            &ldquo;Too many dwell in silent despair — their true purpose unrealized, songs yet unsung.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Section 2: Philosophy ────────────────────────────── */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            The Purpose Pathfinder
          </h2>

          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            <p>
              At the center of the framework is a <strong>stage</strong> — an octagon of purpose. Shakespeare
              said &ldquo;all the world&apos;s a stage.&rdquo; On this stage, we each adopt a pose. By adding an
              &lsquo;E&rsquo;, PUR-POSE becomes <strong>PURE POSE</strong> — a reminder that purpose is not a
              mask but the truest, most authentic stance you can take in the world.
            </p>

            {/* Interactive image between paragraphs */}
            <div className="py-4 flex justify-center">
              <PathfinderImage size={350} debug={false} />
            </div>

            <p>
              Surrounding the stage are four <strong>domains of health</strong> — Physical, Mental, Emotional,
              and Lifestyle — each with two subdomains that bloom when nurtured. Like petals on a flower, these
              qualities are the visible expression of your inner health.
            </p>

            <div className="border-2 border-r4v-primary bg-r4v-tan dark:bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-800 dark:text-gray-100 font-medium italic text-center">
                The same framework guiding JT across 4,400 miles is the one he and Sean use with clients —
                because purpose isn&apos;t just a concept. It&apos;s a practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Coaching Options ──────────────────────── */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Coaching Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 border-2 border-r4v-primary rounded-lg p-8 hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <Laptop size={40} className="text-r4v-primary mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Remote Coaching</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Sessions by phone or video. Work through the Purpose Pathfinder framework with JT or Sean and
                build a personalized plan that fits your life, wherever you are.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border-2 border-r4v-primary rounded-lg p-8 hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <MapPin size={40} className="text-r4v-primary mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">On-Site Coaching</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Join us on The Path. On-site coaching means coming out to where we are — camping and riding
                alongside JT as he crosses the country. Sessions happen in the field, in real conditions, with
                real accountability. Apply below to find out when we&apos;ll be near you.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border-2 border-r4v-primary rounded-lg p-8 hover:shadow-lg transition md:col-span-2">
              <div className="flex items-center mb-4">
                <Mic size={40} className="text-r4v-primary mr-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Motivational Speaking</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                JT and Sean are available to speak to your group, team, organization, or event when the route
                brings them near you. Whether it&apos;s a Team RWB chapter, a veteran&apos;s organization, a school,
                or a corporate team — if you want a message of purpose and resilience delivered in person,
                apply below and let&apos;s make it happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Guidebook Download ────────────────────── */}
      <section className="bg-r4v-tan dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-2xl mx-auto text-center border-2 border-r4v-primary rounded-xl p-10 shadow-md">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Journey</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            The Purpose Guidebook is a free self-reflection tool designed to help you explore your whole-person
            health across the four domains. Start your journey before we connect.
          </p>
          <Button
            variant="primary"
            size="lg"
            href="/resources/PurposeGuidebook_2025.2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Download size={20} />
            Download the Purpose Guidebook
          </Button>
        </div>
      </section>

      {/* ── Section 5: Application Form ──────────────────────── */}
      <section className="bg-gradient-to-b from-r4v-tan to-r4v-tan-dark dark:from-r4v-secondary dark:to-r4v-secondary-hover py-20 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Apply for Coaching
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12">
            We&apos;ll review your application and be in touch.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent"
                  />
                  {fieldErrors.fullName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.fullName}</p>}
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent"
                  />
                  {fieldErrors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>}
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent"
                  />
                  {fieldErrors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.phone}</p>}
                </div>

                {/* Dates of Availability */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Dates of Availability *
                  </label>
                  <input
                    type="text"
                    name="availability"
                    required
                    placeholder="e.g. Weekday evenings, or April–May"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent"
                  />
                  {fieldErrors.availability && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.availability}</p>}
                </div>

                {/* Guidebook Completed */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Have you completed the Purpose Guidebook? *
                  </label>
                  <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <label className="flex items-center">
                      <input type="radio" name="guidebookCompleted" value="yes" required className="mr-2" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="guidebookCompleted" value="no" className="mr-2" />
                      <span>No</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="guidebookCompleted" value="in-progress" className="mr-2" />
                      <span>In Progress</span>
                    </label>
                  </div>
                  {fieldErrors.guidebookCompleted && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.guidebookCompleted}</p>}
                </div>

                {/* Coaching Preference */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Coaching Preference *
                  </label>
                  <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <label className="flex items-center">
                      <input type="radio" name="coachingPreference" value="remote" required className="mr-2" />
                      <span>Remote</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="coachingPreference" value="on-site" className="mr-2" />
                      <span>On-Site</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="coachingPreference" value="speaking" className="mr-2" />
                      <span>Motivational Speaking</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="coachingPreference" value="multiple" className="mr-2" />
                      <span>Multiple / Not Sure</span>
                    </label>
                  </div>
                  {fieldErrors.coachingPreference && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.coachingPreference}</p>}
                </div>

                {/* Medical Restrictions */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Do you have medical or dietary restrictions? *
                  </label>
                  <div className="flex gap-6 text-gray-700 dark:text-gray-200">
                    <label className="flex items-center">
                      <input type="radio" name="medicalRestrictions" value="yes" required className="mr-2" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="medicalRestrictions" value="no" className="mr-2" />
                      <span>No</span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">No details needed at this stage.</p>
                  {fieldErrors.medicalRestrictions && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.medicalRestrictions}</p>}
                </div>

                {/* Comments */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    name="comments"
                    placeholder="Anything else you'd like to share..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* SMS Consent */}
              <div className="flex justify-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4 max-w-2xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sms_consent"
                      required
                      className="mt-1 w-4 h-4 text-r4v-primary border-gray-300 rounded focus:ring-r4v-primary cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      I consent to receive a follow-up SMS message from Roll 4 Nature at the number provided
                      to discuss potential involvement. Message and data rates may apply.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
                loading={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>

              {/* Success */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-800 dark:text-green-200 font-semibold">
                    &#10003; Application submitted! We&apos;ll review it and be in touch soon.
                  </p>
                </div>
              )}

              {/* Error */}
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
                  We&apos;ll review your application and be in touch.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
