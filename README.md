# Drinkwater - React Native Mobile App

A React Native mobile application built with Expo and TypeScript.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

The project is already set up with all dependencies installed. If you need to reinstall:

```bash
npm install
```

## 📱 Running the App

### Start the Development Server

```bash
npm start
```

This will start the Expo development server and show you a QR code.

### Run on Different Platforms

#### iOS (requires macOS with Xcode)
```bash
npm run ios
```

#### Android (requires Android Studio)
```bash
npm run android
```

#### Web Browser
```bash
npm run web
```

### Testing on Physical Device

1. Install the **Expo Go** app on your phone
2. Run `npm start`
3. Scan the QR code with:
   - **iOS**: Use the Camera app
   - **Android**: Use the Expo Go app

## 📁 Project Structure

```
drinkwater/
├── App.tsx              # Main application component
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── assets/              # Images, fonts, and other static files
│   ├── icon.png
│   ├── splash-icon.png
│   ├── adaptive-icon.png
│   └── favicon.png
└── node_modules/        # Installed dependencies
```

## 🛠️ Tech Stack

- **React Native** (v0.81.5) - Mobile framework
- **Expo** (v54) - Development platform
- **TypeScript** (v5.9) - Type safety
- **React** (v19.1) - UI library

## 📝 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## 🔧 Configuration

The app is configured in `app.json` with:
- App name: **drinkwater**
- Portrait orientation
- New Architecture enabled
- Support for iOS, Android, and Web platforms

## 📚 Next Steps

1. Edit `App.tsx` to start building your app
2. Add new components in a `components/` folder
3. Add screens in a `screens/` folder
4. Install additional packages as needed:
   ```bash
   npx expo install <package-name>
   ```

## 🔗 Useful Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📄 License

This project is private.
