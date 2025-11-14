import { useColorScheme } from 'react-native';

import { usePreferenceStore } from '../stores';

export const useIsDarkMode = () => {
  const systemScheme = useColorScheme();
  const systemThemeEnabled = usePreferenceStore(state => state.systemThemeEnabled);

  return systemThemeEnabled ? systemScheme === 'dark' : false;
};
