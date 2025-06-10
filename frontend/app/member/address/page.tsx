'use client';

import AddressList from "@/components/organisms/Address/AddressList";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function EditProfile() {
    return (
        <SidebarProvider>
            <section className="edit-profile overflow-auto">
                <Sidebar activeMenu="my-address" />
                <AddressList />
            </section>
        </SidebarProvider>
    )
}
