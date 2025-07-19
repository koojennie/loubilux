import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/organisms/Table/Table";
// import Badge from "../ui/badge/Badge";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Product, Order } from "@/types/type";
import { formatForFrontend } from "@/utils/helper"
import { HiCheckCircle, HiClock, HiXCircle } from "react-icons/hi2";


export default function RecentOrders() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);


  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/all`,
        {
          withCredentials: true
        }
      );

      setOrders(Array.isArray(response.data.data) ? response.data.data : []);
      // setPage(response.data.page);
      // setTotalItems(response.data.totalOrders);
      // setLimit(response.data.limit);
    } catch (error) {
      console.error('error when fetch all orders :', error);
    }

    setIsLoading(false);
  }

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
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                OrderId
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Customer
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                OrderDate
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status Order
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {orders?.map((order: Order) => (
              <TableRow key={order.orderId}>
                <TableCell className="py-3">
                  <div>{order.orderId}</div>
                </TableCell>
                <TableCell className="py-3">
                  <div>{order.user}</div>
                </TableCell>
                <TableCell className="py-3">
                  <div>{formatForFrontend(order.orderDate)}</div>
                </TableCell>
                <TableCell>
                  <div>
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(order.totalPrice))}

                  </div>
                </TableCell>
                <TableCell className="py-3">
                    {(() => {
                    type StatusOrder = "Pending" | "Processing" | "Completed" | "Cancelled";
                    const statusConfig: Record<StatusOrder, { icon: JSX.Element; className: string }> = {
                      Pending: {
                        icon: <HiClock className="text-sm me-1 text-yellow-600" />,
                        className: "bg-yellow-100 text-yellow-600",
                      },
                      Processing: {
                        icon: <HiClock className="text-sm me-1 text-blue-600" />,
                        className: "bg-blue-100 text-blue-600",
                      },
                      Completed: {
                        icon: <HiCheckCircle className="text-sm me-1 text-green-600" />,
                        className: "bg-green-100 text-green-600",
                      },
                      Cancelled: {
                        icon: <HiXCircle className="text-sm me-1 text-red-600" />,
                        className: "bg-red-100 text-red-600",
                      },
                    };
                    const { icon, className } =
                      statusConfig[order.statusOrder as StatusOrder] || {
                        icon: null,
                        className: "bg-gray-100 text-gray-800",
                      };
                    return (
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold inline-flex items-center ${className}`}>
                      {icon}
                      {String(order.statusOrder)}
                      </span>
                    );
                    })()}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
