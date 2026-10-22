import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import AdminMobileMenu from "./AdminMobileMenu";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`min-h-screen transition-all duration-200 ${
          collapsed ? "md:pl-16" : "md:pl-60"
        }`}
      >
        <AdminTopbar />

        <main className="min-h-[calc(100vh-64px)] px-4 py-5 pb-20 sm:px-6 md:px-8 md:pb-5">
          <div className="mx-auto w-full max-w-[1500px]">
            <Outlet />
          </div>
        </main>
      </div>

      <AdminMobileMenu />
    </div>
  );
};

export default AdminLayout;