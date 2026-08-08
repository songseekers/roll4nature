'use client';

import { useState } from 'react';

interface ChapterNav {
  num: number;
  title: string;
}

export default function BookSidebar({ chapters }: { chapters: ChapterNav[] }) {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);

  const scrollToChapter = (num: number | 'ending') => {
    if (num === 'ending') {
      setActiveChapter(null);
      const el = document.getElementById('chapter-ending');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    setActiveChapter(num);
    const el = document.getElementById(`chapter-${num}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 min-w-72 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-5 border-b border-gray-200 dark:border-gray-800">
        <div className="text-xs font-bold text-r4n-primary uppercase tracking-widest mb-1">JT&apos;s Writings</div>
        <div className="text-base font-semibold text-gray-700 dark:text-gray-200">The Caterpillar and the Dragonfly</div>
      </div>
      <nav className="p-4 flex-1">
        <ul className="space-y-0.5">
          {chapters.map(c => (
            <li key={c.num}>
              <button
                onClick={() => scrollToChapter(c.num)}
                className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                  activeChapter === c.num
                    ? 'bg-r4n-primary/10 text-r4n-primary font-semibold'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Ch. {c.num} · {c.title}
              </button>
            </li>
          ))}
          <li>
            <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
            <button
              onClick={() => scrollToChapter('ending')}
              className="w-full text-left px-2 py-1.5 rounded text-sm italic text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              A Temporary Ending
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
