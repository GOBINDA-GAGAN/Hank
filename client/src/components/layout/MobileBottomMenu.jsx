import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquarePlus,
  Ticket,
  User,
} from "lucide-react";

const menu = [
  {
    label: "Home",
    path: "/home",
    icon: LayoutDashboard,
  },
  {
    label: "Create",
    path: "/tickets/create",
    icon: MessageSquarePlus,
  },
  {
    label: "Tickets",
    path: "/tickets",
    icon: Ticket,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
];

const MobileBottomMenu = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-2">
        {menu.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex min-w-16 flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />

                <span className="text-[9px] font-medium">
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomMenu;