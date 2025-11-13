import { lightColors, darkColors } from './colors';
import { padding, margin, spacings } from './spacings';
import { fontWeights, fontSizes } from './typography';

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
