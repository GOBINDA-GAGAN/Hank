import React, { useState } from "react";
import {   MessageCircle, Sparkles, Zap,  ArrowRight,
  Check,
  CheckCircle2,
  TrendingDown,
  WalletCards,
 } from "lucide-react";
import { Link } from "react-router-dom";

const plans = {
  monthly: [
    {
      name: "Free",
      description: "Everything you need to start tracking your money.",
      price: "₹0",
      period: "/month",
      popular: false,
      cta: "Get started",
      features: [
        "Track up to 50 expenses/month",
        "Basic spending categories",
        "Monthly spending summary",
        "1 budget",
        "7-day spending history",
        "Basic WhatsApp expense entry",
      ],
    },
    {
      name: "Plus",
      description: "For people who want better control over their spending.",
      price: "₹99",
      period: "/month",
      popular: true,
      cta: "Start Plus",
      features: [
        "Unlimited expenses",
        "Unlimited budgets",
        "Advanced spending insights",
        "Complete spending history",
        "WhatsApp expense tracking",
        "Daily WhatsApp summary",
        "Budget alerts on WhatsApp",
        "Savings goals",
      ],
    },
    {
      name: "Pro",
      description: "Maximum automation for effortless money management.",
      price: "₹199",
      period: "/month",
      popular: false,
      cta: "Go Pro",
      features: [
        "Everything in Plus",
        "Unlimited WhatsApp expense entries",
        "Daily & weekly WhatsApp reports",
        "Monthly financial summary",
        "Smart budget alerts",
        "Category spending alerts",
        "Savings reminders",
        "Advanced financial insights",
      ],
    },
  ],
  yearly: [
    {
      name: "Free",
      description: "Everything you need to start tracking your money.",
      price: "₹0",
      period: "/year",
      popular: false,
      cta: "Get started",
      features: [
        "Track up to 50 expenses/month",
        "Basic spending categories",
        "Monthly spending summary",
        "1 budget",
        "7-day spending history",
        "Basic WhatsApp expense entry",
      ],
    },
    {
      name: "Plus",
      description: "For people who want better control over their spending.",
      price: "₹999",
      period: "/year",
      popular: true,
      cta: "Start Plus",
      features: [
        "Unlimited expenses",
        "Unlimited budgets",
        "Advanced spending insights",
        "Complete spending history",
        "WhatsApp expense tracking",
        "Daily WhatsApp summary",
        "Budget alerts on WhatsApp",
        "Savings goals",
      ],
    },
    {
      name: "Pro",
      description: "Maximum automation for effortless money management.",
      price: "₹1,999",
      period: "/year",
      popular: false,
      cta: "Go Pro",
      features: [
        "Everything in Plus",
        "Unlimited WhatsApp expense entries",
        "Daily & weekly WhatsApp reports",
        "Monthly financial summary",
        "Smart budget alerts",
        "Category spending alerts",
        "Savings reminders",
        "Advanced financial insights",
      ],
    },
  ],
};

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");

  const currentPlans = plans[billing];

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[600px] -translate-x-1/2 rounded-full bg-accent-muted/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge mb-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
            Simple pricing
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            More control. Less cost.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            Start free and upgrade when you need more automation, insights, and
            control over your money.
          </p>

          {/* Billing toggle */}
          <div className="mt-7 inline-flex items-center rounded-full border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                billing === "monthly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                billing === "yearly"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              Yearly
              <span className="rounded-full bg-success-muted px-2 py-0.5 text-[9px] font-semibold text-success">
                Save
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:grid-cols-3 lg:mt-14">
          {currentPlans.map((plan) => (
            <div
              key={plan.name}
              className={`card relative flex flex-col overflow-hidden p-6 sm:p-7 ${
                plan.popular ? "border-foreground/20 shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[9px] font-semibold text-primary-foreground">
                    <Sparkles size={10} />
                    Most popular
                  </span>
                </div>
              )}

              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-muted text-foreground">
                  {plan.name === "Pro" ? (
                    <Zap size={17} />
                  ) : (
                    <Sparkles size={17} />
                  )}
                </div>

                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-10 text-xs leading-5 text-secondary">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-end">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>

                  <span className="mb-1 ml-1 text-xs text-muted">
                    {plan.period}
                  </span>
                </div>

                {billing === "yearly" && plan.name !== "Free" && (
                  <p className="mt-1 text-[10px] text-success">
                    Save compared with monthly billing
                  </p>
                )}
              </div>

              <Link
                to="/register"
                className={`mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-xs font-medium transition-all ${
                  plan.popular
                    ? "btn-primary"
                    : "border border-border bg-card-secondary text-foreground hover:bg-secondary"
                }`}
              >
                {plan.cta}
                <ArrowRight size={13} />
              </Link>

              <div className="my-6 h-px bg-border" />

              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                Includes
              </p>

              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs text-secondary"
                  >
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-success"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

    

        <p className="mt-8 text-center text-[10px] text-muted">
          No complicated plans. Start free, upgrade only when you need more.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
