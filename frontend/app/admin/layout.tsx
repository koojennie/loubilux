"use client";

import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/components/organisms/Navbar/NavbarAdmin";
import SidebarAdmin from "@/components/organisms/Sidebar/SidebarAdmin";
import axios from "axios";
import ErrorMessage from "@/components/organisms/Error/ErrorMessage";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  interface User {
    id: string;
    role: string;
    iat: number;
    exp: number;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/me`,
          { withCredentials: true }
        );

        console.log("Response dari API:", response.data);
        setUser(response.data.user || null);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        if (err.response) {
          setError(err.response.status);
        } else {
          setError(500); // Jika tidak ada response dari server, anggap internal server error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log("ini adalah user di page", user);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  // ERROR HANDLING
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

  // Jika user tidak ditemukan atau bukan admin/superadmin
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return (
      <ErrorMessage
        title="Access Denied"
        message="Anda tidak memiliki akses ke halaman ini."
      />
    );
  }

  // Handle sidebar
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

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <NavbarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <SidebarAdmin
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="w-full">
        <div className={`flex-1 pt-18 transition-all duration-300 ${isSidebarOpen ? "pl-5 md:pl-44" : "pl-5 md:pl-16"}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
