import Navbar from "@/components/organisms/Navbar/Navbar";
import Image from "next/image";
import { FaRupiahSign } from "react-icons/fa6";

export default function page() {
  return (
    <>
    <Navbar />
    <section className="py-10 relative">
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
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
                    <div className="flex items-baseline gap-1 text-center">
                        <FaRupiahSign className="text-lg text-[#493628]" />
                        <h6 className="font-medium text-lg leading-8 text-[#493628] ml-2 max-[550px]:text-center">3.190.000</h6>
                    </div>
                </div>
            </div>
            <div
                className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto xl:gap-50 xl:pr-5 md:gap-5 md:pr-100">
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
                <div className="flex items-baseline gap-1 text-center">
                        <FaRupiahSign className="text-2xl text-[#493628]" />
                        <h6 className="font-bold text-2xl leading-9 w-full text-[#493628] text-center max-w-[176px]">3.190.000</h6>
                    </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
            <div
                className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box"><img src="https://pagedone.io/asset/uploads/1701162866.png" alt="perfume bottle image" className="xl:w-[140px] !rounded-xl object-cover"/></div>
                <div className="pro-data w-full max-w-sm ">
                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">Musk Rose Cooper
                    </h5>
                    <p
                        className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                        Perfumes</p>
                    <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">$120.00</h6>
                </div>
            </div>
            <div
                className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                <h6 className="font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                    $15.00 <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery
                        Charge)</span></h6>
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
                <h6
                    className="text-indigo-600 font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                    $120.00</h6>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
            <div
                className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box"><img src="https://pagedone.io/asset/uploads/1701162880.png" alt="perfume bottle image" className="xl:w-[140px] !rounded-xl object-cover"/></div>
                <div className="pro-data w-full max-w-sm ">
                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">Dusk Dark Hue
                    </h5>
                    <p
                        className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                        Perfumes</p>
                    <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">$120.00</h6>
                </div>
            </div>
            <div
                className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                <h6 className="font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                    $15.00 <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery
                        Charge)</span></h6>
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
                <h6
                    className="text-indigo-600 font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                    $120.00</h6>
            </div>
        </div>
        <div className="bg-[#f8f5f2] !rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
            <div className="flex items-center justify-between w-full mb-6">
                <p className="font-normal text-xl leading-8 text-[#705C53]">Sub Total</p>
                <h6 className="font-semibold text-xl leading-8 text-[#493628]">$360.00</h6>
            </div>
            <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                <p className="font-normal text-xl leading-8 text-[#705C53]">Delivery Charge</p>
                <h6 className="font-semibold text-xl leading-8 text-[#493628]">$45.00</h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
                <p className="font-medium text-2xl leading-9 text-[#493628]">Total</p>
                <h6 className="font-medium text-2xl leading-9 text-[#493628]">$405.00</h6>
            </div>
        </div>
        <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button
                className="!rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Add Coupon Code</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button
                className="!rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
                to Payment
                <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                    fill="none">
                    <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</section>
</>
                                        
  )
}
