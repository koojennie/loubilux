"use client";

import React, { useEffect, useState } from 'react';
import { FaBox } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { Product, Order } from "@/types/type";
import toast from 'react-hot-toast';
import { TbBuildingWarehouse } from 'react-icons/tb';


function CardDashboard() {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalOpname, setTotalOpname] = useState<number>(0);
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

  const fetchCountAllOpname = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/all`, { withCredentials: true });

      setTotalOpname(response.data.totalItems);
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
    fetchCountAllOpname();
  }, [])

  return (
    // <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl bg-white p-4 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-[#f4e6e0] rounded-xl">
          <FaBox className="text-[#493628] size-6" />
        </div>

        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="text-lg font-medium text-[#493628]">
              Products
            </span>
            <h4 className="mt-2 font-bold text-[#493628] text-3xl">
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
      <div className="rounded-2xl bg-white p-4 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-[#f4e6e0] rounded-xl">
          <FaFileInvoiceDollar className="text-[#493628] size-6" />
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="text-lg font-medium text-[#493628]">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-[#493628] text-3xl">
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
      <div className="rounded-2xl bg-white p-4 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-[#f4e6e0] rounded-xl">
          <MdPeopleAlt className="text-[#493628] size-6" />
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="text-lg font-medium text-[#493628]">
              Users
            </span>
            <h4 className="mt-2 font-bold text-[#493628] text-3xl">
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

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl bg-white p-4 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-[#f4e6e0] rounded-xl">
          <TbBuildingWarehouse className="text-[#493628] size-6" />
        </div>
        <div className="flex items-end justify-between mt-3">
          <div>
            <span className="text-lg font-medium text-[#493628]">
              Opname
            </span>
            <h4 className="mt-2 font-bold text-[#493628] text-3xl">
              {totalOpname}
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