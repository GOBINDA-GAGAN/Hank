import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  Headphones,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const demoTickets = [
  {
    id: "HNK-1048",
    issue: "Duplicate payment on an order",
    category: "Billing",
    status: "AI resolved",
    color: "success",
    time: "2 min ago",
  },
  {
    id: "HNK-1047",
    issue: "Unable to access my workspace",
    category: "Account",
    status: "In progress",
    color: "info",
    time: "18 min ago",
  },
  {
    id: "HNK-1046",
    issue: "Update billing information",
    category: "Account",
    status: "Needs attention",
    color: "warning",
    time: "42 min ago",
  },
];

const metrics = [
  {
    label: "Total requests",
    value: "248",
    note: "Across the workspace",
    icon: Ticket,
  },
  {
    label: "Open requests",
    value: "32",
    note: "Awaiting resolution",
    icon: Clock3,
  },
  {
    label: "AI resolved",
    value: "193",
    note: "Handled automatically",
    icon: Bot,
  },
  {
    label: "Human handoff",
    value: "23",
    note: "Needs an agent",
    icon: Headphones,
  },
];

const features = [
  {
    icon: Bot,
    title: "AI-assisted support",
    description:
      "Understand incoming requests, organize details, and suggest useful next steps.",
  },
  {
    icon: Ticket,
    title: "One organized workspace",
    description:
      "Turn scattered questions into trackable tickets with clear statuses.",
  },
  {
    icon: Headphones,
    title: "Human help when needed",
    description:
      "Escalate complex issues to a person without losing the conversation.",
  },
];

const statusStyles = {
  success: "bg-success-muted text-success",
  info: "bg-info-muted text-info",
  warning: "bg-warning-muted text-warning",
};

const statusDotStyles = {
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
};

function BrandMark() {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
      <MessageSquareText size={18} />
    </span>
  );
}

