# Team Bravo Application Form Setup

The Team Bravo application form is now fully functional! Here's how it works and how to set it up.

## How It Works

When someone submits the Team Bravo application form:
1. **Data is saved** to `data/team-bravo-applications.json` (a simple database file)
2. **You receive an SMS** notification with the applicant's key details (if Twilio is configured)

## Database Storage

All applications are automatically saved to:
```
c:\code\songseekers\data\team-bravo-applications.json
```

Each application includes:
- Full name
- Email
- Phone
- Role interest
- Availability
- Veteran status
- Message/motivation
- Submission timestamp
- Unique ID

### Viewing Applications

To view all submissions, run:
```bash
node scripts/view-applications.js
```

Or just open the JSON file in any text editor.

## SMS Notifications (Optional)

To receive text message notifications when someone applies:

### 1. Sign up for Twilio
- Go to https://www.twilio.com/try-twilio
- Sign up for a free account (includes $15 credit)
- Get a free phone number

### 2. Get Your Credentials
From your Twilio dashboard, copy:
- Account SID
- Auth Token
- Your Twilio phone number

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:
```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
RECIPIENT_PHONE_NUMBER=+18282804709
```

Replace with your actual values.

### 4. Restart the Server
```bash
npm run build
npm run start
```

## SMS Message Format

When someone applies, you'll receive a text like:
```
New Team Bravo Application!

Name: John Smith
Role: Support Driver
Email: john@example.com
Phone: (555) 123-4567
```

## Important Notes

- **The form works without Twilio** - applications are still saved to the database, you just won't get SMS notifications
- **Never commit `.env.local`** to git - it contains sensitive credentials
- **Twilio free tier** gives you $15 credit (about 500 SMS messages)
- After using free credit, SMS costs about $0.0075 per message

## Troubleshooting

If the form doesn't work:
1. Check the browser console for errors
2. Check the server logs (terminal where you ran `npm run start`)
3. Verify the `data` folder exists and is writable
4. If SMS isn't sending, check your Twilio credentials in `.env.local`

## Exporting Applications

The JSON file can be easily converted to CSV/Excel:
1. Open the JSON file
2. Copy the content
3. Use a free online JSON to CSV converter
4. Import into Excel or Google Sheets
