import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppointmentStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AppointmentStackParamList, 'AppointmentMain'>;

export const AppointmentMainScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
