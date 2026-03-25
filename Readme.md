# Ousma Mobile App (Expo)

This project is configured as an Expo React Native app.

## Requirements

- Node.js 20+
- npm 10+
- Xcode (for iOS simulator) and/or Android Studio (for Android emulator)

## Clean Restart (from scratch)

Use this when you want to reset the Expo setup fully.

```bash
npm run clean
npm install
npx expo install --fix
```

## Run the App (Expo Development Build)

This project now uses development builds by default (not Expo Go).

```bash
npm run start
```

Then build and launch native apps:

```bash
npm run ios
npm run android
```

## Optional: Expo Go Mode

If you need Expo Go temporarily:

```bash
npm run start:go
```

## Diagnostics

```bash
npx expo-doctor
```

If Watchman warnings appear:

```bash
watchman watch-del '/Users/aboubacarelhacen/ousma'
watchman watch-project '/Users/aboubacarelhacen/ousma'
```
