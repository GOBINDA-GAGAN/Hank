import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Bot,
  LayoutDashboard,
  LogOut,
  MessageSquarePlus,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Ticket,
  User,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const mainMenu = [
    {
      label: "Dashboard",
      path: "/home",
      icon: LayoutDashboard,
    },
    {
      label: "Create Ticket",
      path: "/create-ticket",
      icon: MessageSquarePlus,
    },
    {
      label: "My Tickets",
      path: "/tickets",
      icon: Ticket,
    },
  ];

  const supportMenu = [
    {
      label: "AI Support",
      path: "/ai-support",
      icon: Bot,
    },
    {
      label: "Human Escalation",
      path: "/escalations",
      icon: Users,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  const renderMenu = (items) => {
    return (
      <div className="space-y-1">
        {items.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `group flex h-9 items-center rounded-md text-xs font-medium transition-colors ${
                collapsed ? "justify-center" : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-primary-muted text-primary"
                  : "text-secondary hover:bg-card-secondary hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className="shrink-0"
                />

                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border bg-card transition-all duration-200 md:flex ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div
        className={`relative flex h-16 shrink-0 items-center border-b border-border ${
          collapsed ? "justify-center" : "justify-between px-4"
        }`}
      >
        <NavLink to="/home" className="group flex items-center gap-2.5">
          {!collapsed ? (
            <>
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <div className="h-5 w-2 rounded-sm bg-primary" />

                <span className="text-[15px] font-bold tracking-tight text-foreground">
                  HANK
                </span>
              </Link>
            </>
          ) : (
            /* Collapsed: H only */
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
              H
            </div>
          )}
        </NavLink>

        {/* Collapse */}
        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-card-secondary hover:text-foreground"
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={16} />
          </button>
        )}

        {/* Expand */}
        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="absolute -right-3 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted shadow-sm transition-colors hover:bg-card-secondary hover:text-foreground"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={13} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-5">
        {/* Main */}
        {!collapsed && (
          <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
            Workspace
          </p>
        )}

        {renderMenu(mainMenu)}

        {/* Support */}
        <div className="mt-7">
          {!collapsed && (
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
              Support
            </p>
          )}

          {renderMenu(supportMenu)}
        </div>

        {/* Admin */}
        {user?.role === "admin" && (
          <div className="mt-7">
            {!collapsed && (
              <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                Administration
              </p>
            )}

            <NavLink
              to="/admin"
              title={collapsed ? "Admin Panel" : undefined}
              className={({ isActive }) =>
                `flex h-9 items-center rounded-md text-xs font-medium transition-colors ${
                  collapsed ? "justify-center" : "gap-3 px-3"
                } ${
                  isActive
                    ? "bg-primary-muted text-primary"
                    : "text-secondary hover:bg-card-secondary hover:text-foreground"
                }`
              }
            >
              <Settings size={16} strokeWidth={1.8} />

              {!collapsed && <span>Admin Panel</span>}
            </NavLink>
          </div>
        )}

        {/* Account */}
        <div className="mt-7">
          {!collapsed && (
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
              Account
            </p>
          )}

          <NavLink
            to="/profile"
            title={collapsed ? "Profile" : undefined}
            className={({ isActive }) =>
              `flex h-9 items-center rounded-md text-xs font-medium transition-colors ${
                collapsed ? "justify-center" : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-primary-muted text-primary"
                  : "text-secondary hover:bg-card-secondary hover:text-foreground"
              }`
            }
          >
            <User size={16} strokeWidth={1.8} />

            {!collapsed && <span>Profile</span>}
          </NavLink>

          <NavLink
            to="/settings"
            title={collapsed ? "Settings" : undefined}
            className={({ isActive }) =>
              `mt-1 flex h-9 items-center rounded-md text-xs font-medium transition-colors ${
                collapsed ? "justify-center" : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-primary-muted text-primary"
                  : "text-secondary hover:bg-card-secondary hover:text-foreground"
              }`
            }
          >
            <Settings size={16} strokeWidth={1.8} />

            {!collapsed && <span>Settings</span>}
          </NavLink>
        </div>
      </nav>

      {/* User */}
      <div className="shrink-0 border-t border-border p-2">
        {collapsed ? (
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="flex h-10 w-full items-center justify-center rounded-md text-muted transition-colors hover:bg-card-secondary hover:text-danger"
          >
            <LogOut size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-card-secondary p-2">
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* User info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground">
                {user?.name || "User"}
              </p>

              <p className="truncate text-[9px] text-muted">
                {user?.email || "user@example.com"}
              </p>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-danger"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
