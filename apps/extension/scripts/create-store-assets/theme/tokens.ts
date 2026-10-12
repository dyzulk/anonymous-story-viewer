/**
 * shadcn-compatible design tokens mapped directly from project theme
 */
export const themeTokens = {
  colors: {
    // Canvas & Core
    background: "#0d0b17",
    backgroundSubtle: "#120f20",
    foreground: "#f8fafc",

    // Card & Surfaces
    card: "#171427",
    cardHover: "#1e1a33",
    cardBorder: "rgba(255, 255, 255, 0.08)",
    cardBorderActive: "rgba(99, 102, 241, 0.3)",

    // Popover / Panels
    popover: "#151224",
    popoverForeground: "#f8fafc",

    // Primary & Accent (Indigo / Violet)
    primary: "#6366f1",
    primaryForeground: "#ffffff",
    primaryMuted: "rgba(99, 102, 241, 0.15)",

    // Secondary
    secondary: "#231e38",
    secondaryForeground: "#e2e8f0",

    // Muted & Text Hierarchy
    muted: "#1f1a33",
    mutedForeground: "#94a3b8",
    subtleForeground: "#64748b",

    // Status Colors
    success: "#10b981",
    successMuted: "rgba(16, 185, 129, 0.15)",
    successBorder: "rgba(16, 185, 129, 0.3)",

    destructive: "#ef4444",
    destructiveMuted: "rgba(239, 68, 68, 0.15)",
    destructiveBorder: "rgba(239, 68, 68, 0.3)",

    warning: "#f59e0b",
    warningMuted: "rgba(245, 158, 11, 0.15)",

    info: "#38bdf8",
    infoMuted: "rgba(56, 189, 248, 0.15)",

    // Brand Colors
    instagram: "#e1306c",
    instagramMuted: "rgba(225, 48, 108, 0.15)",
    facebook: "#1877f2",
    facebookMuted: "rgba(24, 119, 242, 0.15)",
    chrome: "#4285f4",
  },
  radii: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 9999,
  },
  typography: {
    fontFamily:
      "Inter Variable, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
} as const;

export type ThemeTokens = typeof themeTokens;
