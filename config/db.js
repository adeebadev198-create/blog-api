const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) return; // Pehle se connected hai
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected`);
    } catch (error) {
        console.error(`❌ DB Error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;