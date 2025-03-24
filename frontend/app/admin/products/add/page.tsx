'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/organisms/Form/ProductForm";
import toast, {Toaster} from "react-hot-toast";

const AddProduct = () => {

  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
          username: 'saniadmin1',
          password: 'saniadmin1.P'
        });
        const token = response.data.token;
        setToken(token);
        console.log('done get token', token);
        
      } catch (error) {
        console.error('Error fetching token', error);
      }
    };

    fetchToken();
  }, []);


  const handleProductSubmit = async (formData: any) => {
    if (!token) {
      console.error('No token available');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/create`,
        formData,
        { 
          headers: { 
            "Authorization": `Bearer ${token}`
          },
        }
      );


      if(response.status === 201){
        toast.success("Product successfully added!");
        
        setTimeout(() => router.push("/admin/products"), 2000); 
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
        <ProductForm onSubmit={handleProductSubmit}/>
        <Toaster />
      </div>
    </div>
  )
}

export default AddProduct;