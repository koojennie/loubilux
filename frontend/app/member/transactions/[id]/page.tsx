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


  if (isLoading) {
    return (
      <SidebarProvider>
        <section className="transactions-detail overflow-auto">
          <Sidebar activeMenu="transactions" />
          <main className="main-wrapper expanded">
            <div className="ps-lg-0 animate-pulse">
              <div className="h-10 bg-gray-300 rounded w-1/3 mb-6 mt-6" />
              <div className="details">
                <div className="main-content main-content-card overflow-auto">
                  <section className="checkout mx-auto">
                    <div className="d-flex flex-row align-items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-6 bg-gray-300 rounded" />
                      </div>
                      <div className="w-24 h-6 bg-gray-300 rounded" />
                    </div>
                    <hr className="my-4" />
                    <div className="purchase pt-4">
                      <div className="h-6 w-48 bg-gray-300 rounded mt-4" />
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="h-5 bg-gray-300 rounded col-span-1" />
                        <div className="h-5 bg-gray-300 rounded col-span-1" />
                        <div className="h-5 bg-gray-300 rounded col-span-1" />
                      </div>
                      <div className="mt-6 h-5 w-1/2 bg-gray-300 rounded" />
                      <div className="border-b-2 border-gray-200 border-dashed my-6"></div>

                      {[...Array(2)].map((_, index) => (
                        <div key={index} className="flex items-center justify-between py-4 border-b-2 border-dashed border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="w-[100px] h-[100px] bg-gray-300 rounded-lg" />
                            <div>
                              <div className="w-32 h-4 bg-gray-300 rounded mb-2" />
                              <div className="w-24 h-4 bg-gray-300 rounded mb-2" />
                              <div className="w-16 h-4 bg-gray-300 rounded" />
                            </div>
                          </div>
                          <div className="w-20 h-4 bg-gray-300 rounded" />
                        </div>
                      ))}
                    </div>

                    <div className="pt-6">
                      <div className="flex justify-between mb-2">
                        <div className="w-32 h-4 bg-gray-300 rounded" />
                        <div className="w-20 h-4 bg-gray-300 rounded" />
                      </div>
                      <div className="flex justify-between mb-2">
                        <div className="w-32 h-4 bg-gray-300 rounded" />
                        <div className="w-24 h-4 bg-gray-300 rounded" />
                      </div>
                    </div>

                    <div className="w-60 mt-8">
                      <div className="w-full h-12 bg-gray-300 rounded-full" />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
          <Toaster />
        </section>
      </SidebarProvider>
    );
  }
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
