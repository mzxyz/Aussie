import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons as Icon, IoniconsIconName } from '@react-native-vector-icons/ionicons';

import { Logo } from 'components/Logo';
import { makeStyles, useTheme } from 'theme/index';

type CustomHeaderProps = {
  title: string;
  rightIcon?: {
    name: string;
    onPress: () => void;
  };
};

export const NavigationHeader: React.FC<CustomHeaderProps> = ({ title, rightIcon }) => {
  const styles = useStyles();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Logo style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon && (
        <TouchableOpacity
          testID={`header-icon-${rightIcon.name}`}
          onPress={rightIcon.onPress}
          style={styles.rightIcon}
        >
          <Icon
            name={rightIcon.name as IoniconsIconName}
            color={colors.textPrimary}
            size={24}
          />
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
    fontSize: fontSizes.subheader,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  rightIcon: {
    padding: 4,
  },
}));
