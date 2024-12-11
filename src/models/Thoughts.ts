import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Reaction Schema
const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(), // Format the timestamp on query
    },
});

// Thought Schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(), // Format the timestamp on query
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema], // Use the reactionSchema as a subdocument
});

// Virtuals for counts
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Export the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;