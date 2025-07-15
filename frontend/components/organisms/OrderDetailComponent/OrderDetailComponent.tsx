"use client";
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import toast, { Toaster } from "react-hot-toast";
import { Order } from "@/types/type";
import InvoiceOrderPdf from "./InvoiceOrderPdf";
import axios from "axios";
import { FaRegFilePdf } from "react-icons/fa";
import { formatForFrontend } from "@/utils/helper";

interface OrderDetailComponentProps {
  order: Order;
  isEdit?: boolean;
  setOrder?: (order: Order) => void;
}

const OrderDetailComponent: React.FC<OrderDetailComponentProps> = ({ order, setOrder, isEdit }) => {
  function formatOrderDate(dateString: string): string {
    const [datePart, timePart] = dateString.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);

    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const monthName = monthNames[month - 1];

    return `${day} ${monthName} ${year}`;
  }

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;

    if (setOrder) {
      setOrder({ ...order, statusOrder: newStatus });
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/updatestatus`,
        {
          orderId: order.orderId,
          status: newStatus
        },
        { withCredentials: true }
      );
      toast.success("Update Status Successfully!");
    } catch (error) {
      console.error("Error when updating status:", error);
      toast.error("Error when changing status");
    }
  };


  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-6 space-y-8">
        {/* Header: Order Detail + PDF Button */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-semibold text-[#493628]">Order Details #{order.orderId}</p>
            <p className="text-base text-[#493628] mt-1">Date: {formatForFrontend(order.orderDate)}</p>
          </div>
          {!isEdit && (
            <div className="">
              <PDFDownloadLink
                document={<InvoiceOrderPdf order={order} />}
                fileName={`invoice-${order.orderId}.pdf`}
              >
                {({ loading }) => (
                  <div className="flex items-center gap-2 bg-[#493628] text-white px-4 py-2 rounded-md hover:bg-[#705C53] transition text-sm font-medium">
                    <FaRegFilePdf />
                    {loading ? "Generating PDF..." : "Download Invoice"}
                  </div>
                )}
              </PDFDownloadLink>
            </div>
          )}
        </div>

        {/* Informasi Pelanggan dan Pembayaran */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <div>
            <h3 className="text-lg !font-semibold text-[#493628] mb-2">Customer</h3>
            <p className="text-base text-gray-700">{order.user.name}</p>
            <p className="text-base text-gray-700">{order.user.email}</p>
          </div>

          <div>
            <h3 className="text-lg !font-semibold text-[#493628] mb-2">Payment</h3>
            <p className="text-base text-gray-700">Midtrans</p>
          </div>
        </div>

        {isEdit ? (
          <div className="pt-4">
            <label
              htmlFor="statusOrderSelect"
              className="text-lg !font-semibold text-[#493628] mb-2 block"
            >
              Order Status
            </label>
            <br />
            {/* Help Text */}
            <p className="mt-1 text-xs text-gray-500">
              Pilih status terbaru untuk pesanan ini.
            </p>
            <select
              id="statusOrderSelect"
              className={`inline-block px-3 py-1 rounded-lg text-base font-semibold cursor-pointer 
                ${order.statusOrder === "Completed"
                  ? "bg-green-100 text-green-600"
                  : order.statusOrder === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : order.statusOrder === "Processing"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              value={order.statusOrder || ""}
              onChange={handleStatusChange}
            // onChange={() => { }}
            >
              <option value="" disabled>
                Select Status Order
              </option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

          </div>
        ) : (
          <div className="pt-4">
            <h3 className="text-lg !font-semibold text-[#493628] mb-2">Order Status</h3>
            <span
              className={`inline-block px-3 py-1 rounded-lg text-base font-semibold
        ${order.statusOrder === "Completed"
                  ? "bg-green-100 text-green-600"
                  : order.statusOrder === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : order.statusOrder === "Processing"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
            >
              {order.statusOrder}
            </span>
          </div>
        )}


        {/* Tabel Produk */}
        <div className="pt-5">
          <h3 className="text-lg !font-semibold text-[#493628] mb-4">Produk</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-base text-left border border-[#E4E0E1] rounded overflow-hidden">
              <thead className="bg-[#E4E0E1] text-[#493628]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-t border-[#E4E0E1]">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded border"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">Rp {item.price.toLocaleString()}</td>
                    <td className="p-3">Rp {item.subPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#E4E0E1] border-t !font-semibold text-[#493628]">
                  <td className="p-3 text-right" colSpan={3}>
                    Total
                  </td>
                  <td className="p-3">Rp {order.totalPrice.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
};

export default OrderDetailComponent;
