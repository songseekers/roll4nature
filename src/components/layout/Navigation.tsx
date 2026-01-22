'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-600">
            <span>🚴</span>
            <span>Roll for Veterans</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/guidebook" className="text-gray-700 hover:text-blue-600 transition">
              Guidebook
            </Link>
            <Link href="/roll-for-veterans" className="text-gray-700 hover:text-blue-600 transition">
              Roll for Veterans
            </Link>
            <Link href="/team-bravo" className="text-gray-700 hover:text-blue-600 transition">
              Team Bravo
            </Link>
            <a
              href="https://zeffy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Donate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-blue-600"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/guidebook"
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Guidebook
            </Link>
            <Link
              href="/roll-for-veterans"
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Roll for Veterans
            </Link>
            <Link
              href="/team-bravo"
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Team Bravo
            </Link>
            <a
              href="https://zeffy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold text-center"
            >
              Donate
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
