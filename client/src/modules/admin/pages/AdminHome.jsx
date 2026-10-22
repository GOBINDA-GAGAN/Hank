import React from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  UserPlus,
  Users,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const AdminHome = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Total Users",
      value: "12,480",
      change: "+12.5%",
      icon: Users,
      positive: true,
    },
    {
      label: "New Users",
      value: "1,284",
      change: "+8.4%",
      icon: UserPlus,
      positive: true,
    },
    {
      label: "Transactions",
      value: "48,290",
      change: "+16.4%",
      icon: CreditCard,
      positive: true,
    },
    {
      label: "Revenue",
      value: "₹8,42,500",
      change: "+10.2%",
      icon: DollarSign,
      positive: true,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
          Good morning, {user?.name || "Admin"}
        </h1>

        <p className="mt-1 text-xs text-secondary">
          Here's an overview of what's happening across Spendora.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(
          ({
            label,
            value,
            change,
            icon: Icon,
            positive,
          }) => (
            <div
              key={label}
              className="card p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium text-muted">
                    {label}
                  </p>

                  <p className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                    {value}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-muted text-primary">
                  <Icon size={17} />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1">
                {positive ? (
                  <ArrowUpRight
                    size={12}
                    className="text-success"
                  />
                ) : (
                  <ArrowDownRight
                    size={12}
                    className="text-danger"
                  />
                )}

                <span className="text-[10px] font-medium text-success">
                  {change}
                </span>

                <span className="text-[10px] text-muted">
                  vs last month
                </span>
              </div>
            </div>
          )
        )}
      </div>

      {/* Main */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Chart */}
        <section className="card overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">
                Platform Activity
              </h2>

              <p className="mt-0.5 text-[10px] text-muted">
                Users and transactions over time
              </p>
            </div>

            <select className="rounded-md border border-border bg-background px-2 py-1 text-[10px] outline-none">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 12 months</option>
            </select>
          </div>

          <div className="flex h-72 items-center justify-center">
            <div className="text-center">
              <Activity
                size={30}
                className="mx-auto text-muted"
              />

              <p className="mt-3 text-xs font-medium text-secondary">
                Activity chart
              </p>

              <p className="mt-1 text-[10px] text-muted">
                Connect your analytics API here.
              </p>
            </div>
          </div>
        </section>

        {/* User Statistics */}
        <section className="card overflow-hidden">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold">
              User Statistics
            </h2>

            <p className="mt-0.5 text-[10px] text-muted">
              Current account status
            </p>
          </div>

          <div className="space-y-5 p-4">
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-xs text-secondary">
                  Active
                </span>

                <span className="text-xs font-semibold">
                  9,842
                </span>
              </div>

              <div className="h-2 rounded-full bg-card-secondary">
                <div className="h-full w-[79%] rounded-full bg-success" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-xs text-secondary">
                  New this month
                </span>

                <span className="text-xs font-semibold">
                  1,284
                </span>
              </div>

              <div className="h-2 rounded-full bg-card-secondary">
                <div className="h-full w-[45%] rounded-full bg-primary" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-xs text-secondary">
                  Inactive
                </span>

                <span className="text-xs font-semibold">
                  1,354
                </span>
              </div>

              <div className="h-2 rounded-full bg-card-secondary">
                <div className="h-full w-[20%] rounded-full bg-warning" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Users */}
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">
                Recent Users
              </h2>

              <p className="text-[10px] text-muted">
                Latest registered accounts
              </p>
            </div>

            <button className="text-[10px] font-medium text-primary hover:underline">
              View all
            </button>
          </div>

          <div className="divide-y divide-border">
            {[
              ["Rahul Sharma", "rahul@example.com"],
              ["Priya Das", "priya@example.com"],
              ["Amit Kumar", "amit@example.com"],
              ["Ananya Roy", "ananya@example.com"],
            ].map(([name, email]) => (
              <div
                key={email}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-muted text-[10px] font-semibold text-primary">
                  {name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">
                    {name}
                  </p>

                  <p className="truncate text-[10px] text-muted">
                    {email}
                  </p>
                </div>

                <span className="rounded-full bg-success-muted px-2 py-1 text-[9px] font-medium text-success">
                  Active
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">
                Recent Activity
              </h2>

              <p className="text-[10px] text-muted">
                Latest platform events
              </p>
            </div>

            <Activity
              size={16}
              className="text-muted"
            />
          </div>

          <div className="divide-y divide-border">
            {[
              "New user registered",
              "Transaction processed",
              "Expense added",
              "User profile updated",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />

                <div className="flex-1">
                  <p className="text-xs font-medium">
                    {item}
                  </p>

                  <p className="text-[10px] text-muted">
                    {index + 2} minutes ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;