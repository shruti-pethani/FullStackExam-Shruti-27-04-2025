import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/ProductController';
import { protect } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = express.Router();

router.get('/', getProducts);

router.post('/', protect, asyncHandler(createProduct));

router.get('/:id', asyncHandler(getProductById));

router.put('/:id', protect, asyncHandler(updateProduct));

router.delete('/:id', protect, asyncHandler(deleteProduct));

export default router;
