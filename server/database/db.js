import mongoose from 'mongoose';

const Connection = async () => {
    try {
        const mongoURL = process.env.MONGO_URL;
        if (!mongoURL) {
            throw new Error('MongoDB connection string is missing in environment variables');
        }

        await mongoose.connect(mongoURL);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(`Error while connecting to database: ${error.message}`);
    }
};

export default Connection;
