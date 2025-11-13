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
import { TabBar } from './TabBar';
import { NavigationHeader } from './NavigationHeader';
import { useTheme } from '../theme/ThemeContext';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';
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

// Helper function to create header options
const createHeaderOptions = (
  title: string,
  rightIcon?: { name: IoniconsIconName; onPress: () => void }
) => ({
  header: () => <NavigationHeader title={title} rightIcon={rightIcon} />,
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
}

const HomeStackNavigator = () => {
  const screenOptions = useScreenOptions();
  return (
    <HomeStack.Navigator
      screenOptions={screenOptions}
    >
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMainScreen}
        options={createHeaderOptions('Home')}
      />
    </HomeStack.Navigator>
  );
};

const FinancesStackNavigator = () => {
  const screenOptions = useScreenOptions();
  return (
    <FinancesStack.Navigator
      screenOptions={screenOptions}
    >
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
    <PropertiesStack.Navigator
      screenOptions={screenOptions}
    >
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
    <AppointmentStack.Navigator
      screenOptions={screenOptions}
    >
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
    <MyBrokerStack.Navigator
      screenOptions={screenOptions}
    >
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
