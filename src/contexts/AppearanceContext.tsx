import { createContext, useContext, useEffect, useState } from "react";

export type Theme    = "Light" | "Dark" | "System";
export type Density  = "Compact" | "Default" | "Comfortable";
export type FontSize = "Small" | "Default" | "Large";

interface AppearanceContextValue {
  theme:       Theme;
  density:     Density;
  fontSize:    FontSize;
  setTheme:    (t: Theme)    => void;
  setDensity:  (d: Density)  => void;
  setFontSize: (f: FontSize) => void;
}

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

const ZOOM_MAP: Record<FontSize, string> = {
  Small:   "0.88",
  Default: "1",
  Large:   "1.13",
};

const DENSITY_MAP: Record<Density, string> = {
  Compact:     "0.7",
  Default:     "1",
  Comfortable: "1.35",
};

function resolvedTheme(t: Theme): "dark" | "light" {
  if (t === "System") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return t === "Dark" ? "dark" : "light";
}

function applyTheme(t: Theme) {
  const dark = resolvedTheme(t) === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

function applyFontSize(f: FontSize) {
  document.documentElement.style.zoom = ZOOM_MAP[f];
}

function applyDensity(d: Density) {
  document.documentElement.style.setProperty("--density-scale", DENSITY_MAP[d]);
}

function load<T>(key: string, fallback: T): T {
  try { return (localStorage.getItem(key) as T) ?? fallback; } catch { return fallback; }
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [theme,    setThemeState]    = useState<Theme>(   () => load("os-theme",    "Light"  ));
  const [density,  setDensityState]  = useState<Density>( () => load("os-density",  "Default"));
  const [fontSize, setFontSizeState] = useState<FontSize>(() => load("os-fontSize", "Default"));

  // Apply on first mount
  useEffect(() => {
    applyTheme(theme);
    applyFontSize(fontSize);
    applyDensity(density);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // System theme listener
  useEffect(() => {
    if (theme !== "System") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("System");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("os-theme", t);
    applyTheme(t);
  }

  function setDensity(d: Density) {
    setDensityState(d);
    localStorage.setItem("os-density", d);
    applyDensity(d);
  }

  function setFontSize(f: FontSize) {
    setFontSizeState(f);
    localStorage.setItem("os-fontSize", f);
    applyFontSize(f);
  }

  return (
    <AppearanceContext.Provider value={{ theme, density, fontSize, setTheme, setDensity, setFontSize }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be called inside <AppearanceProvider>");
  return ctx;
}
