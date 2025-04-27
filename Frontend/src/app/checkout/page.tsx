'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const { refreshCart } = useCart();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart?.items || []);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 20 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/orders/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshCart();
      router.push('/orders'); 
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Order failed!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.productId._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.imageUrl || '/placeholder.png'}
                    alt={item.productId.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.productId.name}</h2>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-bold">{(item.productId.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="bg-white p-6 rounded shadow">
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Subtotal</p>
              <p>{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Shipping</p>
              <p>{shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-gray-600">Tax</p>
              <p>{tax.toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg mt-4">
              <p>Total</p>
              <p>{total.toFixed(2)}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
