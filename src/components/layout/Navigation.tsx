'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Vertical Stack | Desktop: Horizontal */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 md:py-0 md:h-20 gap-3 md:gap-0">
          {/* Banner Logo */}
          <Link href="/" className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/images/banner.png"
              alt="Roll for Veterans"
              width={400}
              height={80}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation Links - Always visible */}
          <div className="flex flex-row justify-center md:justify-end items-center space-x-2 md:space-x-4">
            <Link href="/" className="text-gray-300 hover:text-r4v-primary-hover transition text-sm md:text-base">
              Home
            </Link>
            <a
              href="/resources/R4V_Story_v9.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-r4v-primary-hover transition text-sm md:text-base whitespace-nowrap"
            >
              R4V Story
            </a>
            <a
              href="/resources/r4v_journal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read JT's Riding Journal (opens in new tab, PDF)"
              className="text-gray-300 hover:text-r4v-primary-hover transition text-sm md:text-base whitespace-nowrap"
            >
              JT&apos;s Journal
            </a>
            <a
              href="/purpose"
              className="text-gray-300 hover:text-r4v-primary-hover transition text-sm md:text-base whitespace-nowrap"
            >
              The Path
            </a>
            <Button
              variant="primary"
              size="sm"
              href="/donate"
              className="px-2 md:px-3 py-2 text-xs md:text-sm font-semibold leading-tight"
            >
              <span>DONATE</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
