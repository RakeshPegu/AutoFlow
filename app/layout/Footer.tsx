
"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-20">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">

          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              AutoFlow
            </Link>

            <p className="mt-5  leading-7 font-sans text-slate-400">
              Turn your incoming leads into actionable opportunities with
              AI-powered lead qualification. Integrate our API into your
              existing application and focus on the leads that matter most.
            </p>

            <Link
              href="#get-started"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
            >
              Get Started
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="md:pl-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h3>

            <nav className="mt-6 flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="#about"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                About
              </Link>

              <Link
                href="#process"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Process
              </Link>

              <Link
                href="#faq"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>

            <div className="mt-6 space-y-5">

              {/* Email */}
              <a
                href="mailto:hello@autoflow.com"
                className="flex items-start gap-3 text-sm text-slate-400 transition hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <span>rakeshpegu@.com</span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Bengaluru, India
                </span>
              </div>

            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-sm font-sans font-medium text-white">
                Follow us
              </p>

              <div className="mt-4 flex items-center gap-3">

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-sm text-slate-400 transition hover:border-slate-500 hover:text-white"
                >
                  in
                </a>

                <a
                  href="#"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-sm text-slate-400 transition hover:border-slate-500 hover:text-white"
                >
                  GH
                </a>

                <a
                  href="#"
                  aria-label="X"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-sm text-slate-400 transition hover:border-slate-500 hover:text-white"
                >
                  X
                </a>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} AutoFlow. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms of Service
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}

