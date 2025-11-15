import React from 'react';
import { Image, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Body, Button, Header, ScrollViewContainer } from 'components/index';
import { AppointmentStackParamList } from 'navigation/types';
import { makeStyles } from 'theme/ThemeContext';

type Props = NativeStackScreenProps<AppointmentStackParamList, 'Appointment'>;

export const AppointmentScreen: React.FC<Props> = () => {
  const styles = useStyles();
  return (
    <ScrollViewContainer testID="screen-Appointment">
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/calendar.png')}
          style={styles.image}
        />
        <Header style={styles.text} text="Connect with your broker" />
        <Body style={styles.text} text="Meet with Soula to discuss your property goals" />
        <Button text="Book an appointment with Soula" onPress={() => {}} />
      </View>
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ margin, padding }) => ({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: padding.large,
    gap: margin.large,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
  },
}));
