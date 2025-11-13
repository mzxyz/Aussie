import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { makeStyles } from '../../theme';
import { Button } from '../../components';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export const HomeMainScreen: React.FC<Props> = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Button
        type="secondary"
        text="Start your property search"
        icon={{ name: 'search' }}
        onPress={() => {}}
      />
    </View>
  );
};

const useStyles = makeStyles(({ colors, padding }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: padding.large,
    backgroundColor: colors.background,
  },
}));
