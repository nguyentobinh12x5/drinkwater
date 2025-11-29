# Quick Start Guide

## ✅ Setup Complete!

Your React Native Expo app is ready to run. Follow these steps:

### 1. Start the Development Server

```bash
npm start
```

### 2. Choose Your Platform

After running `npm start`, you'll see options:

- Press `a` - Open on Android
- Press `i` - Open on iOS simulator
- Press `w` - Open in web browser
- Scan QR code with Expo Go app on your phone

### 3. Testing on Your Phone (Recommended for First Time)

**iOS:**
1. Install "Expo Go" from the App Store
2. Open the Camera app
3. Scan the QR code shown in your terminal
4. The app will open in Expo Go

**Android:**
1. Install "Expo Go" from the Play Store
2. Open Expo Go app
3. Scan the QR code shown in your terminal
4. The app will open

### 4. Making Changes

- Edit `src/screens/HomeScreen.tsx` to modify the app
- Changes will automatically reload on your device
- Press `r` in the terminal to manually reload

### 🎯 Current Features

The app includes a sample "Drink Water" tracker with:
- Water intake counter
- Progress bar
- Beautiful UI with animations
- Touch interactions

### 📱 Next Steps

1. **Add Navigation**: Install React Navigation
   ```bash
   npx expo install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   ```

2. **Add Icons**: Install Expo Vector Icons (already included)
   ```bash
   npx expo install @expo/vector-icons
   ```

3. **Add Storage**: Install AsyncStorage for data persistence
   ```bash
   npx expo install @react-native-async-storage/async-storage
   ```

### 🐛 Troubleshooting

**Metro bundler issues:**
```bash
npm start -- --clear
```

**Dependency issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
npm start -- --port 8082
```

### 📚 Learn More

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
