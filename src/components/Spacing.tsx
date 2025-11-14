import React from 'react';
import { View } from 'react-native';

import { makeStyles } from 'theme/index';

type SpacingSize = 'sm' | 'md' | 'lg';

type SpacingProps = {
  size?: SpacingSize;
};

export const SectionSpacing: React.FC<SpacingProps> = ({ size = 'md' }) => {
  const styles = useStyles({ size });
  return <View style={styles.section} />;
};

export const LineSpacing: React.FC<SpacingProps> = ({ size = 'md' }) => {
  const styles = useStyles({ size });
  return <View style={styles.line} />;
};

const spacingSizes = {
  sm: 24,
  md: 32,
  lg: 48,
};

const useStyles = makeStyles(({ colors, margin }, props?: { size: SpacingSize }) => ({
  section: {
    height: spacingSizes[props?.size ?? 'md'],
    width: '100%',
    backgroundColor: 'transparent',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.line,
    marginVertical: margin.xlarge,
  },
}));
