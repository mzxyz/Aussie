import { MMKVLoader } from 'react-native-mmkv-storage';

export const storage = new MMKVLoader().initialize();

export const cacheKeys = {
  preferenceStore: 'PREFERENCE_STORE_KEY',
};
