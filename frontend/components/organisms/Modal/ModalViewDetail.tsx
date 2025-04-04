"use client";

import Image from "next/image";
import React from "react";
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
          className={`text-sm px-2 py-1 rounded-md w-fit ${value === "active" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
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
    }
  } else if (tableType === 'users') {
    if (colKey === 'role') {
      return (
        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${value === 'user' ? 'bg-yellow-200 text-yellow-800'
          : value === 'admin' ? 'bg-indigo-200 text-indigo-800'
            : value === 'superadmin' ? 'bg-purple-200 text-purple-800'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {value === 'superadmin' ? String('Super Admin') : value === 'admin' ? String('Admin') : value === 'user' ? String('User'): String(value)
          }
        </span>
      )
    }
  }
  return <p className="text-gray-500 text-sm">{value ?? "N/A"}</p>;
};

const ModalViewDetails: React.FC<ModalViewDetailsProps> = ({ isOpen, onClose, data, columns, tableType }) => {
  if (!isOpen || !data) return null;

  const images = data.images ?? []; // Array gambar
  const profilePicture = data.profilePicture ?? ""; // Single image

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition-opacity duration-300 z-50">
      <div className="relative flex flex-col w-[90%] max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg rounded-xl bg-white shadow-lg">
        <div className="flex flex-col p-4 sm:p-6">
          {/* Close Button and Title */}
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-xl sm:text-2xl text-slate-700">{data.name || data.orderId || "Detail"}</p>
            <button className="text-gray-500 hover:bg-gray-300 p-2 rounded-full" onClick={onClose}>
              <IoCloseSharp size={24} />
            </button>
          </div>


          <div className={`grid grid-cols-1 ${(tableType !== "orders" && tableType != "categories") ? "md:grid-cols-2" : ""} gap-4 md:gap-6`}>
            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {columns.map(({ key, label }) => (
                <div key={String(key)} className="mb-2">
                  <p className="font-semibold text-gray-600 text-sm sm:text-base">{label}</p>
                  {renderDataDetail(String(key), data[key], tableType)}
                </div>
              ))}
            </div>

            {/* Image Preview Section */}
            {(tableType !== 'orders' && tableType !== "categories") && (
              <div className="flex flex-col items-center">
                <p className="font-semibold text-sm sm:text-base text-slate-700">{tableType === 'users' ? "Profile Picture" : "Preview Image"}</p>

                {/* Jika ada banyak gambar (array) */}
                {images.length > 0 ? (
                  <Swiper
                    pagination={{ type: "fraction" }}
                    navigation
                    modules={[Pagination, Navigation]}
                    className="w-full max-h-48 sm:max-h-64 rounded-lg overflow-hidden"
                  >
                    {images.map((image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-48 sm:h-64 flex justify-center items-center">
                          <Image src={image} alt={`Image ${index + 1}`} fill objectFit="contain" className="rounded-lg" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : profilePicture ? (
                  // Jika hanya ada satu gambar (profilePicture)
                  <div className="relative w-40 h-40 sm:w-64 sm:h-64 flex justify-center items-center">
                    <Image src={profilePicture} alt="Profile Picture" fill objectFit="contain" className="rounded-lg" />
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
};

export default ModalViewDetails;
