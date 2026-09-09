const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        // Try connecting to the provided URI first (local or Atlas)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 2000 // Short timeout to quickly fallback
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Failed to connect to primary MongoDB, falling back to In-Memory Database...');
        try {
            const mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            const conn = await mongoose.connect(mongoUri);
            console.log(`MongoDB In-Memory Server Connected: ${conn.connection.host}`);
            
            // To make sure seed data works when using memory server for the first time
            console.log('Note: Data will be lost when the server stops because it is running in memory.');
        } catch (memError) {
            console.error(`In-Memory Error: ${memError.message}`);
            process.exit(1);
        }
    }
};

module.exports = connectDB;
