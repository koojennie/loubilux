"use client";

import Navbar from "@/components/organisms/Navbar/Navbar";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { TbRosetteDiscount } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useCheckout } from "@/context/CheckoutContext";
import { User } from "@/types/type";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineQrCode } from "react-icons/hi2";



export default function page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState<boolean>(false);
  const [userShipping, setUserShipping] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const { checkoutData } = useCheckout() ?? {};

  // console.log(checkoutData);

  const [cart, setCart] = useState<any>(null);

  const fetchCartUser = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
        {
          withCredentials: true,
        }
      );
      const sortedProducts = response.data.data.products.sort((a: any, b: any) => {
        // Ambil angka dari string seperti "CARTITEM-00002"
        const getIdNumber = (id: string) => parseInt(id.replace(/[^\d]/g, ""));
        return getIdNumber(a.cartItemId) - getIdNumber(b.cartItemId);
      });

      setCart({
        ...response.data.data,
        products: sortedProducts,
      });
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  };

  const fetchUser = async () => {
    try {
      const responseMe = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );

      const userId = responseMe.data.user.id;

      try {
        const responseUser = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userbyid/${userId}`,
          { withCredentials: true }
        );
        setUserShipping(responseUser.data.data);
      } catch (error: any) {
        console.error(`Error when fetch user detail: ${error.message}`);
      }

    } catch (err: any) {
      console.error(`Error: ${err.message}`);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/address`, {
        withCredentials: true,
      });
      setAddresses(response.data.data);
      // console.log(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchCartUser();
    fetchUser();
    fetchAddresses();
  }, []);

  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "");

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);


  const subtotal = cart?.products.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0) ?? 0;
  const delivery = 15000;
  const total = subtotal + delivery;

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    // console.log('Selected addressId:', addressId);
  };
  const selectedAddress = addresses.find(addr => addr.addressId === selectedAddressId);

  const handleCheckout = async () => {
    try {
      const createOrderResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/create`,
        {
          shippingAddressId: selectedAddressId,
          selectedProducts: cart?.products.map((p: any) => p.product.productId),
        },
        { withCredentials: true }
      );


      const newOrderId = createOrderResponse.data.order.orderId;

      console.log(createOrderResponse);
      console.log(newOrderId);

      // 2. Lanjutkan ke payment
      const paymentResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/payments`,
        {
          orderId: newOrderId,
          amount: total,
          addressId: selectedAddressId,
        },
        { withCredentials: true }
      );

      const snapToken = paymentResponse.data.token;

      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log("Payment success", result);
          // redirect ke halaman success
          toast.success("Payment success");
          router.push('/complete-checkout');
        },
        onPending: function (result) {
          console.log("Payment pending", result);
          toast(`Payments Pendint + ${result}`, {icon: '⌚'})
        },
        onError: function (result) {
          console.error("Payment error", result);
          toast.error(`Payment error + ${result}`);
        },
        onClose: function () {
          console.log("Payment popup closed");
        },
      });
    } catch (err) {
      console.error("Checkout failed", err);
    } finally {
      setIsOpenModalConfirmation(false);
      router.push('/complete-checkout');
    }
  };


  return (
    <>
      <Navbar />
      <Toaster />
      <div className="grid grid-cols-2 sm:grid-cols-2 max-md:grid-cols-1 max-md:grid-rows-2">
        {/* order form */}
        <div className="px-20 pb-20 max-sm:p-5">
          <div className="flex flex-col -pb-12 top-4 left-4">
            <Link href="/cart">
              <button className="bg-[#493628] text-white !rounded-full w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7m0 0l7-7"></path>
                </svg>
              </button>
            </Link>
          </div>
          <div className="mt-3">
            {/* <p className="text-left text-2xl font-semibold">Contact Information</p> */}
            {/* <p className="text-left !mt-10 text-lg font-medium">Email address</p>
            <p className="text-lg text-[#493628] leading-none align-middle">{userShipping?.email}</p> */}

          </div>
          <div className="mt-10 ">
            <p className="text-2xl font-semibold mb-4">Select Shipping Address</p>
            <div className="grid gap-4 overflow-y-auto max-h-[300px] pr-2">
              {addresses.map((address) => (
                <div
                  key={address.addressId}
                  onClick={() => handleSelectAddress(address.addressId)}
                  className={`cursor-pointer border p-3 rounded-lg transition ${selectedAddressId === address.addressId ? 'border-[#493628] bg-[#f8f5f2]' : 'border-gray-300'
                    }`}
                >
                  <p className="font-medium">{address.receiverName}</p>
                  <p className="text-sm">{address.detail}, {address.city}, {address.province}</p>
                  <p className="text-sm">{address.postalCode}</p>
                  <p className="text-sm">Phone: {address.phoneNumber}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedAddressId && (
            <div className="mt-10">
              <p className="text-left !mt-5 text-lg font-medium">Receiver Name</p>
              <p className="text-lg text-[#493628] leading-none align-middle">{selectedAddress?.receiverName}</p>
              
              <p className="text-left !mt-5 text-lg font-medium">Email address</p>
              <p className="text-lg text-[#493628] leading-none align-middle">{userShipping?.email}</p>
              
              <p className="text-left !mt-5 text-lg font-medium">Phone Number</p>
              <p className="text-lg text-[#493628] leading-none align-middle">{selectedAddress?.phoneNumber}</p>

              <p className="text-lg !mt-5 font-medium">Address</p>
              <input
                type="text"
                value={selectedAddress.detail}
                readOnly
                className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
              />

              <p className="text-lg font-medium !mt-5">City</p>
              <input
                type="text"
                value={selectedAddress.city}
                readOnly
                className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
              />

              <p className="text-lg font-medium !mt-5">Province</p>
              <input
                type="text"
                value={selectedAddress.province}
                readOnly
                className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
              />

              <p className="text-lg font-medium !mt-5">Postal Code</p>
              <input
                type="text"
                value={selectedAddress.postalCode}
                readOnly
                className="mt-1 px-3 py-2 border rounded-lg w-full outline-none focus:ring-2 focus:ring-[#493628]"
              />
            </div>
          )}



          {/* <div className="!mt-10">
            <p className="text-left text-2xl font-semibold">Billing Information</p>
            <label htmlFor="same-as-shipping" className="flex !items-center gap-2 mt-4 cursor-pointer">
              <input
                id="same-as-shipping"
                type="checkbox"
                className="w-5 h-5 border-gray-300 !rounded-lg accent-[#493628] align-middle"
              />
              <span className="text-lg text-gray-800 leading-none align-middle !ml-4">Same as shipping information</span>
            </label>
          </div> */}
          <hr className="!mt-10 h-0.5 border-t-0 bg-transparent dark:bg-white/10" />
          <p className="!mt-10 text-lg text-gray-500">You won't be charged until the next step.</p>
          <div className="!mt-10 flex justify-end gap-3">
            {/* <Link href="/complete-checkout"> */}
            <button className="!rounded-full py-3 px-4 text-center bg-[#493628] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]"
              onClick={() => setIsOpenModalConfirmation(true)}
            >Continue</button>
            {/* </Link> */}
          </div>
        </div>

        {/* Dialog Confirm */}
        <Dialog open={isOpenModalConfirmation} onClose={() => setIsOpenModalConfirmation(false)} className="relative z-50">
          {/* Backdrop dengan efek blur */}
          <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="relative max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#f8f5f2]">
                  <HiOutlineQrCode className="size-6 text-[#AB886D]" />
                </div>
                <DialogTitle className="text-lg font-semibold text-gray-900 mt-3">Confirm Payments</DialogTitle>
                <p className="text-base text-gray-500">Are you sure you want to proceed with the payment?</p>
                <p className="text-sm text-gray-500">You will be redirected to the payment page</p>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setIsOpenModalConfirmation(false)}
                  className="px-3 py-2 !rounded-full max-w-[280px] border-2 border-[#493628] bg-white font-semibold text-base text-[#493628] flex transition-all duration-500 hover:!bg-[#705C53] hover:text-white"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 !rounded-full bg-[#493628] text-white transition-all duration-500 font-medium text-base hover:bg-[#705C53]"
                  onClick={handleCheckout}
                >Yes</button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* order summary */}
        <div className="p-20 bg-[#f8f5f2] max-sm:p-5">
          <div className="">
            <p className="text-left text-2xl font-semibold">Order summary</p>
            {cart && cart.products.map((item: any) => (
              <div key={item.cartItemId} className="flex items-center justify-between !mt-10 border-b !pb-6 border-gray-200">
                <div className="flex items-center gap-3">
                  <img src={item.product.images?.[0] || "/img/featured-item1.png"} alt="product" className="w-[100px] h-[100px] rounded-lg max-sm:w-[50px] max-sm:h-[50px]" />
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold">{item.product.name}</p>
                    <p className="text-base font-normal">{item.product.productId}</p>
                    <p className="text-base font-medium">{item.quantity}x</p>
                  </div>
                </div>
                <p className="text-xl font-medium">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.product.price * item.quantity)}</p>
              </div>
            ))}
            <div className="flex items-center justify-between w-full mb-6 !mt-6">
              <p className="font-medium text-lg text-[#493628]">Sub Total</p>
              <h6 className="font-semibold text-lg">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(subtotal)}</h6>
            </div>
            <div className="flex items-center justify-between w-full !pb-6 border-b border-gray-200">
              <p className="font-medium text-lg text-[#493628]">Delivery Charge</p>
              <h6 className="font-semibold text-lg">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(delivery)}</h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
              <p className="font-medium text-xl text-[#493628]">Total</p>
              <h6 className="!font-semibold text-xl">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
