const Program = require('../models/Program');
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Public
const getDashboardStats = async (req, res) => {
    try {
        const programsCount = await Program.countDocuments();
        const semestersCount = await Semester.countDocuments();
        const subjectsCount = await Subject.countDocuments();
        
        // Aggregate to get total credits
        const creditsResult = await Subject.aggregate([
            { $group: { _id: null, totalCredits: { $sum: '$credits' } } }
        ]);
        
        const totalCredits = creditsResult.length > 0 ? creditsResult[0].totalCredits : 0;

        res.status(200).json({
            success: true,
            data: {
                programs: programsCount,
                semesters: semestersCount,
                subjects: subjectsCount,
                credits: totalCredits
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getDashboardStats
};
