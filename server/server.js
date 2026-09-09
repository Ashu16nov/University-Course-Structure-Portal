require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const autoSeed = require('./seed/autoSeed');

const startServer = async () => {
    // Connect to database
    await connectDB();
    
    // Auto seed if empty
    await autoSeed();

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Route files
    const programRoutes = require('./routes/programRoutes');
    const semesterRoutes = require('./routes/semesterRoutes');
    const subjectRoutes = require('./routes/subjectRoutes');
    const authRoutes = require('./routes/authRoutes');
    const dashboardRoutes = require('./routes/dashboardRoutes');

    // Mount routers
    app.use('/api/programs', programRoutes);
    // Re-route into other resource routers
    app.use('/api/programs/:programId/semesters', semesterRoutes);
    app.use('/api/programs/:programId/subjects', subjectRoutes);
    app.use('/api/semesters', semesterRoutes);
    app.use('/api/semesters/:semesterId/subjects', subjectRoutes);
    app.use('/api/subjects', subjectRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/dashboard', dashboardRoutes);

    // Error Handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
