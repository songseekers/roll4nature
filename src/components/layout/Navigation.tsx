'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Navigation() {
  useEffect(() => {
    // Force dark theme
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Vertical Stack | Desktop: Horizontal */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 md:py-0 md:h-20 gap-3 md:gap-0">
          {/* Banner Logo */}
          <Link href="/" className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/images/banner_rev.png"
              alt="Roll for Veterans"
              width={400}
              height={80}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation Links - Always visible */}
          <div className="flex flex-row justify-center md:justify-end items-center space-x-2 md:space-x-4">
            <Link href="/" className="text-gray-300 hover:text-[#E07B4F] transition text-sm md:text-base">
              Home
            </Link>
            <a
              href="/resources/R4V_Story.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#E07B4F] transition text-sm md:text-base whitespace-nowrap"
            >
              Our Story
            </a>
            <a
              href="https://www.zeffy.com/en-US/team/roll-for-veterans"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C1592B] text-white px-2 md:px-3 py-2 rounded-lg hover:bg-[#E07B4F] transition font-semibold text-xs md:text-sm text-center leading-tight"
            >
              <span className="hidden md:inline">Donate to<br />RWB</span>
              <span className="md:hidden">Donate to RWB</span>
            </a>
            <a
              href="/sponsor"
              className="bg-[#C1592B] text-white px-2 md:px-3 py-2 rounded-lg hover:bg-[#E07B4F] transition font-semibold text-xs md:text-sm text-center leading-tight"
            >
              <span className="hidden md:inline">Sponsor<br />R4V</span>
              <span className="md:hidden">Sponsor R4V</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
