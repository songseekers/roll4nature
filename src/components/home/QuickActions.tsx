'use client';

import Link from 'next/link';
import { MapPin, Heart, Users, Mail } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* View Route Map */}
      <Link href="/#map">
        <div className="bg-gradient-to-br from-r4v-primary to-r4v-primary-hover text-r4n-tan p-6 rounded-lg hover:shadow-lg transition transform hover:scale-105 cursor-pointer h-full">
          <MapPin size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">View Route Map</h3>
          <p className="text-r4n-tan text-sm">
            Explore our path from Key West to the Grand Canyon across 80+ cities
          </p>
        </div>
      </Link>

      {/* Donate Now */}
      <a href="https://zeffy.com" target="_blank" rel="noopener noreferrer">
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg hover:shadow-lg transition transform hover:scale-105 cursor-pointer h-full">
          <Heart size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Donate Now</h3>
          <p className="text-red-100 text-sm">
            100% goes to supporting Team RWB and our mission
          </p>
        </div>
      </a>

      {/* Join Team Bravo */}
      <Link href="/team-bravo">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg hover:shadow-lg transition transform hover:scale-105 cursor-pointer h-full">
          <Users size={32} className="mb-4" />
          <h3 className="text-xl font-bold mb-2">Team Bravo</h3>
          <p className="text-green-100 text-sm">
            Join our support crew as a driver, photographer, or cyclist
          </p>
        </div>
      </Link>

      {/* Get Updates */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg hover:shadow-lg transition cursor-pointer h-full">
        <Mail size={32} className="mb-4" />
        <h3 className="text-xl font-bold mb-2">Get Updates</h3>
        <p className="text-purple-100 text-sm">
          Sign up for daily journey updates and milestone alerts
        </p>
      </div>
    </div>
  );
}
