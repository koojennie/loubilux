"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoCloseSharp } from "react-icons/io5";

export type TableType = "products" | "users" | "transaction";

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
          className={`text-sm px-2 py-1 rounded-md w-fit ${
            value === "active" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {value === "active" ? "Published" : "Draft"}
        </span>
      );
    }
  }
  return <p className="text-gray-500 text-sm">{value ?? "N/A"}</p>;
};

const ModalViewDetails: React.FC<ModalViewDetailsProps> = ({ isOpen, onClose, data, columns, tableType }) => {
  if (!isOpen || !data) return null;

  const images = data.images ?? []; // Array gambar
  const profilePicture = data.profilePicture ?? ""; // Single image

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition-opacity duration-300">
      <div className="relative flex w-full max-w-[50rem] flex-col rounded-xl bg-white shadow-md">
        <div className="flex flex-col pb-6 px-6 -pt-6">
          {/* Close Button and Title */}
          <div className="flex justify-between items-center mt-3 mb-5">
            <p className="font-bold text-2xl text-slate-700">{data.name || "Detail"}</p>
            <button className="text-gray-500 hover:bg-gray-300 p-2 rounded-full" onClick={onClose}>
              <IoCloseSharp size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Details Section */}
            <div className="grid grid-rows-1 md:grid-cols-2 gap-4">
              {columns.map(({ key, label }) => (
                <div key={String(key)} className="mb-3">
                  <p className="font-semibold text-gray-600">{label}</p>
                  {renderDataDetail(String(key), data[key], tableType)}
                </div>
              ))}
            </div>

            {/* Image Preview Section */}
            <div className="flex flex-col items-center">
              <p className="font-semibold text-base text-slate-700">Preview Image</p>

              {/* Jika ada banyak gambar (array) */}
              {images.length > 0 ? (
                <Swiper pagination={{ type: "fraction" }} navigation modules={[Pagination, Navigation]} className="w-full h-48 rounded-lg overflow-hidden">
                  {images.map((image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-64 flex justify-center items-center">
                        <Image src={image} alt={`Image ${index + 1}`} fill objectFit="contain" className="rounded-lg" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : profilePicture ? (
                // Jika hanya ada satu gambar (profilePicture)
                <div className="relative w-48 h-48 flex justify-center items-center">
                  {/* <Image src={profilePicture} alt="Profile Picture" width={192} height={192} className="rounded-lg object-cover" /> */}
                  <Image src={profilePicture} alt="Profile Picture" fill objectFit="contain" className="rounded-lg object-cover" />
                </div>
              ) : (
                // Jika tidak ada gambar sama sekali
                <p className="text-gray-500 text-sm">No Image</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalViewDetails;
