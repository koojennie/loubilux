'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import OpnameForm from "@/components/organisms/Form/OpnameForm";
import toast, {Toaster} from "react-hot-toast";

const AddOpnamePage = () => {

  const router = useRouter();

  const handleProductSubmit = async (formData: any) => {

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname`,
        formData,
        { 
          withCredentials: true,
        }
      );


      if(response.status === 201){
        toast.success("Data Opname successfully added!");
        
        setTimeout(() => router.push("/admin/products"), 2000); 
      } else {
        toast.error(response.data.message || "Failed to ad Opname Data!");
      }
    } catch (error) {
      toast.error(`Failed when submitting Data Opname : ${error}`);
      console.error('Error when submitting new Opname', error);
    }
  }

  return (
    <div className="p-8 md:p-8 ">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <OpnameForm onSubmit={handleProductSubmit}/>
        <Toaster />
      </div>
    </div>
  )
}

export default AddOpnamePage;