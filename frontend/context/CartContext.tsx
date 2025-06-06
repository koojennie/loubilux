"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext({
  totalItems: 0,
  refreshCart: () => {},
  addToCart: async (productId: string, quantity: number) => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalItems, setTotalItems] = useState(0);

   const refreshCart = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
        {
          withCredentials: true,
        }
      );
      setTotalItems(response.data.data.totalProductItems);
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  }

  const addToCart = async (productId: string, quantity: number) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/add`, {
        productId,
        quantity,
      }, {
        withCredentials: true,
      });

      await refreshCart();
    } catch (error: any) {
      console.error(`Add to cart error: ${error.message}`);
    }
  };

  useEffect(() => {
    refreshCart(); // initial load
  }, []);

  return (
    <CartContext.Provider value={{ totalItems, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
