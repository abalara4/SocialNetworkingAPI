import mongoose from 'mongoose';

// Define the connection string to your MongoDB database
const connectionString = 'mongodb://localhost:27017/socialNetworkAPI'; // Replace 'yourDatabaseName' with your actual database name

// Connect to the MongoDB database
mongoose.connect(connectionString)
    .then(() => {
        console.log('Mongoose is connected to ' + connectionString);
    })
    .catch((err) => {
        console.error('Mongoose connection error: ' + err);
    });

// Export the connection
export default mongoose.connection;