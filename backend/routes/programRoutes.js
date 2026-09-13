const express = require('express');
const router = express.Router();
const { getPrograms, createProgram, updateProgram, deleteProgram } = require('../controllers/programController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPrograms).post(protect, admin, createProgram);
router.route('/:id').put(protect, admin, updateProgram).delete(protect, admin, deleteProgram);

module.exports = router;
