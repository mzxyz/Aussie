import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '../theme';

type SpacingSize = 'sm' | 'md' | 'lg';

type SpacingProps = {
  size?: SpacingSize;
};

export const Spacing: React.FC<SpacingProps> = ({ size = 'md' }) => {
  const styles = useStyles({ size });
  return <View style={styles.container} />;
}

const spacingSizes = {
  sm: 24,
  md: 32,
  lg: 48,
};

const useStyles = makeStyles(
  (_, props?: { size: SpacingSize }) => ({
    container: {
      height: spacingSizes[props?.size ?? 'md'],
      width: '100%',
      backgroundColor: 'blue',
    },
  })
);