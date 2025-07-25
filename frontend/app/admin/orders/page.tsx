"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Product } from "@/types/type";
import { Order } from "@/types/type";
import HeaderContentAdmin from "@/components/organisms/HeaderContetntAdmin/HeaderContentAdmin";
import TableComponents from "@/components/organisms/Table/TableComponents";
import ModalViewDetails from "@/components/organisms/Modal/ModalViewDetail";
import ModalReport from "@/components/organisms/Modal/ModalReport";


const OrdersPage = () => {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [orderBy, setOrderBy] = useState<string>("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalConfirmationDeleteOpen, setIsModalConfirmationDeleteOpen] = useState<boolean>(false);
  const [isModalViewDetailOpen, setIsModalViewDetailOpen] = useState<boolean>(true);
  const [selectedViewDetailOrder, setSelectedViewDetailOrder] = useState<Order | null>(null);
  const [selectedDeleted, setSelectedDeleted] = useState<Order | null>(null);
  const [isModaReport, setIsModalReport] = useState<boolean>(false);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortBy: sortBy ,
        sortOrder: orderBy ,
      });

      if (searchQuery) params.append("searchQuery", searchQuery);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/all?${params.toString()}`, {
        withCredentials: true,
      });

      const results = response.data.data.map((order: Order) => (
        {
          ...order,
          id: order.orderId,
        }
      ));

      setOrders(results);
      setPage(response.data.page);
      setTotalItems(response.data.totalOrders);
      setLimit(response.data.limit);
    } catch (error) {
      console.error('error when fetch all orders :', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [page, limit, sortBy, orderBy, searchQuery]);

  const handleOpenCloseModalViewDetail = (order?: Order) => {
    setSelectedViewDetailOrder(order || null)
    // setIsModalViewDetailOpen(!isModalViewDetailOpen);
  }

  return (
    <div className="flex px-8 mx-3 my-2 flex-col rounded-2xl bg-white">
      <HeaderContentAdmin<Order>
        header="Orders"
        subHeader="All List of Orders"
        tableType="orders"
        labelAdd="Generate Excel"
        columns={[
          { key: 'orderId', label: 'Order Id' as keyof Order },
          // { key: 'user', label: 'Customer' as keyof Order },
          // { key: 'useer.email', label: 'email' as keyof Order },
          { key: 'orderDate', label: 'Order Date' as keyof Order },
          { key: 'status', label: 'status' as keyof Order },
          // { key: 'paymentMethod', label: 'PaymentMethod' as keyof Order },
          // { key: 'category', label: 'Category' },
        ]}
        onChangeDropDownLimitData={setLimit}
        onChangeDropDownOrderBy={setOrderBy}
        onChangeDropDownSortBy={setSortBy}
        onChangeSearchQuery={setSearchQuery}
        toAddPage={() => { setIsModalReport(true) }}
        totalItems={totalItems}
      />

      <TableComponents
        data={orders}
        columns={[
          { key: 'orderId', label: 'Order Id' as keyof Order },
          { key: 'user', label: 'Customer' as keyof Order },
          { key: 'orderDate', label: 'Order Date' as keyof Order },
          { key: 'totalPrice', label: 'Total Price' as keyof Order },
          { key: 'statusOrder', label: 'Order Status' as keyof Order },
          // { key: 'category', label: 'Category' },
        ]}
        tableType="orders"
        onInfo={(i) => { }}
        onEdit={() => { }}
        onDelete={() => { }}
        page={page}
        limit={limit}
        totalItems={totalItems}
        onPageChange={setPage}
      />

      <ModalViewDetails
        isOpen={isModalViewDetailOpen}
        onClose={handleOpenCloseModalViewDetail}
        data={selectedViewDetailOrder}
        tableType="orders"
        columns={[
          { key: 'orderId', label: 'Order Id' as keyof Order },
          { key: 'user', label: 'Customer' as keyof Order },
          { key: 'email', label: 'Email' as keyof Order },
          { key: 'orderDate', label: 'Order Date' as keyof Order },
          { key: 'statusOrder', label: 'Order Status' as keyof Order },
          { key: 'paymentMethod', label: 'Payment Status' as keyof Order },
          { key: 'totalPrice', label: 'Total Price' as keyof Order },
          { key: 'items', label: 'Items' as keyof Order },
        ]}
      />
      <ModalReport isOpen={isModaReport} setIsOpen={setIsModalReport} />
    </div>
  );
};

export default OrdersPage;
