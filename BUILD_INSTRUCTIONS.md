# 🔧 Các Lệnh Để Build Lại App Với Icon Mới

## ⚠️ LƯU Ý QUAN TRỌNG

**Expo Go KHÔNG hỗ trợ custom notification icon!**
Bạn phải build development build hoặc production build.

## 📱 Các Bước Thực Hiện

### **Bước 1: Dọn Dẹp Build Cũ**

```bash
# Xóa các file build cũ
npx expo prebuild --clean
```

### **Bước 2: Build Development Build**

**Cho Android:**
```bash
# Build và chạy trên thiết bị Android
npx expo run:android

# Hoặc build cho emulator cụ thể
npx expo run:android --device
```

**Cho iOS:**
```bash
# Build và chạy trên thiết bị iOS
npx expo run:ios

# Hoặc build cho simulator
npx expo run:ios --simulator
```

### **Bước 3: Test Notification**

1. Mở app sau khi build xong
2. Đặt water intake về 0
3. Đưa app vào background
4. Bạn sẽ thấy notification với icon của bạn!

## 🎯 Quick Start (Nhanh Nhất)

Nếu bạn đang dùng **Android**, chạy lệnh này:

```bash
# Build và cài đặt trực tiếp lên điện thoại
npx expo prebuild --clean && npx expo run:android --device
```

## 🔍 Kiểm Tra Icon Đã Đúng Chưa

### Android:
1. Build app: `npx expo run:android`
2. Set water = 0
3. Kéo thanh notification xuống
4. Icon sẽ là logo của bạn (màu trắng) trên nền xanh (#1ecbe1)

### iOS:
1. Build app: `npx expo run:ios`
2. Set water = 0
3. Kéo notification xuống
4. Icon sẽ là app icon của bạn từ `assets/icon.png`

## ❌ Troubleshooting

### Vẫn Thấy Logo Expo?

**Nguyên nhân 1:** Đang dùng Expo Go
- ✅ **Giải pháp:** Build development build với `npx expo run:android`

**Nguyên nhân 2:** Chưa rebuild sau khi thay app.json
- ✅ **Giải pháp:** Chạy `npx expo prebuild --clean` rồi build lại

**Nguyên nhân 3:** Icon không đúng format
- ✅ **Giải pháp:** Icon Android phải là màu trắng, nền trong suốt

### Lỗi "command not found: expo"

```bash
# Cài đặt Expo CLI
npm install -g expo-cli

# Hoặc dùng npx
npx expo prebuild --clean
```

### Lỗi "No devices found"

**Android:**
```bash
# Kiểm tra devices
adb devices

# Nếu không có, bật USB debugging trên điện thoại
```

**iOS:**
```bash
# Mở Xcode và kết nối iPhone
# Tin cậy máy tính trên iPhone
```

## 📦 Build Production (Cho Store)

### Android (APK/AAB):
```bash
# Build APK cho testing
eas build --platform android --profile preview

# Build AAB cho Google Play
eas build --platform android --profile production
```

### iOS (IPA):
```bash
# Build cho TestFlight
eas build --platform ios --profile preview

# Build cho App Store
eas build --platform ios --profile production
```

## 💡 Tips

1. **Development Build** - Fast để test: `npx expo run:android`
2. **Preview Build** - Cho beta testing: `eas build --profile preview`
3. **Production Build** - Cho store: `eas build --profile production`

## ⏱️ Thời Gian Build

- Development Build: ~5-10 phút
- EAS Build (Cloud): ~15-20 phút
- Local Build: ~5-15 phút tùy máy

## 🎮 Để Test Ngay

Chạy các lệnh này theo thứ tự:

\`\`\`bash
# 1. Clean build cũ
npx expo prebuild --clean

# 2. Build cho Android (nếu có điện thoại Android)
npx expo run:android

# 3. Hoặc build cho iOS (nếu có iPhone/Mac)
npx expo run:ios

# 4. Đợi build xong, app sẽ tự động mở
# 5. Test notification bằng cách set water = 0
\`\`\`

Sau đó notification sẽ hiển thị icon của bạn! 🎉
