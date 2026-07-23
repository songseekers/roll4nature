import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { checkRateLimit, checkPayloadSize, sanitizeObject } from '@/lib/api-utils';

// ─── Zod Validation Schema ─────────────────────────────────────

const teamBravoSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be under 100 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number is too long'),
  role: z.enum(['driver', 'camera', 'social', 'cyclist', 'other'], {
    message: 'Please select a valid role',
  }),
  availability: z.enum(['full', 'weeks', 'days', 'flexible'], {
    message: 'Please select a valid availability option',
  }),
  comments: z.string().max(2000, 'Comments must be under 2000 characters').optional().default(''),
  veteranStatus: z.enum(['yes', 'military-family', 'no']).nullish(),
  message: z.string().min(10, 'Please tell us why you want to join (at least 10 characters)').max(2000, 'Message must be under 2000 characters'),
});

type TeamBravoInput = z.infer<typeof teamBravoSchema>;

interface ApplicationData extends TeamBravoInput {
  submittedAt: string;
  id: string;
}

// Twilio integration for SMS notifications
const sendSMS = async (applicationData: ApplicationData) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const recipientPhone = process.env.RECIPIENT_PHONE_NUMBER;

  if (!accountSid || !authToken || !twilioPhone || !recipientPhone) {
    console.log('Twilio not configured - skipping SMS notification');
    return;
  }

  try {
    const message = `New Team Bravo Application!\n\nName: ${applicationData.fullName}\nRole: ${applicationData.role}\nEmail: ${applicationData.email}\nPhone: ${applicationData.phone}`;

    console.log('Attempting to send SMS to:', recipientPhone);

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
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
      console.error('Twilio API Error Response:', errorText);
      console.error('Status:', response.status);
    } else {
      console.log('SMS notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
  }
};

// Function to send email via Resend
const sendEmail = async (applicationData: ApplicationData) => {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RECIPIENT_EMAIL;

  if (!apiKey || !recipientEmail) {
    console.log('Resend not configured, skipping email notification');
    return;
  }

  const resend = new Resend(apiKey);

  try {
    console.log('Attempting to send Team Bravo email to:', recipientEmail);

    const { error } = await resend.emails.send({
      from: 'Roll 4 Nature <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `New Team Bravo Application from ${applicationData.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #5C3317, #8B4513); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Team Bravo Application</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 40%;">Full Name:</td>
                <td style="padding: 8px 0; color: #555;">${applicationData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;"><a href="mailto:${applicationData.email}">${applicationData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;"><a href="tel:${applicationData.phone}">${applicationData.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Role Interest:</td>
                <td style="padding: 8px 0; color: #555;">${applicationData.role}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Availability:</td>
                <td style="padding: 8px 0; color: #555;">${applicationData.availability}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Veteran Status:</td>
                <td style="padding: 8px 0; color: #555;">${applicationData.veteranStatus || 'Not specified'}</td>
              </tr>
              ${applicationData.comments ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Comments:</td>
                <td style="padding: 8px 0; color: #555;">${applicationData.comments}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Why They Want to Join:</td>
                <td style="padding: 8px 0; color: #555;">${applicationData.message}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
            <p style="color: #999; font-size: 12px; margin: 0;">
              Submitted on ${new Date(applicationData.submittedAt).toLocaleString('en-US', { timeZone: 'America/New_York' })}
              | ID: ${applicationData.id}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
    } else {
      console.log('Team Bravo email notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export async function POST(request: NextRequest) {
  try {
    // Check payload size (max 10kb)
    if (!checkPayloadSize(request)) {
      return NextResponse.json(
        { error: 'Request payload too large', fields: {} },
        { status: 413 }
      );
    }

    // Rate limiting
    const { allowed } = checkRateLimit(request);
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Sanitize input (trim whitespace, strip HTML tags)
    const sanitizedBody = sanitizeObject(body);

    // Validate with Zod schema
    const result = teamBravoSchema.safeParse(sanitizedBody);
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

    const validated = result.data;

    // Create application record
    const application: ApplicationData = {
      ...validated,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };

    // Save to JSON file (local development only - optional on Vercel)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const dbPath = path.join(dataDir, 'team-bravo-applications.json');

      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      let applications: ApplicationData[] = [];
      if (fs.existsSync(dbPath)) {
        try {
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          applications = JSON.parse(fileContent);

          if (!Array.isArray(applications)) {
            throw new Error('JSON file does not contain an array');
          }
        } catch (parseError) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupPath = path.join(dataDir, `team-bravo-applications-${timestamp}.json.backup`);
          console.error('Error parsing JSON file, archiving to:', backupPath);
          fs.copyFileSync(dbPath, backupPath);
          applications = [];
          fs.writeFileSync(dbPath, JSON.stringify(applications, null, 2));
        }
      }

      applications.push(application);
      fs.writeFileSync(dbPath, JSON.stringify(applications, null, 2));
      console.log('Application saved successfully to database');
    } catch (fileError) {
      console.log('JSON file storage unavailable (expected on Vercel):', fileError instanceof Error ? fileError.message : 'Unknown error');
    }

    // Send SMS and Email notifications in parallel (don't let either fail the request)
    await Promise.allSettled([
      sendSMS(application),
      sendEmail(application),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId: application.id,
    });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
