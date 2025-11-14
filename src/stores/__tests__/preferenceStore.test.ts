import { act } from '@testing-library/react-native';

import { usePreferenceStore } from '../preferenceStore';

describe('preferenceStore', () => {
  const resetStore = () => {
    act(() => {
      usePreferenceStore.setState({
        faceIdEnabled: false,
        hapticsEnabled: true,
        systemThemeEnabled: false,
      });
    });
  };

  beforeEach(() => resetStore());

  it('toggles biometric preference', () => {
    act(() => usePreferenceStore.getState().toggleFaceId());
    expect(usePreferenceStore.getState().faceIdEnabled).toBe(true);
  });

  it('toggles haptics preference', () => {
    act(() => usePreferenceStore.getState().toggleHaptics());
    expect(usePreferenceStore.getState().hapticsEnabled).toBe(false);
  });

  it('toggles system theme preference', () => {
    act(() => usePreferenceStore.getState().toggleMatchSystemTheme());
    expect(usePreferenceStore.getState().systemThemeEnabled).toBe(true);
  });

  it('allows changing theme preference', () => {
    act(() => usePreferenceStore.getState().setSystemThemeEnabled(true));
    expect(usePreferenceStore.getState().systemThemeEnabled).toBe(true);
  });

  it('allows changing haptics preference', () => {
    act(() => usePreferenceStore.getState().setHapticsEnabled(true));
    expect(usePreferenceStore.getState().hapticsEnabled).toBe(true);
  });

  it('resets preference store', () => {
    act(() => usePreferenceStore.getState().reset());
    expect(usePreferenceStore.getState().faceIdEnabled).toBe(false);
    expect(usePreferenceStore.getState().hapticsEnabled).toBe(true);
    expect(usePreferenceStore.getState().systemThemeEnabled).toBe(false);
  });
});
