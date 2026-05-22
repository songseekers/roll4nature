'use client';

import Button from '@/components/ui/Button';
import { Users, Camera, Share2, Bike, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState, FormEvent } from 'react';

export default function TeamBravoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
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
    setFieldErrors({});

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
        setFieldErrors({});
        form.reset();
      } else {
        setSubmitStatus('error');
        if (result.fields) {
          setFieldErrors(result.fields);
        }
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
      <div className="bg-gradient-to-r from-r4v-primary to-r4v-secondary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/images/TeamBravoPatch.png"
              alt="Team Bravo Patch"
              width={500}
              height={250}
              className="mx-auto object-contain dark:hidden"
            />
            <Image
              src="/images/TeamBravoFlag.png"
              alt="Team Bravo Flag"
              width={500}
              height={250}
              className="mx-auto object-contain hidden dark:block"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6">Join Team Bravo</h1>

          <div className="text-xl text-white mb-6 space-y-3">
            <p className="font-bold text-2xl">
              Roll <span className="text-3xl">4</span> Veterans
            </p>
            <p>
              <span className="text-3xl font-bold">4,444</span> miles across America
            </p>
            <p>
              <span className="text-3xl font-bold">4</span> fingers raised with the thumb across the palm — the letter <strong>B</strong> in sign language
            </p>
          </div>

          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            Team Bravo isn&apos;t just the core crew on the road — it&apos;s <strong>everyone</strong> who supports this mission.
            Veterans who ride alongside us. Communities who welcome us. And you — choosing to do good deeds,
            get out into nature, and connect with others.
          </p>

          <p className="text-gray-200 text-lg leading-relaxed mb-8">
            There are no requirements to join Team Bravo. Just raise four fingers in the Team Bravo Salute,
            share it with others, and live the mission in your own way.
          </p>

          <Button variant="white" size="lg" href="https://youtube.com/@roll4veterans/shorts" target="_blank" rel="noopener noreferrer" className="gap-2 whitespace-nowrap">
            <ExternalLink size={20} />
            Roll4Veterans YouTube Channel
          </Button>
        </div>
      </div>

      {/* Team Bravo Ground Crew Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Team Bravo Ground Crew
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* JT - Active Profile */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedMember('jt')}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full"
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

            {/* Sean */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedMember('sean')}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full"
              >
                <div className="relative h-40">
                  <Image
                    src="/images/TeamBravo/Sean.png"
                    alt="Sean 'Lancelot' Palmer, Team Bravo Ground Crew — Driver, Support, Social Media"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Sean</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click to learn more</p>
                </div>
              </div>
            </div>

            {/* Boogalie Bear */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedMember('boogs')}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full"
              >
                <div className="relative h-40">
                  <Image
                    src="/images/TeamBravo/Boogs.jpeg"
                    alt="Boogalie Bear, Roll for Veterans expedition companion and morale officer"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Boogalie Bear</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click to learn more</p>
                </div>
              </div>
            </div>

            {/* Placeholder */}
            <div className="flex flex-col items-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg opacity-75 w-full">
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
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full border border-gray-200 dark:border-gray-600"
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

            {/* Gavin */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedMember('gavin')}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full border border-gray-200 dark:border-gray-600"
              >
                <div className="relative h-40">
                  <Image
                    src="/images/TeamBravo/Gavin.jpeg"
                    alt="Gavin, Team Bravo Air Support – Tech Support & Social Media"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Gavin</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click to learn more</p>
                </div>
              </div>
            </div>

            {/* Adam */}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setSelectedMember('adam')}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 w-full border border-gray-200 dark:border-gray-600"
              >
                <div className="relative h-40">
                  <Image
                    src="/images/TeamBravo/Adam12.jpg"
                    alt="Adam, Team Bravo Air Support – Outreach & Media/Partner Liaison"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Adam</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Click to learn more</p>
                </div>
              </div>
            </div>

            {/* Placeholder */}
            <div className="flex flex-col items-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg opacity-75 w-full border border-gray-200 dark:border-gray-600">
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
                  Team Red, White &amp; Blue changed the trajectory of my life. When Team RWB stepped in, they didn&apos;t
                  just offer encouragement—they offered belief. They provided the scholarship that allowed me to
                  become a certified Health Coach. They then selected me to participate in a 12-day white-water
                  expedition through the Grand Canyon. I was so moved by their investment in me that I chose to
                  ride my bike across the country to reach the starting point. Just that fast, my gratitude turned into action!
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I was born in the mountains of Utah, raised in the valleys of Idaho, and came of age in
                  California&apos;s Inland Empire. As one of seven children, I learned resilience early. I learned
                  how to show up. What I didn&apos;t learn—at least not right away—was how to be fully authentic.
                  For years, I wrestled quietly with questions of identity and purpose, unsure what I was meant
                  to contribute.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  That changed on January 3, 2023. My internal compass finally began to align. Since then, I&apos;ve
                  committed to living deliberately and serving others with integrity.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Today, I work with my hands and my heart. I restore what&apos;s broken as a handyman. I help others
                  rebuild strength and clarity as a health coach. I think, write, and speak about purpose,
                  connection, and growth. I&apos;m an aspiring podcaster who believes listening is more powerful than
                  talking. Whether I&apos;m building shelves, strengthening bodies, or building community, my goal is
                  the same: show up fully, honestly, and with care.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Everything I create—woodwork, words, systems, or relationships—is an expression of gratitude
                  for the journey that brought me here. I don&apos;t claim to have all the answers. I&apos;m simply
                  committed to asking better questions and walking alongside others as they search for their own.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If something here resonates, I invite you to connect through the Team Bravo or Partnership
                  applications.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong>My purpose is simple: to offer my friendship to everyone, my judgment to no one.</strong>
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Thirteen words guide me: Too many dwell in silent despair; their true purpose unrealized,
                  songs yet unsung.
                </p>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
                  <em>Care to sing a duet?</em>
                </p>

                <div className="flex justify-center">
                  <Button variant="primary" size="md" href="mailto:jt.songseeker@gmail.com" className="gap-2">
                    <Mail size={20} />
                    Email JT
                  </Button>
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

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Contact Janelle at Stitch in Time to discuss your own creation:
                  </p>
                  <Image
                    src="/images/TeamBravo/StitchInTime_QR.jpeg"
                    alt="Stitch in Time by Janelle — QR code to contact Janelle about custom creations"
                    width={180}
                    height={180}
                    className="mx-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gavin Profile Modal */}
      {selectedMember === 'gavin' && (
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gavin</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Digital Hub Guru
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
                  src="/images/TeamBravo/Gavin.jpeg"
                  alt="Gavin, Team Bravo Tech Support and Social Media"
                  width={300}
                  height={200}
                  className="w-1/2 h-auto rounded-lg mx-auto"
                />
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Most see JT&apos;s &ldquo;Roll for Veterans&rdquo; project through the lens of YouTube and social media. A few might actually have the rare chance to meet him in person along his odyssey. Either way, its eyes on the road—the dust, the wind, and the miles. But, behind the interface, I am a minor player. I am one of the resident Air (tech) Support team, ensuring those miles resonate.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I&apos;m the brother. While JT is out there dipping his tire in the Atlantic and lacing up for the 10:00 AM push, I&apos;m bum deep in the complexity that brings his vision to life. He&apos;s doing things every day that would surely be my demise, physically and mentally. I&apos;m doing things he doesn&apos;t have the time for and don&apos;t poke me in the Asperger. To me, being on the Air Support team isn&apos;t about music in the traditional sense; it&apos;s about finding the &ldquo;nucleus&rdquo; where stories, code, and souls strike a chord. Sometimes that resonance is found in Python code, and sometimes it&apos;s just the quiet reflection silence under the cedar trees.
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📜 From Submarines to Signal Streams</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  My journey to this project wasn&apos;t a straight line. I&apos;ve lived a few lives:
                </p>
                <ul className="list-none space-y-2 mb-4 text-gray-700 dark:text-gray-300">
                  <li><strong>The Silent Service:</strong> Operating nuclear reactors aboard the fast-attack submarine USS Skate (SSN-578).</li>
                  <li><strong>The Fiber Veins:</strong> Decades maintaining the fiber-optic and radio junction stations that keep the world connected—a job I still call the &ldquo;bestest in the world.&rdquo;</li>
                  <li><strong>The AI Collaborator:</strong> Whether I&apos;m building tools with AI, training models, or directing &ldquo;Chauncy&rdquo; (my favorite AI collaborator) through the gothic halls of <em>The Hunger of Graywick Hall</em>—a novel that he&apos;s writing under my direction—I believe in the power of collaborative imagination.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🦅 Why R4V Matters to Me</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I likely inherited the &ldquo;tech gene&rdquo; from my father—a farmer turned rocket scientist (not even kidding) who helped design the motors for the Polaris and Minuteman programs. He taught me that precision and purpose go hand-in-hand.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  For me, Roll for Veterans is a &ldquo;for-reals&rdquo; side project with a deeper frequency. It&apos;s about building a bridge. I might show traits on the autism spectrum, which means I&apos;m not always a man of many words—but when I build something, whether it&apos;s a Braille proofreading tool, an overly-complicated Rainmeter skin, or the digital hub for this mission, that is how I speak.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  This project is my way of honoring veterans like my dad. Every line of code and every &ldquo;unusual tool&rdquo; I dream up for this mission is a tribute to the camaraderie JT finds at every mile marker along the way.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I&apos;m here to make sure the signal stays strong, the stories stay raw, and the mission keeps rolling. Thanks to JT, and to you, for this opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adam Profile Modal */}
      {selectedMember === 'adam' && (
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Adam</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Outreach &bull; Media/Partner Liaison
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
                  src="/images/TeamBravo/Adam12.jpg"
                  alt="Adam, Team Bravo Outreach and Media/Partner Liaison"
                  width={300}
                  height={200}
                  className="w-1/2 h-auto rounded-lg mx-auto"
                />
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  Bio coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Boogalie Bear Profile Modal */}
      {selectedMember === 'boogs' && (
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Boogalie Bear</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Expedition Companion &bull; Morale Officer &bull; Photo Enthusiast
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
                  src="/images/TeamBravo/BoogBack.jpeg"
                  alt="Boogalie Bear showing his back, made from JT's Army pants and Grand Canyon shirt"
                  width={300}
                  height={200}
                  className="w-1/2 h-auto rounded-lg mx-auto"
                />
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Hello! I&apos;m Boogalie Bear, but most folks just call me Boogs.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I was born in 2023 in Janelle&apos;s fabric laboratory — one of our Air Support crew members — crafted from JT&apos;s Army pants and a shirt he got while visiting the Grand Canyon. That means I carry a piece of JT&apos;s service and a piece of one of the world&apos;s greatest natural wonders with me everywhere I go. Pretty special stuff for a bear!
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I&apos;ve been dreaming about seeing the Grand Canyon — the place of my origin, in a way — with my own eyes ever since Janelle stitched my first seam. This journey from Key West to Flagstaff will finally take me there, and I couldn&apos;t be more excited. I&apos;m already Road Trip certified, but this trip is taking that to the next level!
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  My favorite part of being on Team Bravo? Meeting people along The Path and taking pictures with them. Seriously, I never turn down a photo opportunity. If you see us out there on the road, come say hi! I&apos;m always ready to pose, share a smile, and be part of your story.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  After all, what good is a journey if you don&apos;t make friends and memories along the way?
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  See you on The Path!<br />— Boogs
                </p>
                <div className="flex justify-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <Image
                    src="/images/TeamBravo/Boog_cert.jpeg"
                    alt="Boogalie Bear's official Road Trip certification"
                    width={300}
                    height={200}
                    className="w-2/3 h-auto rounded-lg"
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600 text-center">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                    Contact Janelle at Stitch in Time to discuss your own creation:
                  </p>
                  <Image
                    src="/images/TeamBravo/StitchInTime_QR.jpeg"
                    alt="Stitch in Time by Janelle — QR code to contact Janelle about custom creations"
                    width={180}
                    height={180}
                    className="mx-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sean Profile Modal */}
      {selectedMember === 'sean' && (
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sean</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Chef &bull; Veteran &bull; Driver &bull; Ground Support &bull; Social Media
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
                  src="/images/TeamBravo/Sean.png"
                  alt="Sean 'Lancelot' Palmer, Team Bravo Ground Crew — Driver, Support, Social Media"
                  width={300}
                  height={200}
                  className="w-1/2 h-auto rounded-lg mx-auto"
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I served 8 years aboard the USS Cole (DDG-67) and at Naval Station Norfolk, along with other duty stations from 2008–2016 as a Chef (Culinary Specialist) in the United States Navy.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  During that time, I learned more than how to cook — I learned how to lead, adapt, and serve under pressure. Whether feeding 200 sailors on a destroyer or supporting larger operations, the mission was always the same: take care of people.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  But service didn&apos;t stop when I took off the uniform.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  On Roll for Veterans, that same mission continues on four wheels and two feet. As Ground Crew, I&apos;m the driver, the direct support, and the logistics backbone that keeps JT rolling. I manage the schedule, coordinate the moving parts, and make sure everything — and everyone — is where they need to be. I also handle social media, turning the miles and moments of this journey into stories that connect veterans and communities across the country. Whatever needs doing, I show up and get it done. In fact, JT refers to me as Lancelot, his right hand.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Today, I continue the mission through food, connection, and presence.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  As a chef, I believe food is more than fuel — it&apos;s comfort, it&apos;s community, it&apos;s healing. As a coach, I believe in meeting people where they are and helping them find strength in their own journey. And as a nomad, I live what I teach — growth, resilience, and purpose through experience.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Being part of Roll 4 Veterans isn&apos;t just about support — it&apos;s about showing up. It&apos;s about standing beside those still fighting silent battles and reminding them they&apos;re not alone.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Every meal I cook, every mile we support, every conversation we have — it all comes back to one thing: Service.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I don&apos;t claim to have all the answers. I just know how to show up, do the work, and walk alongside others.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 italic">
                  If you&apos;re on your own path, just know — you don&apos;t have to walk it alone.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <strong>Purpose:</strong> To serve others through food, presence, and connection — one person, one meal, one moment at a time.
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
                className="bg-white dark:bg-gray-800 border-2 border-r4v-primary rounded-lg p-8 hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <IconComponent size={40} className="text-r4v-primary mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{role.title}</h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{role.description}</p>

                <div className="bg-r4v-tan dark:bg-gray-700 rounded p-4 mb-6">
                  <ul className="space-y-2">
                    {role.requirements.map((req) => (
                      <li key={req} className="flex items-start text-gray-700 dark:text-gray-200">
                        <span className="text-r4v-primary font-bold mr-2">&#10003;</span>
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
      <section className="bg-gradient-to-b from-r4v-tan to-r4v-tan-dark dark:from-r4v-secondary dark:to-r4v-secondary-hover py-20 px-4 sm:px-6 lg:px-8 transition-colors">
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

                {/* Role Interest */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Role Interest *
                  </label>
                  <select name="role" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent">
                    <option value="">Select a role</option>
                    <option value="driver">Support Driver</option>
                    <option value="camera">Camera Operator</option>
                    <option value="social">Social Media Team</option>
                    <option value="cyclist">Segment Cyclist</option>
                    <option value="other">Other</option>
                  </select>
                  {fieldErrors.role && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.role}</p>}
                </div>

                {/* Availability */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Availability *
                  </label>
                  <select name="availability" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent">
                    <option value="">Select availability</option>
                    <option value="full">Full journey (Feb 27 - Jun 21)</option>
                    <option value="weeks">Several weeks</option>
                    <option value="days">Days or segments</option>
                    <option value="flexible">Flexible/TBD</option>
                  </select>
                  {fieldErrors.availability && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.availability}</p>}
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-r4v-primary focus:border-transparent"
                />
                {fieldErrors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{fieldErrors.message}</p>}
              </div>

              {/* SMS Consent Checkbox */}
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
                      I consent to receive a follow-up SMS message from Roll for Veterans at the number provided to discuss potential involvement. Message and data rates may apply.
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
            <div key={i} className="bg-r4v-tan dark:bg-gray-800 rounded-lg p-6 border border-r4v-primary">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{faq.q}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-r4v-primary to-r4v-secondary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Questions? Let&apos;s Talk!
          </h2>

          <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
            Email or call us to talk more about Team Bravo opportunities using the links under Connect With Us below. We look forward to hearing from you!
          </p>
        </div>
      </section>
    </div>
  );
}
