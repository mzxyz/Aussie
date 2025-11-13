import React, { createContext, useState, useContext } from "react";
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
    systemScheme === "dark" ? darkTheme : lightTheme
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

  return context;
};

export const makeStyles = <T extends StyleSheet.NamedStyles<T>>(
  styles: (theme: Theme) => T | StyleSheet.NamedStyles<T>
) => {
  return () => {
    const { theme } = useTheme();
    return StyleSheet.create(styles(theme) as StyleSheet.NamedStyles<T>);
  };
};
