const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    program: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Program'
    },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Semester'
    },
    subjectCode: {
        type: String,
        required: [true, 'Please add a subject code']
    },
    name: {
        type: String,
        required: [true, 'Please add a subject name']
    },
    credits: {
        type: Number,
        required: [true, 'Please add credits']
    },
    type: {
        type: String,
        required: [true, 'Please add a subject type'],
        enum: ['Core', 'Elective', 'Practical', 'Project', 'Laboratory']
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);
