"use client";

import { useSidebar } from "@/context/SidebarContext";
import { useState } from "react";
import Footer from "./Footer";
import MenuItem from "./MenuItem";
import Profile from "./Profile";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";

interface SidebarProps {
  activeMenu: 'transactions' | 'edit-profile' | 'logout';
}

export default function Sidebar(props: SidebarProps) {
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
          <MenuItem title="Orders" icon="ic-menu-transactions" href="/member/transactions" active={activeMenu === 'transactions'}/>
          <MenuItem title="Edit Profile" icon="ic-menu-profile" href="/member/edit-profile" active={activeMenu === 'edit-profile'}/>
          <MenuItem title="Log Out" icon="ic-menu-logout" href="/" active={activeMenu === 'logout'} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
