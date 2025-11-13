import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Ionicons as Icon, IoniconsIconName } from "@react-native-vector-icons/ionicons";
import { makeStyles } from '../theme/ThemeContext';
import { fontWeights } from 'src/theme/typography';

type TabIconProps = {
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

const TabIcon: React.FC<TabIconProps> = ({ name, focused }) => {
  const styles = useStyles();

  const iconName = `${iconMap[name]}${!focused ? '-outline' : ''}`;
  return <Text style={styles.iconText}>
    <Icon name={iconName as IoniconsIconName} size={24} color="#2e5196" />
  </Text>;
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={label}
            onPress={onPress}
            style={styles.tab}
          >
            <View
              style={[styles.highlightLine, isFocused && styles.highlightLineActive]}
            />
            <TabIcon name={route.name} focused={isFocused} />
            <Text
              style={[styles.label, isFocused && styles.labelActive]}
              numberOfLines={1}
            >
              {typeof label === 'string' ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const useStyles = makeStyles(({ colors, margin, spacings, fontSizes, fontWeights }) => ({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacings.xs,
  },
  highlightLine: {
    width: '100%',
    height: 3,
    backgroundColor: 'transparent',
    marginBottom: margin.medium,
    marginTop: 0,
  },
  highlightLineActive: {
    backgroundColor: colors.primary,
  },
  iconContainer: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: fontSizes.title,
  },
  label: {
    fontSize: 12,
    color: colors.secondary,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: fontWeights.bold,
  },
}));
