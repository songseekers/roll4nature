'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-r4n-forest dark:bg-r4n-charcoal shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Vertical Stack | Desktop: Horizontal */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 md:py-0 md:h-20 gap-3 md:gap-0">

          {/* Banner Logo */}
          <Link href="/" className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/images/r4n_banner.png"
              alt="Roll 4 Nature"
              width={1155}
              height={100}
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-row justify-center md:justify-end items-center space-x-2 md:space-x-4">
            <Link href="/" className="text-r4n-warm-cream-dim hover:text-r4v-primary-hover transition text-sm md:text-base">
              Home
            </Link>
            <Link
              href="/journal"
              aria-label="Read JT's Rolling Journal"
              className="text-r4n-warm-cream-dim hover:text-r4v-primary-hover transition text-sm md:text-base whitespace-nowrap"
            >
              Journal
            </Link>
            <Link
              href="/purpose"
              className="text-r4n-warm-cream-dim hover:text-r4v-primary-hover transition text-sm md:text-base whitespace-nowrap"
            >
              The Path
            </Link>
            <Button
              variant="primary"
              size="sm"
              href="https://gofund.me/fdff623ca"
              className="px-3 md:px-4 py-2.5 text-sm md:text-base font-semibold leading-tight"
            >
              <span>DONATE</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
