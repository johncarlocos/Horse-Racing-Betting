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
    <div className="min-h-screen flex flex-col lg:flex-row bg-black">
      {/* Left panel: image + branding (logo, h1, description in lower-left) */}
      <div className="relative w-full lg:w-[45%] min-h-[40vh] lg:min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/assets/auth-page.png"
            alt="Horse racing"
            fill
            className="object-cover object-center"
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
        <div className="absolute bottom-8 left-6 right-6 lg:bottom-28 lg:left-20 lg:right-20 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-inherit no-underline mb-5"
          >
            <div className="flex h-[30px] w-[48px] items-center justify-center">
              <Image
                src="/assets/Group.png"
                alt="Go Racing logo"
                width={40}
                height={28}
              />
            </div>
            <span className="inline-flex items-baseline gap-1 font-inter text-[22px] font-medium leading-[1.4]">
              <span className="text-white">Go</span>
              <span className="text-[#fbbf24]">Racing</span>
            </span>
          </Link>
          <h1 className="text-[56px] font-medium leading-[1.2] text-white mb-3">
            Paddock Horse Racing
          </h1>
          <p className="font-inter text-[16px] font-light leading-[1.5] text-[#B3B3B3] whitespace-nowrap">
            Digital Paddock transforms traditional race analysis into a real-time AI-powered experience.
          </p>
        </div>
      </div>

      {/* Right panel: Sign Up form */} 
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-black">
        <div className="w-full max-w-[400px]">
          <h2 className="font-inter text-[28px] lg:text-[32px] font-semibold text-white mb-2">
            Sign Up
          </h2>
          <p className="font-inter text-[16px] font-light text-[#B3B3B3] mb-8">
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
                    className="invert opacity-90"
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
                    className="invert opacity-90"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[54px] rounded-full font-inter text-[16px] font-medium text-[#020308] bg-[#28E88E] hover:bg-[#22c97a] focus:outline-none focus:ring-2 focus:ring-[#28E88E] focus:ring-offset-2 focus:ring-offset-black transition-colors mt-2"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center font-inter text-[14px] text-[#B3B3B3]">
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
