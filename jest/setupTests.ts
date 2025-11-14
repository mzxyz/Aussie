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
