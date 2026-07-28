'use client';

import Button from '@/components/ui/Button';
import { Building2, DollarSign, Fuel, UtensilsCrossed, ExternalLink, MapPin, Phone as PhoneIcon, Globe } from 'lucide-react';
import Image from 'next/image';
import { useState, FormEvent } from 'react';

type PartnerId = 'veteranmobile' | 'wrapspot' | '10bitworks' | 'whitestrailers' | null;

export default function PartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [selectedPartner, setSelectedPartner] = useState<PartnerId>(null);

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
      bestTime: formData.get('bestTime'),
      sponsorshipInterest: formData.get('sponsorshipInterest'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/sponsor', {
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

      {/* Hero Section */}
      <div style={{ backgroundColor: '#2a1a08' }} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/images/R4VLogo.png"
              alt="Roll 4 Nature Logo"
              width={200}
              height={200}
              className="mx-auto object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-r4n-grass">Become a Partner</h1>
          <p className="text-xl text-r4n-tan mb-8">
            Help us roll across America in support of our nation&apos;s veterans
          </p>
        </div>
      </div>

      {/* Partners Display Section */}
      <section id="partners" className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Thank You to Our Partners
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {/* Veteran Mobile */}
            <div
              onClick={() => setSelectedPartner('veteranmobile')}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="relative h-32 mb-4">
                <Image src="/images/partner/VeteranMobile.png" alt="Veteran Mobile logo" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">Veteran Mobile</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">Click to learn more</p>
            </div>

            {/* WrapSpot */}
            <div
              onClick={() => setSelectedPartner('wrapspot')}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="relative h-32 mb-4">
                <Image src="/images/partner/WrapSpot_Logo.png" alt="WrapSpot logo" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">WrapSpot</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">Click to learn more</p>
            </div>

            {/* White's Trailers */}
            <div
              onClick={() => setSelectedPartner('whitestrailers')}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="relative h-32 mb-4">
                <Image src="/images/partner/WhitesLogo.png" alt="White's Trailers logo" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">White&apos;s Trailers</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">Click to learn more</p>
            </div>

            {/* 10BitWorks */}
            <div
              onClick={() => setSelectedPartner('10bitworks')}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            >
              <div className="relative h-32 mb-4">
                <Image src="/images/partner/10bitworks.png" alt="10BitWorks Makerspace logo" fill className="object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">10BitWorks Makerspace</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">Click to learn more</p>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900 transition-colors">
        <div style={{ backgroundColor: '#2a1a08' }} className="rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-r4n-grass">
            Support the Mission
          </h2>
          <p className="text-base text-r4n-tan mb-4 leading-relaxed">
            Roll 4 Nature is a fundraising journey to raise awareness and support for Team Red, White &amp; Blue,
            a nonprofit organization dedicated to enriching the lives of America&apos;s veterans through physical and
            social engagement. Every dollar donated goes directly to Team RWB&apos;s mission.
          </p>
          <p className="text-base text-r4n-tan mb-4 leading-relaxed">
            Beyond supporting Team RWB, the operation of this 4,545-mile journey requires significant resources.
            From fuel for support vehicles to food for our cycling team, from bike maintenance to primitive camping
            gear—these operational costs add up quickly.
          </p>
          <p className="text-base text-r4n-tan leading-relaxed">
            <span className="font-semibold text-r4n-grass">
              If you&apos;re interested in partnering with Roll 4 Nature directly,
            </span>{' '}
            we would be grateful for your support. Whether it&apos;s fuel, food, equipment, or financial assistance
            for operational expenses, every contribution helps us focus on what matters most: connecting with
            veterans and strengthening communities across America.
          </p>
        </div>

        {/* Support Types */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          How You Can Help
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 border-2 border-r4n-primary rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Fuel size={32} className="text-r4n-primary mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fuel Support</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Help keep our support vehicles moving across 4,545 miles of American roads.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-r4n-primary rounded-lg p-6">
            <div className="flex items-center mb-3">
              <UtensilsCrossed size={32} className="text-r4n-primary mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Food &amp; Supplies</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Support our team with meals and essential supplies throughout the journey.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-r4n-primary rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Building2 size={32} className="text-r4n-primary mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Lodging &amp; Equipment</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Assist with accommodations, bike maintenance, and gear for the ride.</p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-2 border-r4n-primary rounded-lg p-6">
            <div className="flex items-center mb-3">
              <DollarSign size={32} className="text-r4n-primary mr-3" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">General Operations</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Flexible support for unexpected costs and operational expenses along the way.</p>
          </div>
        </div>
      </section>

      {/* Veteran Mobile Modal */}
      {selectedPartner === 'veteranmobile' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPartner(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Veteran Mobile</h2>
                <button onClick={() => setSelectedPartner(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold" aria-label="Close modal">×</button>
              </div>
              <div className="mb-6">
                <Image src="/images/partner/VeteranMobile.png" alt="Veteran Mobile logo" width={400} height={200} className="w-full h-auto max-h-40 object-contain" />
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Location:</p>
                    <p className="text-gray-700 dark:text-gray-300">Port Charlotte, Florida</p>
                    <p className="text-gray-700 dark:text-gray-300">1441 Tamiami Trail, Port Charlotte, FL 33948</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Website:</p>
                    <a href="https://veteranmobile.com" target="_blank" rel="noopener noreferrer" className="text-r4n-primary hover:underline">veteranmobile.com</a>
                  </div>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Veteran Mobile was founded by Bill Rogers, a U.S. Navy veteran who recognized that veterans and their families deserved better—better service, better value, and a provider that actually gives back. Built on the nation&apos;s largest 5G network, Veteran Mobile delivers reliable coverage across the U.S. with no surprise fees, no overseas call centers, and personal switching help every step of the way.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  What sets Veteran Mobile apart is its mission-driven model: a minimum of 10% of profits go directly to supporting homeless veterans and veteran organizations including DAV and AMVETS. Plans are designed with flexibility in mind—pay upfront for 6 or 12 months and skip the monthly bill entirely, or choose a straightforward monthly plan. Discounted rates are available for veterans with proof of service.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Bill&apos;s personal commitment to the veteran community made him a natural fit as a Roll 4 Nature partner. Veteran Mobile keeps our team connected across 4,545 miles of American road—and every signal is a reminder that the mission goes far beyond the ride.
                </p>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="md" href="https://veteranmobile.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink size={20} />
                  Visit Veteran Mobile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WrapSpot Modal */}
      {selectedPartner === 'wrapspot' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPartner(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">WrapSpot</h2>
                <button onClick={() => setSelectedPartner(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold" aria-label="Close modal">×</button>
              </div>
              <div className="mb-6">
                <Image src="/images/partner/WrapSpot_Logo.png" alt="WrapSpot logo" width={400} height={200} className="w-full h-auto max-h-40 object-contain" />
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <PhoneIcon size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone:</p>
                    <a href="tel:3526726538" className="text-r4n-primary hover:underline">(352) 672-6538</a>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">FL</span>
                    <span className="text-gray-500 dark:text-gray-400 mx-2">·</span>
                    <a href="tel:7706971221" className="text-r4n-primary hover:underline">(770) 697-1221</a>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">GA</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Website:</p>
                    <a href="https://wrapspot.com" target="_blank" rel="noopener noreferrer" className="text-r4n-primary hover:underline">wrapspot.com</a>
                  </div>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  WrapSpot is a premier commercial wrap studio founded by Garrick, a craftsman and veteran advocate who believes that quality work and community commitment go hand in hand. Specializing in fleet wraps, vehicle graphics, wall wraps, window graphics, and paint protection, WrapSpot brings brands to life using only top-tier materials from industry leaders like 3M and Avery Dennison—chosen for their color vibrancy, durability, and all-weather performance.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Garrick and his team designed and installed all of the vehicle graphics for the Roll 4 Nature mission fleet—including the bold Team RWB wrap panels on Giselle, our tribute trailer, and the full graphic treatment on Marcus, our support truck. Every mile we roll, WrapSpot&apos;s craftsmanship rides with us, turning heads and starting conversations about veteran wellness from Key West to Los Angeles.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Garrick&apos;s passion for veteran causes made the partnership a natural fit. WrapSpot doesn&apos;t just wrap vehicles—they wrap missions in visibility.
                </p>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="md" href="https://wrapspot.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink size={20} />
                  Visit WrapSpot
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10BitWorks Modal */}
      {selectedPartner === '10bitworks' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPartner(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">10BitWorks Makerspace</h2>
                <button onClick={() => setSelectedPartner(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold" aria-label="Close modal">×</button>
              </div>
              <div className="mb-6">
                <Image src="/images/partner/10bitworks.png" alt="10BitWorks Makerspace logo" width={400} height={200} className="w-full h-auto max-h-40 object-contain" />
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Location:</p>
                    <p className="text-gray-700 dark:text-gray-300">San Antonio, Texas</p>
                    <p className="text-gray-700 dark:text-gray-300">130 W. LaChapelle St, San Antonio, TX 78204</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone:</p>
                    <a href="tel:2105470221" className="text-r4n-primary hover:underline">(210) 547-0221</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Website:</p>
                    <a href="https://10bitworks.com" target="_blank" rel="noopener noreferrer" className="text-r4n-primary hover:underline">10bitworks.com</a>
                  </div>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  10BitWorks is a 501(c)(3) nonprofit makerspace and San Antonio&apos;s most comprehensive hands-on workshop. Founded in 2010, they empower innovators, technologists, and creatives to bring their ideas to life through access to professional-grade tools, dedicated workspace, and a supportive community. From woodworking and metalworking to electronics, laser cutting, and textiles—10BitWorks provides the resources and expertise for makers of all skill levels to learn, create, and grow.
                </p>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="md" href="https://10bitworks.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink size={20} />
                  Visit 10BitWorks
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* White's Trailers Modal */}
      {selectedPartner === 'whitestrailers' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPartner(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">White&apos;s Trailers LLC</h2>
                <button onClick={() => setSelectedPartner(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold" aria-label="Close modal">×</button>
              </div>
              <div className="mb-6">
                <Image src="/images/partner/WhitesLogo.png" alt="White's Trailers logo" width={400} height={200} className="w-full h-auto max-h-40 object-contain" />
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Location:</p>
                    <p className="text-gray-700 dark:text-gray-300">Lafayette, Louisiana</p>
                    <p className="text-gray-700 dark:text-gray-300">1005 Westgate Road, Lafayette, LA 70506</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Phone:</p>
                    <a href="tel:3379624835" className="text-r4n-primary hover:underline">(337) 962-4835</a>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">24/7</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe size={20} className="text-r4n-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Website:</p>
                    <a href="https://whitestrailersllc.com" target="_blank" rel="noopener noreferrer" className="text-r4n-primary hover:underline">whitestrailersllc.com</a>
                  </div>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  White&apos;s Trailers LLC is a Lafayette, Louisiana-based trailer repair and 24-hour roadside assistance operation run by Drake White — a one-man force of nature who treats every trailer like it&apos;s his own. Founded in 2021, White&apos;s Trailers has built a reputation across Acadiana for showing up fast, working hard, and charging fair — even when the call comes in on a Sunday, a holiday, or both.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Drake&apos;s name came up when we needed it most. The day before Easter Sunday, deep in Louisiana, Cleopatra&apos;s axle was severely compromised and the mission was in jeopardy. Drake answered his phone. Within hours he had sourced the parts, made the repairs, and put us back on the road — a minor miracle on a holiday weekend when no one else was picking up. That&apos;s not just service. That&apos;s character.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Whether it&apos;s leaf springs, bearings, brakes, or a full suspension rebuild on the side of the road in 90° heat, Drake gets the job done. If you&apos;re hauling anything on four wheels through Louisiana and surrounding areas, save his number.
                </p>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" size="md" href="tel:3379624835" className="gap-2">
                  <PhoneIcon size={20} />
                  Call Drake: (337) 962-4835
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-200 mb-12 text-lg">
            Interested in partnering? Fill out the form below and we&apos;ll be in touch to discuss how we can work together.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Full Name / Organization *</label>
                  <input type="text" name="fullName" required placeholder="Your name or company name" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4n-primary focus:border-transparent" />
                  {fieldErrors.fullName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email *</label>
                  <input type="email" name="email" required placeholder="your@email.com" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4n-primary focus:border-transparent" />
                  {fieldErrors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Phone *</label>
                  <input type="tel" name="phone" required placeholder="(123) 456-7890" onBlur={handlePhoneInput} onKeyDown={handlePhoneKeyDown} title="Enter 10 digits - will be auto-formatted" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4n-primary focus:border-transparent" />
                  {fieldErrors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Best Time to Contact *</label>
                  <select name="bestTime" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4n-primary focus:border-transparent">
                    <option value="">Select a time</option>
                    <option value="morning">Morning (8am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 5pm)</option>
                    <option value="evening">Evening (5pm - 8pm)</option>
                    <option value="anytime">Anytime</option>
                  </select>
                  {fieldErrors.bestTime && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.bestTime}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Type of Partnership Interest *</label>
                  <select name="sponsorshipInterest" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4n-primary focus:border-transparent">
                    <option value="">Select partnership type</option>
                    <option value="fuel">Fuel Support</option>
                    <option value="food">Food &amp; Supplies</option>
                    <option value="lodging">Lodging &amp; Equipment</option>
                    <option value="financial">General Financial Support</option>
                    <option value="in-kind">In-Kind Donation</option>
                    <option value="other">Other / Multiple Areas</option>
                  </select>
                  {fieldErrors.sponsorshipInterest && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.sponsorshipInterest}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Additional Information (Optional)</label>
                <textarea name="message" placeholder="Tell us more about your partnership interests or questions..." rows={4} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4n-primary focus:border-transparent" />
              </div>
              <div className="flex justify-center">
                <div className="bg-r4n-primary border-2 border-r4n-tan rounded-lg p-4 max-w-2xl">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="sms_consent" required className="mt-1 w-4 h-4 text-r4n-primary border-gray-300 rounded focus:ring-r4n-primary cursor-pointer" />
                    <span className="text-sm text-r4n-tan">
                      I consent to receive a follow-up SMS message from Roll 4 Nature at the number provided to discuss potential involvement. Message and data rates may apply.
                    </span>
                  </label>
                </div>
              </div>
              <Button type="submit" variant="primary" size="md" disabled={isSubmitting} loading={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              {submitStatus === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-800 dark:text-green-200 font-semibold">✓ Thank you for your interest!</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">We&apos;ll be in touch within 24 hours to discuss partnership opportunities.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4 text-center">
                  <p className="text-red-800 dark:text-red-200 font-semibold">Failed to submit inquiry</p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">Please try again or contact us directly at rollforveterans@gmail.com</p>
                </div>
              )}
              {submitStatus === 'idle' && (
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">We&apos;ll be in touch within 24 hours to discuss how we can work together.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: '#2a1a08' }} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-r4n-grass">Questions About Partnering?</h2>
          <p className="text-xl text-r4n-tan">
            Reach out any time to discuss how your support can make a difference by using the Connect With Us buttons below. We look forward to hearing from you!
          </p>
        </div>
      </section>

    </div>
  );
}
