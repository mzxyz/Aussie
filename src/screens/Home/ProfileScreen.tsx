import React from 'react';
import { useColorScheme, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  ActionCell,
  Header,
  ScrollViewContainer,
  SectionSpacing,
  SwitchCell,
  Title,
} from 'components/index';
import { HomeStackParamList } from 'navigation/types';
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

  const handleMatchSystemTheme = (value: boolean) => {
    setTheme(value && systemScheme === 'dark' ? darkTheme : lightTheme);
    toggleMatchSystemTheme();
  };

  return (
    <ScrollViewContainer testID="screen-Profile">
      <View style={styles.avatar}>
        <Header text="MZ" />
      </View>
      {datasource.map(item => (
        <ActionCell key={item.name} title={item.title} onPress={() => {}} />
      ))}
      <SectionSpacing size="md" />
      <View style={styles.settingsContainer}>
        <Title text="Appearence" />
        <SwitchCell
          title="Match system theme"
          initialValue={systemThemeEnabled}
          onValueChange={handleMatchSystemTheme}
        />
        <SwitchCell
          title="Haptics feddback"
          initialValue={hapticsEnabled}
          onValueChange={toggleHaptics}
          showBottomLine={false}
        />
        <SectionSpacing size="md" />
        <Title text="Privacy & security" />
        <SwitchCell
          title="Login with FaceID"
          initialValue={faceIdEnabled}
          onValueChange={toggleFaceId}
          showBottomLine={false}
        />
      </View>
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
    marginBottom: margin.xlarge,
  },
  settingsContainer: {
    width: '100%',
  },
}));
