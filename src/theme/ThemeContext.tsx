import React, { createContext, useContext, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useIsDarkMode } from 'hooks/preferenceHooks';

import { darkTheme, lightTheme } from './theme';

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useIsDarkMode();

  const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context.theme;
};

export const makeStyles = <T extends StyleSheet.NamedStyles<any>, P>(
  stylesFn: (theme: Theme, props?: P) => T,
) => {
  return (props?: P): T => {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(stylesFn(theme, props)), [theme, props]) as T;
  };
};
