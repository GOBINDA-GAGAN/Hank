import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  sound,
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover",

    secondary:
      "bg-card-secondary text-foreground hover:bg-card-hover",

    outline:
      "border border-border bg-transparent text-foreground hover:bg-card-secondary",

    ghost:
      "bg-transparent text-foreground hover:bg-card-secondary",

    danger:
      "bg-danger text-white hover:opacity-90",

    success:
      "bg-success text-white hover:opacity-90",

    link:
      "bg-transparent text-purple hover:underline",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-base",
  };

  const handleClick = (e) => {
    if (disabled || loading) return;

    onClick?.(e);
  };

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;