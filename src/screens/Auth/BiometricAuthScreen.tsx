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
import { biometricService } from 'services/biometricService';
import { useAuthStore } from 'stores/authStore';
import { usePreferenceStore } from 'stores/preferenceStore';
import { makeStyles } from 'theme/ThemeContext';

import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'BiometricAuth'>;

export const BiometricAuthScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyles();
  const { checkAuth, isLoading } = useAuthStore();
  const { faceIdEnabled } = usePreferenceStore();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Automatically trigger biometric authentication on mount
    if (faceIdEnabled) {
      handleBiometricAuth();
    } else {
      // If FaceID is not enabled, redirect to login
      navigation.replace('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faceIdEnabled]);

  const handleBiometricAuth = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      const result = await biometricService.authenticate(
        'Authenticate to access your account',
      );

      if (result.success) {
        // Biometric auth successful, restore session
        await checkAuth();
        // Navigation will be handled by AppNavigator based on auth state
      } else {
        // User cancelled or failed
        setError(result.error || 'Authentication cancelled');
        // Navigate to login after a short delay
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      navigation.replace('Login');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollViewContainer testID="screen-BiometricAuth" edge="both">
      <SectionSpacing size="lg" />
      <Logo size={80} />
      <SectionSpacing size="lg" />
      <Header text="Welcome Back" />
      <SectionSpacing size="md" />
      <Body text="Use Face ID to quickly access your account" />
      <SectionSpacing size="lg" />
      {isAuthenticating || isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <SectionSpacing size="md" />
          <Body text="Authenticating..." />
        </View>
      ) : (
        <>
          {error && <Body text={error} style={styles.errorText} />}
          <SectionSpacing size="md" />
          <Button
            text="Use Face ID"
            type="primary"
            onPress={handleBiometricAuth}
            icon={{ name: 'finger-print-outline' }}
          />
          <SectionSpacing size="sm" />
          <Button
            text="Use Password Instead"
            type="secondary"
            onPress={handleSkip}
            icon={{ name: 'key-outline' }}
          />
        </>
      )}
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ colors, fontSizes }) => ({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    fontSize: fontSizes.small,
  },
}));
