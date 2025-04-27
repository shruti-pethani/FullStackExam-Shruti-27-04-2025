'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { cartCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>
          MyShop
        </h1>

        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md p-2 text-black w-64"
          />
          <button type="submit" className="bg-white text-blue-600 font-semibold rounded-md px-4 py-2 hover:bg-gray-100">
            Search
          </button>
        </form>

        <div className="ml-4 relative cursor-pointer" onClick={() => router.push('/cart')}>
          <ShoppingCart size={28} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
