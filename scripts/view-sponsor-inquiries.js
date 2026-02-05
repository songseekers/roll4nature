const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'sponsor-inquiries.json');

console.log('\n=== SPONSOR INQUIRIES ===\n');

if (!fs.existsSync(filePath)) {
  console.log('No sponsor inquiries yet. File does not exist.');
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

if (data.length === 0) {
  console.log('No sponsor inquiries yet.');
  process.exit(0);
}

console.log(`Total Inquiries: ${data.length}\n`);

data.forEach((inquiry, index) => {
  console.log(`\n--- Inquiry #${index + 1} ---`);
  console.log(`ID: ${inquiry.id}`);
  console.log(`Name/Org: ${inquiry.fullName}`);
  console.log(`Email: ${inquiry.email}`);
  console.log(`Phone: ${inquiry.phone}`);
  console.log(`Best Time: ${inquiry.bestTime}`);
  console.log(`Interest: ${inquiry.sponsorshipInterest}`);
  if (inquiry.message) {
    console.log(`Message: ${inquiry.message}`);
  }
  console.log(`Submitted: ${new Date(inquiry.submittedAt).toLocaleString()}`);
  console.log('---');
});

console.log('\n');
