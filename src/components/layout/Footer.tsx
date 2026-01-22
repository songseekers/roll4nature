import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <span>🚴</span>
              <span>Roll for Veterans</span>
            </h3>
            <p className="text-gray-300 text-sm">
              4,434 miles of stories, community, and gratitude supporting Team RWB.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#map" className="text-gray-300 hover:text-white transition">
                  Route Map
                </Link>
              </li>
              <li>
                <Link href="/#cities" className="text-gray-300 hover:text-white transition">
                  Cities
                </Link>
              </li>
              <li>
                <Link href="/team-bravo" className="text-gray-300 hover:text-white transition">
                  Team Bravo
                </Link>
              </li>
            </ul>
          </div>

          {/* Team RWB */}
          <div>
            <h4 className="text-white font-semibold mb-4">Team RWB</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://teamrwb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  Team RWB Official
                </a>
              </li>
              <li>
                <a
                  href="https://teamrwb.org/chapters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  Find a Chapter
                </a>
              </li>
              <li>
                <a
                  href="https://teamrwb.org/join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  Join Team RWB
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">
                <a href="mailto:rollforveterans@gmail.com" className="hover:text-white transition">
                  rollforveterans@gmail.com
                </a>
              </li>
              <li className="text-gray-300">
                <a href="tel:8282804709" className="hover:text-white transition">
                  (828) 280-4709
                </a>
              </li>
              <li className="space-x-4">
                <a
                  href="https://instagram.com/rollforveterans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-pink-500 transition"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com/rollforveterans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-500 transition"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Roll for Veterans. Supporting Team RWB veterans organization.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link href="#privacy" className="text-gray-400 hover:text-white transition">
                Privacy
              </Link>
              <Link href="#terms" className="text-gray-400 hover:text-white transition">
                Terms
              </Link>
              <a
                href="https://teamrwb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                Team RWB
              </a>
            </div>
          </div>

          {/* RWB Mission */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-xs">
              Team RWB (Red, White & Blue) is a nonprofit organization dedicated to enrich the lives of
              America's veterans by facilitating physical and social engagement.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
