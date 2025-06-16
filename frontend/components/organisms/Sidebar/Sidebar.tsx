"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { useSidebar } from "@/context/SidebarContext";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import Profile from "./Profile";

interface SidebarProps {
  activeMenu: 'transactions' | 'edit-profile'| 'my-address' | 'logout';
}

export default function Sidebar(props: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/logout`,
        {},
        {
          withCredentials: true
        }
      );

      toast.success("Logout successfully", { duration: 2000 })

      setTimeout(() => {
        router.replace("/");
        window.location.reload();
      }, 1000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  }

  const { activeMenu } = props;
  const { expanded, toggleSidebar } = useSidebar();
  return (
    <section className={`sidebar ${!expanded ? 'collapsed' : ''}`}>
      <div className="content relative pt-50 pb-30 ps-30">
        <button onClick={toggleSidebar} className="absolute top-4 right-4 p-1.5 !rounded-lg bg-gray-50 hover:bg-gray-100">
          {expanded ? <LuChevronFirst className="w-[32px] h-[32px]" /> : <LuChevronLast className="w-[32px] h-[32px]" />}
        </button>
        <Profile />
        <div className="menus">
          <MenuItem title="Orders" icon="ic-menu-transactions" href="/member/transactions" active={activeMenu === 'transactions'} />
          <MenuItem title="Edit Profile" icon="ic-menu-profile" href="/member/edit-profile" active={activeMenu === 'edit-profile'} />
          <MenuItem title="Addresses" icon="ic-menu-address" href="/member/address" active={activeMenu === 'my-address'} />
          <MenuItem title="Log Out" icon="ic-menu-logout" onClick={handleLogout} active={activeMenu === 'logout'} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
