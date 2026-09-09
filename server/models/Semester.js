const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    program: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Program'
    },
    semesterNumber: {
        type: Number,
        required: [true, 'Please add a semester number']
    },
    name: {
        type: String,
        required: [true, 'Please add a semester name']
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Semester', semesterSchema);
