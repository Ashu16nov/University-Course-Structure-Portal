const Program = require('../models/Program');

// Get all programs
exports.getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a program
exports.createProgram = async (req, res) => {
    try {
        const program = new Program(req.body);
        const savedProgram = await program.save();
        res.status(201).json(savedProgram);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a program
exports.updateProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(program);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
    try {
        await Program.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Program deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
