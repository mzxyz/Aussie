import { StateStorage } from 'zustand/middleware';

import { storage } from 'utils/localStorage';

export const mmkvStorage: StateStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.setString(name, value);
  },
  removeItem: (name: string) => {
    storage.removeItem(name);
  },
};
