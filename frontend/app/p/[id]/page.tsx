"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import toas, { toast, Toaster } from "react-hot-toast";
import Navbar from "@/components/organisms/Navbar/Navbar";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/type";


const productPage = () => {
  // ini panggil userCart jadi aku tuh pengen ketika ada action button add cart itu ngerefresh juga yang ada di nav
  const { refreshCart } = useCart();

  // ini router buat natvigation kayak ngelink
  const router = useRouter();
  // untuk yang ini ambil parameter URL kalau kamu akses kan tu /[id] dan fungsi yang ini buat ambil yah
  const paramUserId = useParams<{ id: string }>().id;

  // Kita perlu variable untuk menyimpan state, jadi state itu perubahan pas di ui gitu loh kayak angka berubah ketika di click
  // nah di ui nya berubah karena ada state 

  // disini aku mau simpen state untuk nyimpen data product, jadi product yg di ambil dari api simpen ke sini nantinya,
  // selain untuk simpen guna nya untuk nampilin
  // karena type data di typescript itu perlu di tulis makanya kenapa ada Product kita panggil di sini
  const [product, setProduct] = useState<Product | null>(null);
  const [qtyProduct, setQtyProduct] = useState<number>(1);

  // jadi untuk melakukan fetch api atau manggil api itu perlu ada libray say, nah karena posisinya ini pertama kali di panggil
  // jadi di panggil ketika pertama kali alias pas reload, itu pake useEffect, jadi kayak syhnorize with an external system gitu 
  // jadi gak gak jalan setiap saat gitu loh tapi tergantung dependecis nah kebetulan ada array kosong itu gak ada dependencis nya kalau ada depedenscis dari reload pertama sama ketika variable itu berubah
  useEffect(() => {
    // ini fetch api jadi axios itu buat fetch api kan itu kamu liat ada .get berarti get kalau post berarti apa yohhh??????
    // nah kalau ini API yah kamu udh tau pasti 
    // kita buat kalau dengan sistem external itu pake try catcth dan async kenapa?karena berjalan di belakang, karene reponse dari luar
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${paramUserId}`);
        // setelah ke ambil simpen ke state yang tadi udh di deklarasiin yang Product itu, nah karena state itu ada SetProduct (yng mana itu function buat set nilai apa gitu lh)
        // kamu bingung kan kenapa reponse.data.data sampe 2x kalau pengen tau kamu console.log(response) dulu si reponse nya setelah itu json nya kamu ambil data product nya
        setProduct(response.data.data);
      } catch (error) {
        // kalau ada kendala error dari server nya kah atau dari data nya gak ada perlu ada yang handle aku mau coba set error di console aja
        console.log("error when fetching data", error);

      }
    }
    fetchProductById();
  }, []);


  // kita perlu buat function untuk addItemCart jadi ketika button di click panggil api buat post ke sana
  const handleClickAddItemCart = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/add`,
        {
          productId: product?.productId,
          quantity: qtyProduct,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Item added to cart successfully:", response.data);
    } catch (error) {
      console.log("Error adding item to cart:", error);
    } finally {
      refreshCart();
      toast.success("Product berhasil ditambahkan ke keranjang");
    }
  };




  return (
    // ini page html nya kamu juga udh tau ya say 😚
    <div>
      <Navbar />
      <Toaster />
      <h1>ini adalah halaman products</h1>
      {/* ini tuh kondisi kalau product nya gak kosong nanti tampilin */}
      {product &&
        <>
          <p>ini adalah product name : {product.name}</p>
          {/* untuk price perlu di format yah */}
          <p>Ini adalah harga nya : {product.price}</p>

          <div
            className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto xl:gap-45 max-sm:gap-5">
            <div className="flex items-center w-full mx-auto justify-center">
              <button
                className="group !rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                onClick={() => setQtyProduct(qtyProduct - 1)}
              >
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
                value={qtyProduct}
                onChange={(e) => setQtyProduct(Number(e.target.value))}
                placeholder="1" />
              <button
                className="group !rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                onClick={() => setQtyProduct(qtyProduct + 1)}
              >
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
          </div>
          {/* ini buat belajar state  */}
          <div className="flex items-center flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              className="!rounded-full w-full max-w-[280px] py-4 px-4 text-center justify-center items-center bg-[#493628] font-semibold text-lg text-white flex transition-all duration-500 hover:bg-[#705C53]"
              onClick={handleClickAddItemCart}
            >
              <FaCartPlus />
              Add To Cart
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default productPage;