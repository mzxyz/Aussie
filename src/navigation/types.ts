import { NavigatorScreenParams, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Finances: NavigatorScreenParams<FinancesStackParamList>;
  Properties: NavigatorScreenParams<PropertiesStackParamList>;
  Appointment: NavigatorScreenParams<AppointmentStackParamList>;
  MyBroker: NavigatorScreenParams<MyBrokerStackParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type FinancesStackParamList = {
  Finances: undefined;
};

export type PropertiesStackParamList = {
  Properties: undefined;
};

export type AppointmentStackParamList = {
  Appointment: undefined;
};

export type MyBrokerStackParamList = {
  MyBroker: undefined;
};

export type Navigation<T extends ParamListBase> = NativeStackNavigationProp<T>;
