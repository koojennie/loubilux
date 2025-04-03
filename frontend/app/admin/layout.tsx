"use client";

import React, { useState, useEffect } from "react";
import NavbarAdmin from "@/components/organisms/Navbar/NavbarAdmin";
import SidebarAdmin from "@/components/organisms/Sidebar/SidebarAdmin";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        <>
            <div className="flex">
                <NavbarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
                <SidebarAdmin isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsSidebarOpen={setIsSidebarOpen} />
                <div className="w-full">
                    <div className={`flex-1 pt-18 transition-all duration-300 ${isSidebarOpen ? "pl-5 md:pl-44" : "pl-5 md:pl-16"}`}>
                        {children}
                    </div>

                </div>
            </div>
        </>
    )

}

export default AdminLayout;