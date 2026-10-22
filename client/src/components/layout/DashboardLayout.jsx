import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileBottomMenu from "./MobileBottomMenu";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`min-h-screen transition-all duration-200 ${
          collapsed ? "md:pl-16" : "md:pl-60"
        }`}
      >
        <Topbar />

        <main className="min-h-[calc(100vh-64px)] px-4  py-5 pb-20 sm:px-6 md:px-8 md:pb-5">
          <div className="mx-auto w-full max-w-1500px">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileBottomMenu />
    </div>
  );
};

export default DashboardLayout;