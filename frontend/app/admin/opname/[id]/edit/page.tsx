'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import OpnameForm from "@/components/organisms/Form/OpnameForm";
import toast, {Toaster} from "react-hot-toast";
import { Opname } from "@/types/type";

const AddOpnamePage = () => {

  const router = useRouter();
  const paramsOpnameId = useParams<{ id: string }>().id;
  const [opname, setOpname] = useState<Opname>();
  
  useEffect(()=>{
    fetchOpnameDetail();
  }, [])

  const fetchOpnameDetail = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/${paramsOpnameId}`, 
        {
          withCredentials: true,
        });

        setOpname(response.data.data);

    } catch (error) {
      toast.error('Error when getting Opname details');
      console.error('Error when getting opname details'); 
    }
  }

  const handleEditSubmit = async (formData: any) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/opname/${paramsOpnameId}`,
        formData,
        { 
          withCredentials: true,
        }
      );

      if(response.status === 200){
        toast.success("Data Opname Edited Successfully !");
        
        setTimeout(() => router.push("/admin/opname"), 2000); 
      } else {
        toast.error(response.data.message || "Failed to Edit Opname Data!");
      }
    } catch (error) {
      toast.error(`Failed when Edit Data Opname : ${error}`);
      console.error('Error when Edit new Opname', error);
    }
  }

  return (
    <div className="p-8 md:p-8 ">
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <OpnameForm isEdit={true} onEditSubmit={handleEditSubmit} initialData={opname}/>
        <Toaster />
      </div>
    </div>
  )
}

export default AddOpnamePage;