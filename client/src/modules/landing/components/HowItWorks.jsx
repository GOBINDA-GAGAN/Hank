import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Headphones,
  MessageSquare,
  Sparkles,
  Ticket,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Ask HANK",
    description:
      "Describe the customer issue or upload a batch of support tickets.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI analyzes",
    description:
      "HANK understands the issue, categorizes the ticket, and suggests the best response.",
  },
  {
    number: "03",
    icon: Headphones,
    title: "Resolve or escalate",
    description:
      "AI handles simple issues and sends complex cases to a human agent.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="badge mb-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
            How HANK works
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            From question to resolution.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            HANK takes the repetitive work out of support. Ask a question,
            let AI understand the issue, and bring in a human when the
            situation needs one.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 lg:mt-16">

          {/* Connection line */}
          <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-border lg:block" />

          <div className="grid gap-5 lg:grid-cols-3">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">

                  <div className="card group relative h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">

                    {/* Top */}
                    <div className="flex items-center justify-between">

                      <span className="text-[11px] font-semibold tracking-wider text-muted">
                        {step.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                        <Icon size={18} strokeWidth={2} />
                      </div>

                    </div>

                    {/* Content */}
                    <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                      {step.description}
                    </p>

                    {/* Hover line */}
                    <div className="mt-6 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* AI → Human Flow */}
        <div className="relative mt-5 overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">

            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">

              {/* Left content */}
              <div>

                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Ticket size={17} />
                  </div>

                  <span className="text-xs font-medium text-muted">
                    Smart support workflow
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  AI handles the routine.
                  <br />
                  Humans handle the complex.
                </h3>

                <p className="mt-3 max-w-md text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                  HANK doesn't force every conversation through AI. When an
                  issue needs human judgment, the ticket is automatically
                  prepared for a support agent.
                </p>

                <Link
                  to="/register"
                  className="mt-6 inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-[11px] font-medium text-primary-foreground transition hover:bg-primary-hover"
                >
                  Try HANK free
                  <ArrowRight size={13} />
                </Link>

              </div>

              {/* Flow */}
              <div className="rounded-xl border border-border bg-background p-4 sm:p-5">

                {/* Customer */}
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10 text-info">
                    <MessageSquare size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold text-foreground">
                      Customer issue
                    </p>

                    <p className="mt-0.5 truncate text-[9px] text-muted">
                      "My account is locked after changing my password..."
                    </p>
                  </div>

                  <CheckCircle2
                    size={14}
                    className="text-success"
                  />

                </div>

                {/* Connector */}
                <div className="flex h-8 justify-center">
                  <div className="w-px bg-border" />
                </div>

                {/* AI */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles size={15} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-semibold text-foreground">
                          HANK AI
                        </p>

                        <span className="rounded-full bg-success/10 px-2 py-0.5 text-[8px] font-medium text-success">
                          Analyzing
                        </span>
                      </div>

                      <p className="mt-0.5 text-[9px] text-muted">
                        Identifying issue and preparing resolution...
                      </p>
                    </div>

                  </div>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full w-[78%] rounded-full bg-primary" />
                  </div>

                </div>

                {/* Connector */}
                <div className="flex h-8 justify-center">
                  <div className="w-px bg-border" />
                </div>

                {/* Human */}
                <div className="flex items-center gap-3 rounded-lg border border-warning/20 bg-warning/5 p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10 text-warning">
                    <UserRound size={15} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-semibold text-foreground">
                        Human agent
                      </p>

                      <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[8px] font-medium text-warning">
                        Escalated
                      </span>
                    </div>

                    <p className="mt-0.5 text-[9px] text-muted">
                      Full ticket context is ready for the agent.
                    </p>
                  </div>

                  <Headphones
                    size={14}
                    className="text-warning"
                  />

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center sm:mt-14">

          <p className="mb-4 text-xs text-muted">
            Support doesn't have to be complicated.
          </p>

          <Link
            to="/register"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/10 transition hover:bg-primary-hover"
          >
            Start with HANK
            <ArrowRight size={14} />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;