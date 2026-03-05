"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthFormLayout, PasswordField, TextField } from "@/components/auth";
import { PrimaryButton } from "@/components/ui";
import { COPY, ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only: redirect to race list. Backend auth later.
    router.push(ROUTES.MATCHES);
  };

  return (
    <AuthFormLayout>
      <h2 className="font-inter text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-white mb-2">
        {COPY.AUTH.LOGIN_TITLE}
      </h2>
      <p className="font-inter text-[14px] sm:text-[16px] font-light text-[#B3B3B3] mb-6 sm:mb-8">
        {COPY.AUTH.LOGIN_WELCOME}
      </p>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextField
          id="email"
          label={COPY.AUTH.EMAIL_LABEL}
          type="email"
          placeholder={COPY.AUTH.EMAIL_LABEL}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordField
          id="password"
          label={COPY.AUTH.PASSWORD_LABEL}
          placeholder={COPY.AUTH.PASSWORD_LABEL}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton className="mt-2">{COPY.AUTH.LOGIN_CTA}</PrimaryButton>
      </form>

      <p className="mt-6 sm:mt-8 text-center font-inter text-[13px] sm:text-[14px] text-[#B3B3B3]">
        {COPY.AUTH.NO_ACCOUNT}{" "}
        <Link href={ROUTES.SIGNUP} className="text-[#28E88E] font-medium no-underline hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthFormLayout>
  );
}
