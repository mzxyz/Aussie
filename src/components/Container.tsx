import { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

import { makeStyles } from 'theme/ThemeContext';

type Edge = 'horizontal' | 'vertical' | 'both';

type ScrollViewContainerProps = PropsWithChildren<{
  edge?: Edge;
}>;

export const ScrollViewContainer: React.FC<ScrollViewContainerProps> = ({
  children,
  edge = 'both',
}) => {
  const styles = useStyles({ edge });
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInset={{ bottom: 100 }}
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
