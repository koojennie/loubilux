"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonTab from "./ButtonTab";
import TableRow from "./TableRow";
import { useSidebar } from "@/context/SidebarContext";
import { Order } from "@/types/type";

export default function TransactionContent() {

  const [ordersUser, setOrdersUser] = useState<Order[]>([]);

  const fetchAllOrderUser = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/orderbyuser`,
        {
          withCredentials: true
        }
      );

      const results = response.data.data.map((order: Order) => (
        {
          ...order,
          id: order.orderId,
        }
      ));

      setOrdersUser(results);
    } catch (error) {
      console.error("error message when get all order user");
    }
  };

  useEffect(() => {
    fetchAllOrderUser();
  }, []);

  console.log(ordersUser);
  

  const { expanded } = useSidebar();

  return (
    <main className={`main-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          My Orders
        </h2>
        <div className="mb-30">
          <p className="text-lg color-palette-2 mb-12">You’ve spent</p>
          <h3 className="text-5xl fw-medium color-palette-1">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))}
          </h3>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Orders
          </p>
          <div className="main-content main-content-table overflow-x-auto md:overflow-x-visible">
            <table className="min-w-[640px] table table-borderless color-palette-1">
              <thead>
                <tr>
                  <th scope="col">
                    Order ID
                  </th>
                  <th scope="col">Customer</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Total Price</th>
                  <th className="" scope="col">Status</th>
                  <th className="w-10" scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list_status_item">
                {ordersUser.map((orderUser) => (
                  <TableRow
                    key={orderUser.orderId}
                    orderId={orderUser.orderId}
                    name={typeof orderUser.user === "string" ? orderUser.user : orderUser.user?.name ?? "Not Name"}
                    orderDate={orderUser.orderDate}
                    totalPrice={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(orderUser.totalPrice))}
                    status={orderUser.statusOrder as 'Pending' | 'Success' | 'Failed'}
                  />
                ))}
                {/* <TableRow orderId="ORD-20250508-001" name="Jennie Koo" orderDate="08 Mei 2025" totalPrice={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))} status="Pending" /> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
