import React from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  LayoutDashboard,
  Users,
  CreditCard,
  MoreHorizontal,
} from "lucide-react";

const menu = [
  {
    label: "Home",
    path: "/admin/home",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Transactions",
    path: "/admin/transactions",
    icon: CreditCard,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "More",
    path: "/admin/settings",
    icon: MoreHorizontal,
  },
];

const AdminMobileMenu = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {menu.map(
          ({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex min-w-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 ${
                  isActive
                    ? "text-primary"
                    : "text-muted"
                }`
              }
            >
              <Icon size={19} strokeWidth={1.9} />

              <span className="text-[9px] font-medium">
                {label}
              </span>
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default AdminMobileMenu;