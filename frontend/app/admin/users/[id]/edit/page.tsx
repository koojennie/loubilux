'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import UserForm from "@/components/organisms/Form/UserForm";
import { User } from "@/types/type";

const EditUser = () => {

  const router = useRouter();
  const paramUserId = useParams<{ id: string }>().id;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDataById = async () => {

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userbyid/${paramUserId}`,
          {
            withCredentials: true
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserDataById();
  }, []);


  const handleUserEdit = async (formData: any) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${paramUserId}`,
        formData,
        {
          withCredentials: true
        }
      );

      if (response.status === 200) {
        toast.success("User Updated successfully");
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
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-[#493628] shadow-lg">
        <UserForm isEdit={true} onEditSubmit={handleUserEdit} initialData={user} />
        <Toaster />
      </div>
    </div>
  )
}

export default EditUser;