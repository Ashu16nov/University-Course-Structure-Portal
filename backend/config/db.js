const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        
        // Fallback to direct URI if DNS resolution fails for mongodb+srv
        if (error.message.includes('querySrv')) {
            console.log("DNS Resolution failed for SRV record. Trying fallback direct URI...");
            try {
                const fallbackUri = 'mongodb://mranonymous16nov_db_user:0DlIRZQG42sJPMRm@ac-d3gdub0-shard-00-00.b9grtr3.mongodb.net:27017,ac-d3gdub0-shard-00-01.b9grtr3.mongodb.net:27017,ac-d3gdub0-shard-00-02.b9grtr3.mongodb.net:27017/university_db?ssl=true&authSource=admin&replicaSet=atlas-3l4y3i-shard-0&appName=Cluster0';
                const fallbackConn = await mongoose.connect(fallbackUri);
                console.log(`MongoDB Connected via fallback: ${fallbackConn.connection.host}`);
                return;
            } catch (fallbackError) {
                console.error(`Fallback Error: ${fallbackError.message}`);
            }
        }
        process.exit(1);
    }
};

module.exports = connectDB;
