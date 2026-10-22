import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Reset password:", data);

      // API call here
      // await api.post("/auth/forgot-password", data);

      toast.success("If the email exists, a reset link has been sent.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send reset link. Please try again."
      );
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-3 sm:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-[520px] -translate-x-1/2 rounded-full bg-accent-muted/30 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-info-muted/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-success-muted/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Card */}
        <div className="card relative overflow-hidden px-5 py-4 shadow-xl sm:px-6 sm:py-5">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-muted/40 blur-3xl" />

          <div className="relative">
            {/* Logo */}
            <div className="mb-3 flex justify-center">
              <Link
                to="/"
                className="group inline-flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <Wallet size={16} strokeWidth={2.2} />
                </div>

                <span className="text-base font-semibold tracking-[-0.02em] text-foreground">
                  Spendora
                </span>
              </Link>
            </div>

            {/* Back */}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-[10px] font-medium text-secondary transition-colors hover:text-foreground"
            >
              <ArrowLeft size={12} />
              Back to login
            </Link>

            {/* Header */}
            <div className="mt-3 text-center">
              <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-muted text-foreground">
                <Mail size={16} strokeWidth={2} />
              </div>

              <h1 className="text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-[22px]">
                Forgot your password?
              </h1>

              <p className="mx-auto mt-1 max-w-xs text-[11px] leading-4 text-secondary sm:text-xs">
                Enter your email and we'll send you a secure reset
                link.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-3"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-[11px] font-medium text-foreground"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={14}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    disabled={isSubmitting}
                    className={`h-9 w-full rounded-md border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition-all placeholder:text-muted focus:ring-2 focus:ring-accent/10 disabled:cursor-not-allowed disabled:opacity-60 ${
                      errors.email
                        ? "border-danger focus:border-danger"
                        : "border-border focus:border-accent"
                    }`}
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value:
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Enter a valid email address",
                      },
                    })}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-[10px] text-danger">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex h-9 w-full items-center justify-center gap-2 px-4 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Security */}
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck
                size={12}
                strokeWidth={2}
                className="text-success"
              />

              <span className="text-[9px] text-muted">
                Secure password recovery
              </span>
            </div>

            {/* Login */}
            <p className="mt-3 text-center text-[11px] text-secondary">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-foreground transition-colors hover:text-accent hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-2 text-center text-[9px] text-muted">
          © {new Date().getFullYear()} Spendora ·{" "}
          <Link
            to="/terms"
            className="hover:text-foreground"
          >
            Terms
          </Link>{" "}
          ·{" "}
          <Link
            to="/privacy"
            className="hover:text-foreground"
          >
            Privacy
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;