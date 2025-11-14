// import { cacheKeys, storage } from 'utils/localStorage';

// function loadPreferences() {
//   const userPreferences = storage.getString(cacheKeys.preference);
//   if (userPreferences) {
//     const parsedPreferences = JSON.parse(userPreferences);
//     if (!parsedPreferences?.preference) return;

//     // TODO: 1. update preference store

//     // 2. face id enabled
//     if (parsedPreferences.preference.faceIdEnabled) {
//       // TODO show face ID prompt and verification
//       // pass then go to the tab navigator stack
//     }

//     // 3. haptics enabled
//     if (parsedPreferences.preference.hapticsEnabled) {
//       // TODO: 1. update haptics store
//     }
//   }
// }

// export function appLaunch() {
//   loadPreferences();
// }
