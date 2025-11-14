import React from 'react';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppointmentMainScreen } from 'screens/Appointment/AppointmentMainScreen';
import { FinancesMainScreen } from 'screens/Finances/FinancesMainScreen';
import { HomeMainScreen } from 'screens/Home/HomeMainScreen';
import { ProfileScreen } from 'screens/Home/ProfileScreen';
import { MyBrokerMainScreen } from 'screens/MyBroker/MyBrokerMainScreen';
import { PropertiesMainScreen } from 'screens/Properties/PropertiesMainScreen';
import { useTheme } from 'theme/ThemeContext';

import { NavigationHeader } from './NavigationHeader';
import { TabBar } from './TabBar';
import {
  AppointmentStackParamList,
  FinancesStackParamList,
  HomeStackParamList,
  MyBrokerStackParamList,
  Navigation,
  PropertiesStackParamList,
  RootTabParamList,
} from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const FinancesStack = createNativeStackNavigator<FinancesStackParamList>();
const PropertiesStack = createNativeStackNavigator<PropertiesStackParamList>();
const AppointmentStack = createNativeStackNavigator<AppointmentStackParamList>();
const MyBrokerStack = createNativeStackNavigator<MyBrokerStackParamList>();

const createHeaderOptions = <T extends ParamListBase>(
  title: string,
  rightIcon?: {
    name: IoniconsIconName;
    onPress: (navigation: Navigation<T>) => void;
  },
) => ({
  header: ({ navigation }: { navigation: Navigation<T> }) => (
    <NavigationHeader
      title={title}
      rightIcon={
        rightIcon
          ? { name: rightIcon.name, onPress: () => rightIcon.onPress(navigation) }
          : undefined
      }
    />
  ),
});

const useScreenOptions = () => {
  const { colors } = useTheme();
  return {
    headerShown: true,
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTintColor: colors.textPrimary,
  };
};

const HomeStackNavigator = () => {
  const screenOptions = useScreenOptions();
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMainScreen}
        options={createHeaderOptions('Home', {
          name: 'person-outline',
          onPress: navigation => navigation.navigate('Profile'),
        })}
      />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
};

const FinancesStackNavigator = () => {
  const screenOptions = useScreenOptions();
  return (
    <FinancesStack.Navigator screenOptions={screenOptions}>
      <FinancesStack.Screen
        name="FinancesMain"
        component={FinancesMainScreen}
        options={createHeaderOptions('My finances')}
      />
    </FinancesStack.Navigator>
  );
};

const PropertiesStackNavigator = () => {
  const screenOptions = useScreenOptions();
  return (
    <PropertiesStack.Navigator screenOptions={screenOptions}>
      <PropertiesStack.Screen
        name="PropertiesMain"
        component={PropertiesMainScreen}
        options={createHeaderOptions('My properties')}
      />
    </PropertiesStack.Navigator>
  );
};

const AppointmentStackNavigator = () => {
  const screenOptions = useScreenOptions();
  return (
    <AppointmentStack.Navigator screenOptions={screenOptions}>
      <AppointmentStack.Screen
        name="AppointmentMain"
        component={AppointmentMainScreen}
        options={createHeaderOptions('My appointment')}
      />
    </AppointmentStack.Navigator>
  );
};

const MyBrokerStackNavigator = () => {
  const screenOptions = useScreenOptions();
  return (
    <MyBrokerStack.Navigator screenOptions={screenOptions}>
      <MyBrokerStack.Screen
        name="MyBrokerMain"
        component={MyBrokerMainScreen}
        options={createHeaderOptions('My broker')}
      />
    </MyBrokerStack.Navigator>
  );
};

const tabConfigs: {
  name: keyof RootTabParamList;
  component: React.ComponentType<any>;
}[] = [
  {
    name: 'Home',
    component: HomeStackNavigator,
  },
  {
    name: 'Finances',
    component: FinancesStackNavigator,
  },
  {
    name: 'Properties',
    component: PropertiesStackNavigator,
  },
  {
    name: 'Appointment',
    component: AppointmentStackNavigator,
  },
  {
    name: 'My broker',
    component: MyBrokerStackNavigator,
  },
];

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabConfigs.map(config => (
        <Tab.Screen key={config.name} name={config.name} component={config.component} />
      ))}
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};
