import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    profilePhoto: {
        type: String, // store URL or file path
        default: ''
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/ // example: 10-digit number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Player =  mongoose.model('Player', playerSchema);

export default Player