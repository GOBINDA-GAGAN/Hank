import React from "react";
import { Bell, Bot, MoonIcon, Search, SunIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Topbar = () => {
  const { user } = useAuth();
   const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-4 px-4 sm:px-6 md:px-8">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Logo */}
          <div className="flex items-center gap-2.5 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Bot size={16} strokeWidth={2.2} />
            </div>

            <span className="text-sm font-semibold tracking-[-0.02em] text-foreground">
              HANK
            </span>
          </div>

          {/* Desktop title */}
          <div className="hidden min-w-0 md:block">
            <p className="truncate text-sm font-semibold text-foreground">
              Support Dashboard
            </p>

            <p className="text-[10px] text-muted">
              Manage your support tickets
            </p>
          </div>

          {/* Search */}
          <div className="relative ml-2 hidden w-56 md:block lg:ml-5 lg:w-64 xl:w-80">

            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="search"
              placeholder="Search tickets..."
              className="h-9 w-full rounded-lg border border-border bg-card-secondary pl-9 pr-10 text-xs text-foreground outline-none transition-all placeholder:text-muted focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/10"
            />

            <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[9px] text-muted lg:block">
              ⌘ K
            </kbd>

          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Mobile Search */}
          <button
            type="button"
            className="rounded-lg p-2 text-secondary transition-colors hover:bg-card-secondary hover:text-foreground md:hidden"
            aria-label="Search"
          >
            <Search size={18} />
          </button>


          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-secondary"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <SunIcon className="h-4 w-4 text-foreground" />
            ) : (
              <MoonIcon className="h-4 w-4 text-foreground" />
            )}
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-secondary transition-colors hover:bg-card-secondary hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell
              size={18}
              strokeWidth={1.8}
            />

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger ring-2 ring-background" />
          </button>

          <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

          {/* User */}
          <button
            type="button"
            className="group flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-card-secondary"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="hidden min-w-0 text-left sm:block">

              <p className="max-w-28 truncate text-xs font-medium text-foreground">
                {user?.name || "User"}
              </p>

              <p className="text-[9px] capitalize text-muted">
                {user?.role || "user"}
              </p>

            </div>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Topbar;