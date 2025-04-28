'use client';

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserForm from "@/components/organisms/Form/UserForm";
import toast, {Toaster} from "react-hot-toast";

const AddProduct = () => {

  const router = useRouter();

  const handleUserSubmit = async (formData: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`,
        formData,
        { 
          withCredentials: true
        }
      );

      if(response.status === 201){
        toast.success("User successfully added!");
        router.push("/admin/users"); 
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
        <UserForm onSubmit={handleUserSubmit}/>
        <Toaster />
      </div>
    </div>
  )
}

export default AddProduct;