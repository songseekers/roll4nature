import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { checkRateLimit, checkPayloadSize, sanitizeObject } from '@/lib/api-utils';

// ─── Zod Validation Schema ─────────────────────────────────────

const flagstaffRsvpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().max(20, 'Phone number is too long').optional(),
  attendees: z.coerce
    .number()
    .int()
    .min(1, 'At least 1 attendee required')
    .max(20, 'Maximum 20 attendees'),
  certainty: z.coerce
    .number()
    .int()
    .min(1, 'Please select a certainty level')
    .max(10, 'Please select a certainty level'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
  smsConsent: z.boolean(),
});

type FlagstaffRsvpInput = z.infer<typeof flagstaffRsvpSchema>;

interface RsvpRecord extends FlagstaffRsvpInput {
  id: string;
  submittedAt: string;
}

interface RsvpStorage {
  rsvps: RsvpRecord[];
  lastUpdated: string;
}

// ─── SMS Notification ──────────────────────────────────────────

const sendSMS = async (rsvp: RsvpRecord) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const recipientPhone = process.env.RECIPIENT_PHONE_NUMBER;

  if (!accountSid || !authToken || !twilioPhone || !recipientPhone) {
    console.log('Twilio not configured - skipping SMS notification');
    return;
  }

  const message = `🎆 New Flagstaff RSVP!\nName: ${rsvp.name}\nEmail: ${rsvp.email}\nPhone: ${rsvp.phone || 'not provided'}\nParty size: ${rsvp.attendees}\nCertainty: ${rsvp.certainty}/10\nNotes: ${rsvp.notes || 'none'}`;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: recipientPhone,
          From: twilioPhone,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Twilio API Error:', response.status, errorText);
    } else {
      console.log('Flagstaff RSVP SMS sent successfully');
    }
  } catch (error) {
    console.error('Error sending SMS:', error instanceof Error ? error.message : error);
  }
};

// ─── Email Notification ────────────────────────────────────────

const sendEmail = async (rsvp: RsvpRecord) => {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RECIPIENT_EMAIL;

  if (!apiKey || !recipientEmail) {
    console.log('Resend not configured - skipping email notification');
    return;
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: 'Roll for Veterans <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Flagstaff RSVP - ${rsvp.name} (${rsvp.certainty}/10)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1B3A6B, #0D2550); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎆 New Flagstaff RSVP</h1>
            <p style="color: #93C5FD; margin: 6px 0 0; font-size: 14px;">July 4th, 2026 Celebration</p>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 40%;">Name:</td>
                <td style="padding: 8px 0; color: #555;">${rsvp.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;"><a href="mailto:${rsvp.email}">${rsvp.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;">${rsvp.phone ? `<a href="tel:${rsvp.phone}">${rsvp.phone}</a>` : 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Party Size:</td>
                <td style="padding: 8px 0; color: #555;">${rsvp.attendees} attendee${rsvp.attendees !== 1 ? 's' : ''}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Certainty:</td>
                <td style="padding: 8px 0; color: #555; font-size: 16px;"><strong>${rsvp.certainty}/10</strong></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">SMS Consent:</td>
                <td style="padding: 8px 0; color: #555;">${rsvp.smsConsent ? 'Yes' : 'No'}</td>
              </tr>
              ${rsvp.notes ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Notes:</td>
                <td style="padding: 8px 0; color: #555;">${rsvp.notes}</td>
              </tr>
              ` : ''}
            </table>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted on ${new Date(rsvp.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}
              | ID: ${rsvp.id}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
    } else {
      console.log('Flagstaff RSVP email sent successfully');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// ─── POST Handler ──────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    if (!checkPayloadSize(request)) {
      return NextResponse.json(
        { error: 'Request payload too large', fields: {} },
        { status: 413 }
      );
    }

    const { allowed } = checkRateLimit(request);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const sanitizedBody = sanitizeObject(body);

    const result = flagstaffRsvpSchema.safeParse(sanitizedBody);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0]?.toString() || 'unknown';
        fieldErrors[fieldName] = issue.message;
      }
      return NextResponse.json(
        { error: 'Validation failed', fields: fieldErrors },
        { status: 400 }
      );
    }

    const rsvp: RsvpRecord = {
      ...result.data,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };

    // Save to JSON file (local / Vercel file system)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const filePath = path.join(dataDir, 'flagstaff-rsvps.json');

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      let storage: RsvpStorage = { rsvps: [], lastUpdated: '' };
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          storage = JSON.parse(fileContent);
          if (!Array.isArray(storage.rsvps)) {
            throw new Error('JSON file structure invalid');
          }
        } catch {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupPath = path.join(dataDir, `flagstaff-rsvps-${timestamp}.json.backup`);
          console.error('Error parsing JSON file, archiving to:', backupPath);
          fs.copyFileSync(filePath, backupPath);
          storage = { rsvps: [], lastUpdated: '' };
          fs.writeFileSync(filePath, JSON.stringify(storage, null, 2));
        }
      }

      storage.rsvps.push(rsvp);
      storage.lastUpdated = rsvp.submittedAt;
      fs.writeFileSync(filePath, JSON.stringify(storage, null, 2));
      console.log('Flagstaff RSVP saved successfully');
    } catch (fileError) {
      console.log(
        'JSON file storage unavailable (expected on Vercel):',
        fileError instanceof Error ? fileError.message : 'Unknown error'
      );
    }

    await Promise.allSettled([sendSMS(rsvp), sendEmail(rsvp)]);

    return NextResponse.json({
      success: true,
      message: 'RSVP submitted successfully!',
      rsvpId: rsvp.id,
    });
  } catch (error) {
    console.error('Error processing Flagstaff RSVP:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}
