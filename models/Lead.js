import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        maxlength: [20, 'Phone number cannot be more than 20 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        maxlength: [100, 'Email cannot be more than 100 characters'],
    },
    message: {
        type: String,
        maxlength: [1000, 'Message cannot be more than 1000 characters'],
    },
    source: {
        type: String, // e.g., 'contact_form', 'exit_intent'
        default: 'contact_form'
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'converted', 'rejected'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
