import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { FontAwesome6 as Icon, FontAwesome6SolidIconName } from "@react-native-vector-icons/fontawesome6";

interface TabIconProps {
  name: string;
  focused: boolean;
}

const iconMap: Record<string, string> = {
  Home: 'house',
  Finances: 'money-bill',
  Properties: 'building',
  Appointment: 'calendar',
  'My broker': 'user',
};

const TabIcon: React.FC<TabIconProps> = ({ name, focused }) => {
  const iconName = iconMap[name];
  return <Text style={styles.iconText}>
    <Icon name={iconName as FontAwesome6SolidIconName} size={24} color="black" iconStyle={ "solid" } />
  </Text>;
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
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
            <View style={styles.iconContainer}>
              <TabIcon name={route.name} focused={isFocused} />
            </View>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightLine: {
    width: '100%',
    height: 3,
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginTop: 0,
  },
  highlightLineActive: {
    backgroundColor: '#007AFF',
  },
  iconContainer: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 24,
  },
  iconText: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '400',
  },
  labelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
