import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { cacheKeys } from 'utils/localStorage';

import { mmkvStorage } from './stateStorage';

export type PreferenceState = {
  faceIdEnabled: boolean;
  hapticsEnabled: boolean;
  systemThemeEnabled: boolean;
};

export type PreferenceActions = {
  setFaceIdEnabled: (enabled: boolean) => void;
  toggleFaceId: () => void;
  setHapticsEnabled: (enabled: boolean) => void;
  toggleHaptics: () => void;
  setSystemThemeEnabled: (enabled: boolean) => void;
  toggleMatchSystemTheme: () => void;
  reset: () => void;
};

export type PreferenceStore = PreferenceState & PreferenceActions;

export const initialState: PreferenceState = {
  faceIdEnabled: false,
  hapticsEnabled: true,
  systemThemeEnabled: false,
};

export const createPreferenceSlice: StateCreator<
  PreferenceStore,
  [],
  [],
  PreferenceStore
> = (set, get) => ({
  ...initialState,
  setFaceIdEnabled: enabled => set({ faceIdEnabled: enabled }),
  toggleFaceId: () => set({ faceIdEnabled: !get().faceIdEnabled }),
  setHapticsEnabled: enabled => set({ hapticsEnabled: enabled }),
  toggleHaptics: () => set({ hapticsEnabled: !get().hapticsEnabled }),
  setSystemThemeEnabled: enabled => set({ systemThemeEnabled: enabled }),
  toggleMatchSystemTheme: () => set({ systemThemeEnabled: !get().systemThemeEnabled }),
  reset: () => set({ ...initialState }),
});

export const usePreferenceStore = create<PreferenceStore>()(
  persist((...a) => createPreferenceSlice(...a), {
    name: cacheKeys.preferenceStore,
    storage: createJSONStorage(() => mmkvStorage),
    version: 1,
  }),
);
