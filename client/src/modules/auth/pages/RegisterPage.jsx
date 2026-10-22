import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      toast.success(
        response?.message || "Account created successfully"
      );

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login is not available yet.");
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
          {/* Card Glow */}
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

            {/* Header */}
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-[22px]">
                Create your account
              </h1>

              <p className="mt-1 text-[11px] leading-4 text-secondary sm:text-xs">
                Start managing your money with Spendora.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-3"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-[11px] font-medium text-foreground"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={14}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className={`h-9 w-full rounded-md border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition-all placeholder:text-muted focus:ring-2 focus:ring-accent/10 disabled:cursor-not-allowed disabled:opacity-60 ${
                      errors.name
                        ? "border-danger focus:border-danger"
                        : "border-border focus:border-accent"
                    }`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message:
                          "Name must be at least 2 characters",
                      },
                      validate: (value) => {
                        if (!value.trim()) {
                          return "Name is required";
                        }

                        if (value.trim().length < 2) {
                          return "Name must be at least 2 characters";
                        }

                        return true;
                      },
                    })}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-[10px] text-danger">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                      required: "Email is required",
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

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-[11px] font-medium text-foreground"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={14}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    disabled={isSubmitting}
                    className={`h-9 w-full rounded-md border bg-background pl-9 pr-10 text-xs text-foreground outline-none transition-all placeholder:text-muted focus:ring-2 focus:ring-accent/10 disabled:cursor-not-allowed disabled:opacity-60 ${
                      errors.password
                        ? "border-danger focus:border-danger"
                        : "border-border focus:border-accent"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message:
                          "Password must be at least 8 characters",
                      },
                      validate: {
                        uppercase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Must contain an uppercase letter",
                        number: (value) =>
                          /[0-9]/.test(value) ||
                          "Must contain a number",
                      },
                    })}
                  />

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-[10px] text-danger">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    disabled={isSubmitting}
                    className="mt-[2px] h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary"
                    {...register("terms", {
                      validate: (value) =>
                        value === true ||
                        "You must accept the terms",
                    })}
                  />

                  <span className="text-[10px] leading-4 text-secondary">
                    I agree to{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-foreground hover:text-accent hover:underline"
                    >
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-foreground hover:text-accent hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {errors.terms && (
                  <p className="mt-1 text-[10px] text-danger">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* Create Account */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex h-9 w-full items-center justify-center gap-2 px-4 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />

              <span className="text-[9px] font-medium text-muted">
                OR
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-9 w-full items-center justify-center gap-2.5 rounded-md border border-border bg-background px-4 text-xs font-medium text-foreground transition-all hover:border-border-strong hover:bg-card-secondary active:scale-[0.99]"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Security */}
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck
                size={12}
                strokeWidth={2}
                className="text-success"
              />

              <span className="text-[9px] text-muted">
                Secure authentication
              </span>
            </div>
          </div>
        </div>

        {/* Login */}
        <p className="mt-3 text-center text-[11px] text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-foreground transition-colors hover:text-accent hover:underline"
          >
            Log in
          </Link>
        </p>

        {/* Compact Footer */}
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

const GoogleIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
      />

      <path
        fill="#34A853"
        d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.5Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.6A5.86 5.86 0 0 1 6.23 12c0-.56.1-1.1.31-1.6V7.88H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.12l3.25-2.52Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.44 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.25 2.52C7.31 8.09 9.46 6.37 12 6.37Z"
      />
    </svg>
  );
};

export default Register;