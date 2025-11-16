import React from 'react';
import { Alert, Image, useColorScheme, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  ActionCell,
  Button,
  ScrollViewContainer,
  SectionSpacing,
  SwitchCell,
  Title,
} from 'components/index';
import { HomeStackParamList } from 'navigation/types';
import { biometricService } from 'services/biometricService';
import { useAuthStore } from 'stores/authStore';
import { usePreferenceStore } from 'stores/preferenceStore';
import { darkTheme, lightTheme } from 'theme/theme';
import { makeStyles, useThemeContext } from 'theme/ThemeContext';

const datasource = [
  { title: 'Personal details', name: 'PersonalDetailsScreen' },
  { title: 'Connected accounts', name: 'ConnectedAccountsScreen' },
  { title: 'Referrals', name: 'ReferralsScreen' },
];

type Props = NativeStackScreenProps<HomeStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<Props> = () => {
  const {
    systemThemeEnabled,
    hapticsEnabled,
    faceIdEnabled,
    toggleFaceId,
    toggleHaptics,
    toggleMatchSystemTheme,
  } = usePreferenceStore();

  const { setTheme } = useThemeContext();
  const systemScheme = useColorScheme();
  const styles = useStyles();

  const { user, logout, isLoading } = useAuthStore();

  const onToggleFaceId = async () => {
    const result = await biometricService.authenticate('Authenticate to continue');
    if (result.success) {
      toggleFaceId();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleMatchSystemTheme = (value: boolean) => {
    setTheme(value && systemScheme === 'dark' ? darkTheme : lightTheme);
    toggleMatchSystemTheme();
  };

  return (
    <ScrollViewContainer testID="screen-Profile">
      <View style={styles.avatar}>
        <Image source={{ uri: user?.picture }} style={styles.avatarImage} />
      </View>
      <Title text={user?.name || ''} />
      <SectionSpacing size="md" />
      {datasource.map(item => (
        <ActionCell key={item.name} title={item.title} onPress={() => {}} />
      ))}
      <SectionSpacing size="md" />
      <View style={styles.settingsContainer}>
        <Title text="Appearence" />
        <SwitchCell
          title="Match system theme"
          value={systemThemeEnabled}
          onValueChange={handleMatchSystemTheme}
        />
        <SwitchCell
          title="Haptics feddback"
          value={hapticsEnabled}
          onValueChange={toggleHaptics}
          showBottomLine={false}
        />
        <SectionSpacing size="md" />
        <Title text="Privacy & security" />
        <SwitchCell
          title="Login with FaceID"
          value={faceIdEnabled}
          onValueChange={onToggleFaceId}
          showBottomLine={false}
        />
      </View>
      <SectionSpacing size="lg" />
      <Button text="Logout" onPress={logout} isLoading={isLoading} />
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ colors, margin }) => ({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 40,
    width: 80,
    height: 80,
    marginBottom: margin.medium,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  settingsContainer: {
    width: '100%',
  },
}));
