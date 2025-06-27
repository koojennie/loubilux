"use client";

import Image from "next/image";
import React, { forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoCloseSharp } from "react-icons/io5";

export type TableType = "products" | "users" | "orders" | "categories";

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
}

interface ModalViewDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
  columns: Column<any>[];
  tableType: TableType;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);

const renderDataDetail = (colKey: string, value: any, tableType: TableType) => {
  if (tableType === "products") {
    if (colKey === "price") {
      return <p className="text-slate-500 text-sm truncate">{formatCurrency(value)}</p>;
    } else if (colKey === "statusPublish") {
      return (
        <span
          className={`text-sm px-3 py-1 rounded-lg font-semibold ${value === "active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
            }`}
        >
          {value === "active" ? "Published" : "Draft"}
        </span>
      );
    }
  } else if (tableType === "orders") {
    if (colKey === "orderDate") {

      const formattedDateStr = value.replace(/\./g, ':');

      // Parse the date string into a Date object
      const date = new Date(formattedDateStr);

      // Set timezone to Indonesia (WIB) using toLocaleString()
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
        timeZone: "Asia/Jakarta", // Indonesia timezone
      };

      const humanReadableDate = date
        .toLocaleString('id-ID', options)
        .replace(',', '') // Remove the comma between date and time
        .replace(/(\d{2}):(\d{2})/, '$1.$2'); // Replace colon in time with a dot

      return (
        <p className="text-gray-500 text-sm">{humanReadableDate} WIB</p>
      )
    } else if (colKey === "items" && Array.isArray(value)) {
      return (
        <div className="space-y-2 mt-2">
          {value.map((item, index) => (
            <div
              key={index}
              className="border p-2 rounded-md bg-gray-50 text-sm text-gray-700 overflow-y-auto"
            >
              <p><strong>Product:</strong> {item.productName}</p>
              <p><strong>Qty:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> {formatCurrency(item.productPrice)}</p>
              <p><strong>Subtotal:</strong> {formatCurrency(item.subPrice)}</p>
            </div>
          ))}
        </div>
      );
    } else if (colKey === "totalPrice") {
      return <p className="text-slate-500 text-sm truncate">{formatCurrency(value)}</p>;
    }
  } else if (tableType === 'users') {
    if (colKey === 'role') {
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'user' ? 'bg-yellow-100 text-yellow-600'
          : value === 'admin' ? 'bg-pink-100 text-pink-600'
            : value === 'superadmin' ? 'bg-purple-100 text-purple-600'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {value === 'superadmin' ? String('Super Admin') : value === 'admin' ? String('Admin') : value === 'user' ? String('User') : String(value)
          }
        </span>
      )
    }
  }
  return <p className="text-gray-500 text-sm">{value ?? "N/A"}</p>;
};

const ModalViewDetails = forwardRef<HTMLDivElement, ModalViewDetailsProps>(({ isOpen, onClose, data, columns, tableType }, ref) => {
  if (!isOpen || !data) return null;

  const images = data.images ?? []; // Array gambar
  const profilePicture = data.profilePicture ?? ""; // Single image

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition-opacity duration-300 z-50"
    >
      <div className="relative flex flex-col w-[50%] max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg rounded-xl bg-white shadow-lg" ref={ref}>
        <div className="flex flex-col p-4 sm:p-6">
          {/* Close Button and Title */}
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-xl sm:text-2xl text-[#493628]">
              {data.name || data.orderId || "Detail"}
            </p>
            <button
              className="text-gray-500 hover:text-gray-300 p-2 rounded-full"
              onClick={onClose}>
              <IoCloseSharp size={24} />
            </button>
          </div>

          <div
            className={`grid grid-cols-1 ${tableType !== "orders" && tableType != "categories"
              ? "md:grid-cols-2"
              : ""
              } gap-4 md:gap-6`}
          >
            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {columns.map(({ key, label }) => (
                <div key={String(key)} className="mb-3">
                  <p className="font-semibold text-[#493628] text-base">
                    {label}
                  </p>
                  {renderDataDetail(String(key), data[key], tableType)}
                </div>
              ))}
            </div>

            {/* Image Preview Section */}
            {tableType !== "orders" && tableType !== "categories" && (
              <div className="flex flex-col items-center">
                <p className="font-semibold text-base text-[#493628]">
                  {tableType === "users"
                    ? "Profile Picture"
                    : "Preview Image"}
                </p>

                {/* Jika ada banyak gambar (array) */}
                {images.length > 0 ? (
                  <Swiper
                    pagination={{ type: "fraction" }}
                    navigation
                    modules={[Pagination, Navigation]}
                    className="w-48 h-48 rounded-lg overflow-hidden"
                  >
                    {images.map((image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-48 h-48 flex justify-center items-center">
                          <Image
                            src={image}
                            alt={`Image ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-lg"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : profilePicture ? (
                  // Jika hanya ada satu gambar (profilePicture)
                  <div className="relative w-36 h-36 flex justify-center items-center">
                    <Image
                      src={profilePicture}
                      alt="Profile Picture"
                      fill
                      sizes=""
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  // Jika tidak ada gambar sama sekali
                  <p className="text-gray-500 text-sm">No Image</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
);

ModalViewDetails.displayName = "ModalViewDetails";

export default ModalViewDetails;
