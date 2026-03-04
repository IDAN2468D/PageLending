const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const LeadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String,
    source: String,
    createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

async function createInternalLead() {
    console.log('Connecting...');
    await mongoose.connect(MONGODB_URI);
    console.log('Creating lead...');

    const testLead = await Lead.create({
        name: "System Test",
        phone: "0500000000",
        email: "sys@test.com",
        message: "Manual internal test",
        source: "internal_test"
    });

    console.log('CREATED:', testLead);
    await mongoose.disconnect();
}

createInternalLead().catch(console.error);
