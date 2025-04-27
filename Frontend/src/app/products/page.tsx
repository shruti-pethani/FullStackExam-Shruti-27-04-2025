'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import api from '@/services/api';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  stock: number;
  imageUrl?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(`/products`, {
          params: { search }
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [search]);

  const { refreshCart } = useCart();
  const handleAddToCart = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');

      await api.post(
        '/cart',
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refreshCart();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Error adding to cart.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full transition hover:scale-105"
          >
            <Image
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              width={200}
              height={300}
              className="w-full h-48 object-contain rounded-md"
            />
            <div className="flex flex-col justify-between flex-1 p-2">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.description.slice(0, 60)}...</p>
                <p className="font-bold text-blue-600 mt-2">{product.price}</p>
              </div>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="mt-4 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
