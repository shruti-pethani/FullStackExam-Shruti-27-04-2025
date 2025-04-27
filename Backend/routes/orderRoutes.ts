import express from 'express';
import { checkout, getOrders } from '../controllers/OrderController';
import { protect } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/checkout', protect, asyncHandler(checkout));
router.get('/', protect, asyncHandler(getOrders));

export default router;
