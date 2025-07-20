"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/organisms/Table/Table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Order, User } from "@/types/type";
import { formatForFrontend } from "@/utils/helper";
import { HiCheckCircle, HiClock, HiXCircle } from "react-icons/hi2";

type StatusOrder = "Pending" | "Processing" | "Completed" | "Cancelled";

const statusConfig: Record<
  StatusOrder,
  { icon: () => React.ReactNode; className: string }
> = {
  Pending: {
    icon: () => <HiClock className="text-xs me-1 text-yellow-600" />,
    className: "bg-yellow-100 text-yellow-600",
  },
  Processing: {
    icon: () => <HiClock className="text-xs me-1 text-blue-600" />,
    className: "bg-blue-100 text-blue-600",
  },
  Completed: {
    icon: () => <HiCheckCircle className="text-xs me-1 text-green-600" />,
    className: "bg-green-100 text-green-600",
  },
  Cancelled: {
    icon: () => <HiXCircle className="text-xs me-1 text-red-600" />,
    className: "bg-red-100 text-red-600",
  },
};

export default function RecentOrders() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/all`,
        {
          withCredentials: true,
        }
      );
      setOrders(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("error when fetch all orders :", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl bg-white p-4 sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#493628]">
            Recent Orders
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                OrderId
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Customer
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                OrderDate
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Total Price
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500">
                Order Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {orders.map((order: Order) => {
              const status = order.statusOrder as StatusOrder;
              const config = statusConfig[status] ?? {
                icon: () => null,
                className: "bg-gray-100 text-gray-800",
              };

              return (
                <TableRow key={order.orderId}>
                  <TableCell className="py-3">{order.orderId}</TableCell>
                  <TableCell className="py-3">
                    {typeof order.user === "string"
                      ? order.user
                      : (order.user as User)?.name ?? ""}
                  </TableCell>
                  <TableCell className="py-3">
                    {formatForFrontend(order.orderDate)}
                  </TableCell>
                  <TableCell className="py-3">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Number(order.totalPrice))}
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`px-3 py-1 rounded-md !text-xs font-semibold inline-flex items-center ${config.className}`}
                    >
                      {config.icon()}
                      {status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
