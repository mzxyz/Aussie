import React from 'react';
import { Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Body, Button, Header, ScrollViewContainer } from 'components/index';
import { HomeStackParamList } from 'navigation/types';
import { makeStyles } from 'theme/ThemeContext';

import { AppointmentCell } from './components/AppointmentCell';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = () => {
  const styles = useStyles();

  return (
    <ScrollViewContainer testID="screen-Home">
      <Button
        type="secondary"
        text="Start your property search"
        icon={{ name: 'search' }}
        onPress={() => {}}
        opacityEnabled={false}
      />
      <AppointmentCell onPress={() => {}} />
      <Image source={require('../../assets/images/home.png')} style={styles.image} />
      <Header style={styles.text} text="Track the value of your biggest asset" />
      <Body
        style={styles.text}
        text="All the critical numbers to unlock opportunities you didn't know existed"
      />
      <Button text="Add property" icon={{ name: 'add-outline' }} onPress={() => {}} />
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ margin }) => ({
  text: {
    textAlign: 'center',
    marginBottom: margin.xlarge,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
}));
