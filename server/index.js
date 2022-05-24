import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(8800, () => {
    connect();
    console.log('Server is running on port 8800');
})