// button has 2 types
// first type is bgcolor with primary color and text color is textDark.
// second type is default background color and border withdth 1 and border color is primary, text is text primary
// the content includes icon at left and text at right. but all of them are centered in a row, it may have icon or not

import { TouchableOpacity, Text } from 'react-native';
import { Ionicons as Icon, IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { makeStyles, useTheme } from '../theme/ThemeContext';
import { fontSizes } from '../theme/typography';
import { margin, padding } from '../theme/spacings';

type ButtonProps = {
  text: string;
  type?: 'primary' | 'secondary';
  icon?: { name: IoniconsIconName; size?: number; color?: string };
  onPress: () => void;
};

// the border radius can be full round or small round.
export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  type = 'primary',
  onPress = () => {},
}) => {
  const isPrimary = type === 'primary';
  const styles = useStyles({ isPrimary });
  const theme = useTheme();

  const iconSize = icon?.size ?? theme.fontSizes.title;
  const iconColor = icon?.color ?? theme.colors.textHighlight;

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
  ({ colors, fontWeights }, props?: { isPrimary: boolean }) => ({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: padding.large,
      width: '100%',
      borderRadius: props?.isPrimary ? '100%' : 15,
      borderWidth: props?.isPrimary ? 0 : 1,
      borderColor: props?.isPrimary ? 'transparent' : colors.primary,
      backgroundColor: props?.isPrimary ? colors.primary : colors.background,
      gap: margin.small,
    },
    text: {
      fontSize: fontSizes.body,
      color: props?.isPrimary ? colors.textDark : colors.textPrimary,
      fontWeight: fontWeights.bold,
    },
  }),
);
