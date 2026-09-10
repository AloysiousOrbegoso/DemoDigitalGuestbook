import { createContext, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import type { ThemeId } from "../types/guide";
import { themeCss, themes } from "./themes";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Inject the token sets once, before first paint.
if (typeof document !== "undefined" && !document.getElementById("guide-theme-tokens")) {
  const style = document.createElement("style");
  style.id = "guide-theme-tokens";
  style.textContent = themeCss();
  document.head.prepend(style);
}

export function ThemeProvider({ children, initial = "daytime" }: { children: ReactNode; initial?: ThemeId }) {
  const [theme, setTheme] = useState<ThemeId>(initial);

  // Swapping one attribute re-points every CSS variable; React doesn't re-render the tree.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    const bg = themes.find((t) => t.id === theme)?.tokens.bg;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg ?? "#F7F2EA");
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
