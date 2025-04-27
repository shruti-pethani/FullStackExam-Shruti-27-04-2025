"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl?: string;
  };
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const { refreshCart } = useCart();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart?.items || []);
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQuantity = async (productId: string, currentQty: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/cart/${productId}`,
        { quantity: currentQty + 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
      refreshCart();
    } catch (error) {
      console.error("Failed to increase quantity");
    }
  };

  const decreaseQuantity = async (productId: string, currentQty: number) => {
    if (currentQty <= 1) return; // minimum 1
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/cart/${productId}`,
        { quantity: currentQty - 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
      refreshCart();
    } catch (error) {
      console.error("Failed to decrease quantity");
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
      refreshCart();
    } catch (error) {
      console.error("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 20 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-5xl max-md:max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-900">Your Cart</h1>

      {cartItems.length ? (
        <div className="grid md:grid-cols-3 gap-10 mt-8">
          {/* Left side - Products */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="flex gap-4 bg-white px-4 py-6 rounded-md shadow"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                    <Image
                      src={item.productId.imageUrl || "/placeholder.png"}
                      alt={item.productId.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                        {item.productId.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.productId.description.slice(0, 50)}...
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mt-auto flex items-center gap-3">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.productId._id, item.quantity)
                        }
                        className="flex items-center justify-center w-5 h-5 bg-slate-400 outline-none rounded-full"
                      >
                        <span className="text-white text-sm">-</span>
                      </button>
                      <span className="font-semibold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          increaseQuantity(item.productId._id, item.quantity)
                        }
                        className="flex items-center justify-center w-5 h-5 bg-slate-800 outline-none rounded-full"
                      >
                        <span className="text-white text-sm">+</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove & Price */}
                <div className="ml-auto flex flex-col">
                  <div className="flex items-start justify-end gap-4">
                    <button
                      onClick={() => removeItem(item.productId._id)}
                      className="p-2 rounded-full hover:bg-red-100 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-slate-500 hover:text-red-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 0 1 0 2h-1v12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7H3a1 1 0 0 1 0-2h4V4a1 1 0 0 1 1-1Zm7 4H8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7Z" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-auto">
                    {item.productId.price}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Summary */}
          <div className="bg-white rounded-md px-4 py-6 h-max shadow">
            <ul className="text-slate-900 font-medium space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span className="ml-auto font-semibold">
                  {subtotal.toFixed(2)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping{" "}
                <span className="ml-auto font-semibold">
                  {shipping.toFixed(2)}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Tax{" "}
                <span className="ml-auto font-semibold">{tax.toFixed(2)}</span>
              </li>
              <hr className="border-slate-300" />
              <li className="flex flex-wrap gap-4 text-sm font-semibold">
                Total <span className="ml-auto">{total.toFixed(2)}</span>
              </li>
            </ul>

            <div className="mt-8 space-y-2">
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-slate-800 hover:bg-slate-900 text-white rounded-md"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Your cart is empty.
        </div>
      )}
    </div>
  );
}
