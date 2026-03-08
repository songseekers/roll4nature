'use client';

import { useState } from 'react';
import Image from 'next/image';

interface RouteImageCellProps {
  date: string;       // "2026-02-27"
  dateLabel: string;  // "Feb 27"
}

function dateToFilename(date: string): string {
  // "2026-02-27" → "260227"
  return date.replace(/^20/, '').replace(/-/g, '');
}

export default function RouteImageCell({ date, dateLabel }: RouteImageCellProps) {
  const [open, setOpen] = useState(false);
  const src = `/images/routes/${dateToFilename(date)}.png`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block mx-auto rounded overflow-hidden border border-gray-300 dark:border-gray-600 hover:border-r4v-primary transition hover:scale-105"
        style={{ width: 56, height: 40, flexShrink: 0 }}
        aria-label={`View route map for ${dateLabel}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Route map ${dateLabel}`}
          style={{ width: 56, height: 40, objectFit: 'cover', display: 'block' }}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{dateLabel} — Route Map</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <Image
              src={src}
              alt={`Route map ${dateLabel}`}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
