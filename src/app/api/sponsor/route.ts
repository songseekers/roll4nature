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
    console.log('Attempting to send sponsor SMS to:', toPhone);

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
      const errorText = await response.text();
      console.error('Twilio API Error Response:', errorText);
      console.error('Status:', response.status);
    } else {
      console.log('Sponsor SMS notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
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
    console.log('Sponsor inquiry saved successfully to database');

    // Send SMS notification (don't let this fail the request)
    try {
      await sendSMS(submission);
    } catch (smsError) {
      console.error('SMS failed but inquiry was saved:', smsError);
    }

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error processing sponsor inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
