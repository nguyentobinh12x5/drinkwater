# Push Notifications Feature

## Overview
The app now sends push notifications to remind users to drink water when their cactus is thirsty (water intake is 0).

## Features Implemented

### 1. **Thirsty Notification**
When water intake is 0, the app sends:
- **Title**: "🌵 Cactus is Thirsty"
- **Message**: "Cactus is thirsty. Please drink water. I miss you 💧"
- **Trigger**: Immediate (appears as soon as water is 0)
- **Auto-Cancel**: Notification is cancelled when user drinks water

### 2. **Daily Reminder**
- **Title**: "💧 Time to Hydrate!"
- **Message**: "Don't forget to drink water today! Your cactus is waiting 🌵"
- **Schedule**: 9:00 AM daily
- **Purpose**: Remind users to start their daily hydration

### 3. **Notification Permissions**
- Automatically requests notification permissions on app start
- Works on both iOS and Android
- Handles permission denied gracefully

## Files Created/Modified

### Created Files:
1. **`src/utils/NotificationService.ts`**
   - Core notification functionality
   - Permission handling
   - Scheduling functions
   - Notification management

### Modified Files:
1. **`src/screens/HomeScreen.tsx`**
   - Added notification setup on mount
   - Monitors water intake for 0 value
   - Triggers thirsty notification
   - Cancels notification when water > 0

2. **`app.json`**
   - Added notification plugin configuration  
   - iOS background notification support
   - Android notification permissions

## How It Works

### Flow Diagram:
```
App Start
    ↓
Request Notification Permissions
    ↓
Schedule Daily Reminder (9 AM)
    ↓
Monitor Water Intake
    ↓
Water = 0? ──Yes──> Send Thirsty Notification
    |                          ↓
    No                    Water > 0?
    ↓                          ↓
Continue Monitoring ←──Yes── Cancel Notification
```

### Code Flow:

**On App Mount:**
```typescript
// 1. Request permissions
registerForPushNotificationsAsync();

// 2. Schedule daily reminder
scheduleDailyReminder(9, 0);

// 3. Listen for notification taps
Notifications.addNotificationResponseReceivedListener(...)
```

**On Water Intake Change:**
```typescript
// Monitor water value
onValue(waterRef, (snapshot) => {
    const waterIntake = snapshot.val();
    
    // Send notification if thirsty
    if (waterIntake === 0) {
        scheduleThirstyNotification();
    } else {
        cancelThirstyNotification();
    }
});
```

## Notification Service Functions

### Permission & Setup
- `registerForPushNotificationsAsync()` - Request notification permissions
- Set up notification channels (Android)

### Scheduling
- `scheduleThirstyNotification()` - Send immediate thirsty notification
- `scheduleDailyReminder(hour, minute)` - Schedule daily reminder
- `schedulePeriodicCheckNotification(hours)` - Periodic reminders

### Management
- `cancelThirstyNotification()` - Cancel thirsty notifications
- `cancelAllNotifications()` - Cancel all scheduled notifications

### Badge Management
- `getBadgeCount()` - Get current badge count
- `setBadgeCount(count)` - Set badge count
- `clearBadgeCount()` - Clear badge

## Platform Configuration

### iOS (`app.json`)
```json
"ios": {
  "bundleIdentifier": "com.drinkwater.app",
  "infoPlist": {
    "UIBackgroundModes": ["remote-notification"]
  }
}
```

### Android (`app.json`)
```json
"android": {
  "package": "com.drinkwater.app",
  "permissions": [
    "RECEIVE_BOOT_COMPLETED",
    "VIBRATE",
    "WAKE_LOCK"
  ]
}
```

## Testing

### Test Thirsty Notification:
1. Open the app
2. Make sure water intake is at 0
3. Keep app in background
4. You should receive notification: "Cactus is thirsty..."

### Test Notification Cancellation:
1. With water at 0, receive notification
2. Drink water (tap the water droplet)
3. Notification should be cancelled

### Test Daily Reminder:
1. Wait until 9:00 AM
2. Should receive daily hydration reminder
3. Repeats every day

## Notification Behavior

### Foreground (App Open):
- ✅ Shows alert banner
- ✅ Plays sound
- ✅ Shows in notification list
- ✅ Updates badge

### Background (App Closed):
- ✅ Shows push notification
- ✅ Plays sound/vibrates
- ✅ Updates badge
- ✅ Tappable to open app

## Troubleshooting

### Notifications Not Appearing?

1. **Check Permissions**:
   - iOS: Settings > Drinkwater > Notifications > Allow
   - Android: Settings > Apps > Drinkwater > Notifications > On

2. **Check Device**:
   - Must use physical device (won't work in simulator)
   - Ensure Do Not Disturb is off

3. **Check Console**:
   - Look for "💧 Water intake is 0 - Sending thirsty notification"
   - Check for permission errors

4. **Rebuild App**:
   ```bash
   npx expo prebuild --clean
   npx expo run:ios
   # or
   npx expo run:android
   ```

## Future Enhancements

Potential improvements:
- 🔔 Customizable notification times
- ⏰ Multiple daily reminders
- 🎯 Achievement notifications
- 📊 Weekly summary notifications
- 🏆 Streak milestone notifications
- 🌙 Smart scheduling (avoid nighttime)
- 🔕 Quiet hours configuration

## Dependencies

```json
"expo-notifications": "~0.29.9",
"expo-device": "~7.0.1"
```

## Important Notes

⚠️ **Production**: Before publishing to stores, you need to configure:
- iOS: Apple Push Notification service (APNs) certificates
- Android: Firebase Cloud Messaging (FCM) credentials

📱 **Testing**: Always test on physical devices, not simulators

🔋 **Battery**: Notifications are optimized to minimize battery impact

🔐 **Privacy**: User can always disable notifications in system settings
