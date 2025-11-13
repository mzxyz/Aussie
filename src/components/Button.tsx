import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons as Icon, IoniconsIconName } from '@react-native-vector-icons/ionicons';

import { padding } from 'theme/spacings';
import { makeStyles, useTheme } from 'theme/ThemeContext';

type ButtonProps = {
  text: string;
  type?: 'primary' | 'secondary';
  radius?: 'full' | 'small';
  icon?: { name: IoniconsIconName; size?: number; color?: string };
  onPress: () => void;
};

// the border radius can be full round or small round.
export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  type = 'primary',
  radius = 'small',
  onPress = () => {},
}) => {
  const isPrimary = type === 'primary';
  const styles = useStyles({ isPrimary, radius });
  const { colors, fontSizes } = useTheme();

  const iconSize = icon?.size ?? fontSizes.title;
  const iconColor = isPrimary ? colors.textDark : colors.textHighlight;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <Icon name={icon.name} size={iconSize} color={iconColor} />}
      <Text style={styles.text} numberOfLines={1}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(
  ({ colors, fontWeights, spacings, fontSizes }, props?: { isPrimary: boolean, radius: 'full' | 'small' }) => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: padding.large,
      width: '100%',
      borderRadius: props?.isPrimary || props?.radius === 'full' ? 40 : 15,
      borderWidth: props?.isPrimary ? 0 : 1,
      borderColor: props?.isPrimary ? 'transparent' : colors.primary,
      backgroundColor: props?.isPrimary ? colors.primary : colors.background,
      gap: spacings.sm,
    },
    text: {
      fontSize: fontSizes.body,
      color: props?.isPrimary ? colors.textDark : colors.textPrimary,
      fontWeight: props?.isPrimary ? fontWeights.medium : fontWeights.bold,
    },
  }),
);
