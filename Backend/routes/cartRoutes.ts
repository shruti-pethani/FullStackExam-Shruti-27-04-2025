import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart
} from '../controllers/CartController';
import { protect } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, asyncHandler(getCart));
router.put('/:productId', protect,asyncHandler(updateCartItem));
router.delete('/:productId', protect,asyncHandler(removeFromCart));

export default router;
