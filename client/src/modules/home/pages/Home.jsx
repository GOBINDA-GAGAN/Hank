import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  Filter,
  MessageSquarePlus,
  MoreHorizontal,
  Search,
  Ticket,
  Users,
  X,
} from "lucide-react";

import Button from "../../../components/ui/Button";
import { useAuth } from "../../../context/AuthContext";

/* =========================================================
   DUMMY EMPLOYEE SUPPORT TICKETS
========================================================= */

const tickets = [
  {
    id: "HNK-1048",
    employee: "Rahul Sharma",
    email: "rahul.sharma@company.com",
    department: "Engineering",
    issue: "VPN is not connecting",
    category: "IT Support",
    priority: "High",
    status: "Escalated",
    ai: "Analyzed",
    created: "2 min ago",
  },
  {
    id: "HNK-1047",
    employee: "Priya Das",
    email: "priya.das@company.com",
    department: "HR",
    issue: "Leave balance is incorrect",
    category: "HR",
    priority: "Medium",
    status: "AI Resolved",
    ai: "Resolved",
    created: "18 min ago",
  },
  {
    id: "HNK-1046",
    employee: "Aman Verma",
    email: "aman.verma@company.com",
    department: "Finance",
    issue: "Salary slip is missing",
    category: "Payroll",
    priority: "High",
    status: "In Progress",
    ai: "Analyzed",
    created: "42 min ago",
  },
  {
    id: "HNK-1045",
    employee: "Sneha Roy",
    email: "sneha.roy@company.com",
    department: "Engineering",
    issue: "GitHub repository access request",
    category: "Access",
    priority: "Low",
    status: "AI Resolved",
    ai: "Resolved",
    created: "1 hr ago",
  },
  {
    id: "HNK-1044",
    employee: "Arjun Patel",
    email: "arjun.patel@company.com",
    department: "Sales",
    issue: "CRM account access problem",
    category: "Access",
    priority: "Medium",
    status: "Open",
    ai: "Analyzed",
    created: "2 hrs ago",
  },
  {
    id: "HNK-1043",
    employee: "Neha Singh",
    email: "neha.singh@company.com",
    department: "Marketing",
    issue: "Company email account is locked",
    category: "IT Support",
    priority: "Low",
    status: "Open",
    ai: "Analyzed",
    created: "3 hrs ago",
  },
  {
    id: "HNK-1042",
    employee: "Vikash Kumar",
    email: "vikash.kumar@company.com",
    department: "Engineering",
    issue: "Laptop software installation request",
    category: "IT Support",
    priority: "Low",
    status: "AI Resolved",
    ai: "Resolved",
    created: "4 hrs ago",
  },
  {
    id: "HNK-1041",
    employee: "Ananya Gupta",
    email: "ananya.gupta@company.com",
    department: "Design",
    issue: "Figma team access request",
    category: "Access",
    priority: "Medium",
    status: "In Progress",
    ai: "Analyzed",
    created: "5 hrs ago",
  },
];

/* =========================================================
   STYLES
========================================================= */

const statusStyles = {
  Open: "border-info/15 bg-info/10 text-info",
  "AI Resolved": "border-success/15 bg-success/10 text-success",
  "In Progress": "border-warning/15 bg-warning/10 text-warning",
  Escalated: "border-danger/15 bg-danger/10 text-danger",
};

const priorityStyles = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
};

