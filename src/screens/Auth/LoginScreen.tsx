import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  Body,
  Button,
  Header,
  ScrollViewContainer,
  SectionSpacing,
} from 'components/index';
import { Logo } from 'components/Logo';
import { SwitchCell } from 'components/SwitchCell';
import { biometricService } from 'services/biometricService';
import { useAuthStore } from 'stores/authStore';
import { usePreferenceStore } from 'stores/preferenceStore';
import { makeStyles } from 'theme/ThemeContext';

import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = () => {
  const styles = useStyles();
  const { login, isLoading } = useAuthStore();
  const { faceIdEnabled, setFaceIdEnabled } = usePreferenceStore();
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [isCheckingBiometric, setIsCheckingBiometric] = useState(true);

  useEffect(() => {
    biometricService.isAvailable().then(result => {
      setBiometricAvailable(result.available);
      setIsCheckingBiometric(false);
    });
  }, []);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      // TODO: report to analytics
      console.error('Login error:', error);
    }
  };

  const handleFaceIdToggle = (enabled: boolean) => {
    setFaceIdEnabled(enabled);
  };

  if (isCheckingBiometric) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollViewContainer testID="screen-Login" style={styles.container} edge="both">
      <Logo size={200} />
      <Header text="Welcome to Aussie" />
      <Body
        style={styles.text}
        text="Sign in to access your property portfolio and financial insights"
      />
      <SectionSpacing size="md" />
      <Button
        text="Sign In"
        type="primary"
        onPress={handleLogin}
        icon={{ name: 'log-in-outline' }}
        opacityEnabled={false}
        isLoading={isLoading}
      />
      {biometricAvailable && (
        <SwitchCell
          testID="switch-face-id"
          value={faceIdEnabled}
          title="Enable Face ID for quick access"
          onValueChange={handleFaceIdToggle}
          showBottomLine={false}
        />
      )}
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ colors, margin }) => ({
  container: {
    gap: margin.large,
  },
  text: {
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}));
