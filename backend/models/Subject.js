const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true
    },
    code: {
        type: String,
        required: [true, 'Please add a subject code']
    },
    title: {
        type: String,
        required: [true, 'Please add a subject title']
    },
    credits: {
        type: Number,
        required: [true, 'Please add credits']
    }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
