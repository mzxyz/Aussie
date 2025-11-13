import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons as Icon, IoniconsIconName } from '@react-native-vector-icons/ionicons';
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';
import { NavigationHelpers } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';

import { makeStyles, useTheme } from 'theme/ThemeContext';

type TabIconProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  name: string;
  focused: boolean;
};

// Ionicons: https://ionic.io/ionicons
const iconMap: Record<string, string> = {
  Home: 'home',
  Finances: 'stats-chart',
  Properties: 'storefront',
  Appointment: 'calendar',
  'My broker': 'people',
};

const TabItem: React.FC<TabIconProps> = ({ name, focused, navigation }) => {
  const styles = useStyles({ isFocused: focused });
  const theme = useTheme();

  const iconName = `${iconMap[name]}${!focused ? '-outline' : ''}`;

  return (
    <TouchableOpacity
      key={name}
      onPress={() => navigation.navigate(name)}
      style={styles.tab}
    >
      <View style={styles.highlightLine} />
      <Icon name={iconName as IoniconsIconName} size={22} color={theme.colors.primary} />
      <Text style={styles.label} numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          name={route.name}
          focused={state.index === index}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

const useStyles = makeStyles(
  ({ colors, margin, fontSizes, fontWeights }, props?: { isFocused: boolean }) => ({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: colors.backgroundSecondary,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: margin.small,
    },
    highlightLine: {
      width: '100%',
      height: 3,
      backgroundColor: props?.isFocused ? colors.primary : 'transparent',
      marginBottom: margin.medium,
      marginTop: 0,
    },
    iconContainer: {
      marginBottom: margin.small,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      fontSize: fontSizes.body,
    },
    label: {
      fontSize: fontSizes.xxsmall,
      color: props?.isFocused ? colors.textHighlight : colors.textPrimary,
      fontWeight: fontWeights.bold,
    },
  }),
);
