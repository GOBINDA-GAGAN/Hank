
import React from "react";
import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Clock3,
  Headphones,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Generate support tickets",
    description:
      "Turn customer problems into clean, structured support tickets in seconds.",
    iconBg: "bg-info-muted",
    iconColor: "text-info",
  },
  {
    icon: Brain,
    title: "AI understands the issue",
    description:
      "Analyze customer messages, identify the problem, and understand what needs to be resolved.",
    iconBg: "bg-accent-muted",
    iconColor: "text-accent",
  },
  {
    icon: Sparkles,
    title: "Smart ticket routing",
    description:
      "Automatically detect category, priority, and the right team for every support request.",
    iconBg: "bg-success-muted",
    iconColor: "text-success",
  },
  {
    icon: UserRound,
    title: "Escalate to a human",
    description:
      "When AI cannot confidently resolve an issue, seamlessly escalate it to a human agent.",
    iconBg: "bg-warning-muted",
    iconColor: "text-warning",
  },
  {
    icon: Clock3,
    title: "Track every ticket",
    description:
      "Follow ticket status from creation to resolution with a clear support workflow.",
    iconBg: "bg-danger-muted",
    iconColor: "text-danger",
  },
  {
    icon: ShieldCheck,
    title: "Secure support",
    description:
      "Keep customer conversations, tickets, and support information protected.",
    iconBg: "bg-primary-muted",
    iconColor: "text-foreground",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[650px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="badge mb-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
            AI-powered support
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Support, made simpler.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            HANK turns customer problems into structured support tickets,
            uses AI to understand them, and escalates complex issues to
            human agents when needed.
          </p>

        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div
                  className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${feature.iconBg} ${feature.iconColor}`}
                >
                  <Icon size={19} strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="relative mt-5">

                  <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                    {feature.description}
                  </p>

                </div>

                {/* Bottom Line */}
                <div className="mt-5 h-px w-0 bg-border-strong transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}

        </div>

        {/* AI + Human Escalation Showcase */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">

          {/* AI Support Card */}
          <div className="card group relative overflow-hidden p-6 sm:p-7">

            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">

              {/* Header */}
              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Brain size={19} />
                </div>

                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                  AI Support
                </span>

              </div>

              <h3 className="mt-5 text-base font-semibold text-foreground">
                Let AI handle the first response
              </h3>

              <p className="mt-2 max-w-md text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                HANK analyzes the customer's message, understands the issue,
                creates a structured ticket, and prepares a helpful response.
              </p>

              {/* Ticket Preview */}
              <div className="mt-7 rounded-lg border border-border bg-card-secondary p-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <MessageSquareText size={15} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-medium text-muted">
                        New Support Ticket
                      </p>

                      <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[9px] font-medium text-warning">
                        Medium
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-medium text-foreground">
                      Payment failed but money was deducted
                    </p>

                    <p className="mt-1 text-[10px] leading-4 text-muted">
                      AI detected a payment-related issue and generated a
                      structured support request.
                    </p>

                  </div>

                </div>

                {/* AI Analysis */}
                <div className="mt-4 border-t border-border pt-4">

                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-primary" />

                    <span className="text-[10px] font-medium text-primary">
                      AI Analysis
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-md bg-card px-2 py-1 text-[9px] text-secondary">
                      Payment
                    </span>

                    <span className="rounded-md bg-card px-2 py-1 text-[9px] text-secondary">
                      Billing
                    </span>

                    <span className="rounded-md bg-card px-2 py-1 text-[9px] text-secondary">
                      Medium Priority
                    </span>

                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Human Escalation Card */}
          <div className="card group relative overflow-hidden p-6 sm:p-7">

            <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative">

              {/* Header */}
              <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-muted text-accent">
                  <Users size={19} />
                </div>

                <span className="rounded-full bg-accent-muted px-2.5 py-1 text-[10px] font-medium text-accent">
                  Human Escalation
                </span>

              </div>

              <h3 className="mt-5 text-base font-semibold text-foreground">
                Escalate when humans are needed
              </h3>

              <p className="mt-2 max-w-md text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
                Not every problem should be solved by AI. HANK automatically
                routes complex or sensitive issues to a human support agent.
              </p>

              {/* Escalation Preview */}
              <div className="mt-7 rounded-lg border border-border bg-card-secondary p-4">

                {/* Ticket */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-muted text-accent">
                      <Ticket size={14} />
                    </div>

                    <div>
                      <p className="text-[10px] font-medium text-foreground">
                        Ticket #HNK-2048
                      </p>

                      <p className="mt-0.5 text-[9px] text-muted">
                        Account & Security
                      </p>
                    </div>

                  </div>

                  <span className="rounded-full bg-warning/10 px-2 py-1 text-[9px] font-medium text-warning">
                    Escalated
                  </span>

                </div>

                {/* Flow */}
                <div className="mt-5 flex items-center gap-2">

                  <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-card px-3 py-2">

                    <Brain size={13} className="text-primary" />

                    <span className="text-[9px] text-secondary">
                      AI
                    </span>

                    <CheckCircle2
                      size={12}
                      className="ml-auto text-success"
                    />

                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-muted"
                  />

                  <div className="flex flex-1 items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">

                    <Headphones size={13} className="text-primary" />

                    <span className="text-[9px] font-medium text-primary">
                      Human Agent
                    </span>

                  </div>

                </div>

                {/* Status */}
                <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">

                  <Zap size={12} className="text-warning" />

                  <span className="text-[9px] text-secondary">
                    Escalated automatically because human assistance is required.
                  </span>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Workflow */}
        <div className="mt-4 rounded-xl border border-border bg-card p-6 sm:p-8">

          <div className="text-center">

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5">
              <Zap size={12} className="text-primary" />

              <span className="text-[10px] font-medium text-primary">
                Simple support workflow
              </span>
            </div>

            <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              From problem to resolution
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-secondary sm:text-sm">
              One simple workflow for AI-powered support and human assistance.
            </p>

          </div>

          {/* Steps */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {/* Step 1 */}
            <div className="rounded-lg border border-border bg-card-secondary p-4">

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary">
                  01
                </span>

                <Ticket size={15} className="text-muted" />
              </div>

              <h4 className="mt-4 text-xs font-semibold text-foreground">
                Create Ticket
              </h4>

              <p className="mt-1 text-[10px] leading-4 text-muted">
                Customer submits a support issue.
              </p>

            </div>

            {/* Step 2 */}
            <div className="rounded-lg border border-border bg-card-secondary p-4">

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary">
                  02
                </span>

                <Brain size={15} className="text-muted" />
              </div>

              <h4 className="mt-4 text-xs font-semibold text-foreground">
                AI Analyzes
              </h4>

              <p className="mt-1 text-[10px] leading-4 text-muted">
                AI understands and categorizes the issue.
              </p>

            </div>

            {/* Step 3 */}
            <div className="rounded-lg border border-border bg-card-secondary p-4">

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary">
                  03
                </span>

                <Sparkles size={15} className="text-muted" />
              </div>

              <h4 className="mt-4 text-xs font-semibold text-foreground">
                AI Resolves
              </h4>

              <p className="mt-1 text-[10px] leading-4 text-muted">
                AI prepares a response and solution.
              </p>

            </div>

            {/* Step 4 */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary">
                  04
                </span>

                <UserRound size={15} className="text-primary" />
              </div>

              <h4 className="mt-4 text-xs font-semibold text-foreground">
                Human Escalation
              </h4>

              <p className="mt-1 text-[10px] leading-4 text-muted">
                Complex issues reach a human agent.
              </p>

            </div>

          </div>

        </div>

        {/* Bottom Message */}
        <div className="mt-10 text-center">

          <p className="text-xs text-secondary">
            Built to make customer support faster, smarter, and more human.
          </p>

        </div>

      </div>
    </section>
  );
};

export default Features;