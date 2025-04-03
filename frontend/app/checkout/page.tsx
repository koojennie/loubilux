"use client";

import Navbar from "@/components/organisms/Navbar/Navbar";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { TbRosetteDiscount } from "react-icons/tb";
import Link from "next/link";

export default function page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 sm:grid-cols-2 max-md:grid-cols-1 max-md:grid-rows-2">
        {/* order form */}
        <div className="py-12 px-5">
            <div className="">
                <p className="text-left text-2xl font-semibold">Contact Information</p>
                <p className="text-left !mt-10 text-lg font-medium">Email address</p>
                <input
                type="text"
                className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
                placeholder="Enter your email address"
                />
            </div>
            <div className="!mt-10">
                <p className="text-left text-2xl font-semibold">Shipping Address</p>
                <p className="text-left !mt-10 text-lg font-medium">Address</p>
                <input
                type="text"
                className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
                placeholder="Enter your address"
                />
                <p className="text-left !mt-10 text-lg font-medium">Apartment, suite, etc.</p>
                <input
                type="text"
                className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
                placeholder="Enter your address details"
                />
                <div className="grid grid-flow-col grid-cols-3 gap-4">
                  <div className="grid grid-rows-1">
                    <p className="text-left !mt-10 text-lg font-medium">City</p>
                    <input
                    type="text"
                    className="mt-1 px-3 !py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
                    placeholder="Indonesia"
                    />
                  </div>
                  <div className="grid grid-rows-1">
                    <p className="text-left !mt-10 text-lg font-medium">State / Province</p>
                    <input
                    type="text"
                    className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
                    placeholder="Jakarta"
                    />
                  </div>
                  <div className="grid grid-rows-1">
                    <p className="text-left !mt-10 text-lg font-medium">Postal code</p>
                    <input
                    type="text"
                    className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
                    placeholder="15110"
                    />
                  </div>
                </div>
            </div>
            <div className="!mt-10">
              <p className="text-left text-2xl font-semibold">Billing Information</p>
              <label htmlFor="same-as-shipping" className="flex !items-center gap-2 mt-4 cursor-pointer">
                <input
                  id="same-as-shipping"
                  type="checkbox"
                  className="w-5 h-5 border-gray-300 !rounded-lg accent-[#493628] align-middle"
                />
                <span className="text-lg text-gray-800 leading-none align-middle !ml-4">Same as shipping information</span>
              </label>
            </div>
            <hr className="!mt-10 h-0.5 border-t-0 bg-transparent dark:bg-white/10" />
            <p className="!mt-10 text-lg text-gray-500">You won't be charged until the next step.</p>
            <div className="!mt-10 flex justify-end gap-3">
              <button onClick={() => setIsOpen(true)}
                  className="!rounded-full py-3 px-4 text-center border-2 border-[#493628] bg-white font-semibold text-lg text-[#493628] flex transition-all duration-500 hover:!bg-[#705C53] hover:text-white">
                  Apply Coupon
              </button>
              <Link href="/complete-checkout">
                <button className="!rounded-full py-3 px-4 text-center bg-[#493628] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]">Continue</button>
              </Link>
            </div>
        </div>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Backdrop dengan efek blur */}
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f8f5f2]">
                <TbRosetteDiscount className="size-6 text-[#AB886D]" />
              </div>
              <DialogTitle className="text-lg font-semibold text-gray-900 mt-3">Apply Coupon</DialogTitle>
              <p className="text-sm text-gray-500">Enter your coupon code to get a discount.</p>
              <input
                type="text"
                className="mt-3 px-4 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
                placeholder="Enter coupon code"
              />
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 !rounded-full max-w-[280px] border-2 border-[#493628] bg-white font-semibold text-lg text-[#493628] flex transition-all duration-500 hover:!bg-[#705C53] hover:text-white"
              >
                Cancel
              </button>
              <button className="px-4 py-2 !rounded-full bg-[#493628] text-white transition-all duration-500 font-medium hover:bg-[#705C53]
              ">Apply</button>
            </div>
          </DialogPanel>
        </div>
        </Dialog>
        {/* order summary */}
        <div className="py-12 px-5 bg-[#f8f5f2]">
            <div className="">
                <p className="text-left text-2xl font-semibold">Order summary</p>
                <div className="flex items-center justify-between !mt-10 border-b !pb-6 border-gray-200">
                    <div className="flex items-center gap-3">
                        <img src="/img/featured-item1.png" alt="product" className="w-[100px] h-[100px] rounded-lg" />
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold">Coach Mollie Tote Bag</p>
                            <p className="text-base font-normal">Bag</p>
                            <p className="text-base font-medium">1x</p>
                        </div>
                    </div>
                    <p className="text-xl font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))}</p>
                </div>
                <div className="flex items-center justify-between w-full mb-6 !mt-6">
                    <p className="font-medium text-lg text-[#493628]">Sub Total</p>
                    <h6 className="font-semibold text-lg">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))}</h6>
                </div>
                <div className="flex items-center justify-between w-full !pb-6 border-b border-gray-200">
                    <p className="font-medium text-lg text-[#493628]">Delivery Charge</p>
                    <h6 className="font-semibold text-lg">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(15000))}</h6>
                </div>
                <div className="flex items-center justify-between w-full py-6">
                    <p className="font-medium text-xl text-[#493628]">Total</p>
                    <h6 className="!font-semibold text-xl">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3205000))}</h6>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
