import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Cookie,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const securityFeatures = [
  {
    icon: LockKeyhole,
    title: "Secure authentication",
    description:
      "Protect your HANK account with secure authentication and controlled access to your support workspace.",
  },
  {
    icon: KeyRound,
    title: "Protected sessions",
    description:
      "Authentication sessions are handled through secure server-side mechanisms to reduce unnecessary client-side exposure.",
  },
  {
    icon: Ticket,
    title: "Private support tickets",
    description:
      "Your support conversations and ticket information are kept within your authenticated workspace.",
  },
  {
    icon: Cookie,
    title: "Secure cookies",
    description:
      "Authentication cookies can use HttpOnly, Secure, and appropriate SameSite protections.",
  },
];

const Security = () => {
  return (
    <section
      id="security"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="badge mb-4">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-success" />
            Security & privacy
          </div>

          <h2 className="text-gradient text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Your support data,
            <br />
            handled responsibly.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-secondary sm:text-base sm:leading-7">
            HANK is designed with security in mind, helping keep your account,
            support tickets, and conversations protected while AI handles the
            repetitive work.
          </p>
        </div>

        {/* Main security panel */}
        <div className="card relative mx-auto mt-12 max-w-5xl overflow-hidden p-6 sm:mt-14 sm:p-8 lg:p-10">

          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-info/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

            {/* Shield */}
            <div className="flex justify-center lg:justify-start">

              <div className="relative">

                <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-border bg-card-secondary shadow-sm sm:h-60 sm:w-60">

                  <div className="absolute inset-6 rounded-full border border-border" />

                  <div className="absolute inset-12 rounded-full bg-primary/10" />

                  <ShieldCheck
                    size={78}
                    strokeWidth={1.5}
                    className="relative text-primary"
                  />

                  {/* Status */}
                  <div className="absolute bottom-7 rounded-full border border-primary/20 bg-card px-3 py-1.5 shadow-sm">

                    <div className="flex items-center gap-1.5">

                      <span className="h-1.5 w-1.5 rounded-full bg-success" />

                      <span className="text-[9px] font-semibold text-success">
                        Security enabled
                      </span>

                    </div>

                  </div>

                </div>
              </div>
            </div>

            {/* Content */}
            <div>

              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card-secondary px-3 py-1.5">

                <LockKeyhole
                  size={12}
                  className="text-primary"
                />

                <span className="text-[10px] font-medium text-secondary">
                  Built with security in mind
                </span>

              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-foreground sm:text-3xl">
                Security should stay
                <span className="text-muted"> out of your way.</span>
              </h3>

              <p className="mt-4 text-sm leading-6 text-secondary">
                HANK uses security-focused patterns across authentication,
                sessions, cookies, and access control so your support workflow
                stays simple without ignoring the protection underneath.
              </p>

              {/* Security points */}
              <div className="mt-7 space-y-3">

                {[
                  "Secure authentication and account access",
                  "Protected user sessions",
                  "Controlled access to support tickets",
                  "Sensitive authentication tokens kept away from browser storage",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5"
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={2}
                      className="shrink-0 text-success"
                    />

                    <span className="text-xs font-medium text-secondary">
                      {item}
                    </span>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>

        {/* Security features */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {securityFeatures.map((feature) => {

            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={17} />
                </div>

                <h3 className="relative mt-5 text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="relative mt-2 text-xs leading-5 text-secondary">
                  {feature.description}
                </p>

              </article>
            );

          })}

        </div>

        {/* Human escalation trust block */}
        <div className="card mx-auto mt-5 max-w-5xl p-5 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserRound size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-foreground">
                  Human escalation when it matters
                </p>

                <p className="mt-1 text-[10px] leading-4 text-muted">
                  Complex support issues can be passed to a human agent with
                  the relevant ticket context.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 text-[10px] text-success">
              <CheckCircle2 size={13} />
              Controlled access
            </div>

          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:mt-12">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={15}
              className="text-success"
            />

            <p className="text-xs text-secondary">
              Built around privacy, security, and controlled access.
            </p>

          </div>

          <Link
            to="/register"
            className="btn-primary inline-flex h-10 items-center gap-2 px-5 text-xs font-medium"
          >
            Start using HANK
            <ArrowRight size={13} />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Security;