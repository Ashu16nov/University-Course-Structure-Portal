const Program = require('../models/Program');
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.status(200).json({ success: true, data: programs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single program
// @route   GET /api/programs/:id
// @access  Public
const getProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }
        res.status(200).json({ success: true, data: program });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create program
// @route   POST /api/programs
// @access  Private
const createProgram = async (req, res) => {
    try {
        const program = await Program.create(req.body);
        res.status(201).json({ success: true, message: 'Program created successfully', data: program });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private
const updateProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }
        res.status(200).json({ success: true, message: 'Program updated successfully', data: program });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private
const deleteProgram = async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }

        // Cascading deletion is requested as a possible strategy or prevent deletion.
        // Let's implement cascading deletion
        await Semester.deleteMany({ program: req.params.id });
        await Subject.deleteMany({ program: req.params.id });
        await program.deleteOne();

        res.status(200).json({ success: true, message: 'Program deleted successfully', data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
};
