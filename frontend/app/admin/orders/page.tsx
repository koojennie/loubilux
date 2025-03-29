"use client"
import React, {useState, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Product} from "../products/page";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from "@/components/organisms/Table/TableComponents";

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
  user: User;
  orderlineitems: OrderLineItem;
  totalPrice: number;
  orderDate: Date;
  statusOrder: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "COD" | "CARD";
  createdAt?: Date;
  updatedAt?: Date;
}


const OrdersPage = () => {
  const router = useRouter();
  
  
  const [orders, setOrders] = useState<Order>();
  const [token, setToken] = useState<string | null>(null);


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

  const fetchAllOrders = async () =>{

    if (!token) {
      console.error('No token available');
      return;
    }
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setOrders(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('error when fetch all orders :', error);
      
    }
  }

  useEffect(()=>{
    fetchToken();
  }, [])
  
  useEffect(() => {
    if(token){
      fetchAllOrders();
    }
  }, [token])


  return (
    <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
      <HeaderContentAdmin<Order>
      header="Orders"
      subHeader="All List of Ordes"
      columns={[
        { key: 'user', label: 'Number' as keyof Order },
        { key: 'orderlineitems', label: 'Order Line Items' as keyof Order },
        { key: 'totalPrice', label: 'Total Price' as keyof Order },
        { key: 'orderDate', label: 'Order Date' as keyof Order },
        { key: 'statusOrder', label: 'status' as keyof Order },
        { key: 'paymentMethod', label: 'PaymentMethod' as keyof Order },
        // { key: 'category', label: 'Category' },
      ]}
      onChangeDropDownLimitData={()=>{}}
      onChangeDropDownOrderBy={()=>{}}
      onChangeDropDownSortBy={()=>{}}
      onChangeSearchQuery={()=>{}}
      toAddPage={()=>{}}
      totalItems={12}
      />

      {/* <TableComponents
        data={orders}
        columns={[
          { key: 'user', label: 'Number' as keyof Order },
          { key: 'orderlineitems', label: 'Order Line Items' as keyof Order },
          { key: 'totalPrice', label: 'Total Price' as keyof Order },
          { key: 'orderDate', label: 'Order Date' as keyof Order },
          { key: 'statusOrder', label: 'status' as keyof Order },
          { key: 'paymentMethod', label: 'PaymentMethod' as keyof Order },
          // { key: 'category', label: 'Category' },
        ]}
        tableType="orders"
        onInfo={()=>{}}
        onEdit={()=>{}}
        onDelete={()=>{}}
        page={1}
        limit={5}
      /> */}
    </div>
  );
};

export default OrdersPage;
