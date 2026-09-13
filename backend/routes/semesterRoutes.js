const express = require('express');
const router = express.Router();
const { getSemesters, getSemestersByProgram, createSemester, updateSemester, deleteSemester } = require('../controllers/semesterController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSemesters).post(protect, admin, createSemester);
router.route('/program/:programId').get(protect, getSemestersByProgram);
router.route('/:id').put(protect, admin, updateSemester).delete(protect, admin, deleteSemester);

module.exports = router;
