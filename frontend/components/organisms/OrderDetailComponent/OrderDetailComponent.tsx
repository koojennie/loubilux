"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Order } from "@/types/type";
import Badge from "../Badge/Badge";


const OrderDetailComponent: React.FC<{ order: Order }> = ({ order }) => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

  console.log(order);

  return (
    <div className="p-6">
      <div className="p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-slate-800">
            Detail Order #{order.orderId}
          </h2>
          <p className="text-sm text-slate-500">Tanggal: {order.orderDate.toString()}</p>
        </div>

        {/* <Separator /> */}
        <hr className="my-4 border-t border-slate-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-medium text-slate-700 mb-2">Customer</h3>
            <p className="text-sm text-slate-600">Nama: {order.user.name}</p>
            <p className="text-sm text-slate-600">Email: {order.user.email}</p>
            <p></p>
          </div>

          <div>
            <h3 className="text-base font-medium text-slate-700 mb-2">Pembayaran</h3>
            <p className="text-sm text-slate-600">Metode: {order.paymentMethod}</p>
            <p className="text-sm text-slate-600">Status: {order.paymentStatus}</p>
          </div>
        </div>

        {/* <Separator /> */}
        <hr className="my-4 border-t border-slate-200" />

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-slate-700">Status Pesanan</h3>
          {/* <Badge
            variant="outline"
            className={`${
              order.statusOrder === "completed"
                ? "text-green-600 border-green-600"
                : order.statusOrder === "pending"
                ? "text-yellow-600 border-yellow-600"
                : "text-slate-600 border-slate-600"
            }`}
          > */}
          <span
            className={`px-3 py-1 rounded-md font-semibold 'bg-green-200 text-green-80 bg-green-300`}
          >
            {/* {typeof value === 'string' ? value.charAt(0).toUpperCase() + value.slice(1) : 'No status'} */}
            {order.statusOrder}
          </span>
          {/* </Badge> */}
        </div>

        {/* <Separator /> */}
        <hr className="my-4 border-t border-slate-200" />

        <div>
          <h3 className="text-base font-semibold text-slate-700 mb-4">Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100 text-slate-600">
                <tr>
                  <th className="p-3">Products</th>
                  <th className="p-3">Jumlah</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">
                      <img src={item.images[0]} alt={item.name} className="w-12 h-12 object-cover rounded" />

                      <span className="pl-3">
                        {item.name}
                      </span>
                    </td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">Rp {item.price.toLocaleString()}</td>
                    <td className="p-3">Rp {item.subPrice.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t font-semibold text-slate-700 bg-slate-50">
                  <td className="p-3 text-right" colSpan={3}>
                    Total
                  </td>
                  <td className="p-3">
                    Rp {order.totalPrice.toLocaleString()}
                  </td>
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