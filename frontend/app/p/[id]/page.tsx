"use client"
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/types/type";
import axios from "axios";
import Navbar from "@/components/organisms/Navbar/Navbar";


const productPage = () => {
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

  }, [])


  return (
    // ini page html nya kamu juga udh tau ya say 😚
    <div>
      <Navbar />
      <h1>ini adalah halaman products</h1>
      {/* ini tuh kondisi kalau product nya gak kosong nanti tampilin */}
      {product &&
        <>
          <p>ini adalah product name : {product.name}</p>
          {/* untuk price perlu di format yah */}
          <p>Ini adalah harga nya : {product.price}</p>

        {/* ini buat belajar state  */}
          <p>{qtyProduct}</p>
          <button className="btn" onClick={() => { setQtyProduct(qtyProduct + 1) }}>Increase button</button>
          <button className="btn" onClick={() => { setQtyProduct(qtyProduct - 1) }}>Decrease button</button>
        </>
      }
    </div>  
  )
}

export default productPage;