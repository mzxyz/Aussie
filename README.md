# Aussie React Native Demo

<p align="center">
  <a href="https://www.npmjs.com/package/react-native"><img src="https://img.shields.io/badge/react--native-v0.80.0-61DAFB?style=flat-square&logo=react" alt="React Native"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-v22.0.0-339933?style=flat-square&logo=node.js" alt="Node.js"></a>
  <a href="https://www.ruby-lang.org/"><img src="https://img.shields.io/badge/ruby-v3.4.7-CC342D?style=flat-square&logo=ruby" alt="Ruby"></a>
  <a href="https://cocoapods.org/"><img src="https://img.shields.io/badge/cocoapods-1.16.2-FA2A00?style=flat-square&logo=cocoapods" alt="CocoaPods"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-v5.0.4-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
</p>

Demo mobile app scaffold for Aussie, built with React Native v0.80.0. A production-ready foundation featuring Auth0 authentication with OpenID Connect (OIDC), comprehensive testing (Jest unit tests and Detox E2E tests), deep linking support, navigation, theming, global state management with Zustand, persisted storage with MMKV, biometric authentication, and modern tooling with ESLint, Prettier, and lint-staged pre-commit hooks.

## Screens

| Login                            | FaceID Auto Login                                                                                                                    | Logout                                                                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| ![App](documents/assets/app.png) | <img width="1320" height="2868" alt="login" src="https://github.com/user-attachments/assets/accb7ee0-66ce-43b6-b61f-461d1844605c" /> | <img width="1320" height="2868" alt="biometric-login" src="https://github.com/user-attachments/assets/b950bb3f-133e-4200-b93e-c23bccc83e48" /> |

| App                                                                                                                                   | Home                                      | Appointment                                             |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------- |
| <img width="1320" height="2868" alt="logout" src="https://github.com/user-attachments/assets/cef6e341-6edb-4527-ad17-162e55c258d4" /> | ![Home screen](documents/assets/home.png) | ![Appointment screen](documents/assets/appointment.png) |

| Finances - Dark                                        | Finance - Light                                                   | Profile - Light                                             |
| ------------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| ![Finances dark screen](documents/assets/finances.png) | ![Finance light screen](documents/assets/light-mode-finances.png) | ![Profile - Light](documents/assets/light-mode-profile.PNG) |

## Highlights

- **Navigation:** React Navigation configured with the original five bottom tabs plus shared header components.
- **Design System:** Centralized theme with light/dark palettes, spacing/typography tokens, and a `makeStyles` helper to build component styles from the theme.
- **Global State:** Zustand-powered root store with a composable preference slice for FaceID, haptics, and theme selection.
- **Local Persistence:** `react-native-mmkv-storage` caches preference data through a JSON-backed storage adapter.
- **Authentication:** Auth0 integration with OpenID Connect (OIDC) service, enabling secure login with Auth0 and automatic biometric authentication when FaceID is enabled. Token management uses iOS Keychain and Android Keystore via `react-native-keychain` for secure credential storage, with automatic token refresh and session management.
- **Screens:** Draft UI implementations for Home, Finances, MyBroker (profile), Properties, and Appointment flows.
- **Testing:** Jest + React Native Testing Library configured for colocated component tests and store tests (with MMKV + icon mocks).
- **E2E Testing:** Detox integrated for end-to-end testing with comprehensive test coverage for all 5 tabs and 6 screens.
- **Deep Linking:** Schema URL support (`aussie://`) with React Navigation linking configuration for seamless navigation to specific screens.
- **Animations:** `react-native-reanimated` implemented for smooth button interactions with scale and opacity animations matching the original app design.
- **Tooling:** ESLint, Prettier, and Husky-friendly npm scripts, plus a simple CI workflow that lints, formats, and tests on every push/PR.

### Authorisation

The authentication flow integrates Auth0 with OpenID Connect, secure token storage in Keychain, and biometric auto-login:

