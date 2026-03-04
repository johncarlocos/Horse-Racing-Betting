/**
 * Application routes – single source of truth for URLs
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MATCHES: "/matches",
} as const;

/**
 * Copy used across auth and marketing
 */
export const COPY = {
  BRAND: {
    NAME: "Go Racing",
    TITLE: "Paddock Horse Racing",
    TAGLINE:
      "Digital Paddock transforms traditional race analysis into a real-time AI-powered experience.",
  },
  HERO: {
    DESCRIPTION:
      "Turn complex race data into clear, confident decisions with real-time AI insights built for modern bettors.",
  },
  AUTH: {
    SIGNUP_TITLE: "Sign Up",
    SIGNUP_WELCOME: "Welcome to Paddock Horse Racing, your AI powered racing modules",
    LOGIN_TITLE: "Log In",
    LOGIN_WELCOME: "Welcome back to Paddock Horse Racing, your AI powered racing modules",
    EMAIL_LABEL: "Email Address",
    PASSWORD_LABEL: "Password",
    CONFIRM_PASSWORD_LABEL: "Confirm Password",
    SIGNUP_CTA: "Sign Up",
    LOGIN_CTA: "Log In",
    HAVE_ACCOUNT: "Already have an account?",
    NO_ACCOUNT: "Don't have an account?",
  },
} as const;
