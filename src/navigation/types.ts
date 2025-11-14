import { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Finances: NavigatorScreenParams<FinancesStackParamList>;
  Properties: NavigatorScreenParams<PropertiesStackParamList>;
  Appointment: NavigatorScreenParams<AppointmentStackParamList>;
  'My broker': NavigatorScreenParams<MyBrokerStackParamList>;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Profile: undefined;
};

export type FinancesStackParamList = {
  FinancesMain: undefined;
};

export type PropertiesStackParamList = {
  PropertiesMain: undefined;
};

export type AppointmentStackParamList = {
  AppointmentMain: undefined;
};

export type MyBrokerStackParamList = {
  MyBrokerMain: undefined;
};

export type Navigation<T extends ParamListBase> = NativeStackNavigationProp<T>;
