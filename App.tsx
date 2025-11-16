import React, { useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useIsDarkMode } from 'hooks/preferenceHooks';

import { AppNavigator } from './src/navigation';
import { useAuthStore } from './src/stores/authStore';
import { makeStyles, ThemeProvider } from './src/theme/ThemeContext';

import './src/utils/localStorage';

function AppContainer() {
  const { checkAuth, isLoading } = useAuthStore();
  const isDarkMode = useIsDarkMode();
  const styles = useStyles();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <AppNavigator />
      )}
    </SafeAreaView>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
}));

export default App;
