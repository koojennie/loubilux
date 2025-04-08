"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Product } from "../products/page";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from "@/components/organisms/Table/TableComponents";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetail";
import ModalReport from "@/components/organisms/Modal/ModalReport";

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
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(true);
  const [selectedViewDetailOrder, setSelectedViewDetailOrder] = useState<Order | null>(null);
  const [selectedDeleted, setSelectedDeleted] = useState<Order | null>(null);
  const [isModaReport, setIsModalReport]= useState<boolean>(false);

  // paramter for fetch report  
  const [monthReport, setMonthReport] = useState<string>("");
  const [yearReport, setYearReport] = useState<string>("");
  const [starDateReport, setStartDateReport] = useState<string>("");
  const [endDateReport, setEndDateReport] = useState<string>("");

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/all`,
        {
          withCredentials: true
        }
      );
      const result = response.data.data.map((user: any) => (
        {
          id: user._id,
          ...user
        }
      ))

      setOrders(result);
      setPage(response.data.page);
      setTotalItems(response.data.totalOrders);
      setLimit(response.data.limit);
    } catch (error) {
      console.error('error when fetch all orders :', error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleOpenCloseModalViewDetail = (order?: Order) => {
    console.log('ini adalah orders yang dipilih', order);
    // setSelectedViewDetailOrder(order || null)
    // setIsModalViewDetailOpen(!isModalViewDetailOpen);
  }

  const exportReport = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/report`;

      if(monthReport && yearReport){
        url += `?month=${monthReport}&year=${yearReport}`;
      } else if(starDateReport && endDateReport){
        url += `?startDate=${starDateReport}&endDate=${endDateReport}`;
      } else if (!monthReport && yearReport){
        url += `?year=${yearReport}`;
      }

      const response = await axios.get(url);
      console.log(response);
      
    } catch (error: any) {
      console.error("Failed to export report", error)
    }
  }


  return (
    <div className="flex flex-col px-8 rounded-2xl shadow-xl bg-white shadow-gray-200">
      <HeaderContentAdmin<Order>
        header="Orders"
        subHeader="All List of Orders"
        tableType="orders"
        labelAdd="Generate Excel"
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
        toAddPage={() => {setIsModalReport(true)}}
        totalItems={totalItems}
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
        onInfo={(id) => { handleOpenCloseModalViewDetail(orders.find(order => order.id === id)) }}
        onEdit={() => { }}
        onDelete={() => { }}
        page={page}
        limit={limit}
        totalItems={totalItems}
        onPageChange={(newPage) => {
          console.log('Page changed to:', newPage);
        }}
      />

      {/* <ModalViewDetails
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
      /> */}
      <ModalReport isOpen={isModaReport} setIsOpen={setIsModalReport}/>
    </div>
  );
};

export default OrdersPage;
