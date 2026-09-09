const Semester = require('../models/Semester');
const Subject = require('../models/Subject');

// @desc    Get all semesters
// @route   GET /api/semesters
// @access  Public
const getSemesters = async (req, res) => {
    try {
        const semesters = await Semester.find().populate('program', 'name code');
        res.status(200).json({ success: true, data: semesters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get semesters by program
// @route   GET /api/programs/:programId/semesters
// @access  Public
const getSemestersByProgram = async (req, res) => {
    try {
        const semesters = await Semester.find({ program: req.params.programId });
        res.status(200).json({ success: true, data: semesters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single semester
// @route   GET /api/semesters/:id
// @access  Public
const getSemester = async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id).populate('program', 'name code');
        if (!semester) {
            return res.status(404).json({ success: false, message: 'Semester not found' });
        }
        res.status(200).json({ success: true, data: semester });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create semester
// @route   POST /api/semesters
// @access  Private
const createSemester = async (req, res) => {
    try {
        const semester = await Semester.create(req.body);
        res.status(201).json({ success: true, message: 'Semester created successfully', data: semester });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update semester
// @route   PUT /api/semesters/:id
// @access  Private
const updateSemester = async (req, res) => {
    try {
        const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!semester) {
            return res.status(404).json({ success: false, message: 'Semester not found' });
        }
        res.status(200).json({ success: true, message: 'Semester updated successfully', data: semester });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete semester
// @route   DELETE /api/semesters/:id
// @access  Private
const deleteSemester = async (req, res) => {
    try {
        const semester = await Semester.findById(req.params.id);
        if (!semester) {
            return res.status(404).json({ success: false, message: 'Semester not found' });
        }

        // Cascading deletion
        await Subject.deleteMany({ semester: req.params.id });
        await semester.deleteOne();

        res.status(200).json({ success: true, message: 'Semester deleted successfully', data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getSemesters,
    getSemestersByProgram,
    getSemester,
    createSemester,
    updateSemester,
    deleteSemester
};
