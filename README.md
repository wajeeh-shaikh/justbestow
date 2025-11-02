# JustBestow

A Expo Router and React Native app that lists charity campaigns and walks the user through a simple mock donation flow. The code is clear, readable, and easy to extend.

## Features

- Campaign list with active and inactive states
- Donation screen with preset and custom amounts
- Optional receipt details (name, email, address, message)
- Simulated payment flow: initiate → tap → processing → success
- Theming in `src/theme` for colors and typography
- TypeScript with path aliases and Expo Router

## Stack

- Expo SDK 54, React Native, TypeScript
- Expo Router
- React Native Reanimated (Babel plugin enabled)
- React Native Safe Area Context

## Quick start

```bash
# install dependencies
npm install

# align native packages to the Expo SDK
npx expo install

# run locally (choose one)
npm start
npm run android
npm run ios
npm run web
```

## Scripts

```bash
npm start        # start the development server
npm run android  # open on Android
npm run ios      # open on iOS
npm run web      # open on the web
npm run lint     # lint with the Expo config
```
