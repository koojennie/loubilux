'use client';

import ProfileContent from "@/components/organisms/Profile/ProfileContent";
import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { useState } from "react";

export default function EditProfile() {
  const [updateEvent, setUpdateEvent] = useState<boolean>(false);

  return (
    <SidebarProvider>
      <section className="edit-profile overflow-auto">
        <Sidebar eventUpdate={updateEvent} setUpdateEvent={setUpdateEvent} activeMenu="edit-profile"/>
        <ProfileContent setUpdateEvent={setUpdateEvent}/>
      </section>
    </SidebarProvider>
  )
}
