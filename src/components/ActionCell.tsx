import { Text, TouchableOpacity } from 'react-native';
import { Ionicons as Icon } from '@react-native-vector-icons/ionicons';

import { makeStyles, useTheme } from 'theme/ThemeContext';

type ActionCellProps = {
  title: string;
  onPress: () => void;
};

export const ActionCell: React.FC<ActionCellProps> = ({ title, onPress }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <Icon name="chevron-forward-outline" size={18} color={colors.textPrimary} />
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(({ colors, margin, fontSizes, fontWeights }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingVertical: margin.xlarge,
  },
  text: {
    fontSize: fontSizes.body,
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
}));
