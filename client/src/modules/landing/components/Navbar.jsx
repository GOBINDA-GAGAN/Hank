import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Menu, X, ArrowRight, SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user, loading } = useAuth();
  console.log(user, loading);
  const isAuthenticated = !!user; 
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-5 w-2 rounded-sm bg-primary" />

          <span className="text-[15px] font-bold tracking-tight text-foreground">
            HANK
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
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

          {isAuthenticated ? (
            <Link
              to="/home"
              className="inline-flex h-8 items-center rounded-md bg-primary px-4 text-[11px] font-medium text-primary-foreground transition hover:bg-primary-hover"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-2 py-1.5 text-[11px] font-medium text-secondary transition-colors hover:text-foreground"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="inline-flex h-8 items-center rounded-md bg-primary px-4 text-[11px] font-medium text-primary-foreground transition hover:bg-primary-hover"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
