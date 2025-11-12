import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyBrokerStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MyBrokerStackParamList, 'MyBrokerMain'>;

export const MyBrokerMainScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My broker</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'yellow',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
