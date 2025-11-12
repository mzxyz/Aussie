import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  RootTabParamList,
  HomeStackParamList,
  FinancesStackParamList,
  PropertiesStackParamList,
  AppointmentStackParamList,
  MyBrokerStackParamList,
} from './types';
import { CustomTabBar } from './CustomTabBar';
import { HomeMainScreen } from '../screens/Home/HomeMainScreen';
import { FinancesMainScreen } from '../screens/Finances/FinancesMainScreen';
import { PropertiesMainScreen } from '../screens/Properties/PropertiesMainScreen';
import { AppointmentMainScreen } from '../screens/Appointment/AppointmentMainScreen';
import { MyBrokerMainScreen } from '../screens/MyBroker/MyBrokerMainScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const FinancesStack = createNativeStackNavigator<FinancesStackParamList>();
const PropertiesStack = createNativeStackNavigator<PropertiesStackParamList>();
const AppointmentStack = createNativeStackNavigator<AppointmentStackParamList>();
const MyBrokerStack = createNativeStackNavigator<MyBrokerStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: true,
      // headerBackTitleVisible: false,
    }}
  >
    <HomeStack.Screen
      name="HomeMain"
      component={HomeMainScreen}
      options={{ title: 'Home' }}
    />
  </HomeStack.Navigator>
);

const FinancesStackNavigator = () => (
  <FinancesStack.Navigator
    screenOptions={{
      headerShown: true,
      // headerBackTitleVisible: false,
    }}
  >
    <FinancesStack.Screen
      name="FinancesMain"
      component={FinancesMainScreen}
      options={{ title: 'Finances' }}
    />
  </FinancesStack.Navigator>
);

const PropertiesStackNavigator = () => (
  <PropertiesStack.Navigator
    screenOptions={{
      headerShown: true,
      // headerBackTitleVisible: false,
    }}
  >
    <PropertiesStack.Screen
      name="PropertiesMain"
      component={PropertiesMainScreen}
      options={{ title: 'Properties' }}
    />
  </PropertiesStack.Navigator>
);

const AppointmentStackNavigator = () => (
  <AppointmentStack.Navigator
    screenOptions={{
      headerShown: true,
      // headerBackTitleVisible: false,
    }}
  >
    <AppointmentStack.Screen
      name="AppointmentMain"
      component={AppointmentMainScreen}
      options={{ title: 'Appointment' }}
    />
  </AppointmentStack.Navigator>
);

const MyBrokerStackNavigator = () => (
  <MyBrokerStack.Navigator
    screenOptions={{
      headerShown: true,
      // headerBackTitleVisible: false,
    }}
  >
    <MyBrokerStack.Screen
      name="MyBrokerMain"
      component={MyBrokerMainScreen}
      options={{ title: 'My broker' }}
    />
  </MyBrokerStack.Navigator>
);

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
      tabBar={props => <CustomTabBar {...props} />}
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
