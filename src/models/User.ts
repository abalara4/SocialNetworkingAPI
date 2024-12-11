import { Schema, model, Document } from 'mongoose';

// Define the interface for the User document
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Array<string>; // Array of Thought model IDs
    friends: Array<string>; // Array of User model IDs
    friendCount: number; // Virtual property
}

// Create the User schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought', // Reference to the Thought model
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User', // Self-reference to the User model
        },
    ],
});

// Create a virtual property for friendCount
userSchema.virtual('friendCount').get(function(this: IUser) {
    return this.friends.length;
});

// Set toJSON options to include virtuals when converting to JSON
userSchema.set('toJSON', {
    virtuals: true,
});

// Create the User model
const User = model<IUser>('User', userSchema);

export default User;