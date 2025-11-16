/**
 * Auth0 Configuration
 * Make sure your Auth0 application is configured as:
 * - Application Type: Native
 * - Grant Types: Authorization Code with PKCE
 * - Allowed Callback URLs:
 *   - iOS: mz.demo.aussie.auth0://YOUR_DOMAIN/ios/mz.demo.aussie/callback
 *   - Android: com.aussie://YOUR_DOMAIN/android/com.aussie/callback
 * - Allowed Logout URLs: Same as callback URLs
 * - Allowed Web Origins: mz.demo.aussie.auth0://, com.aussie://
 * 
 * Note: The iOS URL scheme includes ".auth0" suffix as configured in Info.plist
 */

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@env';

export const AUTH0_CONFIG = {
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
};