function Hero() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero section */}
      <section id="hero" className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-primary-muted to-background" />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3.5 py-2 text-xs font-medium text-primary shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-muted">
                <Sparkles size={12} />
              </span>
              AI-powered support
            </div>

            <h1 className="mt-7 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Support that feels
              <span className="block text-primary">
                simple, from day one.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              HANK brings AI assistance, support tickets, and human escalation
              together in one clear workspace. Resolve routine requests faster
              and keep every conversation moving.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-primary/20"
              >
                Get started free
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:bg-card-hover focus:outline-none focus:ring-4 focus:ring-ring/15"
              >
                Sign in
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-muted sm:text-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-success" />
                Easy to use
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-primary" />
                Clear ownership
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-warning" />
                AI-assisted workflows
              </span>
            </div>
          </div>

          {/* SaaS product preview */}
          <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16 lg:mt-20">
            <div className="pointer-events-none absolute -inset-x-6 -bottom-6 top-12 rounded-[2rem] bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              {/* Preview header */}
              <header className="flex min-h-16 items-center justify-between gap-4 border-b border-border bg-card px-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <BrandMark />
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">
                      HANK workspace
                    </p>
                    <p className="text-xs text-muted">
                      Support overview
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 md:flex">
                  <span className="text-xs text-muted">
                    Search support requests...
                  </span>
                  <span className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted">
                    /
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden items-center gap-1.5 rounded-full bg-success-muted px-2.5 py-1.5 text-[11px] font-medium text-success sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    System ready
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Users size={15} />
                  </span>
                </div>
              </header>

              <div className="grid lg:grid-cols-[185px_minmax(0,1fr)]">
                {/* Preview sidebar */}
                <aside className="hidden border-r border-border bg-surface/70 p-4 lg:block">
                  <p className="px-2 pb-3 pt-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Workspace
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 rounded-lg bg-primary-muted px-3 py-2.5 text-xs font-semibold text-primary">
                      <Ticket size={15} />
                      Overview
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs text-secondary">
                      <MessageSquareText size={15} />
                      Conversations
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs text-secondary">
                      <Headphones size={15} />
                      Human handoff
                    </div>
                  </div>

                  <div className="mt-7 border-t border-border pt-4">
                    <p className="px-2 pb-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
                      Assistant
                    </p>
                    <div className="rounded-xl border border-border bg-card p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-secondary">
                          AI assistance
                        </span>
                        <span className="h-2 w-2 rounded-full bg-success" />
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-[78%] rounded-full bg-primary" />
                      </div>
                      <p className="mt-2 text-[10px] text-muted">
                        Illustrative preview
                      </p>
                    </div>
                  </div>
                </aside>

                {/* Preview main content */}
                <div className="min-w-0 bg-background p-4 sm:p-6 lg:p-7">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs font-medium text-primary">
                        Support overview
                      </p>
                      <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                        Your support, at a glance
                      </h2>
                      <p className="mt-1 text-xs text-muted sm:text-sm">
                        See what is open, resolved, and needs attention.
                      </p>
                    </div>

                    <Link
                      to="/create-ticket"
                      className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover"
                    >
                      <Ticket size={14} />
                      Create ticket
                    </Link>
                  </div>

                  {/* Illustrative metrics */}
                  <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {metrics.map((metric) => {
                      const Icon = metric.icon;

                      return (
                        <div
                          key={metric.label}
                          className="rounded-xl border border-border bg-card p-3.5 sm:p-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
                              <Icon size={15} />
                            </span>
                            <span className="text-[10px] text-muted">
                              Sample
                            </span>
                          </div>
                          <p className="mt-4 text-xs text-secondary">
                            {metric.label}
                          </p>
                          <p className="mt-1 text-2xl font-semibold tracking-tight text-card-foreground">
                            {metric.value}
                          </p>
                          <p className="mt-1 text-[10px] text-muted sm:text-xs">
                            {metric.note}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Illustrative tickets */}
                  <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-5">
                      <div>
                        <h3 className="text-sm font-semibold text-card-foreground">
                          Recent requests
                        </h3>
                        <p className="mt-0.5 text-[11px] text-muted">
                          A sample of tickets in HANK
                        </p>
                      </div>
                      <span className="hidden rounded-lg border border-border px-2.5 py-1.5 text-[11px] text-muted sm:inline-flex">
                        Latest activity
                      </span>
                    </div>

                    <div className="divide-y divide-border">
                      {demoTickets.map((item) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 sm:grid-cols-[100px_minmax(0,1fr)_120px_95px] sm:px-5"
                        >
                          <span className="hidden text-xs font-semibold text-primary sm:block">
                            {item.id}
                          </span>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-card-foreground sm:text-sm">
                              {item.issue}
                            </p>
                            <p className="mt-1 text-[11px] text-muted">
                              {item.category} · {item.time}
                            </p>
                          </div>

                          <span
                            className={`hidden w-fit rounded-full px-2.5 py-1 text-[10px] font-medium sm:inline-flex ${statusStyles[item.color]}`}
                          >
                            {item.status}
                          </span>

                          <span className="inline-flex items-center justify-end gap-1.5 text-[10px] text-secondary sm:justify-start">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${statusDotStyles[item.color]}`}
                            />
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-border bg-surface/70 px-4 py-3 sm:px-5">
                      <span className="text-[10px] text-muted">
                        Example data for product preview
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Simple by design
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-surface/70">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              A better support workflow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Less chasing. More resolving.
            </h2>
            <p className="mt-4 text-sm leading-6 text-secondary sm:text-base sm:leading-7">
              Give every request a clear path from the first message to the
              final answer, without losing the human touch.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted text-primary">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary/20 bg-primary-muted p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                Make support feel simpler.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-secondary">
                Bring conversations, tickets, and next steps together in one
                workspace.
              </p>
            </div>
            <Link
              to="/register"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Try HANK
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hero;

