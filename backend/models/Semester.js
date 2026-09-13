const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    number: {
        type: Number,
        required: [true, 'Please add a semester number']
    },
    description: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Semester', semesterSchema);
