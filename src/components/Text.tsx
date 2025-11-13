import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

import { makeStyles } from 'theme/index';

type TextProps = {
  text: string;
  style?: StyleProp<TextStyle>;
};

export const Header: React.FC<TextProps> = ({ text, style }) => {
  const styles = useStyles();
  return <Text style={[styles.header, style]}>{text}</Text>;
};

export const SectionHeader: React.FC<TextProps> = ({ text, style }) => {
  const styles = useStyles();
  return <Text style={[styles.sectionHeader, style]}>{text}</Text>;
};

export const Title: React.FC<TextProps> = ({ text, style }) => {
  const styles = useStyles();
  return <Text style={[styles.title, style]}>{text}</Text>;
};

export const Subtitle: React.FC<TextProps> = ({ text, style }) => {
  const styles = useStyles();
  return <Text style={[styles.subtitle, style]}>{text}</Text>;
};

export const Body: React.FC<TextProps> = ({ text, style }) => {
  const styles = useStyles();
  return <Text style={[styles.body, style]}>{text}</Text>;
};

const useStyles = makeStyles(({ colors, fontSizes, fontWeights }) => ({
  header: {
    fontSize: fontSizes.h1,
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  sectionHeader: {
    fontSize: fontSizes.header,
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  title: {
    fontSize: fontSizes.title,
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  subtitle: {
    fontSize: fontSizes.small,
    color: colors.textSecondary,
  },
  body: {
    fontSize: fontSizes.body,
    color: colors.textSecondary,
    lineHeight: fontSizes.body * 1.5,
  },
}));
