import express from 'express';
import {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController.js';

const router = express.Router();

router.get('/thoughts', getThoughts);
router.get('/thoughts/:id', getThoughtById);
router.post('/thoughts', createThought);
router.put('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', deleteThought);

export default router;