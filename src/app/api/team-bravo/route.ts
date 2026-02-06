import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Twilio integration for SMS notifications
const sendSMS = async (applicationData: any) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
  const recipientPhone = process.env.RECIPIENT_PHONE_NUMBER;

  // Only send SMS if Twilio is configured
  if (!accountSid || !authToken || !twilioPhone || !recipientPhone) {
    console.log('Twilio not configured - skipping SMS notification');
    return;
  }

  try {
    const message = `New Team Bravo Application!\n\nName: ${applicationData.fullName}\nRole: ${applicationData.role}\nEmail: ${applicationData.email}\nPhone: ${applicationData.phone}`;

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
      console.error('Failed to send SMS:', await response.text());
    } else {
      console.log('SMS notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Create application record with timestamp
    const application = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      role: body.role,
      availability: body.availability,
      comments: body.comments,
      veteranStatus: body.veteranStatus,
      message: body.message,
    };

    // Define database file path
    const dbPath = path.join(process.cwd(), 'data', 'team-bravo-applications.json');

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing applications or create empty array
    let applications = [];
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, 'utf-8');
      applications = JSON.parse(fileContent);
    }

    // Add new application
    applications.push(application);

    // Write back to file
    fs.writeFileSync(dbPath, JSON.stringify(applications, null, 2));

    // Send SMS notification
    await sendSMS(application);

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
