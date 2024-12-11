import express from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;