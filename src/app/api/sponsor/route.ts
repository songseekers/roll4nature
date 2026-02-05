import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface SponsorData {
  fullName: string;
  email: string;
  phone: string;
  bestTime: string;
  sponsorshipInterest: string;
  message?: string;
  submittedAt: string;
  id: string;
}

// Function to send SMS via Twilio
const sendSMS = async (sponsorData: any) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;
  const toPhone = process.env.RECIPIENT_PHONE_NUMBER;

  // If Twilio is not configured, skip SMS
  if (!accountSid || !authToken || !fromPhone || !toPhone) {
    console.log('Twilio not configured, skipping SMS notification');
    return;
  }

  const message = `New Sponsor Inquiry!

Name: ${sponsorData.fullName}
Interest: ${sponsorData.sponsorshipInterest}
Email: ${sponsorData.email}
Phone: ${sponsorData.phone}
Best Time: ${sponsorData.bestTime}`;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        },
        body: new URLSearchParams({
          To: toPhone,
          From: fromPhone,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Twilio error:', error);
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create submission record
    const submission: SponsorData = {
      id: Date.now().toString(),
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      bestTime: body.bestTime,
      sponsorshipInterest: body.sponsorshipInterest,
      message: body.message || '',
      submittedAt: new Date().toISOString(),
    };

    // Define file path
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'sponsor-inquiries.json');

    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing data or initialize empty array
    let existingData: SponsorData[] = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    }

    // Add new submission
    existingData.push(submission);

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    // Send SMS notification
    await sendSMS(submission);

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error processing sponsor inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
