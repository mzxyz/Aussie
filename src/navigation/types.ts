import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Finances: NavigatorScreenParams<FinancesStackParamList>;
  Properties: NavigatorScreenParams<PropertiesStackParamList>;
  Appointment: NavigatorScreenParams<AppointmentStackParamList>;
  'My broker': NavigatorScreenParams<MyBrokerStackParamList>;
};

export type HomeStackParamList = {
  HomeMain: undefined;
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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
