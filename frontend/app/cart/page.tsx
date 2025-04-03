"use client";

import Navbar from "@/components/organisms/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
    <Navbar />
    <section className="py-10 relative">
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="flex flex-col -pb-12 top-4 left-4">
            <Link href="/">
                <button className="bg-[#493628] text-white !rounded-full w-12 h-12 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7m0 0l7-7"></path>
                    </svg>
                </button>
            </Link>
        </div>
        <h2 className="fw-bold text-4xl mb-30 text-center !text-[#493628]">Shopping Cart
        </h2>
        <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-[#705C53]">Product</div>
            <p className="font-normal text-xl leading-8 text-[#705C53] flex items-center justify-between">
                <span className="w-full max-w-[260px] text-center">Quantity</span>
                <span className="w-full max-w-[200px] text-center">Total</span>
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
            <div
                className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box"><Image src="/img/featured-item1.png" className="xl:w-[140px] !rounded-xl object-cover" width={140} height={140} alt="product 1"/></div>
                <div className="pro-data w-full max-w-sm ">
                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">Coach Mollie Tote Bag
                    </h5>
                    <p
                        className="font-normal text-lg leading-8 text-[#705C53] my-2 min-[550px]:my-3 max-[550px]:text-center">
                        Bag</p>
                    <h6 className="font-medium text-lg leading-8 text-[#493628] ml-2 max-[550px]:text-center">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))}</h6>
                </div>
            </div>
            <div
                className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto xl:gap-45 max-sm:gap-5">
                <div className="flex items-center w-full mx-auto justify-center">
                    <button
                        className="group !rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                            fill="none">
                            <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                        </svg>
                    </button>
                    <input type="text"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                        placeholder="1"/>
                    <button
                        className="group !rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                        <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                            fill="none">
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                strokeLinecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <h6 className="font-bold text-2xl leading-9 w-full text-[#493628] text-center max-w-[176px]">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))}</h6>
            </div>
        </div>

        <div className="bg-[#f8f5f2] !rounded-xl p-6 w-full mb-5 max-lg:max-w-xl max-lg:mx-auto">
            <div className="flex items-center justify-between w-full mb-6">
                <p className="font-normal text-xl leading-8 text-[#705C53]">Sub Total</p>
                <h6 className="font-semibold text-xl leading-8 text-[#493628]">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3190000))}</h6>
            </div>
            <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                <p className="font-normal text-xl leading-8 text-[#705C53]">Delivery Charge</p>
                <h6 className="font-semibold text-xl leading-8 text-[#493628]">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(15000))}</h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
                <p className="font-medium text-2xl leading-9 text-[#493628]">Total</p>
                <h6 className="font-medium text-2xl leading-9 text-[#493628]">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(3205000))}</h6>
            </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link href="/checkout">
                <button 
                    className="!rounded-full w-full max-w-[280px] py-4 px-4 text-center justify-center items-center bg-[#493628] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]">Continue
                    to Checkout
                    <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                        fill="none">
                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </Link>
        </div>
      </div>
  </section>
  </>                                    
  )
}
