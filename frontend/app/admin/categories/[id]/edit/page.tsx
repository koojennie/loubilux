'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import CategoryForm from "@/components/organisms/Form/CategoryForm";
import { Category } from "@/types/type";

const EditPageCategory = () => {

  const router = useRouter();
  const paramsCategoryId = useParams<{id:string}>().id;
  
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategoryDataById = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/${paramsCategoryId}`,
          {
            withCredentials: true
          }
        );
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Failed to fetch user data. Please try again.");
      }
    };

    fetchCategoryDataById();
  }, []);


  const handleCategoryEdit = async (formData: any) => {

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories/${paramsCategoryId}`,
        formData,
        { 
            withCredentials: true
        }
      );

      if(response.status === 200) {
        toast.success("Category Updated successfully", {duration: 2000});
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
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-[#493628] shadow-lg">
        <CategoryForm  isEdit={true} onEditSubmit={handleCategoryEdit} initialData={category}/>
        <Toaster />
      </div>
    </div>
  )
}

export default EditPageCategory;