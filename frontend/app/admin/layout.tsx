"use client"

import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/components/organisms/Navbar/NavbarAdmin";
import SidebarAdmin from "@/components/organisms/Sidebar/SidebarAdmin";
import {useRouter} from "next/navigation";
import axios from "axios";
import ErrorMessage from "@/components/organisms/Error/ErrorMessage";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
          { withCredentials: true }
        );
        setUser(response.data.user || null);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        if (err.response) {
          setError(err.response.status);
        } else {
          setError(500); // Internal server error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Runs only once when the component mounts

  // Handle window resizing
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSidebarOpen(window.innerWidth >= 768);
    }

    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle sign out
  const handleSignOut = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      // Redirect to login page after successful logout
      router.push("/login");
    } catch (err) {
      console.error("Error during sign out:", err);
    }
  };

  // Error Handling
  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (error === 401) {
    return (
      <ErrorMessage
        title="Unauthorized"
        message="Anda harus login terlebih dahulu untuk mengakses halaman ini."
      />
    );
  }

  if (error === 403) {
    return (
      <ErrorMessage
        title="Forbidden"
        message="Anda tidak memiliki izin untuk mengakses halaman ini."
      />
    );
  }

  if (error === 500) {
    return (
      <ErrorMessage
        title="Internal Server Error"
        message="Terjadi kesalahan pada server. Silakan coba beberapa saat lagi."
      />
    );
  }

  // If user is not an admin or superadmin
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return (
      <ErrorMessage
        title="Access Denied"
        message="Anda tidak memiliki akses ke halaman ini."
      />
    );
  }

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <NavbarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} handleSignOut={handleSignOut} />
      <SidebarAdmin
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="w-full">
        <div
          className={`flex-1 pt-18 transition-all duration-300 ${
            isSidebarOpen ? "pl-5 md:pl-44" : "pl-5 md:pl-16"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
