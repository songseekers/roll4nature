import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import trackingData from '@/data/tracking.json';

export async function GET() {
  const { url, expires } = trackingData as { url: string; expires: number };
  const now = Math.floor(Date.now() / 1000);

  if (!url || expires === 0 || now > expires) {
    return NextResponse.json(
      { message: 'No active tracking session.' },
      { status: 404 }
    );
  }

  redirect(url);
}
