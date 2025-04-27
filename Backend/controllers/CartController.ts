import { Request, Response, NextFunction } from 'express';
import Cart from '../models/mongo/Cart';

interface AuthRequest extends Request {
  user?: any;
}

export const addToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; 

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    const updatedCart = await cart.save();
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const updatedCart = await cart.save();
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    const updatedCart = await cart.save();
    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    next(error);
  }
};
