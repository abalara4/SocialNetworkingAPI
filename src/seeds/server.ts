import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User'; // Import your User model
import Thought from '../models/Thoughts'; // Import your Thought model

const app = express();
const PORT = process.env.PORT || 3001;

// Seed data
const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Create sample users
        const users = await User.insertMany([
            { username: 'user1', email: 'user1@example.com' },
            { username: 'user2', email: 'user2@example.com' },
        ]);

        // Create sample thoughts
        const thoughts = await Thought.insertMany([
            { thoughtText: 'This is the first thought!', username: 'user1' },
            { thoughtText: 'This is the second thought!', username: 'user2' },
        ]);

        console.log('Seed data created:', { users, thoughts });
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after seeding
    }
};

// Start the server and seed the database
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    seedData(); // Call the seed function
});