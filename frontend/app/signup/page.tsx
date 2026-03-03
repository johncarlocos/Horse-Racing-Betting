"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden flex flex-col lg:flex-row bg-black">
      {/* Hero: image on top (mobile) / left (desktop), branding top-left over image */}
      <div className="relative w-full lg:w-[45%] min-h-[45vh] sm:min-h-[50vh] lg:min-h-screen order-1">
        <div className="absolute inset-0">
          <Image
            src="/assets/auth-page.png"
            alt="Horse racing"
            fill
            className="object-cover object-center object-left-top lg:object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.95) 100%)",
            }}
          />
        </div>
        <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6 lg:bottom-28 lg:left-20 lg:right-20 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-inherit no-underline mb-4 sm:mb-5"
          >
            <div className="flex h-[26px] w-[40px] sm:h-[30px] sm:w-[48px] items-center justify-center">
              <Image
                src="/assets/Group.png"
                alt="Go Racing logo"
                width={40}
                height={28}
                className="w-8 h-[22px] sm:w-10 sm:h-7"
              />
            </div>
            <span className="inline-flex items-baseline gap-1 font-inter text-[18px] sm:text-[22px] font-medium leading-[1.4]">
              <span className="text-white">Go</span>
              <span className="text-[#fbbf24]">Racing</span>
            </span>
          </Link>
          <h1 className="text-[28px] sm:text-[40px] lg:text-[56px] font-medium leading-[1.2] text-white mb-2 sm:mb-3">
            Paddock Horse Racing
          </h1>
          <p className="font-inter text-[14px] sm:text-[16px] font-light leading-[1.5] text-[#B3B3B3] whitespace-normal lg:whitespace-nowrap max-w-full">
            Digital Paddock transforms traditional race analysis into a real-time AI-powered experience.
          </p>
        </div>
      </div>

      {/* Form section: below hero on mobile, right panel on desktop */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:p-6 lg:p-12 bg-black order-2 min-h-0">
        <div className="w-full max-w-[400px] px-1 sm:px-0">
          <h2 className="font-inter text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-white mb-2">
            Sign Up
          </h2>
          <p className="font-inter text-[14px] sm:text-[16px] font-light text-[#B3B3B3] mb-6 sm:mb-8">
            Welcome to Paddock Horse Racing, your AI powered racing modules
          </p>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="email"
                className="block font-inter text-[14px] font-medium text-[#B3B3B3] mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-transparent border-0 border-b border-[#3B3B3B] px-0 py-3 text-white placeholder:text-[#707687] font-inter text-[16px] focus:outline-none focus:border-[#28E88E] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-inter text-[14px] font-medium text-[#B3B3B3] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-transparent border-0 border-b border-[#3B3B3B] px-0 py-3 pr-10 text-white placeholder:text-[#707687] font-inter text-[16px] focus:outline-none focus:border-[#28E88E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Image
                    src="/assets/eye.png"
                    alt=""
                    width={20}
                    height={20}
                    className="invert opacity-100"
                  />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block font-inter text-[14px] font-medium text-[#B3B3B3] mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full bg-transparent border-0 border-b border-[#3B3B3B] px-0 py-3 pr-10 text-white placeholder:text-[#707687] font-inter text-[16px] focus:outline-none focus:border-[#28E88E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <Image
                    src="/assets/eye.png"
                    alt=""
                    width={20}
                    height={20}
                    className="invert opacity-100"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 sm:h-[54px] rounded-full font-inter text-[15px] sm:text-[16px] font-medium text-[#020308] tracking-[-0.03em] focus:outline-none focus:ring-2 focus:ring-[#28E88E] focus:ring-offset-2 focus:ring-offset-black transition-opacity hover:opacity-95 mt-2 [background:linear-gradient(0deg,#28E88E,#28E88E),radial-gradient(44.33%_44.33%_at_50.2%_0%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)] [box-shadow:0px_7px_16px_0px_#28E88E33,0px_30px_30px_0px_#28E88E2B,0px_67px_40px_0px_#28E88E1A,0px_119px_47px_0px_#28E88E08,0px_185px_52px_0px_#28E88E00]"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 sm:mt-8 text-center font-inter text-[13px] sm:text-[14px] text-[#B3B3B3]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#28E88E] font-medium no-underline hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
