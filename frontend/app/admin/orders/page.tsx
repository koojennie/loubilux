"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Product } from "../products/page";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from "@/components/organisms/Table/TableComponents";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetail";

interface User {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  profilePicture: string;
}

interface OrderLineItem {
  orderId: Order;
  product: Product;
  quantity: number;
  subPrice: number;
}

interface Order {
  _id: string;
  id: string;
  user: User;
  orderlineitems: OrderLineItem;
  orderId: string;
  totalPrice: number;
  isPaid: boolean;
  orderDate: Date;
  statusOrder: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "COD" | "CARD";
  createdAt?: Date;
  updatedAt?: Date;
}


const OrdersPage = () => {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(true);
  const [selectedViewDetailOrder, setSelectedViewDetailOrder] = useState<Order | null>(null);
  const [selectedDeleted, setSelectedDeleted] = useState<Order | null>(null);

  const fetchToken = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
        username: 'saniadmin1',
        password: 'saniadmin1.P'
      });
      const token = response.data.token;
      setToken(token);
      console.log('done get token', token);

    } catch (error) {
      console.error('Error fetching token', error);
    }
  };

  const fetchAllOrders = async () => {

    if (!token) {
      console.error('No token available');
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/all`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setOrders(response.data.data);
      console.log("it is all orders ", response.data.data);


    } catch (error) {
      console.error('error when fetch all orders :', error);

    }
  }

  useEffect(() => {
    fetchToken();
  }, [])

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token])

  const handleOpenCloseModalViewDetail = (order?: Order) => {
    console.log('ini adalah orders yang dipilih', order);
    setSelectedViewDetailOrder(order || null)
    setIsModalViewDetailOpen(!isModalViewDetailOpen);
  }


  return (
    <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
      <HeaderContentAdmin<Order>
        header="Orders"
        subHeader="All List of Orders"
        columns={[
          { key: 'orderId', label: 'Order Id' as keyof Order },
          { key: 'user', label: 'Customer' as keyof Order },
          // { key: 'useer.email', label: 'email' as keyof Order },
          { key: 'orderDate', label: 'Order Date' as keyof Order },
          { key: 'statusOrder', label: 'status' as keyof Order },
          { key: 'paymentMethod', label: 'PaymentMethod' as keyof Order },
          // { key: 'category', label: 'Category' },
        ]}
        onChangeDropDownLimitData={() => { }}
        onChangeDropDownOrderBy={() => { }}
        onChangeDropDownSortBy={() => { }}
        onChangeSearchQuery={() => { }}
        toAddPage={() => { }}
        totalItems={12}
      />

      <TableComponents
        data={orders}
        columns={[
          { key: 'orderId', label: 'Order Id' as keyof Order },
          { key: 'user', label: 'Customer' as keyof Order },
          { key: 'orderDate', label: 'Order Date' as keyof Order },
          { key: 'statusOrder', label: 'Status Order' as keyof Order },
          { key: 'paymentMethod', label: 'Payment Status' as keyof Order },
          // { key: 'category', label: 'Category' },
        ]}
        tableType="orders"
        onInfo={(id) => { handleOpenCloseModalViewDetail(orders.find(order=>order.id === id)) }}
        onEdit={() => { }}
        onDelete={() => { }}
        page={1}
        limit={5}
        totalItems={orders.length}
        onPageChange={(newPage) => {
          console.log('Page changed to:', newPage);
        }}
      />

      <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        data={selectedViewDetailOrder}
        tableType="orders"
        columns={[
          { key: 'orderId', label: 'Order Id' as keyof Order },
          { key: 'user', label: 'Customer' as keyof Order },
          { key: 'orderDate', label: 'Order Date' as keyof Order },
          { key: 'statusOrder', label: 'Status Order' as keyof Order },
          { key: 'paymentMethod', label: 'Payment Status' as keyof Order },
        ]}
      />
    </div>
  );
};

export default OrdersPage;
