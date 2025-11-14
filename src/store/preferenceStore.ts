import { StateCreator } from 'zustand';

export type PreferenceState = {
  faceIdEnabled: boolean;
  hapticsEnabled: boolean;
  systemThemeEnabled: boolean;
};

export type PreferenceSlice = PreferenceState & {
  setFaceIdEnabled: (enabled: boolean) => void;
  toggleFaceId: () => void;
  setHapticsEnabled: (enabled: boolean) => void;
  toggleHaptics: () => void;
  setSystemThemeEnabled: (enabled: boolean) => void;
  toggleMatchSystemTheme: () => void;
  reset: () => void;
};

export const preferenceInitialState: PreferenceState = {
  faceIdEnabled: false,
  hapticsEnabled: true,
  systemThemeEnabled: false,
};

export const createPreferenceSlice: StateCreator<
  PreferenceSlice,
  [],
  [],
  PreferenceSlice
> = (set, get) => ({
  ...preferenceInitialState,
  setFaceIdEnabled: enabled => set({ faceIdEnabled: enabled }),
  toggleFaceId: () => set({ faceIdEnabled: !get().faceIdEnabled }),
  setHapticsEnabled: enabled => set({ hapticsEnabled: enabled }),
  toggleHaptics: () => set({ hapticsEnabled: !get().hapticsEnabled }),
  setSystemThemeEnabled: enabled => set({ systemThemeEnabled: enabled }),
  toggleMatchSystemTheme: () => set({ systemThemeEnabled: !get().systemThemeEnabled }),
  reset: () => set({ ...preferenceInitialState }),
});
