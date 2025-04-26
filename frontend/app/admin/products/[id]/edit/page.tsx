'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/organisms/Form/ProductForm";
import {Product} from '../../page'
import toast, {Toaster} from "react-hot-toast";

const EditProduct = () => {

  const router = useRouter();
  const paramsProductId = useParams<{id:string}>().id;

  const [token, setToken] = useState<string | null>(null);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const fetchProduct = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${paramsProductId}`);
        setProduct(fetchProduct.data.data);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    }
    
    fetchProduct()
  }, []);


  // handle edit product
  const handleEditProduct = async (formData: any) => {
    if (!token) {
      console.error('No token available');
      return;
    }

    console.log('data yang dikirim buat edit', formData);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/edit/${paramsProductId}`,
        formData,
        { 
          headers: { 
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if(response.status === 200){
        toast.success("Product update successfully");
        
        router.push("/admin/products");
      } else {
        toast.error(response.data.message || "Failed to add product!");
      }
    } catch (error) {
      console.error('Error when submitting new product', error);
    }
  }

  return (
    <div className="p-8 md:p-8 ">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <ProductForm onEditSubmit={handleEditProduct} isEdit={true} initialData={product}/>
        <Toaster />
      </div>
    </div>
  )
}

export default EditProduct;