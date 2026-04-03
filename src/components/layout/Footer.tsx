'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Activity, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 text-center">
            <h4 className="text-white font-semibold mb-4">
              Roll for Veterans
            </h4>
            <Link href="/team-bravo" className="flex justify-center mb-4">
              <Image
                src="/images/R4VLogo.png"
                alt="R4V Logo"
                width={104}
                height={104}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-300 text-sm">
              4,463 miles of stories, community, and gratitude supporting Team RWB.
            </p>
          </div>

          {/* Quick Links - Two Columns */}
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 ml-5">
              {/* Left Column */}
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://gofund.me/fdff623ca"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      R4V GoFundMe
                    </a>
                  </li>
                  <li>
                    <a
                      href="/resources/R4V_Story_v9.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      R4V Story
                    </a>
                  </li>
                  <li>
                    <a
                      href="/sponsor"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      Partner with Roll for Veterans
                    </a>
                  </li>
                  <li>
                    <a
                      href="/team-bravo"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      Join Team Bravo
                    </a>
                  </li>
                </ul>
              </div>

              {/* Right Column */}
              <div>
                <h4 className="text-white font-semibold mb-4">Team RWB Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.zeffy.com/en-US/team/roll-for-veterans"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      Donate to Team RWB
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://teamrwb.org/who-we-are/our-community"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      Team RWB Official Page
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://teamrwb.org/find-your-chapter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      Find a Chapter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://members.teamrwb.org/registration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-r4v-primary-hover transition"
                    >
                      Join Team RWB
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setShowPhonePopup(true)}
                className="flex items-center justify-center text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-3 rounded-lg hover:bg-gray-700 w-12 h-12"
                aria-label="Phone"
              >
                <Phone size={24} />
              </button>
              <a
                href="mailto:rollforveterans@gmail.com"
                className="flex items-center justify-center text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-3 rounded-lg hover:bg-gray-700 w-12 h-12"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>

            {/* Phone Popup */}
            {showPhonePopup && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setShowPhonePopup(false)}
              >
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Contact Us
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Feel free to call or text at this number:
                  </p>
                  <a
                    href="tel:+18282804709"
                    className="text-3xl font-bold text-r4v-primary hover:text-r4v-primary-hover transition block mb-6"
                  >
                    (828) 280-4709
                  </a>
                  <button
                    onClick={() => setShowPhonePopup(false)}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Social Media Icons */}
            <div className="mt-4">
              <h5 className="text-white font-semibold text-sm mb-3">Follow the Journey — JT&apos;s Connections:</h5>
              <div className="flex flex-wrap gap-3 mb-4">
                <a
                  href="https://instagram.com/roll4veterans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                  <span className="text-xs">Instagram</span>
                </a>
                <a
                  href="https://facebook.com/roll4veterans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                  <span className="text-xs">Facebook</span>
                </a>
                <a
                  href="https://tiktok.com/@roll4veterans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="text-xs">TikTok</span>
                </a>
                <a
                  href="https://youtube.com/@roll4veterans/shorts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                  <span className="text-xs">YouTube</span>
                </a>
                <a
                  href="https://strava.app.link/hW78V3J2u0b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Strava"
                >
                  <Activity size={20} />
                  <span className="text-xs">Strava</span>
                </a>
              </div>

              <h5 className="text-white font-semibold text-sm mb-3">Sean&apos;s Connections:</h5>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/performancechefsean?igsh=cHlzaXFueHZzbGtv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Sean's Instagram"
                >
                  <Instagram size={20} />
                  <span className="text-xs">Instagram</span>
                </a>
                <a
                  href="https://youtube.com/@performancechefsean?si=-nJ5DYm-6Pec0Z0v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Sean's YouTube"
                >
                  <Youtube size={20} />
                  <span className="text-xs">YouTube</span>
                </a>
                <a
                  href="https://tiktok.com/@performancechefsean"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Sean's TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <span className="text-xs">TikTok</span>
                </a>
                <a
                  href="https://www.threads.com/@performancechefsean"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Sean's Threads"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068c0-3.509.863-6.371 2.497-8.41C5.868 1.248 8.614.05 12.193.05c3.571 0 6.332 1.19 8.208 3.44 1.596 1.92 2.458 4.603 2.558 7.98.008.298-.226.543-.524.55l-1.707.04a.526.526 0 0 1-.538-.513c-.089-2.792-.776-4.913-2.046-6.307-1.173-1.29-2.924-1.94-5.244-1.94-2.27 0-4.055.68-5.298 2.023-1.477 1.59-2.226 4.116-2.226 7.507 0 3.4.748 5.92 2.222 7.49 1.24 1.33 3.02 2.006 5.292 2.022 1.96.015 3.547-.437 4.72-1.343 1.348-1.035 2.078-2.579 2.165-4.587l.002-.064c0-1.418-.37-2.534-1.097-3.316-.67-.719-1.613-1.12-2.816-1.192-.127 1.518-.569 2.72-1.318 3.575-.92 1.048-2.19 1.58-3.778 1.58-1.313 0-2.41-.418-3.163-1.211-.77-.81-1.16-1.94-1.16-3.264 0-2.898 2.019-4.624 5.404-4.624.647 0 1.29.06 1.909.175-.038-.503-.16-.928-.365-1.27-.34-.564-.906-.85-1.682-.85-.578 0-1.077.148-1.482.44a.526.526 0 0 1-.665-.073l-1.043-1.094a.526.526 0 0 1 .047-.773c.766-.63 1.782-.95 3.02-.95 1.626 0 2.875.543 3.71 1.615.67.858 1.038 2.049 1.093 3.543 1.66.3 2.998.992 3.982 2.057 1.151 1.247 1.736 2.916 1.736 4.962l-.002.1c-.107 2.698-1.12 4.821-2.93 6.14-1.563 1.148-3.588 1.73-6.02 1.73z"/>
                  </svg>
                  <span className="text-xs">Threads</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/performancechefsean"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-r4v-primary-hover transition bg-gray-800 p-2 rounded-lg hover:bg-gray-700"
                  aria-label="Sean's LinkedIn"
                >
                  <Linkedin size={20} />
                  <span className="text-xs">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Glympse / Live Tracking Link */}
        <div className="py-4 text-center">
          <a
            href="https://facebook.com/roll4veterans"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-r4v-primary-hover transition"
          >
            <MapPin size={16} />
            Track JT when he&apos;s on the path by clicking on the green link under the map above
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Info */}
          <div className="flex flex-col items-center">
            <p className="text-gray-300 text-sm text-center">
              &copy; {currentYear} Roll for Veterans. Supporting Team Red, White, and Blue veterans organization.
            </p>
            <div className="flex gap-4 mt-3">
              <Link href="/privacy" className="text-gray-400 text-xs hover:text-r4v-primary-hover transition">
                Privacy Policy
              </Link>
              <span className="text-gray-600 text-xs">|</span>
              <Link href="/terms" className="text-gray-400 text-xs hover:text-r4v-primary-hover transition">
                Terms of Service
              </Link>
              <span className="text-gray-600 text-xs">|</span>
              <Link href="/accessibility" className="text-gray-400 text-xs hover:text-r4v-primary-hover transition">
                Accessibility
              </Link>
            </div>
          </div>

          {/* RWB Mission with Image */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a
                href="https://www.zeffy.com/en-US/team/roll-for-veterans"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <Image
                  src="/images/rwb_ob_white.png"
                  alt="Team Red, White, and Blue Logo"
                  width={104}
                  height={104}
                  className="object-contain"
                />
              </a>
              <p className="text-gray-300 text-sm text-center md:text-left max-w-2xl">
                Team Red, White, and Blue (RWB) is a nonprofit organization dedicated to enrich the lives of
                America&apos;s veterans by facilitating physical and social engagement.
              </p>
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a
                href="https://bexarlabs.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row items-center gap-4 group"
              >
                <div className="flex-shrink-0">
                  <Image
                    src="/images/bexarlabs_logo.png"
                    alt="BexarLabs logo"
                    width={104}
                    height={104}
                    className="object-contain opacity-70 group-hover:opacity-100 transition h-[52px] w-auto"
                  />
                </div>
                <span className="text-gray-300 text-sm text-center md:text-left group-hover:text-white transition">
                  Website foundation and initial development
                </span>
              </a>
              <a
                href="https://www.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row items-center gap-4 group"
              >
                <div className="flex-shrink-0">
                  <Image
                    src="/images/anth_logo1.png"
                    alt="Anthropic logo"
                    width={104}
                    height={104}
                    className="object-contain opacity-70 group-hover:opacity-100 transition h-[52px] w-auto"
                  />
                </div>
                <span className="text-gray-300 text-sm text-center md:text-left group-hover:text-white transition">
                  AI-assisted design and development powered by Claude Sonnet 4.5 and Opus 4.6
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
