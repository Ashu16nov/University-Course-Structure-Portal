const Semester = require('../models/Semester');

exports.getSemesters = async (req, res) => {
    try {
        const semesters = await Semester.find().populate('program');
        res.status(200).json(semesters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSemestersByProgram = async (req, res) => {
    try {
        const semesters = await Semester.find({ program: req.params.programId }).populate('program');
        res.status(200).json(semesters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSemester = async (req, res) => {
    try {
        const semester = new Semester(req.body);
        const savedSemester = await semester.save();
        res.status(201).json(savedSemester);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSemester = async (req, res) => {
    try {
        const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(semester);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSemester = async (req, res) => {
    try {
        await Semester.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Semester deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
