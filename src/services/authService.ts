import Auth0, { Credentials } from 'react-native-auth0';
import * as Keychain from 'react-native-keychain';

import { AUTH0_CONFIG } from 'config/auth0';
import { AuthTokens, User } from 'types/auth';

export class AuthService {
  private readonly auth0: Auth0;
  private readonly keychainService = 'com.aussie.auth';
  private readonly tokensKey = 'auth_tokens';

  constructor() {
    this.auth0 = new Auth0({
      domain: AUTH0_CONFIG.domain,
      clientId: AUTH0_CONFIG.clientId,
    });
  }

  async login(): Promise<Credentials> {
    try {
      const credentials = await this.auth0.webAuth.authorize({
        scope: 'openid profile email offline_access',
        audience: undefined,
      });

      if (credentials.accessToken && credentials.idToken) {
        const tokens: AuthTokens = {
          accessToken: credentials.accessToken,
          idToken: credentials.idToken,
          refreshToken: credentials.refreshToken,
          expiresIn: credentials.expiresIn || 86400,
        };
        await Keychain.setGenericPassword(this.tokensKey, JSON.stringify(tokens), {
          service: this.keychainService,
        });
      }

      return credentials;
    } catch (error) {
      // TODO: report to analytics
      throw new Error(
        `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({ service: this.keychainService });

      await this.auth0.webAuth.clearSession();
    } catch (error) {
      console.warn('Logout error:', error);
    }
  }

  async getCredentials(): Promise<AuthTokens | null> {
    try {
      const creds = await Keychain.getGenericPassword({ service: this.keychainService });
      if (!creds || !creds.password) {
        return null;
      }

      const tokens = JSON.parse(creds.password) as AuthTokens;
      return tokens;
    } catch {
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<Credentials> {
    try {
      const credentials = await this.auth0.auth.refreshToken({ refreshToken });

      // Update stored tokens
      if (credentials.accessToken && credentials.idToken) {
        const existingTokens = await this.getCredentials();
        const tokens: AuthTokens = {
          accessToken: credentials.accessToken,
          idToken: credentials.idToken,
          refreshToken: existingTokens?.refreshToken || credentials.refreshToken,
          expiresIn: credentials.expiresIn || existingTokens?.expiresIn || 86400,
        };
        await Keychain.setGenericPassword(this.tokensKey, JSON.stringify(tokens), {
          service: this.keychainService,
        });
      }

      return credentials;
    } catch (error) {
      throw new Error(
        `Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  async getUser(idToken: string): Promise<User> {
    try {
      const userInfo = await this.auth0.auth.userInfo({ token: idToken });
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
  }

  handleCallback(url: string): boolean {
    // handle callback if custom handling is needed
    return url.includes('auth0.com') || url.includes('callback');
  }
}

export const authService = new AuthService();
