import React, { useCallback, useMemo } from 'react';
import { Animated, Pressable, Text } from 'react-native';
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  const scale = useMemo(() => new Animated.Value(1), []);

  const iconSize = icon?.size ?? fontSizes.title;
  const iconColor = isPrimary ? colors.textDark : colors.textHighlight;

  const animateTo = useCallback(
    (value: number) => {
      Animated.spring(scale, {
        toValue: value,
        useNativeDriver: true,
        speed: 20,
        bounciness: 6,
      }).start();
    },
    [scale],
  );

  return (
    <AnimatedPressable
      style={[styles.container, { transform: [{ scale }] }]}
      onPress={onPress}
      onPressIn={() => animateTo(0.9)}
      onPressOut={() => animateTo(1)}
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
