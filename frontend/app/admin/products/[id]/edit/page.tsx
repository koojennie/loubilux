'use client';

import React, { useState } from "react";
import Image from 'next/image';
import ModalConfirmation from "@/components/organisms/Modal/ModalConfirmation";
import { useRouter } from "next/navigation";

interface EditProductProps {
  params: {
    id: string;
    slug:string;
  }
}

const EditProduct = ({ params }: EditProductProps) => {

  const router = useRouter();

  // const [products, setProducts] = useState([
  //   { id: '1', name: "Baju", qty: "17", amount: "$1,200.00", status: "Active", category: "Clothing", Action: "Edit" },
  //   { id: '2', name: "Sepatu", qty: "10", amount: "$1,500.00", status: "Active", category: "Footwear", Action: "Edit" },
  //   { id: '3', name: "Sepatu", qty: "10", amount: "$1,500.00", status: "Draft", category: "Footwear", Action: "Edit" },
  //   { id: '4', name: "Sepatu", qty: "10", amount: "$1,500.00", status: "Active", category: "Footwear", Action: "Edit" },
  //   { id: '5', name: "sepatu", qty: "10", amount: "$1,500.00", status: "Active", category: "Footwear", Action: "Edit" },
  //   { id: '6', name: "Baju", qty: "17", amount: "$1,200.00", status: "Draft", category: "Clothing", Action: "Edit" },
  //   { id: '7', name: "Sepatu", qty: "10", amount: "$1,500.00", status: "Draft", category: "Footwear", Action: "Edit" },
  //   { id: '8', name: "Sepatu", qty: "10", amount: "$1,500.00", status: "Draft", category: "Footwear", Action: "Edit" },
  // ]);

  
  const [products, setProducts] = useState(null);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const openModalConfirmation = () => {
    setIsModalConfirmationOpen(true);
  }

  const closeModalConfirmation = () => {
    setIsModalConfirmationOpen(false);
  }


  return (
    <div className="p-8 md:p-8 ">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <div className="flex flex-col py-8 pt-8 mb-12 px-8 ">
          <h4
            className="text-lg mb-1 font-semibold text-slate-700">
            Edit Products
          </h4>
          <p className="mb-4 text-sm mt-1 text-slate-400">
            Change the form below to edit product details.
          </p>

          {/* Dropdown */}
          <div>
            <button
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              Last 30 days
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="z-10 absolute w-40 divide-y divide-gray-100 bg-white border border-gray-200 rounded-md shadow-md ">
                <ul className="p-2 space-y-1 text-sm text-gray-700">
                  <li className="flex items-center p-2 rounded-sm hover:bg-gray-100 cursor-pointer">
                    <input type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label className="w-full ms-2 text-sm font-medium text-gray-500 rounded-sm">Last day</label>
                  </li>
                  <li className="flex items-center p-2 rounded-sm hover:bg-gray-100 cursor-pointer">
                    <input type="radio" value="" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label className="w-full ms-2 text-sm font-medium text-gray-500 rounded-sm">Last day</label>
                  </li>

                </ul>
              </div>
            )}
            {/* Dropdown menu */}
            {/* {isDropdownOpen && (
    <div
    id="dropdownRadio"
    className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
    data-popper-reference-hidden=""
    data-popper-escaped=""
    data-popper-placement="top"
    style={{
      position: "absolute",
      inset: "auto auto 0px 0px",
      margin: 0,
      transform: "translate3d(522.5px, 3847.5px, 0px)"
    }}
  >
    <ul
      className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownRadioButton"
    >
      <li>
        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            id="filter-radio-example-1"
            type="radio"
            defaultValue=""
            name="filter-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="filter-radio-example-1"
            className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
          >
            Last day
          </label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            id="filter-radio-example-2"
            type="radio"
            defaultValue=""
            name="filter-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="filter-radio-example-2"
            className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
          >
            Last 7 days
          </label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            id="filter-radio-example-3"
            type="radio"
            defaultValue=""
            name="filter-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="filter-radio-example-3"
            className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
          >
            Last 30 days
          </label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            id="filter-radio-example-4"
            type="radio"
            defaultValue=""
            name="filter-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="filter-radio-example-4"
            className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
          >
            Last month
          </label>
        </div>
      </li>
      <li>
        <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            id="filter-radio-example-5"
            type="radio"
            defaultValue=""
            name="filter-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="filter-radio-example-5"
            className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
          >
            Last year
          </label>
        </div>
      </li>
    </ul>
  </div>
  )} */}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Code */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Product Code</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="Enter your text"
                  readOnly
                />
              </div>

              {/* Product Name */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Product Name</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="Enter Product Name"
                />
              </div>

              {/* Category */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Category</label>
                <select className="w-full h-10 bg-transparent text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400">
                  <option value="">ini value</option>
                </select>
              </div>

              {/* Amount */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Amount</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="Enter Amount"
                />
              </div>

              {/* Quantity */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Quantity</label>
                <input
                  type="number"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400"
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Status */}
              <div className="w-full">
                <label className="block mb-1 text-sm text-slate-700">Status</label>
                <select className="w-full h-10 bg-transparent text-slate-700 text-sm border border-slate-200 rounded px-3 shadow-sm focus:border-slate-400">
                  <option value="">ini adlah value</option>
                </select>
              </div>
            </div>

            {/* Kolom Kanan - Preview Image */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm text-slate-700">Preview Image</label>
              <div className="flex justify-center mb-4">
                <Image src="/icon/loubilux-logo.png" width={100} height={100} alt="Logo" />
              </div>
              <div className="mt-2 flex justify-center p-2 border-2 border-gray-300 border-dashed rounded-md">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <label className="cursor-pointer text-indigo-600 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="text-black">or drag and drop</p>
                  </div>
                  <p className="text-xs text-black">PNG, JPG, GIF up to 2MB</p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="p-6 pl-12">
          <div className="right-0 content-end">
            <button
              className="mx-auto select-none rounded border border-red-600 py-2 px-4 text-center text-sm font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-600/20 active:bg-red-700 active:text-white active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => router.push('/admin/products')}
            >
              Cancel
            </button>
            <span className="px-2"></span>
            <button
              className=" mx-auto select-none rounded bg-slate-800 py-2 px-4 text-center text-sm font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={openModalConfirmation}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <ModalConfirmation
        isOpen={isModalConfirmationOpen}
        onClose={closeModalConfirmation}
        onConfirm={closeModalConfirmation}
        textModal="Are you sure you want edit this product?"
      />
    </div>
  )
}

export default EditProduct;