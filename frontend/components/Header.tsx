"use client";

import { Logo } from "@/components/ui";

export type HeaderVariant = "default" | "transparent";

export function Header({ variant = "default" }: { variant?: HeaderVariant }) {
  const isTransparent = variant === "transparent";

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
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notification bell with red badge */}
          <button
            type="button"
            className="relative rounded-full p-2 text-white/90 transition hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-black/95"
              aria-hidden
            />
          </button>
          {/* Profile avatar with dropdown chevron */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full transition hover:opacity-90"
            aria-label="Account menu"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-amber-200/90 to-amber-700/80 text-neutral-800">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            <svg
              className="h-4 w-4 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
