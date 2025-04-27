'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { CartProvider } from '../context/CartContext';

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith('/auth');

  return (
    <CartProvider>
      {!hideNavbar && <Navbar />}
      {children}
    </CartProvider>
  );
}
