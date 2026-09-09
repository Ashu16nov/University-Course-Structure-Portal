const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getSubjects,
    getSubjectsByProgram,
    getSubjectsBySemester,
    getSubject,
    createSubject,
    updateSubject,
    deleteSubject
} = require('../controllers/subjectController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get((req, res, next) => {
        if (req.params.programId) {
            return getSubjectsByProgram(req, res, next);
        }
        if (req.params.semesterId) {
            return getSubjectsBySemester(req, res, next);
        }
        return getSubjects(req, res, next);
    })
    .post(protect, createSubject);

router.route('/:id')
    .get(getSubject)
    .put(protect, updateSubject)
    .delete(protect, deleteSubject);

module.exports = router;
