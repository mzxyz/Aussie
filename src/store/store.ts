import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { cacheKeys } from 'utils/localStorage';

import { createPreferenceSlice, PreferenceSlice } from './preferenceStore';
import { mmkvStorage } from './stateStorage';

export type RootStore = PreferenceSlice;

export const useAppStore = create<RootStore>()(
  persist(
    (...a) => ({
      ...createPreferenceSlice(...a),
    }),
    {
      name: cacheKeys.preferenceStore,
      storage: createJSONStorage(() => mmkvStorage),
      version: 1,
    },
  ),
);

export const usePreferenceStore = useAppStore;
