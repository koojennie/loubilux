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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
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
                  {(() => {
                    const rawDate = order.orderDate as string;
                    if (!rawDate) return <div>-</div>;
                    try {
                      const [datePart, timePart] = rawDate.split(", ");
                      const [day, month, year] = datePart.split("/").map(Number);
                      const [hour, minute, second] = timePart.split(".").map(Number);
                      const dateObj = new Date(year, month - 1, day, hour, minute, second);
                      const options: Intl.DateTimeFormatOptions = {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      };
                      const formattedDate = dateObj.toLocaleDateString("id-ID", options);
                      return <div>{formattedDate}</div>;
                    } catch {
                      return <div>{String(order.orderDate)}</div>;
                    }
                  })()}
                </TableCell>
                <TableCell>
                  <div>
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(order.totalPrice))}

                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${order.statusOrder === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                      }`}
                  >
                    {String(order.statusOrder)}
                  </span>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
