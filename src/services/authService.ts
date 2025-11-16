import Auth0, { Credentials } from 'react-native-auth0';
import * as Keychain from 'react-native-keychain';

import { AUTH0_CONFIG } from 'config/auth0';
import { AuthTokens, User } from 'types/auth';

const auth0 = new Auth0({
  domain: AUTH0_CONFIG.domain,
  clientId: AUTH0_CONFIG.clientId,
});

const KEYCHAIN_SERVICE = 'com.aussie.auth';
const TOKENS_KEY = 'auth_tokens';

export const authService = {
  /**
   * Login using Auth0 web authentication with PKCE
   */
  login: async (): Promise<Credentials> => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email offline_access',
        audience: undefined, // Add if you have an API audience
      });

      // Store tokens securely as JSON
      if (credentials.accessToken && credentials.idToken) {
        const tokens: AuthTokens = {
          accessToken: credentials.accessToken,
          idToken: credentials.idToken,
          refreshToken: credentials.refreshToken,
          expiresIn: credentials.expiresIn || 86400,
        };
        await Keychain.setGenericPassword(TOKENS_KEY, JSON.stringify(tokens), {
          service: KEYCHAIN_SERVICE,
        });
      }

      return credentials;
    } catch (error) {
      throw new Error(
        `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  },

  /**
   * Logout and clear stored tokens
   */
  logout: async (): Promise<void> => {
    try {
      // Clear tokens from keychain
      await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });

      // Logout from Auth0
      await auth0.webAuth.clearSession();
    } catch (error) {
      // Continue even if logout fails
      console.warn('Logout error:', error);
    }
  },

  /**
   * Get stored credentials from keychain
   */
  getCredentials: async (): Promise<AuthTokens | null> => {
    try {
      const creds = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
      if (!creds || !creds.password) {
        return null;
      }

      const tokens = JSON.parse(creds.password) as AuthTokens;
      return tokens;
    } catch {
      return null;
    }
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (refreshToken: string): Promise<Credentials> => {
    try {
      const credentials = await auth0.auth.refreshToken({ refreshToken });

      // Update stored tokens
      if (credentials.accessToken && credentials.idToken) {
        const existingTokens = await authService.getCredentials();
        const tokens: AuthTokens = {
          accessToken: credentials.accessToken,
          idToken: credentials.idToken,
          refreshToken: existingTokens?.refreshToken || credentials.refreshToken,
          expiresIn: credentials.expiresIn || existingTokens?.expiresIn || 86400,
        };
        await Keychain.setGenericPassword(TOKENS_KEY, JSON.stringify(tokens), {
          service: KEYCHAIN_SERVICE,
        });
      }

      return credentials;
    } catch (error) {
      throw new Error(
        `Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  },

  /**
   * Get user info from ID token or userinfo endpoint
   */
  getUser: async (idToken: string): Promise<User> => {
    try {
      // Decode ID token to get user info (basic implementation)
      // In production, you should use a JWT library to decode and verify
      const userInfo = await auth0.auth.userInfo({ token: idToken });
      return userInfo as User;
    } catch (error) {
      // TODO: should report those errors to `Amplitude Analytics`
      console.warn(`Failed to get user ${idToken}:`, error);
      // Fallback: try to decode ID token (basic base64 decode)
      try {
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        return payload as User;
      } catch {
        throw new Error('Failed to get user info');
      }
    }
  },

  /**
   * Handle callback URL from Auth0
   */
  handleCallback: (url: string): boolean => {
    // Auth0 SDK handles this automatically via webAuth.authorize()
    // This is here for reference if custom handling is needed
    return url.includes('auth0.com') || url.includes('callback');
  },
};
