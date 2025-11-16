import React, { useEffect, useMemo, useState } from 'react';
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
  const { checkAuth, isLoading, hasTokens } = useAuthStore();
  const { faceIdEnabled } = usePreferenceStore();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const _isLoading = useMemo(
    () => isAuthenticating || isLoading,
    [isAuthenticating, isLoading],
  );

  useEffect(() => {
    if (!hasTokens) {
      navigation.replace('Login');
      return;
    }

    if (faceIdEnabled) {
      handleBiometricAuth();
    } else {
      navigation.replace('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faceIdEnabled, hasTokens]);

  const handleBiometricAuth = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      const result = await biometricService.authenticate(
        'Authenticate to access your account',
      );

      if (result.success) {
        await checkAuth(true);
      } else {
        setError(result.error || 'Authentication cancelled');
        setTimeout(() => navigation.replace('Login'), 1500);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
      navigation.replace('Login');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleUsePassword = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollViewContainer
      style={styles.container}
      testID="screen-BiometricAuth"
      edge="both"
    >
      <SectionSpacing size="lg" />
      <Logo size={150} />
      <Header text="Welcome Back" />
      <Body text="Use Face ID to quickly access your account" />
      <SectionSpacing size="lg" />
      <Button
        text="Use Face ID"
        type="primary"
        onPress={handleBiometricAuth}
        icon={{ name: 'finger-print-outline' }}
        isLoading={_isLoading}
      />
      <Button
        text="Use Password"
        type="secondary"
        onPress={handleUsePassword}
        radius="full"
        icon={{ name: 'key-outline' }}
        disabled={_isLoading}
      />
      {error && <Body text={error} style={styles.errorText} />}
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ colors, fontSizes, margin }) => ({
  container: {
    gap: margin.large,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    fontSize: fontSizes.small,
    marginTop: margin.small,
  },
}));
