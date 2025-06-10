"use client"
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import TransactionDetailContent from "@/components/organisms/TransactionDetailContent/TransactionDetailContent";
import { SidebarProvider } from "@/context/SidebarContext";
import { Order } from "@/types/type";


export default function TransactionDetail() {
  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const paramOrderId = useParams<{ id: string }>().id;

  const fetchOrder = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/orderbyid/${paramOrderId}`,
        { withCredentials: true }
      );

      const results = {
        ...response.data.data,
        id: response.data.data.orderId,
      };

      setOrder(results);
    } catch (error) {
      console.error("Error fetching order data", error);
      toast.error("Failed to fetch order data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [paramOrderId]);

  useEffect(() => {
    if (paramOrderId) {
      fetchOrder();
    }
  }, [paramOrderId, fetchOrder]);


  if (isLoading) return <div>Loading...</div>;


  console.log(order)


  return (
    <SidebarProvider>
      <section className="transactions-detail overflow-auto">
        <Sidebar activeMenu="transactions" />
        {order && <TransactionDetailContent order={order} />}
        <Toaster />
      </section>
    </SidebarProvider>
  )
}
