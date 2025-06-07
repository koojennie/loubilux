'use client';

import ProfileContent from "@/components/organisms/Profile/ProfileContent";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function EditProfile() {
  return (
    <SidebarProvider>
      <section className="edit-profile overflow-auto">
        <Sidebar activeMenu="edit-profile"/>
        <ProfileContent />
      </section>
    </SidebarProvider>
  )
}
