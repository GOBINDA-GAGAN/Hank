import React from "react";
import {
  User,
  Badge,
  Building2,
  Mail,
  Briefcase,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const employeeName = user?.name || "Gobinda Gagan Dey";
  const employeeInitial = employeeName.charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-foreground">
          Profile
        </h1>

        <p className="mt-1 text-xs text-secondary">
          Your employee information
        </p>
      </div>

      {/* ================= ICARD ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-black p-6 text-white shadow-xl">
        {/* Animated glow */}
        <div className="absolute -left-24 -top-24 h-56 w-56 animate-pulse rounded-full bg-primary/30 blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-56 w-56 animate-pulse rounded-full bg-purple-500/30 blur-3xl" />

        {/* Moving shine */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-[-60%] h-[220%] w-20 -translate-x-[150%] rotate-12 bg-white/10 blur-md animate-[shine_4s_ease-in-out_infinite]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Employee ID Card
              </p>

              <p className="mt-1 text-xs text-white/40">
                {user?.companyName || "HackerRank"}
              </p>
            </div>

            {/* Active */}
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[9px] font-medium text-emerald-400">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Employee */}
          <div className="mt-8 flex items-center gap-4">
            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-2xl font-bold backdrop-blur-sm">
              {employeeInitial}
            </div>

            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {employeeName}
              </h2>

              <p className="mt-1 text-xs text-white/60">
                {user?.jobTitle || "Support Engineer"}
              </p>

              <p className="mt-2 text-[10px] text-white/40">
                {user?.department || "Engineering"}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-5">
            <CardField
              label="Employee ID"
              icon={<Badge size={13} />}
              value={user?.employeeId || "EMP-10245"}
            />

            <CardField
              label="Role"
              icon={<Briefcase size={13} />}
              value={user?.role || "Support Engineer"}
            />

            <CardField
              label="Company Email"
              icon={<Mail size={13} />}
              value={
                user?.companyEmail ||
                "employee@hackerrank.com"
              }
            />

            <CardField
              label="Manager"
              icon={<User size={13} />}
              value={user?.manager || "Manager"}
            />

            <CardField
              label="Date of Joining"
              icon={<CalendarDays size={13} />}
              value={user?.dateOfJoining || "12 Jun 2025"}
            />

            <CardField
              label="Work Location"
              icon={<MapPin size={13} />}
              value={user?.workLocation || "Bengaluru"}
            />
          </div>

          {/* Bottom */}
          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-white/30">
              <Building2 size={12} />

              <span className="text-[9px]">
                {user?.companyName || "HackerRank"}
              </span>
            </div>

            <p className="text-[9px] text-white/30">
              Employee Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= CARD FIELD ================= */

const CardField = ({ label, icon, value }) => {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5 text-white/30">
        {icon}

        <span className="text-[8px] uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="truncate text-[10px] text-white/70">
        {value}
      </p>
    </div>
  );
};

export default Profile;