const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a program name']
    },
    code: {
        type: String,
        required: [true, 'Please add a program code'],
        unique: true
    },
    duration: {
        type: String,
        required: [true, 'Please add a program duration']
    },
    totalSemesters: {
        type: Number,
        required: [true, 'Please add the total number of semesters']
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Program', programSchema);
