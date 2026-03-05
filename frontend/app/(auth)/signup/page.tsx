"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthFormLayout, CheckboxField, PasswordField, TextField } from "@/components/auth";
import { PrimaryButton } from "@/components/ui";
import { apiSignup } from "@/lib/api";
import { COPY, ROUTES } from "@/lib/constants";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");
  const [privacyError, setPrivacyError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPrivacyError("");

    if (!privacyAccepted) {
      setPrivacyError("You must accept the privacy policy to continue.");
      return;
    }

    setLoading(true);
    const result = await apiSignup(email, password, confirmPassword, privacyAccepted);
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    router.push(ROUTES.MATCHES);
  };

  return (
    <AuthFormLayout>
      <h2 className="font-inter text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-white mb-2">
        {COPY.AUTH.SIGNUP_TITLE}
      </h2>
      <p className="font-inter text-[14px] sm:text-[16px] font-light text-[#B3B3B3] mb-6 sm:mb-8">
        {COPY.AUTH.SIGNUP_WELCOME}
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
        <PasswordField
          id="confirmPassword"
          label={COPY.AUTH.CONFIRM_PASSWORD_LABEL}
          placeholder={COPY.AUTH.CONFIRM_PASSWORD_LABEL}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />

        <CheckboxField
          id="privacyPolicy"
          label={
            <span>
              {COPY.AUTH.PRIVACY_POLICY_PREFIX}{" "}
              <Link
                href={ROUTES.PRIVACY_POLICY}
                className="text-[#28E88E] underline underline-offset-2 hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
            </span>
          }
          checked={privacyAccepted}
          onChange={(v) => {
            setPrivacyAccepted(v);
            if (v) setPrivacyError("");
          }}
          error={privacyError}
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
              Creating account…
            </span>
          ) : (
            COPY.AUTH.SIGNUP_CTA
          )}
        </PrimaryButton>
      </form>

      <p className="mt-6 sm:mt-8 text-center font-inter text-[13px] sm:text-[14px] text-[#B3B3B3]">
        {COPY.AUTH.HAVE_ACCOUNT}{" "}
        <Link href={ROUTES.LOGIN} className="text-[#28E88E] font-medium no-underline hover:underline">
          Log In
        </Link>
      </p>
    </AuthFormLayout>
  );
}
