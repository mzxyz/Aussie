import { Image, ImageStyle, StyleProp } from 'react-native';

import { useIsDarkMode } from 'hooks/preferenceHooks';
import { makeStyles } from 'theme/index';

type LogoProps = {
  size?: number;
  style?: StyleProp<ImageStyle>;
};

export const Logo: React.FC<LogoProps> = ({ size = 40, style }) => {
  const isDarkMode = useIsDarkMode();
  const logoStyles = useStyles({ size });

  const darkImg = require('../assets/images/logo-dark.png');
  const lightImg = require('../assets/images/logo-light.png');
  return (
    <Image source={isDarkMode ? lightImg : darkImg} style={[logoStyles.logo, style]} />
  );
};

const useStyles = makeStyles((_, props?: { size: number }) => ({
  logo: {
    width: props?.size,
    height: props?.size,
  },
}));
