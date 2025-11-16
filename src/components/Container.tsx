import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { makeStyles } from '../theme/ThemeContext';

type Edge = 'horizontal' | 'vertical' | 'both';

type ScrollViewContainerProps = PropsWithChildren<{
  edge?: Edge;
  testID?: string;
}>;

const useSafeBottomTabBarHeight = (): number => {
  try {
    return useBottomTabBarHeight();
  } catch {
    return 0;
  }
};

export const ScrollViewContainer: React.FC<ScrollViewContainerProps> = ({
  children,
  edge = 'both',
  testID,
}) => {
  const styles = useStyles({ edge });
  const tabBarHeight = useSafeBottomTabBarHeight();
  const bottomInset = tabBarHeight;

  return (
    <ScrollView
      testID={testID}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInset={{ bottom: bottomInset }}
      contentInsetAdjustmentBehavior="automatic"
    >
      {children}
    </ScrollView>
  );
};

const useStyles = makeStyles(({ colors, padding }, props?: { edge: Edge }) => ({
  container: {
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: ['horizontal', 'both'].includes(props?.edge ?? 'both')
      ? padding.large
      : 0,
    paddingVertical: ['vertical', 'both'].includes(props?.edge ?? 'both')
      ? padding.large
      : 0,
    backgroundColor: colors.background,
  },
}));
