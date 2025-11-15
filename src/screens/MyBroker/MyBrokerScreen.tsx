import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header, ScrollViewContainer } from 'components/index';
import { MyBrokerStackParamList } from 'navigation/types';
import { makeStyles } from 'theme/ThemeContext';

type Props = NativeStackScreenProps<MyBrokerStackParamList, 'MyBroker'>;

export const MyBrokerScreen: React.FC<Props> = () => {
  const styles = useStyles();
  return (
    <ScrollViewContainer>
      <View style={styles.container}>
        <Header style={styles.text} text="Coming soon!" />
      </View>
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.textHighlight,
  },
}));
