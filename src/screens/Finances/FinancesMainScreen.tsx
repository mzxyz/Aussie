import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  ActionCell,
  Body,
  Button,
  LineSpacing,
  ScrollViewContainer,
  SectionHeader,
  Subtitle,
  Title,
} from 'components/index';
import { FinancesStackParamList } from 'navigation/types';
import { makeStyles } from 'theme/ThemeContext';

const dataSources = [
  { title: 'Fixed rate expiry', link: '' },
  { title: 'Borrowing power', link: '' },
  { title: 'Mortgage repayments', link: '' },
  { title: 'Stamp duty', link: '' },
  { title: 'Deposit calculator', link: '' },
  { title: 'Extra repayments', link: '' },
];

type Props = NativeStackScreenProps<FinancesStackParamList, 'FinancesMain'>;

export const FinancesMainScreen: React.FC<Props> = () => {
  const styles = useStyles();
  return (
    <ScrollViewContainer edge="vertical">
      <View style={styles.headerContainer}>
        <Title text="Track your home loan" />
        <Subtitle
          style={styles.text}
          text="Add a property to start tracking your home loan"
        />
        <Button
          text="Add home loan details"
          icon={{ name: 'add-outline' }}
          onPress={() => {}}
        />
      </View>
      <View style={styles.contentContainer}>
        <Button
          text="Add property"
          type="secondary"
          radius="full"
          icon={{ name: 'add-outline' }}
          onPress={() => {}}
        />
        <LineSpacing />
        <SectionHeader text="Calculators" />
        <Body text="Crunch my numbers" />
        {dataSources.map(dataSource => (
          <ActionCell
            key={dataSource.title}
            title={dataSource.title}
            onPress={() => {}}
          />
        ))}
      </View>
    </ScrollViewContainer>
  );
};

const useStyles = makeStyles(({ colors, padding, margin }) => ({
  headerContainer: {
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: padding.large,
    gap: margin.large,
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  contentContainer: {
    padding: padding.large,
    width: '100%',
  },
}));
