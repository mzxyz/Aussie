import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons as Icon, IoniconsIconName } from '@react-native-vector-icons/ionicons';

import { makeStyles, useTheme } from 'theme/index';

type CustomHeaderProps = {
  title: string;
  rightIcon?: {
    name: IoniconsIconName;
    onPress: () => void;
  };
};

export const NavigationHeader: React.FC<CustomHeaderProps> = ({ title, rightIcon }) => {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon && (
        <TouchableOpacity onPress={rightIcon.onPress} style={styles.rightIcon}>
          <Icon name={rightIcon.name} size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const useStyles = makeStyles(({ colors, padding, margin, fontSizes, fontWeights }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.large,
    backgroundColor: colors.background,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: margin.large,
    resizeMode: 'contain',
  },
  title: {
    fontSize: fontSizes.subtitle,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  rightIcon: {
    padding: 4,
  },
}));
