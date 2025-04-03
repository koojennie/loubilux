'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import UserForm from "@/components/organisms/Form/UserForm";
import { User } from "../../page";

const EditUser = () => {

  const router = useRouter();
  const paramUserId = useParams<{id:string}>().id;


  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    const fetchUserDataById = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${paramUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserDataById();
  }, [token]);


  const handleUserEdit = async (formData: any) => {
    if (!token) {
      console.error('No token available');
      toast.error("Authentication token is missing. Please try again.");
      return;
    }

    console.log("ini adalah handle user submit", formData);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${paramUserId}`,
        formData,
        { 
          headers: { 
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if(response.status === 200) {
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
      <div className="relative m-auto flex flex-col rounded-2xl bg-white bg-clip-border text-slate-700 shadow-lg">
        <UserForm  isEdit={true} onEditSubmit={handleUserEdit} initialData={user}/>
        <Toaster />
      </div>
    </div>
  )
}

export default EditUser;