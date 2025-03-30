'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserForm from "@/components/organisms/Form/UserForm";
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


  const handleUserSubmit = async (formData: any) => {
    if (!token) {
      console.error('No token available');
      toast.error("Authentication token is missing. Please try again.");
      return;
    }

    console.log("ini adalah handle user submit", formData);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
        formData,
        { 
          headers: { 
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if(response.status === 201){
        toast.success("User successfully added!");
        router.push("/admin/products"); 
      } else {
        toast.error(response.data.message || "Failed to add product!");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      console.error('Error when submitting new product', error);
    }
  }

  return (
    <div className="p-8 md:p-8 ">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <UserForm  onSubmit={handleUserSubmit}/>
        <Toaster />
      </div>
    </div>
  )
}

export default AddProduct;