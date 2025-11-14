import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useIsDarkMode } from 'hooks/preferenceHooks';

import { AppNavigator } from './src/navigation';
import { makeStyles, ThemeProvider } from './src/theme/ThemeContext';

import './src/utils/localStorage';

function AppContainer() {
  const isDarkMode = useIsDarkMode();
  const styles = useStyles();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
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
}));

export default App;
