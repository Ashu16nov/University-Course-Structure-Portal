const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getSemesters,
    getSemestersByProgram,
    getSemester,
    createSemester,
    updateSemester,
    deleteSemester
} = require('../controllers/semesterController');
const { protect } = require('../middleware/authMiddleware');

// If routed from /api/programs/:programId/semesters, it will hit here
router.route('/')
    .get((req, res, next) => {
        if (req.params.programId) {
            return getSemestersByProgram(req, res, next);
        }
        return getSemesters(req, res, next);
    })
    .post(protect, createSemester);

router.route('/:id')
    .get(getSemester)
    .put(protect, updateSemester)
    .delete(protect, deleteSemester);

module.exports = router;
