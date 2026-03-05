"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthFormLayout, PasswordField, TextField } from "@/components/auth";
import { PrimaryButton } from "@/components/ui";
import { COPY, ROUTES } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Login failed.");
      return;
    }

    router.push(ROUTES.ADMIN_DASHBOARD);
  };

  return (
    <AuthFormLayout>
      <h2 className="font-inter text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-white mb-2">
        Admin Login
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
          required
          disabled={loading}
        />
        <PasswordField
          id="password"
          label={COPY.AUTH.PASSWORD_LABEL}
          placeholder={COPY.AUTH.PASSWORD_LABEL}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {error && (
          <p className="font-inter text-[13px] text-red-400 -mt-2" role="alert">
            {error}
          </p>
        )}

        <PrimaryButton className="mt-2" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#020308]/30 border-t-[#020308]" />
              Logging in…
            </span>
          ) : (
            COPY.AUTH.LOGIN_CTA
          )}
        </PrimaryButton>
      </form>
    </AuthFormLayout>
  );
}
