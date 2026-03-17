import type { TranslationKeys } from "./zh-TW";

export const en: TranslationKeys = {
  // Header
  header: {
    manage: "Manage",
    logout: "Log Out",
  },

  // Hero / Landing
  hero: {
    title: "Paddock Horse Racing",
    description: "Turn complex race data into clear, confident decisions with real-time AI insights built for modern bettors.",
    viewMatches: "View Live Matches",
    login: "Log In",
    liveRacesToday: "LIVE RACES TODAY",
    modelAccuracy: "MODEL PREDICTION ACCURACY",
  },

  // Feature cards
  features: {
    aiIntelligence: "AI Racing Intelligence",
    aiIntelligenceDesc: "Leverage advanced AI to analyze race data and provide accurate predictions.",
    smartRacecard: "The Smart Race Card",
    smartRacecardDesc: "Comprehensive race information display for quick decision making.",
    liveOdds: "Live Odds Tracker",
    liveOddsDesc: "Track odds movements in real-time to capture the best value.",
    insights: "Deep Insights",
    insightsDesc: "Multi-angle deep analysis of every race for an edge.",
  },

  // Matches page
  matches: {
    liveOddsMatrix: "Live Odds Matrix",
    horse: "Horse",
    odds: "Odds",
    trend: "Trend",
    aiPct: "AI%",
    speed: "Speed",
    ev: "EV",
    action: "Action",
    clickHere: "Click Here",
    selectRace: "Select a race to view odds",
    match: "Match",
    frontRunnerBias: "Front-runner bias",
    detected: "Detected",
    class: "Class",
    track: "Track",
    duration: "Duration",
    winRate: "Win Rate",
    viewDetails: "View Details",
    races: "races",
    noMeeting: "No meeting found for this date and venue.",
    loadingRaces: "Loading races…",
  },

  // Race analysis page
  races: {
    back: "Back",
    smartRacecard: "Smart Racecard",
    winPercentage: "Win Percentage",
    goldHighlight: "Gold Highlight",
    rank: "Rank",
    jockey: "Jockey",
    trainer: "Trainer",
    turf: "Turf",
    winPct: "Win %",
    betStatus: "Bet Status",
    closed: "Closed",
    accepting: "Accepting",
    pedigreeAnalysis: "Pedigree Analysis",
    aiWinProbability: "AI Win Probability",
    winChance: "Win Chance",
    marketActivity: "Market Activity",
    oddsDropping: "Odds Dropping",
    oddsDrifting: "Odds Drifting",
    stable: "Stable",
    upcoming: "UPCOMING",
    live: "LIVE",
    finished: "FINISHED",
    aiAnalyzing: "AI is analyzing this race…",
    retry: "Retry",
    missingContext: "Missing race context. Go back to matches.",
    raceNotFound: "Race not found",
    failedToLoad: "Failed to load race data.",
    failedAi: "Failed to connect to AI service.",
  },

  // Auth
  auth: {
    loginTitle: "Log In",
    loginWelcome: "Welcome back to Paddock Horse Racing, your AI powered racing modules",
    signupTitle: "Create Account",
    signupWelcome: "Join our AI-powered horse racing analytics platform",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    loginCta: "Log In",
    signupCta: "Sign Up",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    privacyPrefix: "I agree to the",
    privacyPolicy: "Privacy Policy",
    loggingIn: "Logging in…",
    creatingAccount: "Creating account…",
    signUp: "Sign Up",
    logIn: "Log In",
  },

  // Validation
  validation: {
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    passwordRequired: "Password is required.",
    passwordMin: "Password must be at least 8 characters.",
    passwordUppercase: "Password must include an uppercase letter.",
    passwordNumber: "Password must include a number.",
    confirmRequired: "Please confirm your password.",
    confirmMismatch: "Passwords do not match.",
    privacyRequired: "You must accept the privacy policy to continue.",
  },

  // Admin / Subadmin
  admin: {
    dashboard: "Admin Dashboard",
    createUser: "Create User",
    allUsers: "All Users",
    role: "Role",
    status: "Status",
    active: "Active",
    disabled: "Disabled",
    creating: "Creating…",
    noUsers: "No users yet.",
  },
  subadmin: {
    dashboard: "Subadmin Dashboard",
    addMember: "Add Member",
    members: "Members",
    noMembers: "No members yet.",
  },
} as const;
