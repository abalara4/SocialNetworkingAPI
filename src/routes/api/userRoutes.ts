import express from 'express';
import User from '../models/User.js'; // Assuming you have a User model defined
import Thought from '../models/Thought.js'; // Assuming you have a Thought model defined

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('thoughts').populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a user by its _id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE to remove user by its _id (BONUS: Remove associated thoughts)
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Remove associated thoughts
        await Thought.deleteMany({ userId: req.params.id });

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        
        if (!user || !friend) return res.status(404).json({ message: 'User or friend not found' });

        user.friends.push(friend._id);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.friends.pull(req.params.friendId);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;