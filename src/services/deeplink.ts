import { Linking } from 'react-native';
import { getStateFromPath, LinkingOptions } from '@react-navigation/native';

import { RootTabParamList } from '../navigation/types';

/// reference:
/// https://reactnavigation.org/docs/deep-linking/
/// https://reactnavigation.org/docs/configuring-links/

// Mapping of tab names to their root screen names
// This ensures that when deep linking to nested screens, the root screen is always in the stack
const TAB_ROOT_SCREENS: Record<keyof RootTabParamList, string> = {
  Home: 'Home',
  Finances: 'Finances',
  Properties: 'Properties',
  Appointment: 'Appointment',
  MyBroker: 'MyBroker',
};

export const linking: LinkingOptions<RootTabParamList> = {
  prefixes: ['aussie://'],
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => subscription.remove();
  },
  config: {
    screens: {
      Home: {
        screens: {
          Home: 'home',
          Profile: 'profile',
        },
      },
      Finances: {
        screens: {
          Finances: 'finances',
        },
      },
      Properties: {
        screens: {
          Properties: 'properties',
        },
      },
      Appointment: {
        screens: {
          Appointment: 'appointment',
        },
      },
      MyBroker: {
        screens: {
          MyBroker: 'broker',
        },
      },
    },
  },
  getStateFromPath: (path, options) => {
    const state = getStateFromPath(path, options);
    if (state?.routes) {
      state.routes.forEach(tabRoute => {
        const tabName = tabRoute.name as keyof RootTabParamList;
        const rootScreenName = TAB_ROOT_SCREENS[tabName];

        if (tabRoute.state?.routes && rootScreenName) {
          const stackRoutes = tabRoute.state.routes;
          const hasRootScreen = stackRoutes.some(route => route.name === rootScreenName);

          // Add root screen to the beginning if it's missing
          if (!hasRootScreen) {
            tabRoute.state = {
              ...tabRoute.state,
              routes: [{ name: rootScreenName, params: undefined }, ...stackRoutes],
              index: stackRoutes.length, // Keep the deep-linked screen active
            };
          }
        }
      });
    }

    return state;
  },
};
