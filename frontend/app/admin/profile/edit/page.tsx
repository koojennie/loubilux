"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@/types/type";
import ProfileFormAdmin from "@/components/organisms/Form/ProfileFormAdmin";

const profileAdminEdit = () => {

  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchAuthMe = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
        {
          withCredentials: true
        }
      )
      setUserId(response.data.user.id);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      console.error('Error when submitting new category', error);
    }
  }

  const fetchUserDataById = async () => {

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/userbyid/${userId}`,
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

  const handleUserEdit = async (formData: any) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${userId}`,
        formData,
        {
          withCredentials: true
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        router.push("/admin");
      } else {
        toast.error(response.data.message || "Failed to add product!");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
      console.error('Error when updating user', error);
    } finally {
      fetchUserDataById();
    }
  }

  useEffect(() => {
    fetchAuthMe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserDataById();
    }
  }, [userId]);


  return (
    <div className="p-8 md:p-8 ">
      <div className="relative flex flex-col rounded-2xl bg-white text-[#493628] max-w-xl">
        <ProfileFormAdmin isEdit={true} onEditSubmit={handleUserEdit} initialData={user} />
        <Toaster />
      </div>
    </div>
  )
}

export default profileAdminEdit;