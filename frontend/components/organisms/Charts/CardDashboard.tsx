"use client";

import React, { useEffect, useState } from 'react';
import { FaBox } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { Product, Order } from "@/types/type";
import toast from 'react-hot-toast';


function CardDashboard() {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const fetchCountAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/all`, { withCredentials: true });

      setTotalOrders(response.data.totalOrders);
    } catch (error) {
      console.error('Error when fetch orders', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCountAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`, { withCredentials: true });

      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Error When fetch Orders", error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCountAllUsers = async () => {
    setIsLoading(false);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users`, { withCredentials: true });

      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error('Error When fetch All Users', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCountAllOrders();
    fetchCountAllProducts();
    fetchCountAllUsers();
  }, [])

  return (
    // <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaBox className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Products
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalProducts}
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaFileInvoiceDollar className="text-gray-800 dark:text-white/90" size={27} />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalOrders}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <MdPeopleAlt className="text-gray-800 dark:text-white/90" size={27} />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Users
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {totalUsers}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  )
}

export default CardDashboard;