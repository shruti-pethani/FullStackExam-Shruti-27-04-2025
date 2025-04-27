'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import api from '@/services/api';

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCount, setCartCount] = useState(0);
  
    const refreshCart = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
        if (!token) return; // <-- Add this check!
  
        const res = await api.get('/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const count = res.data.cart?.items?.reduce(
          (acc: number, item: any) => acc + item.quantity,
          0
        ) || 0;
        setCartCount(count);
      } catch (error) {
        console.error('Failed to refresh cart', error);
        setCartCount(0); // optional, reset if failed
      }
    };
  
    useEffect(() => {
      refreshCart();
    }, []);
  
    return (
      <CartContext.Provider value={{ cartCount, refreshCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  
