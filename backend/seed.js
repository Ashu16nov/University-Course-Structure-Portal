require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Program = require('./models/Program');
const Semester = require('./models/Semester');
const Subject = require('./models/Subject');

const connectDB = require('./config/db');

const programsData = [
    { name: 'BCA', desc: 'Bachelor of Computer Applications', years: 3, prefix: 'BC' },
    { name: 'BBA', desc: 'Bachelor of Business Administration', years: 3, prefix: 'BB' },
    { name: 'BCom', desc: 'Bachelor of Commerce', years: 3, prefix: 'BCM' },
    { name: 'BTech', desc: 'Bachelor of Technology', years: 4, prefix: 'BT' },
    { name: 'MCA', desc: 'Master of Computer Applications', years: 2, prefix: 'MC' },
    { name: 'MBA', desc: 'Master of Business Administration', years: 2, prefix: 'MB' },
    { name: 'MCom', desc: 'Master of Commerce', years: 2, prefix: 'MCM' },
    { name: 'MTech', desc: 'Master of Technology', years: 2, prefix: 'MT' }
];

const seedData = async () => {
    try {
        await connectDB();

        await User.deleteMany();
        await Program.deleteMany();
        await Semester.deleteMany();
        await Subject.deleteMany();

        console.log('Data cleared.');

        // Users
        await User.create([
            { name: 'Admin', email: 'admin@test.com', password: 'password123', role: 'admin' },
            { name: 'Ashu', email: 'user@test.com', password: 'password123', role: 'user' }
        ]);
        console.log('Users created.');

        for (const p of programsData) {
            // Create Program
            const prog = await Program.create({
                name: p.name,
                description: p.desc,
                durationYears: p.years
            });

            const numSemesters = p.years * 2;
            
            // Create Semesters and Subjects
            for (let i = 1; i <= numSemesters; i++) {
                const sem = await Semester.create({
                    program: prog._id,
                    number: i,
                    description: `${p.name} Semester ${i}`
                });

                // Generate 3 subjects per semester
                const subjects = [
                    {
                        semester: sem._id,
                        code: `${p.prefix}${i}01`,
                        title: `Core Subject ${i}.1`,
                        credits: 4
                    },
                    {
                        semester: sem._id,
                        code: `${p.prefix}${i}02`,
                        title: `Core Subject ${i}.2`,
                        credits: 3
                    },
                    {
                        semester: sem._id,
                        code: `${p.prefix}${i}03`,
                        title: `Elective Subject ${i}.3`,
                        credits: 3
                    }
                ];
                await Subject.insertMany(subjects);
            }
        }

        console.log('Programs, Semesters, and Subjects created successfully.');
        console.log('Data seeding complete!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
