const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.route('/stats').get(getDashboardStats); // Kept public for landing page? Wait, dashboard is usually protected. 
// But the landing page also shows "Total Programs, Total Semesters" according to instructions.
// "5.1 Home Page: Statistics Section: Display dynamically: Total Programs... from backend APIs."
// So this route needs to be public.

module.exports = router;
