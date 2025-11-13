import React, { createContext, useState, useContext, useMemo } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import { lightTheme, darkTheme } from "./theme";

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();

  const [theme, setTheme] = useState(
    darkTheme
    // TODO: enable it later
    // systemScheme === "dark" ? darkTheme : lightTheme
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context.theme;
};

export const makeStyles = <T extends StyleSheet.NamedStyles<any>, P>(
  stylesFn: (theme: Theme, props?: P) => T
) => {
  return (props?: P): T => {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(stylesFn(theme, props)), [theme]) as T;
  };
};
