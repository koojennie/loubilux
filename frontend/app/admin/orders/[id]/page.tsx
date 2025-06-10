"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import OrderDetailComponent from "@/components/organisms/OrderDetailComponent/OrderDetailComponent";
import { Order } from "@/types/type";

const OrderDetailPage: React.FC = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOrder = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/orderbyid/${orderId}`,
        { withCredentials: true }
      );
      setOrder(response.data.data);
    } catch (error) {
      console.error("Error fetching order data", error);
      toast.error("Failed to fetch order data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId, fetchOrder]);

  return (
    <div className="p-8 md:p-8">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-[#493628] shadow-lg">
        <Toaster />
        {isLoading ? (
          <p>Loading...</p>
        ) : order ? (
          <OrderDetailComponent order={order} />
        ) : (
          <p>No order found...</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;