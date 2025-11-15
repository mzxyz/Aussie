import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons as Icon, IoniconsIconName } from '@react-native-vector-icons/ionicons';

import { padding } from 'theme/spacings';
import { makeStyles, useTheme } from 'theme/ThemeContext';

type ButtonProps = {
  text: string;
  type?: 'primary' | 'secondary';
  radius?: 'full' | 'small';
  icon?: { name: IoniconsIconName; size?: number; color?: string };
  scaleEnabled?: boolean;
  opacityEnabled?: boolean;
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  type = 'primary',
  radius = 'small',
  scaleEnabled = true,
  opacityEnabled = true,
  onPress = () => {},
}) => {
  const isPrimary = type === 'primary';
  const styles = useStyles({ isPrimary, radius });
  const { colors, fontSizes } = useTheme();
  const isPressed = useSharedValue(0);

  const animationValues = {
    scale: scaleEnabled ? 0.9 : 1,
    opacity: opacityEnabled ? 0.7 : 1,
  };

  const iconSize = icon?.size ?? fontSizes.title;
  const iconColor = isPrimary ? colors.textDark : colors.textHighlight;

  const animatedStyle = useAnimatedStyle(() => {
    const timingConfig = { duration: 120, easing: Easing.linear };
    const targetScale = isPressed.value ? animationValues.scale : 1;
    const targetOpacity = isPressed.value ? animationValues.opacity : 1;

    return {
      transform: [{ scale: withTiming(targetScale, timingConfig) }],
      opacity: isPrimary ? withTiming(targetOpacity, timingConfig) : 1,
    };
  }, [isPrimary, animationValues.scale, animationValues.opacity]);

  return (
    <AnimatedPressable
      testID={`button-${text.replace(/\s+/g, '-').toLowerCase()}`}
      style={[styles.container, animatedStyle]}
      onPress={onPress}
      onPressIn={() => (isPressed.value = 1)}
      onPressOut={() => (isPressed.value = 0)}
    >
      {icon && <Icon name={icon.name} size={iconSize} color={iconColor} />}
      <Text style={styles.text} numberOfLines={1}>
        {text}
      </Text>
    </AnimatedPressable>
  );
};

const useStyles = makeStyles(
  (
    { colors, fontWeights, spacings, fontSizes },
    props?: { isPrimary: boolean; radius: 'full' | 'small' },
  ) => ({
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