/* =========================================================
   HOME
========================================================= */

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  /* =======================================================
     FILTER TICKETS
  ======================================================= */

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        ticket.id.toLowerCase().includes(searchValue) ||
        ticket.employee.toLowerCase().includes(searchValue) ||
        ticket.department.toLowerCase().includes(searchValue) ||
        ticket.issue.toLowerCase().includes(searchValue) ||
        ticket.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        ticket.priority === priorityFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        ticket.department === departmentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesDepartment
      );
    });
  }, [
    search,
    statusFilter,
    priorityFilter,
    departmentFilter,
  ]);

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setDepartmentFilter("All");
  };

  const hasFilters =
    search ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    departmentFilter !== "All";

  /* =======================================================
     USER NAME
  ======================================================= */

  const firstName =
    user?.name?.split(" ")?.[0] || "there";

  return (
    <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <p className="text-[11px] font-medium text-primary">
              Employee Support
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
              Good morning, {firstName} 👋
            </h1>

            <p className="mt-1 text-xs text-muted sm:text-sm">
              Manage employee requests and support tickets.
            </p>

          </div>

          <button
            type="button"
            onClick={() => navigate("/tickets/create")}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover active:scale-[0.98]"
          >
            <MessageSquarePlus size={15} />
            Create Ticket
          </button>

        </div>

        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

          {/* Total Tickets */}
          <div className="card p-4 sm:p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Ticket size={17} />
              </div>

              <span className="text-[9px] font-medium text-success">
                +12%
              </span>

            </div>

            <p className="mt-4 text-[10px] text-muted">
              Total Tickets
            </p>

            <p className="mt-1 text-xl font-bold text-foreground">
              248
            </p>

            <p className="mt-1 text-[9px] text-muted">
              This month
            </p>

          </div>

          {/* Open */}
          <div className="card p-4 sm:p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10 text-info">
                <Clock3 size={17} />
              </div>

              <span className="text-[9px] text-muted">
                Active
              </span>

            </div>

            <p className="mt-4 text-[10px] text-muted">
              Open Tickets
            </p>

            <p className="mt-1 text-xl font-bold text-foreground">
              32
            </p>

            <p className="mt-1 text-[9px] text-muted">
              Need attention
            </p>

          </div>

          {/* AI Resolved */}
          <div className="card p-4 sm:p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 text-success">
                <Bot size={17} />
              </div>

              <span className="text-[9px] font-medium text-success">
                78%
              </span>

            </div>

            <p className="mt-4 text-[10px] text-muted">
              AI Resolved
            </p>

            <p className="mt-1 text-xl font-bold text-foreground">
              193
            </p>

            <p className="mt-1 text-[9px] text-muted">
              Without human help
            </p>

          </div>

          {/* Human Action */}
          <div className="card p-4 sm:p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 text-danger">
                <Users size={17} />
              </div>

              <span className="text-[9px] text-warning">
                Attention
              </span>

            </div>

            <p className="mt-4 text-[10px] text-muted">
              Human Action
            </p>

            <p className="mt-1 text-xl font-bold text-foreground">
              23
            </p>

            <p className="mt-1 text-[9px] text-muted">
              Need agent attention
            </p>

          </div>

        </div>

        {/* =================================================
            RECENT EMPLOYEE REQUESTS
        ================================================= */}

        <section className="mt-7">

          {/* Section Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-sm font-semibold text-foreground">
                Recent employee requests
              </h2>

              <p className="mt-1 text-[10px] text-muted">
                Monitor and manage the latest employee support requests.
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/tickets")}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight size={12} />
            </button>

          </div>

          {/* =================================================
              FILTER PANEL
          ================================================= */}

          <div className="card mt-4 p-3">

            <div className="flex flex-col gap-3">

              {/* Search */}
              <div className="relative">

                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employee, ticket, department..."
                  className="h-9 w-full rounded-lg border border-border bg-card-secondary pl-9 pr-3 text-xs text-foreground outline-none placeholder:text-muted transition focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/10"
                />

              </div>

              {/* Filter rows */}
              <div className="flex flex-col gap-3 border-t border-border pt-3 xl:flex-row xl:items-center">

                {/* Status */}
                <div className="flex min-w-0 items-center gap-2 overflow-x-auto">

                  <div className="flex shrink-0 items-center gap-1.5">
                    <Filter size={13} className="text-muted" />

                    <span className="text-[9px] font-medium text-muted">
                      Status
                    </span>
                  </div>

                  {[
                    "All",
                    "Open",
                    "In Progress",
                    "AI Resolved",
                    "Escalated",
                  ].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-[9px] font-medium transition ${
                        statusFilter === status
                          ? "bg-primary text-primary-foreground"
                          : "bg-card-secondary text-secondary hover:text-foreground"
                      }`}
                    >
                      {status}
                    </button>
                  ))}

                </div>

                {/* Priority */}
                <div className="flex items-center gap-2 overflow-x-auto">

                  <span className="shrink-0 text-[9px] font-medium text-muted">
                    Priority
                  </span>

                  {["All", "High", "Medium", "Low"].map(
                    (priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() =>
                          setPriorityFilter(priority)
                        }
                        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-medium transition ${
                          priorityFilter === priority
                            ? priority === "High"
                              ? "bg-danger text-white"
                              : priority === "Medium"
                              ? "bg-warning text-black"
                              : priority === "Low"
                              ? "bg-success text-white"
                              : "bg-primary text-primary-foreground"
                            : "border border-border bg-card-secondary text-muted hover:text-foreground"
                        }`}
                      >
                        {priority}
                      </button>
                    )
                  )}

                </div>

                {/* Department */}
                <select
                  value={departmentFilter}
                  onChange={(e) =>
                    setDepartmentFilter(e.target.value)
                  }
                  className="h-8 rounded-md border border-border bg-card-secondary px-2.5 text-[9px] text-secondary outline-none focus:border-primary"
                >
                  <option value="All">
                    All Departments
                  </option>

                  <option value="Engineering">
                    Engineering
                  </option>

                  <option value="HR">
                    HR
                  </option>

                  <option value="Finance">
                    Finance
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                  <option value="Marketing">
                    Marketing
                  </option>

                  <option value="Design">
                    Design
                  </option>
                </select>

                {/* Clear */}
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex shrink-0 items-center gap-1 text-[9px] font-medium text-muted hover:text-foreground"
                  >
                    <X size={11} />
                    Clear
                  </button>
                )}

              </div>
            </div>
          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="card mt-4 hidden overflow-hidden md:block">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-border bg-card-secondary/50">

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      Ticket
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      Employee
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      Department
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      Issue
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      Priority
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      AI
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wider text-muted">
                      Created
                    </th>

                    <th className="w-10 px-3 py-3" />

                  </tr>
                </thead>

                <tbody className="divide-y divide-border">

                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="group transition-colors hover:bg-card-secondary/40"
                    >

                      {/* Ticket */}
                      <td className="px-4 py-4">

                        <span className="text-[10px] font-semibold text-primary">
                          {ticket.id}
                        </span>

                        <p className="mt-1 text-[8px] text-muted">
                          {ticket.category}
                        </p>

                      </td>

                      {/* Employee */}
                      <td className="px-4 py-4">

                        <p className="text-[10px] font-medium text-foreground">
                          {ticket.employee}
                        </p>

                        <p className="mt-1 text-[8px] text-muted">
                          {ticket.email}
                        </p>

                      </td>

                      {/* Department */}
                      <td className="px-4 py-4">

                        <span className="rounded-md bg-card-secondary px-2 py-1 text-[8px] font-medium text-secondary">
                          {ticket.department}
                        </span>

                      </td>

                      {/* Issue */}
                      <td className="max-w-[230px] px-4 py-4">

                        <p className="truncate text-[10px] font-medium text-foreground">
                          {ticket.issue}
                        </p>

                      </td>

                      {/* Priority */}
                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-2 py-1 text-[8px] font-semibold ${priorityStyles[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </span>

                      </td>

                      {/* AI */}
                      <td className="px-4 py-4">

                        <div className="flex items-center gap-1.5">

                          <Bot
                            size={11}
                            className={
                              ticket.ai === "Resolved"
                                ? "text-success"
                                : "text-primary"
                            }
                          />

                          <span
                            className={`text-[8px] font-medium ${
                              ticket.ai === "Resolved"
                                ? "text-success"
                                : "text-secondary"
                            }`}
                          >
                            {ticket.ai}
                          </span>

                        </div>

                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[8px] font-medium ${statusStyles[ticket.status]}`}
                        >

                          <span className="h-1.5 w-1.5 rounded-full bg-current" />

                          {ticket.status}

                        </span>

                      </td>

                      {/* Created */}
                      <td className="whitespace-nowrap px-4 py-4 text-[9px] text-muted">
                        {ticket.created}
                      </td>

                      {/* Action */}
                      <td className="px-3 py-4">

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/tickets/${ticket.id}`
                            )
                          }
                          title="View ticket"
                          className="rounded-md p-1.5 text-muted opacity-0 transition group-hover:opacity-100 hover:bg-background hover:text-foreground"
                        >
                          <MoreHorizontal size={15} />
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>

              {/* Empty state */}
              {filteredTickets.length === 0 && (
                <div className="flex flex-col items-center justify-center py-14">

                  <AlertCircle
                    size={24}
                    className="text-muted"
                  />

                  <p className="mt-3 text-xs font-medium text-foreground">
                    No employee requests found
                  </p>

                  <p className="mt-1 text-[10px] text-muted">
                    Try changing your search or filters.
                  </p>

                </div>
              )}

            </div>

            {/* Table footer */}
            <div className="flex items-center justify-between border-t border-border bg-card-secondary/30 px-4 py-3">

              <p className="text-[9px] text-muted">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredTickets.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {tickets.length}
                </span>{" "}
                requests
              </p>

              <button
                type="button"
                onClick={() => navigate("/tickets")}
                className="text-[9px] font-medium text-primary hover:underline"
              >
                View all requests
              </button>

            </div>

          </div>

          {/* =================================================
              MOBILE TICKET CARDS
          ================================================= */}

          <div className="card mt-4 overflow-hidden md:hidden">

            <div className="divide-y divide-border">

              {filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() =>
                    navigate(`/tickets/${ticket.id}`)
                  }
                  className="block w-full p-4 text-left transition hover:bg-card-secondary/40"
                >

                  {/* Top */}
                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <span className="text-[10px] font-semibold text-primary">
                          {ticket.id}
                        </span>

                        <span
                          className={`rounded-full px-2 py-0.5 text-[8px] font-medium ${priorityStyles[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </span>

                      </div>

                      <p className="mt-2 text-xs font-semibold text-foreground">
                        {ticket.issue}
                      </p>

                    </div>

                    <ArrowRight
                      size={14}
                      className="shrink-0 text-muted"
                    />

                  </div>

                  {/* Employee */}
                  <div className="mt-3">

                    <p className="text-[10px] font-medium text-secondary">
                      {ticket.employee}
                    </p>

                    <p className="mt-1 text-[9px] text-muted">
                      {ticket.department} • {ticket.created}
                    </p>

                  </div>

                  {/* Bottom */}
                  <div className="mt-3 flex items-center justify-between">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[8px] font-medium ${statusStyles[ticket.status]}`}
                    >

                      <span className="h-1.5 w-1.5 rounded-full bg-current" />

                      {ticket.status}

                    </span>

                    <div className="flex items-center gap-1 text-[8px] text-muted">

                      <Bot
                        size={10}
                        className="text-primary"
                      />

                      {ticket.ai}

                    </div>

                  </div>

                </button>
              ))}

              {filteredTickets.length === 0 && (
                <div className="py-12 text-center">

                  <AlertCircle
                    size={24}
                    className="mx-auto text-muted"
                  />

                  <p className="mt-3 text-xs font-medium text-foreground">
                    No employee requests found
                  </p>

                  <p className="mt-1 text-[10px] text-muted">
                    Try changing your filters.
                  </p>

                </div>
              )}

            </div>

            {/* Mobile footer */}
            <div className="border-t border-border bg-card-secondary/30 px-4 py-3">

              <button
                type="button"
                onClick={() => navigate("/tickets")}
                className="w-full text-center text-[9px] font-medium text-primary hover:underline"
              >
                View all employee requests
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            QUICK AI STATUS
        ================================================= */}

        <section className="mt-5">

          <div className="card overflow-hidden">

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Bot size={18} />
                </div>

                <div>

                  <p className="text-xs font-semibold text-foreground">
                    HANK AI is active
                  </p>

                  <p className="mt-1 text-[10px] text-muted">
                    AI is currently analyzing incoming employee requests.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-success" />

                <span className="text-[10px] font-medium text-success">
                  System operational
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <div className="mt-8 flex justify-end pb-6">

          <Button
            variant="primary"
            size="lg"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>

      </main>
    </div>
  );
};

export default Home;