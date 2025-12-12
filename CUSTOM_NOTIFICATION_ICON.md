# Hướng Dẫn: Thay Đổi Icon Thông Báo

## Vấn Đề
Hiện tại thông báo đang hiển thị logo Expo mặc định thay vì logo của bạn.

## Giải Pháp

### **iOS**
✅ iOS tự động sử dụng `assets/icon.png` - Không cần làm gì!

### **Android** 
Android cần một icon đặc biệt cho thông báo.

## Các Bước Thực Hiện

### **Bước 1: Tạo Notification Icon**

Android yêu cầu icon thông báo phải:
- ✅ Màu trắng (#FFFFFF)
- ✅ Nền trong suốt
- ✅ Kích thước: 96x96px (hoặc lớn hơn)
- ✅ Định dạng: PNG
- ✅ Thiết kế đơn giản (flat, không gradient)

**Tùy chọn 1: Sử dụng công cụ online**
1. Truy cập https://romannurik.github.io/AndroidAssetStudio/icons-notification.html
2. Upload logo của bạn từ `assets/icon.png`
3. Chọn "Trim" và "Padding" phù hợp
4. Download các file kết quả
5. Giải nén và copy các thư mục vào `android/app/src/main/res/`

**Tùy chọn 2: Tự tạo thủ công**
1. Mở `assets/icon.png` trong Photoshop/GIMP
2. Chuyển sang màu trắng (#FFFFFF)
3. Xóa background (transparent)
4. Resize về 96x96px
5. Export thành PNG
6. Lưu vào `assets/notification-icon.png`

### **Bước 2: Cập Nhật app.json**

Thêm cấu hình notification icon:

\`\`\`json
{
  "expo": {
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "notification": {
        "icon": "./assets/notification-icon.png",
        "color": "#1ecbe1"
      }
    },
    "plugins": [
      "expo-video",
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#1ecbe1",
          "sounds": []
        }
      ]
    ]
  }
}
\`\`\`

### **Bước 3: Rebuild App**

Sau khi thay đổi, bạn phải rebuild:

\`\`\`bash
# Xóa build cũ
npx expo prebuild --clean

# Build lại cho Android
npx expo run:android

# Hoặc build cho iOS
npx expo run:ios
\`\`\`

## Icon Sizes Cho Android

Nếu bạn muốn tạo icon cho tất cả các độ phân giải:

```
res/
  ├── drawable-mdpi/notification_icon.png (24x24)
  ├── drawable-hdpi/notification_icon.png (36x36)
  ├── drawable-xhdpi/notification_icon.png (48x48)
  ├── drawable-xxhdpi/notification_icon.png (72x72)
  └── drawable-xxxhdpi/notification_icon.png (96x96)
```

## Kiểm Tra

1. **Development**: Chạy `npx expo run:android`
2. **Test thông báo**: Set water = 0
3. **Xem notification**: Kéo xuống notification bar
4. **Icon sẽ hiển thị**: Logo của bạn (màu trắng) trên nền màu xanh (#1ecbe1)

## Lưu Ý Quan Trọng

⚠️ **Expo Go không hỗ trợ custom notification icon**
- Phải build development build hoặc production build
- Không thể test trong Expo Go app

⚠️ **Android yêu cầu màu trắng**
- Icon màu sắc sẽ không hiển thị đúng
- Phải là silhouette trắng trên nền trong suốt

⚠️ **Sau khi thay đổi app.json**
- Phải chạy `npx expo prebuild --clean`
- Phải build lại app, không chỉ refresh

## Kiểm Tra Nhanh

Nếu bạn muốn test ngay bây giờ mà không tạo icon mới:

1. Tạo file trắng đơn giản trong `assets/notification-icon.png`
2. Update `app.json` như trên
3. Run `npx expo prebuild --clean`
4. Run `npx expo run:android`

## Ví Dụ Icon Chuẩn

Icon thông báo Android nên trông như này:
- 🚫 Không: Logo đầy đủ với nhiều màu sắc
- ✅ Có: Hình dáng logo màu trắng, nền trong suốt
- ✅ Có: Thiết kế đơn giản, dễ nhận diện

## Công Cụ Hữu Ích

1. **Android Asset Studio**: https://romannurik.github.io/AndroidAssetStudio/
2. **IconKitchen**: https://icon.kitchen/
3. **App Icon Generator**: https://www.appicon.co/

## Nếu Vẫn Thấy Logo Expo

Nguyên nhân có thể:
1. Chưa chạy `npx expo prebuild --clean`
2. Đang dùng Expo Go (không hỗ trợ)
3. Icon không đúng định dạng
4. Chưa rebuild app sau khi thay đổi

**Giải pháp**: Build development build
\`\`\`bash
npx expo prebuild --clean
npx expo run:android --device
\`\`\`
