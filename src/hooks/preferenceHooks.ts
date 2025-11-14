import { useColorScheme } from 'react-native';

import { usePreferenceStore } from '../store';

export const useIsDarkMode = () => {
  const systemScheme = useColorScheme();
  const systemThemeEnabled = usePreferenceStore(state => state.systemThemeEnabled);

  // If system theme is enabled, use system preference, otherwise default to dark
  if (systemThemeEnabled) {
    return systemScheme === 'dark';
  }
  // Default to dark mode when system theme is disabled
  return true;
};
