import { darkColors, lightColors } from './colors';
import { margin, padding, spacings } from './spacings';
import { fontSizes, fontWeights } from './typography';

const defaultTheme = {
  spacings,
  padding,
  margin,
  fontSizes,
  fontWeights,
};

export const lightTheme = {
  mode: 'light',
  colors: lightColors,
  ...defaultTheme,
};

export const darkTheme = {
  mode: 'dark',
  colors: darkColors,
  ...defaultTheme,
};
