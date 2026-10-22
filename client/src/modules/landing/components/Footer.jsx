import React from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "AI Support", href: "#ai-support" },
  ],

  Account: [
    { label: "Login", to: "/login" },
    { label: "Create account", to: "/register" },
  ],

  Resources: [
    { label: "Help Center", href: "#help" },
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
  ],
};

const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12 lg:py-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2">
              {/* Hank Logo */}
              <div className="h-5 w-2 rounded-sm bg-primary" />

              <span className="text-base font-bold tracking-tight text-foreground">
                HANK
              </span>
            </Link>

            <p className="mt-5 text-xs leading-5 text-secondary sm:text-sm sm:leading-6">
              AI-powered support ticket generation platform that helps teams
              create, organize, and resolve support requests faster.
            </p>

            {/* Free Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />

              <span className="text-[10px] font-medium text-primary">
                100% Free to use
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="group inline-flex items-center gap-1 text-xs text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
              Account
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Account.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-xs text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-xs text-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={11}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-muted sm:text-xs">
            © {new Date().getFullYear()} HANK. All rights reserved.
          </p>

          <a
            href="https://gobinda-gagan-dey.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-[10px] text-muted transition-colors hover:text-foreground sm:text-xs"
          >
            Made with
            <Heart size={11} className="text-danger" fill="currentColor" />
            by
            <span className="font-medium text-foreground">Gobinda</span>
            <ArrowUpRight
              size={11}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
