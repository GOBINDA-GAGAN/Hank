
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  Clock3,
  Bot,
  Users,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  MessageCircle,
  LoaderCircle,
} from "lucide-react";

import { getAllSupportItemsApi } from "../../../services/ticket.api";

const TICKETS_PER_PAGE = 5;

const MyTickets = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    aiResolved: 0,
    humanAction: 0,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: TICKETS_PER_PAGE,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllSupportItemsApi({
        page: currentPage,
        limit: TICKETS_PER_PAGE,
        type: typeFilter,
        search: search.trim(),
        status: statusFilter,
        priority: priorityFilter,
        department: departmentFilter,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Unable to load support requests."
        );
      }

      const data = response.data;

      setTickets(Array.isArray(data?.items) ? data.items : []);

      setStats({
        totalTickets: data?.stats?.totalTickets ?? 0,
        openTickets: data?.stats?.openTickets ?? 0,
        aiResolved: data?.stats?.aiResolved ?? 0,
        humanAction: data?.stats?.humanAction ?? 0,
      });

      setPagination(
        data?.pagination || {
          page: currentPage,
          limit: TICKETS_PER_PAGE,
          total: 0,
          totalPages: 0,
        }
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while loading support requests."
      );
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    typeFilter,
    search,
    statusFilter,
    priorityFilter,
    departmentFilter,
  ]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const resetPage = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setDepartmentFilter("All");
    setTypeFilter("all");
    setCurrentPage(1);
  };

  const hasFilters =
    Boolean(search) ||
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    departmentFilter !== "All" ||
    typeFilter !== "all";

  const openSupportItem = (item) => {
    if (item.type === "conversation") {
      navigate(`/create-ticket/${item.conversationId || item._id}`);
      return;
    }

    navigate(`/ticket/${item._id}`);
  };

  const totalPages = pagination.totalPages || 0;
  const startIndex =
    pagination.total === 0
      ? 0
      : (currentPage - 1) * TICKETS_PER_PAGE + 1;

  const endIndex = Math.min(
    currentPage * TICKETS_PER_PAGE,
    pagination.total
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
          Support
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              My Tickets444444
            </h1>

            <p className="mt-1 text-xs text-secondary">
              Track your support tickets and conversations.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchTickets}
            disabled={loading}
            className="btn-secondary inline-flex items-center gap-2 px-3 py-2 text-xs font-medium"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Ticket size={17} />}
          label="Total Tickets"
          value={stats.totalTickets}
          footer="Created support tickets"
          iconStyle="bg-primary-muted text-primary"
        />

        <StatCard
          icon={<Clock3 size={17} />}
          label="Open Requests"
          value={stats.openTickets}
          footer="Open or in progress"
          iconStyle="bg-blue-500/10 text-blue-500"
        />

        <StatCard
          icon={<Bot size={17} />}
          label="AI Resolved"
          value={stats.aiResolved}
          footer="Resolved by AI"
          iconStyle="bg-success/10 text-success"
        />

        <StatCard
          icon={<Users size={17} />}
          label="Human Action"
          value={stats.humanAction}
          footer="Requires human support"
          iconStyle="bg-amber-500/10 text-amber-600"
        />
      </div>

      {/* Table card */}
      <div className="card overflow-hidden">
        {/* Search and filters */}
        <div className="border-b border-border p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Support requests
              </h2>

              <p className="mt-1 text-[10px] text-muted">
                {pagination.total} records found
              </p>
            </div>

            <div className="relative w-full xl:w-72">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search tickets or issues..."
                className="h-9 w-full rounded-lg border border-border bg-card-secondary pl-9 pr-3 text-xs text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-muted">
              <SlidersHorizontal size={13} />
              Filters
            </div>

            <Filter
              value={typeFilter}
              onChange={(value) =>
                resetPage(setTypeFilter, value)
              }
              options={[
                { label: "All items", value: "all" },
                { label: "Tickets", value: "ticket" },
                { label: "Conversations", value: "conversation" },
              ]}
            />

            <Filter
              value={departmentFilter}
              onChange={(value) =>
                resetPage(setDepartmentFilter, value)
              }
              options={[
                { label: "All departments", value: "All" },
                { label: "Engineering", value: "Engineering" },
                { label: "Support", value: "Support" },
                { label: "HR", value: "HR" },
              ]}
            />

            <Filter
              value={priorityFilter}
              onChange={(value) =>
                resetPage(setPriorityFilter, value)
              }
              options={[
                { label: "All priorities", value: "All" },
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
              ]}
            />

            <Filter
              value={statusFilter}
              onChange={(value) =>
                resetPage(setStatusFilter, value)
              }
              options={[
                { label: "All statuses", value: "All" },
                { label: "Open", value: "Open" },
                { label: "In Progress", value: "In Progress" },
                { label: "Resolved", value: "Resolved" },
              ]}
            />

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] font-medium text-primary hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="m-4 flex items-start gap-2 rounded-lg border border-danger/30 p-3 text-xs text-danger">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />

            <div className="flex-1">
              <p>{error}</p>

              <button
                type="button"
                onClick={fetchTickets}
                className="mt-1 font-medium underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-border bg-card-secondary/50">
                <TableHead>Reference</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>AI / Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-14 text-center">
                    <LoaderCircle
                      size={22}
                      className="mx-auto animate-spin text-primary"
                    />
                    <p className="mt-2 text-xs text-muted">
                      Loading support requests...
                    </p>
                  </td>
                </tr>
              ) : tickets.length > 0 ? (
                tickets.map((item) => (
                  <tr
                    key={`${item.type}-${item._id}`}
                    className="border-b border-border last:border-0 transition hover:bg-card-secondary/40"
                  >
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => openSupportItem(item)}
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-primary hover:underline"
                      >
                        {item.type === "conversation" ? (
                          <MessageCircle size={12} />
                        ) : (
                          <Ticket size={12} />
                        )}

                        {item.id}
                      </button>

                      <p className="mt-1 text-[9px] capitalize text-muted">
                        {item.type}
                      </p>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-[10px] text-secondary">
                        {item.department || "Support"}
                      </span>
                    </td>

                    <td className="max-w-[260px] px-4 py-3.5">
                      <p
                        title={item.issue}
                        className="truncate text-xs font-medium text-foreground"
                      >
                        {item.issue || "Support request"}
                      </p>
                    </td>

                    <td className="px-4 py-3.5">
                      <Priority priority={item.priority} />
                    </td>

                    <td className="px-4 py-3.5">
                      <AIStatus status={item.ai} />
                    </td>

                    <td className="px-4 py-3.5">
                      <Status status={item.status} />
                    </td>

                    <td className="whitespace-nowrap px-4 py-3.5 text-[10px] text-muted">
                      {formatDate(item.created)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-14 text-center">
                    <Ticket
                      size={25}
                      className="mx-auto text-muted"
                    />

                    <p className="mt-2 text-xs font-medium text-foreground">
                      {error ? "Unable to load records" : "No requests found"}
                    </p>

                    <p className="mt-1 text-[10px] text-muted">
                      {error
                        ? "Try refreshing the page."
                        : "Try changing your filters or start a new conversation."}
                    </p>

                    {!error && (
                      <button
                        type="button"
                        onClick={() => navigate("/create-ticket")}
                        className="mt-3 text-xs font-medium text-primary hover:underline"
                      >
                        Start a conversation
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-muted">
            Showing{" "}
            <span className="font-medium text-foreground">
              {startIndex}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {endIndex}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {pagination.total}
            </span>{" "}
            records
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={loading || currentPage <= 1}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              className="flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-[10px] text-secondary transition hover:bg-card-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={13} />
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                disabled={loading}
                onClick={() => setCurrentPage(page)}
                className={`h-8 min-w-8 rounded-lg px-2 text-[10px] font-medium transition ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "text-secondary hover:bg-card-secondary"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={loading || currentPage >= totalPages}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              className="flex h-8 items-center gap-1 rounded-lg border border-border px-2.5 text-[10px] text-secondary transition hover:bg-card-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Summary card */
const StatCard = ({ icon, label, value, footer, iconStyle }) => (
  <div className="card p-4 transition duration-200 hover:shadow-md">
    <div className="flex items-start justify-between">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconStyle}`}
      >
        {icon}
      </div>
    </div>

    <div className="mt-4">
      <p className="text-[10px] text-secondary">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>

      <p className="mt-1 text-[9px] text-muted">{footer}</p>
    </div>
  </div>
);

/* Select filter */
const Filter = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className="h-8 rounded-lg border border-border bg-card px-3 text-[10px] text-secondary outline-none transition hover:bg-card-secondary focus:border-primary"
  >
    {options.map((option) => {
      const item =
        typeof option === "string"
          ? { label: option, value: option }
          : option;

      return (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      );
    })}
  </select>
);

/* Table heading */
const TableHead = ({ children }) => (
  <th className="whitespace-nowrap px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-muted">
    {children}
  </th>
);

/* Priority badge */
const Priority = ({ priority }) => {
  const styles = {
    High: "bg-danger/10 text-danger",
    Medium: "bg-amber-500/10 text-amber-600",
    Low: "bg-success/10 text-success",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-[9px] font-medium ${
        styles[priority] || "bg-secondary text-secondary-foreground"
      }`}
    >
      {priority || "Not set"}
    </span>
  );
};

/* AI / agent status */
const AIStatus = ({ status }) => {
  if (status === "Resolved") {
    return (
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={13} className="text-success" />
        <span className="text-[9px] font-medium text-success">
          Resolved
        </span>
      </div>
    );
  }

  if (status === "Human") {
    return (
      <div className="flex items-center gap-1.5">
        <Users size={13} className="text-amber-500" />
        <span className="text-[9px] font-medium text-amber-600">
          Human
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Bot size={13} className="text-primary" />
      <span className="text-[9px] font-medium text-primary">
        {status || "Analyzing"}
      </span>
    </div>
  );
};

/* Ticket status */
const Status = ({ status }) => {
  const styles = {
    Open: "bg-blue-500/10 text-blue-600",
    "In Progress": "bg-amber-500/10 text-amber-600",
    Resolved: "bg-success/10 text-success",
    Closed: "bg-secondary text-secondary-foreground",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-medium ${
        styles[status] || "bg-secondary text-secondary-foreground"
      }`}
    >
      {status || "Open"}
    </span>
  );
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default MyTickets;
