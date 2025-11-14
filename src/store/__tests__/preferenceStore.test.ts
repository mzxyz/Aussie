import { act } from '@testing-library/react-native';

import { usePreferenceStore } from '../store';

describe('preference store', () => {
  beforeEach(() => {
    act(() => usePreferenceStore.getState().reset());
  });

  it('toggles FaceID on and off', () => {
    act(() => usePreferenceStore.getState().toggleFaceId());
    expect(usePreferenceStore.getState().faceIdEnabled).toBe(true);
  });

  it('updates theme preference flag', () => {
    act(() => usePreferenceStore.getState().setSystemThemeEnabled(true));
    expect(usePreferenceStore.getState().systemThemeEnabled).toBe(true);
  });
});