```mermaid
flowchart TD
    Start([App Launch]) --> CheckTokens{Tokens in<br/>Keychain?}

    CheckTokens -->|No| Login[Login Screen]
    CheckTokens -->|Yes| CheckFaceID{FaceID<br/>Enabled?}

    Login --> Auth0[Auth0 OIDC Login]
    Auth0 -->|Success| SaveTokens[Save Tokens to Keychain]
    Auth0 -->|Error| Login

    SaveTokens --> GetUser[Get User Info]
    GetUser --> Authenticated[✓ Authenticated]

    CheckFaceID -->|No| Login
    CheckFaceID -->|Yes| FaceID[FaceID Prompt]

    FaceID -->|Success| CheckValid{Tokens<br/>Valid?}
    FaceID -->|Failed| Login

    CheckValid -->|Yes| GetUser
    CheckValid -->|No| Refresh[Refresh Token]

    Refresh -->|Success| SaveTokens
    Refresh -->|Failed| Login

    Authenticated --> UsingApp[Using App]
    Authenticated --> Logout[Logout]

    UsingApp --> TokenCheck{Token<br/>Expired?}
    TokenCheck -->|Yes| Refresh
    TokenCheck -->|No| UsingApp

    Logout --> ClearTokens[Clear Keychain]
    ClearTokens --> ClearAuth0[Clear Auth0 Session]
    ClearAuth0 --> Login

    style Start fill:#e1f5ff
    style Authenticated fill:#d4edda
    style Login fill:#fff3cd
    style Auth0 fill:#cfe2ff
    style SaveTokens fill:#cfe2ff
    style FaceID fill:#f8d7da
    style Refresh fill:#d1ecf1
    style UsingApp fill:#d4edda
```

**Key Components:**

- **Auth0 Service**: Handles OIDC authentication, token refresh, and user info retrieval
- **Keychain Storage**: Securely stores access tokens, ID tokens, and refresh tokens using `react-native-keychain`
- **Biometric Service**: Manages FaceID/TouchID authentication for seamless auto-login
- **Auth Store**: Zustand store managing authentication state, user data, and token lifecycle

https://github.com/user-attachments/assets/dd2676e9-a55a-4fae-847f-5888da344870

https://github.com/user-attachments/assets/358fe497-8ba5-4f85-9321-e25f9d0be975

### Detox testing

https://github.com/user-attachments/assets/9bae7715-8d3a-456c-a07a-30379eeef251

### Deeplink

https://github.com/user-attachments/assets/50281c92-98a9-46b8-a437-d4ec33cf8b76

### Animated button

https://github.com/user-attachments/assets/4f486684-444d-47dc-89a6-6fde561a81f3

## Project Structure

```
$ tree -L 2 src
src
├── api
├── assets
│   └── images
├── components
│   ├── ActionCell.tsx
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── Logo.tsx
│   ├── Spacing.tsx
│   ├── SwitchCell.tsx
│   ├── Text.tsx
│   ├── __tests__
│   └── index.tsx
├── config
│   └── auth0.ts
├── hooks
│   └── preferenceHooks.ts
├── navigation
│   ├── AuthNavigator.tsx
│   ├── NavigationHeader.tsx
│   ├── TabBar.tsx
│   ├── index.tsx
│   └── types.ts
├── screens
│   ├── Appointment
│   ├── Auth
│   ├── Finances
│   ├── Home
│   ├── MyBroker
│   └── Properties
├── services
│   ├── authService.ts
│   ├── biometricService.ts
│   └── deeplink.ts
├── stores
│   ├── __tests__
│   ├── authStore.ts
│   ├── index.ts
│   ├── preferenceStore.ts
│   └── stateStorage.ts
├── theme
│   ├── ThemeContext.tsx
│   ├── colors.ts
│   ├── index.tsx
│   ├── spacings.ts
│   ├── theme.ts
│   ├── typography.ts
│   └── useStyle.ts
├── types
│   ├── auth.ts
│   └── env.d.ts
└── utils
    └── localStorage.ts
```

## Running Tests

### Unit Tests

Run `yarn test`

|                                                |
| ---------------------------------------------- |
| ![Home screen](documents/assets/unit-test.png) |

### E2E Tests

Run Detox end-to-end tests on iOS:

```bash
yarn run detox:test:ios
```

E2E tests cover:

- App launch and basic UI verification
- Tab navigation across all 5 tabs
- Screen content and interactions for all 6 screens
- Navigation flows including nested screens (e.g., Home → Profile)
