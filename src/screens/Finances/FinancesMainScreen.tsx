import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FinancesStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<FinancesStackParamList, 'FinancesMain'>;

export const FinancesMainScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finances</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'green',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
