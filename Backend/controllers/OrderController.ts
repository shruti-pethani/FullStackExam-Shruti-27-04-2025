import { Request, Response, NextFunction } from 'express';
import Cart from '../models/mongo/Cart';
import Order from '../models/sql/Order';
import OrderItem from '../models/sql/OrderItem';
import Product, { ProductInterface } from '../models/mongo/Product';

interface AuthRequest extends Request {
  user?: any;
}

export const getOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']], // recent first
    });

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await OrderItem.findAll({
          where: { orderId: order.id },
        });

        return {
          order,
          items,
        };
      })
    );

    res.status(200).json({
      success: true,
      orders: ordersWithItems,
    });
  } catch (error) {
    next(error);
  }
};



export const checkout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    const newOrder = await Order.create({
      userId,
      total: totalAmount,
    });

    for (const item of cart.items) {
      const product = await Product.findById(item.productId) as ProductInterface;

      if (product) {
        await OrderItem.create({
          orderId: newOrder.id,
          productId: product._id.toString(),
          quantity: item.quantity,
          price: product.price,
        });
      }
    }

    await Cart.findOneAndDelete({ userId });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: newOrder.id,
    });
  } catch (error) {
    next(error);
  }
};
