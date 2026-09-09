const Admin = require('../models/Admin');
const Program = require('../models/Program');
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');
const bcrypt = require('bcryptjs');

const seedIfEmpty = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            console.log('Database already has data. Skipping automatic seed.');
            return;
        }

        console.log('Seeding comprehensive data...');
        // 1. Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        await Admin.create({
            email: 'admin@university.edu',
            password: hashedPassword
        });

        // Data structure for programs
        const programsData = [
            {
                name: 'Bachelor of Computer Applications', code: 'BCA', duration: '3 Years', totalSemesters: 6,
                description: 'Undergraduate program in computer applications.',
                semesters: [
                    {
                        number: 1, name: 'First Semester', desc: 'Foundation for BCA',
                        subjects: [
                            { code: 'BCA101', name: 'Computer Fundamentals', credits: 4, type: 'Core' },
                            { code: 'BCA102', name: 'C Programming', credits: 4, type: 'Core' },
                            { code: 'BCA103', name: 'Mathematics I', credits: 3, type: 'Core' },
                        ]
                    },
                    {
                        number: 2, name: 'Second Semester', desc: 'Core BCA concepts',
                        subjects: [
                            { code: 'BCA201', name: 'Data Structures', credits: 4, type: 'Core' },
                            { code: 'BCA202', name: 'DBMS', credits: 4, type: 'Core' },
                        ]
                    }
                ]
            },
            {
                name: 'Bachelor of Business Administration', code: 'BBA', duration: '3 Years', totalSemesters: 6,
                description: 'Undergraduate program in business administration.',
                semesters: [
                    {
                        number: 1, name: 'First Semester', desc: 'Foundation for Business',
                        subjects: [
                            { code: 'BBA101', name: 'Principles of Management', credits: 4, type: 'Core' },
                            { code: 'BBA102', name: 'Business Economics', credits: 4, type: 'Core' },
                            { code: 'BBA103', name: 'Financial Accounting', credits: 4, type: 'Core' },
                        ]
                    },
                    {
                        number: 2, name: 'Second Semester', desc: 'Core BBA concepts',
                        subjects: [
                            { code: 'BBA201', name: 'Marketing Management', credits: 4, type: 'Core' },
                            { code: 'BBA202', name: 'Business Communication', credits: 4, type: 'Core' },
                        ]
                    }
                ]
            },
            {
                name: 'Bachelor of Technology (CSE)', code: 'B.Tech', duration: '4 Years', totalSemesters: 8,
                description: 'Undergraduate program in engineering.',
                semesters: [
                    {
                        number: 1, name: 'First Semester', desc: 'Common Engineering Subjects',
                        subjects: [
                            { code: 'BT101', name: 'Engineering Physics', credits: 4, type: 'Core' },
                            { code: 'BT102', name: 'Engineering Mathematics I', credits: 4, type: 'Core' },
                            { code: 'BT103', name: 'Basic Electrical Engineering', credits: 3, type: 'Core' },
                        ]
                    },
                    {
                        number: 2, name: 'Second Semester', desc: 'Intro to CSE',
                        subjects: [
                            { code: 'BT201', name: 'Programming for Problem Solving', credits: 4, type: 'Core' },
                            { code: 'BT202', name: 'Engineering Chemistry', credits: 4, type: 'Core' },
                        ]
                    }
                ]
            },
            {
                name: 'Master of Computer Applications', code: 'MCA', duration: '2 Years', totalSemesters: 4,
                description: 'Postgraduate program in computer applications.',
                semesters: [
                    {
                        number: 1, name: 'First Semester', desc: 'Foundation subjects for MCA.',
                        subjects: [
                            { code: 'MCA101', name: 'Programming Fundamentals', credits: 4, type: 'Core' },
                            { code: 'MCA102', name: 'Database Management Systems', credits: 4, type: 'Core' },
                            { code: 'MCA103', name: 'Computer Networks', credits: 3, type: 'Core' },
                            { code: 'MCA104', name: 'Operating Systems', credits: 4, type: 'Core' }
                        ]
                    },
                    {
                        number: 2, name: 'Second Semester', desc: 'Core subjects for MCA.',
                        subjects: [
                            { code: 'MCA201', name: 'Data Structures', credits: 4, type: 'Core' },
                            { code: 'MCA202', name: 'Web Technologies', credits: 4, type: 'Core' },
                            { code: 'MCA203', name: 'Software Engineering', credits: 3, type: 'Core' }
                        ]
                    }
                ]
            },
            {
                name: 'Master of Technology (CSE)', code: 'M.Tech', duration: '2 Years', totalSemesters: 4,
                description: 'Postgraduate program in engineering.',
                semesters: [
                    {
                        number: 1, name: 'First Semester', desc: 'Advanced CSE concepts',
                        subjects: [
                            { code: 'MT101', name: 'Advanced Algorithms', credits: 4, type: 'Core' },
                            { code: 'MT102', name: 'Machine Learning', credits: 4, type: 'Core' },
                        ]
                    }
                ]
            },
            {
                name: 'Master of Business Administration', code: 'MBA', duration: '2 Years', totalSemesters: 4,
                description: 'Postgraduate program in business administration and management.',
                semesters: [
                    {
                        number: 1, name: 'First Semester', desc: 'Management Fundamentals',
                        subjects: [
                            { code: 'MBA101', name: 'Principles of Management', credits: 4, type: 'Core' },
                            { code: 'MBA102', name: 'Managerial Economics', credits: 4, type: 'Core' },
                            { code: 'MBA103', name: 'Accounting for Managers', credits: 4, type: 'Core' },
                            { code: 'MBA104', name: 'Organizational Behavior', credits: 3, type: 'Core' },
                        ]
                    },
                    {
                        number: 2, name: 'Second Semester', desc: 'Advanced Management',
                        subjects: [
                            { code: 'MBA201', name: 'Financial Management', credits: 4, type: 'Core' },
                            { code: 'MBA202', name: 'Marketing Management', credits: 4, type: 'Core' },
                            { code: 'MBA203', name: 'Human Resource Management', credits: 4, type: 'Core' },
                        ]
                    }
                ]
            }
        ];

        for (const progData of programsData) {
            const program = await Program.create({
                name: progData.name,
                code: progData.code,
                duration: progData.duration,
                totalSemesters: progData.totalSemesters,
                description: progData.description
            });

            for (const semData of progData.semesters) {
                const semester = await Semester.create({
                    program: program._id,
                    semesterNumber: semData.number,
                    name: semData.name,
                    description: semData.desc
                });

                for (const subData of semData.subjects) {
                    await Subject.create({
                        program: program._id,
                        semester: semester._id,
                        subjectCode: subData.code,
                        name: subData.name,
                        credits: subData.credits,
                        type: subData.type,
                        description: subData.name + ' concepts and applications.'
                    });
                }
            }
        }

        console.log('Seed data inserted successfully!');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
};

module.exports = seedIfEmpty;
