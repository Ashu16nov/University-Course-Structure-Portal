require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const Admin = require('../models/Admin');
const Program = require('../models/Program');
const Semester = require('../models/Semester');
const Subject = require('../models/Subject');

connectDB();

const importData = async () => {
    try {
        await Admin.deleteMany();
        await Program.deleteMany();
        await Semester.deleteMany();
        await Subject.deleteMany();

        // 1. Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        await Admin.create({
            email: 'admin@university.edu',
            password: hashedPassword
        });

        // 2. Create Programs
        const bca = await Program.create({
            name: 'Bachelor of Computer Applications',
            code: 'BCA',
            duration: '3 Years',
            totalSemesters: 6,
            description: 'Undergraduate program in computer applications.'
        });

        const mca = await Program.create({
            name: 'Master of Computer Applications',
            code: 'MCA',
            duration: '2 Years',
            totalSemesters: 4,
            description: 'Postgraduate program in computer applications.'
        });

        const btech = await Program.create({
            name: 'Bachelor of Technology (CSE)',
            code: 'B.Tech',
            duration: '4 Years',
            totalSemesters: 8,
            description: 'Undergraduate program in engineering.'
        });

        const mtech = await Program.create({
            name: 'Master of Technology (CSE)',
            code: 'M.Tech',
            duration: '2 Years',
            totalSemesters: 4,
            description: 'Postgraduate program in engineering.'
        });

        // 3. Create Semesters for MCA
        const mcaSem1 = await Semester.create({
            program: mca._id,
            semesterNumber: 1,
            name: 'First Semester',
            description: 'Foundation subjects for MCA.'
        });

        const mcaSem2 = await Semester.create({
            program: mca._id,
            semesterNumber: 2,
            name: 'Second Semester',
            description: 'Core subjects for MCA.'
        });

        // Create Semesters for BCA
        const bcaSem1 = await Semester.create({
            program: bca._id,
            semesterNumber: 1,
            name: 'First Semester',
            description: 'Foundation subjects for BCA.'
        });

        // 4. Create Subjects for MCA Sem 1
        await Subject.create([
            {
                program: mca._id,
                semester: mcaSem1._id,
                subjectCode: 'MCA101',
                name: 'Programming Fundamentals',
                credits: 4,
                type: 'Core',
                description: 'Introduction to programming using C/C++.'
            },
            {
                program: mca._id,
                semester: mcaSem1._id,
                subjectCode: 'MCA102',
                name: 'Database Management Systems',
                credits: 4,
                type: 'Core',
                description: 'Relational databases, SQL, and normalization.'
            },
            {
                program: mca._id,
                semester: mcaSem1._id,
                subjectCode: 'MCA103',
                name: 'Computer Networks',
                credits: 3,
                type: 'Core',
                description: 'OSI model, TCP/IP, routing algorithms.'
            },
            {
                program: mca._id,
                semester: mcaSem1._id,
                subjectCode: 'MCA104',
                name: 'Operating Systems',
                credits: 4,
                type: 'Core',
                description: 'Process management, memory management, file systems.'
            },
            {
                program: mca._id,
                semester: mcaSem1._id,
                subjectCode: 'MCA105',
                name: 'Mathematics',
                credits: 3,
                type: 'Core',
                description: 'Discrete mathematics and linear algebra.'
            }
        ]);

        // Create Subjects for MCA Sem 2
        await Subject.create([
            {
                program: mca._id,
                semester: mcaSem2._id,
                subjectCode: 'MCA201',
                name: 'Data Structures',
                credits: 4,
                type: 'Core',
                description: 'Stacks, queues, trees, and graphs.'
            },
            {
                program: mca._id,
                semester: mcaSem2._id,
                subjectCode: 'MCA202',
                name: 'Web Technologies',
                credits: 4,
                type: 'Core',
                description: 'HTML, CSS, JavaScript, and backend frameworks.'
            },
            {
                program: mca._id,
                semester: mcaSem2._id,
                subjectCode: 'MCA203',
                name: 'Software Engineering',
                credits: 3,
                type: 'Core',
                description: 'SDLC, Agile methodologies, software testing.'
            }
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
