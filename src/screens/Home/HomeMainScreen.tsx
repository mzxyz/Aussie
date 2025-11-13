import React from 'react';
import { Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Body, Button, Header } from 'components/index';
import { HomeStackParamList } from 'navigation/types';
import { makeStyles } from 'theme/ThemeContext';

import { AppointmentCell } from './components/AppointmentCell';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export const HomeMainScreen: React.FC<Props> = () => {
  const styles = useStyles();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      contentInset={{ bottom: 60 }}
    >
      <Button
        type="secondary"
        text="Start your property search"
        icon={{ name: 'search' }}
        onPress={() => {}}
      />
      <AppointmentCell onPress={() => {}} />
      <Image source={require('../../assets/images/home.png')} style={styles.image} />
      <Header style={styles.text} text="Track the value of your biggest asset" />
      <Body
        style={styles.text}
        text="All the critical numbers to unlock opportunities you didn't know existed"
      />
      <Button text="Add property" icon={{ name: 'add-outline' }} onPress={() => {}} />
    </ScrollView>
  );
};

const useStyles = makeStyles(({ colors, padding, margin }) => ({
  scrollView: {
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: padding.large,
    backgroundColor: colors.background,
  },
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
