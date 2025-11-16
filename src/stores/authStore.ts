import { create, StateCreator } from 'zustand';

import { authService } from 'services/authService';
import { User } from 'types/auth';

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  idToken: string | null;
  isLoading: boolean;
  hasTokens: boolean;
};

export type AuthActions = {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: (skipBiometricCheck?: boolean) => Promise<void>;
  refreshAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
};

export type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  idToken: null,
  isLoading: true,
  hasTokens: false,
};

export const createAuthSlice: StateCreator<AuthStore, [], [], AuthStore> = (
  set,
  get,
) => ({
  ...initialState,

  login: async () => {
    try {
      set({ isLoading: true });
      const credentials = await authService.login();
      const user = await authService.getUser(credentials.idToken || '');

      set({
        isAuthenticated: true,
        user,
        accessToken: credentials.accessToken || null,
        idToken: credentials.idToken || null,
        hasTokens: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await authService.logout();
      set({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        idToken: null,
        hasTokens: false,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  checkAuth: async (skipBiometricCheck: boolean = false) => {
    try {
      set({ isLoading: true });
      const tokens = await authService.getCredentials();

      if (!tokens) {
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          idToken: null,
          hasTokens: false,
          isLoading: false,
        });
        return;
      }

      const user = await authService.getUser(tokens.idToken);

      set({
        isAuthenticated: skipBiometricCheck,
        user,
        accessToken: tokens.accessToken,
        idToken: tokens.idToken,
        hasTokens: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        idToken: null,
        hasTokens: false,
        isLoading: false,
      });
    }
  },

  refreshAuth: async () => {
    try {
      const tokens = await authService.getCredentials();
      if (!tokens || !tokens.refreshToken) {
        await get().logout();
        return;
      }

      const credentials = await authService.refreshToken(tokens.refreshToken);
      const user = await authService.getUser(credentials.idToken || '');

      set({
        isAuthenticated: true,
        user,
        accessToken: credentials.accessToken || null,
        idToken: credentials.idToken || null,
      });
    } catch (error) {
      console.error('Error refreshing auth:', error);
      // If refresh fails, logout user
      await get().logout();
    }
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setAuthenticated: (authenticated: boolean) => {
    set({ isAuthenticated: authenticated });
  },
});

export const useAuthStore = create<AuthStore>()(createAuthSlice);
