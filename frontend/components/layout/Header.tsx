"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui";
import { useAuth } from "@/lib/context/AuthContext";
import { ROUTES } from "@/lib/constants";

export type HeaderVariant = "default" | "transparent";

export function Header({ variant = "default" }: { variant?: HeaderVariant }) {
  const isTransparent = variant === "transparent";
  const { auth, refreshAuth } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const manageHref =
    auth?.role === "admin" ? ROUTES.ADMIN_DASHBOARD : ROUTES.SUBADMIN_DASHBOARD;
  const isManager = auth?.role === "admin" || auth?.role === "subadmin";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setDropdownOpen(false);
    await refreshAuth();
    router.push(ROUTES.HOME);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-sm ${
        isTransparent
          ? "bg-transparent lg:bg-black/95 lg:border-white/10"
          : "bg-black/95"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        {auth?.authenticated && (
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Manage tab — admin and subadmin only */}
            {isManager && (
              <Link
                href={manageHref}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-4 py-1.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition no-underline"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage
              </Link>
            )}

            {/* Notification bell */}
            <button
              type="button"
              className="relative rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
              aria-label="Notifications"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white ring-2 ring-black/95" aria-hidden>
                2
              </span>
            </button>

            {/* Profile avatar with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-full transition hover:opacity-90"
                aria-label="Account menu"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-amber-200/90 to-amber-700/80 text-neutral-800">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </span>
                <svg className="h-4 w-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#0D1117] py-1 shadow-xl">
                  {auth.role && (
                    <p className="px-4 py-2 text-xs text-[#B3B3B3] border-b border-white/10 capitalize">
                      {auth.role}
                    </p>
                  )}
                  {/* Manage link in dropdown for mobile */}
                  {isManager && (
                    <Link
                      href={manageHref}
                      onClick={() => setDropdownOpen(false)}
                      className="flex sm:hidden w-full px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 transition no-underline"
                    >
                      Manage
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-white/5 transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
