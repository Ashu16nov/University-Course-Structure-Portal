const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a program name'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    durationYears: {
        type: Number,
        required: [true, 'Please add duration in years']
    }
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
