import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

import { makeStyles, useTheme } from 'theme/ThemeContext';

type ActionCellProps = {
  title: string;
  initialValue: boolean;
  onValueChange: (value: boolean) => void;
  showBottomLine?: boolean;
  testID?: string;
};

export const SwitchCell: React.FC<ActionCellProps> = ({
  title,
  initialValue,
  onValueChange,
  showBottomLine = true,
  testID,
}) => {
  const { colors } = useTheme();
  const styles = useStyles({ showBottomLine });

  const [value, setValue] = useState(initialValue);

  const handleValueChange = (value: boolean) => {
    setValue(value);
    onValueChange(value);
  };

  return (
    <View testID={testID ?? 'action-cell'} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Switch
        style={styles.scaledSwitch}
        value={value}
        onValueChange={handleValueChange}
        trackColor={{ true: colors.primary, false: colors.line }}
      />
    </View>
  );
};

const useStyles = makeStyles(
  ({ colors, margin, fontSizes, fontWeights }, props?: { showBottomLine: boolean }) => ({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: props?.showBottomLine ? 1 : 0,
      borderBottomColor: colors.line,
      paddingVertical: margin.large + margin.small,
    },
    text: {
      fontSize: fontSizes.small,
      color: colors.textPrimary,
      fontWeight: fontWeights.bold,
    },
    scaledSwitch: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
  }),
);
