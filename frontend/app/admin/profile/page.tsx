"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import ProfileFormAdmin from "@/components/organisms/Form/ProfileFormAdmin";

export interface User {
  _id: string;
  id: string;
  userId: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  profilePicture: string;
}


const profileAdmin = () => {

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState<User| null>(null); 

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${userId}`,
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
      <div className="relative flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg max-w-xl">
        <ProfileFormAdmin initialData={user}/>
        <Toaster />
      </div>
    </div>
  )
}

export default profileAdmin;