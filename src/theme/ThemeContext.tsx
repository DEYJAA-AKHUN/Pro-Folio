import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import { defaultTheme, getTheme, type ThemeColors, type ThemeName } from "./themes";

type ThemeContextValue = {
  themeName: ThemeName;
  colors: ThemeColors;
  setTheme: (name: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const theme = useMemo(() => getTheme(themeName), [themeName]);
  const value = useMemo(() => ({ themeName, colors: theme.colors, setTheme: setThemeName }), [themeName, theme.colors]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
