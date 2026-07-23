'use client';

import { useState, useEffect, useRef } from 'react';

export default function FlagstaffBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        className="w-full py-5 px-4"
        style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #0D2550 50%, #1B3A6B 100%)' }}
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 text-center sm:text-left">
            <span className="text-2xl hidden sm:block flex-shrink-0">🎆</span>
            <p className="text-white font-bold text-base sm:text-lg leading-snug">
              <span className="text-xl sm:hidden mr-2">🎆</span>
              Roll 4 Nature arrives in Flagstaff on{' '}
              <span className="text-yellow-300">July 4th, 2026</span> — and we invite{' '}
              <em>YOU</em> to celebrate with us!
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 bg-[#C41E3A] hover:bg-[#D4364F] text-white font-bold px-6 py-3 rounded-lg transition whitespace-nowrap shadow-md"
          >
            RSVP to Celebrate →
          </button>
        </div>
      </section>

      {modalOpen && <FlagstaffRsvpModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function FlagstaffRsvpModal({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    attendees: number;
    certainty: number;
  } | null>(null);
  const [phone, setPhone] = useState('');
  const [showSmsConsent, setShowSmsConsent] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFocusRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setShowSmsConsent(formatted.replace(/\D/g, '').length === 10);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const phoneDigits = phone.replace(/\D/g, '');

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: phoneDigits.length === 10 ? phone : undefined,
      attendees: Number(formData.get('attendees')),
      certainty: Number(formData.get('certainty')),
      notes: (formData.get('notes') as string) || undefined,
      smsConsent: formData.get('smsConsent') === 'on',
    };

    try {
      const response = await fetch('/api/flagstaff-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedData({ name: data.name, attendees: data.attendees, certainty: data.certainty });
        setSubmitStatus('success');
      } else {
        if (result.fields) setFieldErrors(result.fields);
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] ${
      fieldErrors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="flagstaff-modal-title"
      >
        {/* Header */}
        <div
          className="rounded-t-xl p-6 relative"
          style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #0D2550 100%)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-white/60 hover:text-white text-3xl leading-none font-light"
            aria-label="Close"
          >
            ×
          </button>
          <h2
            id="flagstaff-modal-title"
            className="text-xl font-bold text-white text-center pr-6"
          >
            Join Roll 4 Nature in Flagstaff!
          </h2>
          <p className="text-blue-200 text-sm text-center mt-2">
            July 4th, 2026 &bull; Flagstaff, Arizona
          </p>
          <p className="text-blue-200 text-xs text-center mt-1">
            Venue to be announced based on projected attendance.
          </p>
        </div>

        <div className="p-6">
          {submitStatus === 'success' && submittedData ? (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎆</div>
              <h3 className="text-2xl font-bold text-[#1B3A6B] dark:text-blue-300 mb-3">
                You&apos;re on the list!
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Thanks, <strong>{submittedData.name}</strong>! We&apos;ve got you down for{' '}
                <strong>{submittedData.attendees}</strong>{' '}
                attendee{submittedData.attendees !== 1 ? 's' : ''} with a certainty of{' '}
                <strong>{submittedData.certainty}/10</strong>.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                We&apos;ll reach out as the date approaches with venue details and any updates.
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">See you in Flagstaff!</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">&mdash; Team Bravo</p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#C41E3A] hover:bg-[#D4364F] text-white font-bold px-8 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  ref={firstFocusRef}
                  name="name"
                  type="text"
                  required
                  placeholder="First and Last Name"
                  className={inputClass('name')}
                />
                {fieldErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className={inputClass('email')}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number{' '}
                  <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(555) 555-5555"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={inputClass('phone')}
                />
                {fieldErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
                )}
              </div>

              {/* SMS Consent — only when 10-digit phone entered */}
              {showSmsConsent && (
                <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsConsent"
                      className="mt-0.5 accent-[#1B3A6B]"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      I agree to receive a confirmation SMS about this event. Message and data rates
                      may apply. Reply STOP to opt out.
                    </span>
                  </label>
                </div>
              )}

              {/* Attendees */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  How many people are in your party (including yourself)?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="attendees"
                  type="number"
                  min={1}
                  max={20}
                  defaultValue={1}
                  required
                  className={inputClass('attendees')}
                />
                {fieldErrors.attendees && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.attendees}</p>
                )}
              </div>

              {/* Certainty */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  How certain are you that you&apos;ll attend?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="certainty"
                  required
                  defaultValue=""
                  className={inputClass('certainty')}
                >
                  <option value="" disabled>
                    Select your certainty level...
                  </option>
                  <option value="1">1 — Just curious, probably won&apos;t make it</option>
                  <option value="2">2 — Very unlikely but I love the mission</option>
                  <option value="3">3 — Long shot, life is unpredictable</option>
                  <option value="4">4 — Maybe, working on it</option>
                  <option value="5">5 — 50/50, genuinely trying to make it work</option>
                  <option value="6">6 — More likely than not</option>
                  <option value="7">7 — Pretty sure I can be there</option>
                  <option value="8">8 — Strongly planning to attend</option>
                  <option value="9">9 — Almost certain, barring emergencies</option>
                  <option value="10">10 — I WILL BE THERE! 🎆</option>
                </select>
                {fieldErrors.certainty && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.certainty}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Additional Notes{' '}
                  <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  maxLength={500}
                  rows={3}
                  placeholder="Anything else you'd like us to know?"
                  className={`w-full px-3 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] resize-none ${
                    fieldErrors.notes ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {fieldErrors.notes && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.notes}</p>
                )}
              </div>

              {submitStatus === 'error' && !Object.keys(fieldErrors).length && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C41E3A] hover:bg-[#D4364F] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition text-base"
              >
                {isSubmitting ? 'Submitting...' : 'Count Me In! 🎆'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
