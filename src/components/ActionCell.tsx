import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Ionicons as Icon } from '@react-native-vector-icons/ionicons';

import { makeStyles, useTheme } from 'theme/ThemeContext';

type ActionCellProps = {
  title: string;
  onPress: () => void;
  testID?: string;
};

export const ActionCell: React.FC<ActionCellProps> = ({ title, onPress, testID }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <TouchableOpacity
      testID={testID ?? 'action-cell'}
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
      <Icon name="chevron-forward-outline" size={18} color={colors.textPrimary} />
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(({ colors, margin, fontSizes, fontWeights }) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingVertical: margin.large + margin.small,
  },
  text: {
    fontSize: fontSizes.small,
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
}));
