const Subject = require('../models/Subject');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('program', 'name code').populate('semester', 'semesterNumber name');
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get subjects by program
// @route   GET /api/programs/:programId/subjects
// @access  Public
const getSubjectsByProgram = async (req, res) => {
    try {
        const subjects = await Subject.find({ program: req.params.programId }).populate('semester', 'semesterNumber name');
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get subjects by semester
// @route   GET /api/semesters/:semesterId/subjects
// @access  Public
const getSubjectsBySemester = async (req, res) => {
    try {
        const subjects = await Subject.find({ semester: req.params.semesterId });
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Public
const getSubject = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).populate('program', 'name code').populate('semester', 'semesterNumber name');
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, data: subject });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create subject
// @route   POST /api/subjects
// @access  Private
const createSubject = async (req, res) => {
    try {
        const subject = await Subject.create(req.body);
        res.status(201).json({ success: true, message: 'Subject created successfully', data: subject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, message: 'Subject updated successfully', data: subject });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }
        res.status(200).json({ success: true, message: 'Subject deleted successfully', data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getSubjects,
    getSubjectsByProgram,
    getSubjectsBySemester,
    getSubject,
    createSubject,
    updateSubject,
    deleteSubject
};
