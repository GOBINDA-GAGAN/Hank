import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    {
      label: "Dashboard",
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
      label: "Expenses",
      path: "/admin/expenses",
      icon: Wallet,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border bg-card transition-all duration-200 md:flex ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Header */}
      <div
        className={`relative flex h-16 shrink-0 items-center border-b border-border ${
          collapsed
            ? "justify-center"
            : "justify-between px-4"
        }`}
      >
        <NavLink
          to="/admin/home"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck
              size={16}
              strokeWidth={2.2}
            />
          </div>

          {!collapsed && (
            <div>
              <p className="text-sm font-semibold tracking-[-0.02em]">
                Spendora
              </p>

              <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-primary">
                Admin Panel
              </p>
            </div>
          )}
        </NavLink>

        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="rounded-md p-1.5 text-muted transition-colors hover:bg-card-secondary hover:text-foreground"
            title="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="absolute -right-3 top-5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted shadow-sm hover:text-foreground"
            title="Expand sidebar"
          >
            <ChevronRight size={13} />
          </button>
        )}
      </div>

      {/* Admin status */}
      {!collapsed && (
        <div className="mx-3 mt-4 rounded-lg border border-border bg-card-secondary p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success" />

            <span className="text-[10px] font-medium text-secondary">
              Admin access
            </span>
          </div>

          <p className="mt-1 truncate text-[10px] text-muted">
            {user?.email}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-5">
        {!collapsed && (
          <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
            Management
          </p>
        )}

        <div className="space-y-1">
          {menu.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex h-9 items-center rounded-md text-xs font-medium transition-colors ${
                  collapsed
                    ? "justify-center"
                    : "gap-3 px-3"
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
                    strokeWidth={
                      isActive ? 2.2 : 1.8
                    }
                  />

                  {!collapsed && (
                    <span>{label}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-7">
          {!collapsed && (
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
              System
            </p>
          )}

          <NavLink
            to="/admin/activity"
            title={
              collapsed ? "Activity" : undefined
            }
            className={({ isActive }) =>
              `flex h-9 items-center rounded-md text-xs font-medium ${
                collapsed
                  ? "justify-center"
                  : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-primary-muted text-primary"
                  : "text-secondary hover:bg-card-secondary hover:text-foreground"
              }`
            }
          >
            <Activity size={16} />
            {!collapsed && <span>Activity</span>}
          </NavLink>

          <NavLink
            to="/admin/settings"
            title={
              collapsed ? "Settings" : undefined
            }
            className={({ isActive }) =>
              `mt-1 flex h-9 items-center rounded-md text-xs font-medium ${
                collapsed
                  ? "justify-center"
                  : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-primary-muted text-primary"
                  : "text-secondary hover:bg-card-secondary hover:text-foreground"
              }`
            }
          >
            <Settings size={16} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </div>

        <div className="mt-7">
          {!collapsed && (
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
              User Panel
            </p>
          )}

          <NavLink
            to="/home"
            title={
              collapsed
                ? "User Dashboard"
                : undefined
            }
            className={`flex h-9 items-center rounded-md text-xs font-medium text-secondary transition-colors hover:bg-card-secondary hover:text-foreground ${
              collapsed
                ? "justify-center"
                : "gap-3 px-3"
            }`}
          >
            <UserRound size={16} />

            {!collapsed && (
              <span>User Dashboard</span>
            )}
          </NavLink>
        </div>
      </nav>

      {/* Admin User */}
      <div className="shrink-0 border-t border-border p-2">
        {collapsed ? (
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="flex h-10 w-full items-center justify-center rounded-md text-muted hover:bg-card-secondary hover:text-danger"
          >
            <LogOut size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-card-secondary p-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">
                {user?.name || "Admin"}
              </p>

              <p className="text-[9px] capitalize text-muted">
                {user?.role || "admin"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="rounded-md p-1.5 text-muted hover:text-danger"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;