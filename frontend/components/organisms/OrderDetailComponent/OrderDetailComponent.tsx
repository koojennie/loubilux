"use client";
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Order } from "@/types/type";
import InvoiceOrderPdf from "./InvoiceOrderPdf";

const OrderDetailComponent: React.FC<{ order: Order }> = ({ order }) => {
  const formattedDate = new Date(order.orderDate.replace(/\./g, ":")).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-6 space-y-8">
        {/* Header: Order Detail + PDF Button */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-semibold text-[#493628]">Detail Order #{order.orderId}</p>
            <p className="text-base text-[#493628] mt-1">Tanggal: {formattedDate}</p>
          </div>

          <PDFDownloadLink
            document={<InvoiceOrderPdf order={order} />}
            fileName={`invoice-${order.orderId}.pdf`}
            className="bg-[#493628] text-white px-4 py-2 rounded-md hover:bg-[#3b2c21] transition text-sm"
          >
            {({ loading }) => (loading ? "Membuat PDF..." : "Download Invoice")}
          </PDFDownloadLink>
        </div>

        {/* Informasi Pelanggan dan Pembayaran */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <div>
            <h3 className="text-lg font-semibold text-[#493628] mb-2">Customer</h3>
            <p className="text-sm text-gray-700">Nama: {order.user.name}</p>
            <p className="text-sm text-gray-700">Email: {order.user.email}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#493628] mb-2">Pembayaran</h3>
            <p className="text-sm text-gray-700">Metode: {order.paymentMethod}</p>
            <p className="text-sm text-gray-700">Status: {order.paymentStatus}</p>
          </div>
        </div>

        {/* Status Pesanan */}
        <div className="pt-4">
          <h3 className="text-lg font-semibold text-[#493628] mb-2">Status Pesanan</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.statusOrder === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {order.statusOrder}
          </span>
        </div>

        {/* Tabel Produk */}
        <div className="pt-16">
          <h3 className="text-lg font-semibold text-[#493628] mb-4">Produk</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-[#E4E0E1] rounded overflow-hidden">
              <thead className="bg-[#E4E0E1] text-[#493628]">
                <tr>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Jumlah</th>
                  <th className="p-3">Harga</th>
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
                <tr className="bg-[#E4E0E1] border-t font-semibold text-[#493628]">
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
    </div>
  );
};

export default OrderDetailComponent;
