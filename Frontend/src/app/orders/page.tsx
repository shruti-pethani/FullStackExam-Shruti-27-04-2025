'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { format } from 'date-fns';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  order: {
    id: number;
    userId: number;
    total: number;
    createdAt: string;
    updatedAt: string;
  };
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productDetails, setProductDetails] = useState<Record<string, Product>>({});

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const fetchedOrders = res.data.orders || [];
      setOrders(fetchedOrders);

      // Now for all productIds fetch product details
      const uniqueProductIds = new Set<string>();
      fetchedOrders.forEach((order: Order) => {
        order.items.forEach((item: OrderItem) => {
          uniqueProductIds.add(item.productId);
        });
      });

      for (const productId of uniqueProductIds) {
        await fetchProductDetails(productId);
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const fetchProductDetails = async (productId: string) => {
    try {
      const res = await api.get(`/products/${productId}`);
      const product = res.data.product;
      setProductDetails((prev) => ({
        ...prev,
        [productId]: product,
      }));
    } catch (error) {
      console.error(`Failed to fetch product ${productId}`, error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no past orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((orderItem) => (
            <div key={orderItem.order.id} className="bg-white rounded shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold">Order #{orderItem.order.id}</h2>
                  <p className="text-gray-500 text-sm">
                    {format(new Date(orderItem.order.createdAt), 'dd MMM yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    Total: {orderItem.order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="divide-y">
                {orderItem.items.map((item) => {
                  const product = productDetails[item.productId];
                  return (
                    <div key={item.id} className="py-3 flex justify-between text-sm text-gray-700">
                      <div className="flex items-center gap-4">
                        <img
                          src={product?.imageUrl || '/placeholder.png'}
                          alt={product?.name || 'Product'}
                          className="w-14 h-14 object-contain rounded"
                        />
                        <div>
                          <p className="font-semibold">{product?.name || 'Loading...'}</p>
                          <p>Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="font-bold">
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
