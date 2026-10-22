import React from "react";
import {
  Bell,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const AdminTopbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile */}
          <div className="flex items-center gap-2.5 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Spendora
              </p>

              <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-primary">
                Admin
              </p>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden min-w-0 md:block">
            <p className="text-sm font-semibold">
              Admin Dashboard
            </p>

            <p className="text-[10px] text-muted">
              Manage Spendora
            </p>
          </div>

          {/* Search */}
          <div className="relative ml-3 hidden w-56 md:block lg:w-72 xl:w-80">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="search"
              placeholder="Search users, transactions..."
              className="h-9 w-full rounded-lg border border-border bg-card-secondary pl-9 pr-3 text-xs text-foreground outline-none placeholder:text-muted focus:border-accent focus:bg-background focus:ring-2 focus:ring-accent/10"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-secondary hover:bg-card-secondary hover:text-foreground"
          >
            <Bell size={18} />
          </button>

          <div className="hidden h-6 w-px bg-border sm:block" />

          <div className="flex items-center gap-2 rounded-lg p-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div className="hidden sm:block">
              <p className="max-w-28 truncate text-xs font-medium">
                {user?.name || "Admin"}
              </p>

              <p className="text-[9px] capitalize text-muted">
                {user?.role || "admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;