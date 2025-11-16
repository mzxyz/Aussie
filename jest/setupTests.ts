import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-mmkv-storage', () => {
  class MMKVMock {
    getString() {
      return null;
    }
    setString() {
      return true;
    }
    removeItem() {
      return true;
    }
  }

  return {
    MMKVLoader: class {
      initialize() {
        return new MMKVMock();
      }
    },
  };
});

jest.mock('react-native-keychain', () => {
  const keychainStorage: Record<string, { username: string; password: string }> = {};

  return {
    setGenericPassword: jest.fn(
      async (username: string, password: string, options?: { service?: string }) => {
        const key = options?.service || 'default';
        keychainStorage[key] = { username, password };
        return true;
      },
    ),
    getGenericPassword: jest.fn(async (options?: { service?: string }) => {
      const key = options?.service || 'default';
      const stored = keychainStorage[key];
      if (stored) {
        return {
          username: stored.username,
          password: stored.password,
          service: key,
        };
      }
      return false;
    }),
    resetGenericPassword: jest.fn(async (options?: { service?: string }) => {
      const key = options?.service || 'default';
      delete keychainStorage[key];
      return true;
    }),
  };
});

jest.mock('@react-native-vector-icons/ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const MockIcon = ({ name }: { name: string }) =>
    React.createElement(Text, { testID: `icon-${name}` }, name);

  return {
    Ionicons: MockIcon,
  };
});
