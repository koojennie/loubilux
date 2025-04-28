'use client';

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import CategoryForm from "@/components/organisms/Form/CategoryForm";

const AddPageCategory = () => {

  const router = useRouter();

  const handleAddCategory = async (formData: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`,
        formData,
        {
          withCredentials: true
        }
      );

      if (response.status === 201) {
        toast.success("Category Created successfully", { duration: 2000 });
        setTimeout(() => {
          router.push("/admin/categories");
        }, 1000);
      } else {
        toast.error(response.data.message || "Failed to add category!");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      console.error('Error when submitting new category', error);
    }
  }

  return (
    <div className="p-8 md:p-8 ">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <CategoryForm isEdit={false} onSubmit={handleAddCategory} />
        <Toaster />
      </div>
    </div>
  )
}

export default AddPageCategory;