import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons as Icon } from '@react-native-vector-icons/ionicons';

import { makeStyles, useTheme } from 'theme/index';

type AppointmentCellProps = {
  onPress: () => void;
};

export function AppointmentCell({ onPress }: AppointmentCellProps) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/appointment.png')}
          />
          <Text style={styles.text} numberOfLines={3}>
            Book an appointment today.
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="chevron-forward-outline" size={18} color={colors.textPrimary} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const useStyles = makeStyles(({ colors, padding, margin, fontSizes, fontWeights }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.highlight,
    borderRadius: 26,
    paddingVertical: padding.small,
    paddingHorizontal: padding.medium,
    marginTop: margin.medium,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontSize: fontSizes.subtitle,
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    width: '40%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    width: 34,
    height: 34,
  },
}));
