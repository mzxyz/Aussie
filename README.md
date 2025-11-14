# Aussie React Native Demo

Demo mobile app scaffold for Aussie, built with **React Native v0.80.0**. It showcases navigation, theming, global state management, persisted storage, testing, and CI wiring that you can expand into a production-ready app.

## Screens

| App | Home |
| --- | --- |
|![App](documents/assets/app.png) | ![Home screen](documents/assets/home.png) | 

| Finances | Appointment |
| --- | ---|
|![Finances screen](documents/assets/finances.png) | ![Appointment screen](documents/assets/appointment.png) |


## Highlights

- **Navigation:** React Navigation configured with the original five bottom tabs plus shared header components.
- **Design System:** Centralized theme with light/dark palettes, spacing/typography tokens, and a `makeStyles` helper to build component styles from the theme.
- **Global State:** Zustand-powered root store with a composable preference slice for FaceID, haptics, and theme selection.
- **Local Persistence:** `react-native-mmkv-storage` caches preference data through a JSON-backed storage adapter.
- **Screens:** Draft UI implementations for Home, Finances, My Broker (profile), Properties, and Appointment flows.
- **Testing:** Jest + React Native Testing Library configured for colocated component tests and store tests (with MMKV + icon mocks).
- **Tooling:** ESLint, Prettier, and Husky-friendly npm scripts, plus a simple CI workflow that lints, formats, and tests on every push/PR.

## Project Structure

```
$ tree -L 2 src
src
├── api
├── assets
│   └── images
├── components
│   ├── ActionCell.tsx
│   ├── Button.tsx
│   ├── Container.tsx
│   ├── Spacing.tsx
│   ├── Text.tsx
│   ├── __tests__
│   └── index.tsx
├── hooks
│   └── preferenceHooks.ts
├── navigation
│   ├── NavigationHeader.tsx
│   ├── TabBar.tsx
│   ├── index.tsx
│   └── types.ts
├── screens
│   ├── Appointment
│   ├── Finances
│   ├── Home
│   ├── MyBroker
│   └── Properties
├── services
│   └── appLaunch.ts
├── store
│   ├── __tests__
│   ├── preferenceStore.ts
│   └── store.ts
├── theme
│   ├── ThemeContext.tsx
│   ├── colors.ts
│   ├── index.tsx
│   ├── spacings.ts
│   ├── theme.ts
│   ├── typography.ts
│   └── useStyle.ts
├── types
└── utils
    └── localStorage.ts
```
## Running test

Run `yarn test`

![Home screen](documents/assets/unit-test.png)
