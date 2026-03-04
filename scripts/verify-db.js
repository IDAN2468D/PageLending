const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const LeadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String,
    source: String,
    createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

async function testConnection() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully.');

        const leads = await Lead.find().sort({ createdAt: -1 }).limit(1);

        if (leads.length > 0) {
            console.log('LATEST LEAD IN DATABASE:');
            console.log(JSON.stringify(leads[0], null, 2));
        } else {
            console.log('No leads found in database.');
        }

        await mongoose.disconnect();
        console.log('Disconnected.');
    } catch (err) {
        console.error('DATABASE ERROR:', err);
        process.exit(1);
    }
}

testConnection();
