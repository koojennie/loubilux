"use client";

import React, { useState } from "react";
import NavbarAdmin from "@/components/organisms/Navbar/NavbarAdmin";
import SidebarAdmin from "@/components/organisms/Sidebar/SidebarAdmin";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

    return (
        <>
            <div className="flex">
                <NavbarAdmin />
                <SidebarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
                <div className="w-full">
                    <div className={`flex-1 pt-18 transition-all duration-300 ${ isSidebarOpen ? "pl-44" : "pl-16"}`}>
                    {children}
                    </div>
                    
                </div>
            </div>
        </>
    )

}

export default AdminLayout;