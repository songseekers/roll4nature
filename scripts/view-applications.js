// Simple script to view Team Bravo applications
// Run with: node scripts/view-applications.js

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'team-bravo-applications.json');

if (!fs.existsSync(dbPath)) {
  console.log('No applications found yet.');
  process.exit(0);
}

const applications = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

console.log(`\n=== Team Bravo Applications (${applications.length} total) ===\n`);

applications.forEach((app, index) => {
  console.log(`Application #${index + 1}`);
  console.log(`Submitted: ${new Date(app.submittedAt).toLocaleString()}`);
  console.log(`Name: ${app.fullName}`);
  console.log(`Email: ${app.email}`);
  console.log(`Phone: ${app.phone}`);
  console.log(`Role: ${app.role}`);
  console.log(`Availability: ${app.availability}`);
  console.log(`Veteran Status: ${app.veteranStatus || 'Not specified'}`);
  console.log(`Message: ${app.message}`);
  console.log(`ID: ${app.id}`);
  console.log('-'.repeat(60));
  console.log('');
});

console.log(`Total applications: ${applications.length}\n`);
