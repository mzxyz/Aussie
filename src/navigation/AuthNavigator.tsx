import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BiometricAuthScreen } from 'screens/Auth/BiometricAuthScreen';
import { LoginScreen } from 'screens/Auth/LoginScreen';
import { useTheme } from 'theme/ThemeContext';

import { AuthStackParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  initialRouteName?: keyof AuthStackParamList;
};

export const AuthNavigator: React.FC<AuthNavigatorProps> = ({
  initialRouteName = 'Login',
}) => {
  const { colors } = useTheme();
  const screenOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: colors.background,
    },
  };

  return (
    <AuthStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
    </AuthStack.Navigator>
  );
};
