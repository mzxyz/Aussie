import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation';
import { makeStyles, ThemeProvider } from './src/theme/ThemeContext';

function AppContainer() {
  // TODO: enable it later
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;
  const styles = useStyles();

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </SafeAreaView>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
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
