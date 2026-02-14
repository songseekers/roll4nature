import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
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

// Function to send email via Resend
const sendEmail = async (sponsorData: SponsorData) => {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RECIPIENT_EMAIL;

  if (!apiKey || !recipientEmail) {
    console.log('Resend not configured, skipping email notification');
    return;
  }

  const resend = new Resend(apiKey);

  try {
    console.log('Attempting to send sponsor email to:', recipientEmail);

    const { error } = await resend.emails.send({
      from: 'Roll for Veterans <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Sponsor Inquiry from ${sponsorData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #C1592B, #8B4513); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Sponsor Inquiry</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 40%;">Name / Organization:</td>
                <td style="padding: 8px 0; color: #555;">${sponsorData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;"><a href="mailto:${sponsorData.email}">${sponsorData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;"><a href="tel:${sponsorData.phone}">${sponsorData.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Best Time to Contact:</td>
                <td style="padding: 8px 0; color: #555;">${sponsorData.bestTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Sponsorship Interest:</td>
                <td style="padding: 8px 0; color: #555;">${sponsorData.sponsorshipInterest}</td>
              </tr>
              ${sponsorData.message ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Additional Info:</td>
                <td style="padding: 8px 0; color: #555;">${sponsorData.message}</td>
              </tr>
              ` : ''}
            </table>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted on ${new Date(sponsorData.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}
              | ID: ${sponsorData.id}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
    } else {
      console.log('Sponsor email notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending email:', error);
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

    // Save to JSON file (local development only - optional on Vercel)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = path.join(dataDir, 'sponsor-inquiries.json');

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      let existingData: SponsorData[] = [];
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          existingData = JSON.parse(fileContent);

          if (!Array.isArray(existingData)) {
            throw new Error('JSON file does not contain an array');
          }
        } catch (parseError) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupPath = path.join(dataDir, `sponsor-inquiries-${timestamp}.json.backup`);
          console.error('Error parsing JSON file, archiving to:', backupPath);
          fs.copyFileSync(filePath, backupPath);
          existingData = [];
          fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        }
      }

      existingData.push(submission);
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      console.log('Sponsor inquiry saved successfully to database');
    } catch (fileError) {
      console.log('JSON file storage unavailable (expected on Vercel):', fileError instanceof Error ? fileError.message : 'Unknown error');
    }

    // Send SMS and Email notifications in parallel (don't let either fail the request)
    await Promise.allSettled([
      sendSMS(submission),
      sendEmail(submission),
    ]);

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error processing sponsor inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
