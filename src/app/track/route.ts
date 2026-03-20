import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const trackingRaw = fs.readFileSync(
    path.join(process.cwd(), 'src/data/tracking.json'),
    'utf-8'
  );
  const { url, expires } = JSON.parse(trackingRaw) as {
    url: string;
    expires: number;
  };
  const now = Math.floor(Date.now() / 1000);

  if (!url || expires === 0 || now > expires) {
    return NextResponse.json(
      { message: 'No active tracking session.' },
      { status: 404 }
    );
  }

  redirect(url);
}
