# User Information Display in HomeScreen

## Overview
The HomeScreen now displays logged-in user information and syncs water intake data with Firebase Realtime Database.

## Features Implemented

### 1. User Information Display
**Location**: Top status card on HomeScreen

**Displayed Information:**
- **User Name**: Shows `displayName` from Firebase Auth (set during signup)
- **User Email**: Shows the user's email address
- **Welcome Emoji**: Shows 👋 as a friendly greeting

### 2. Firebase Database Integration

**Database Structure:**
```
users/
  └── {userId}/
      └── daily_water/
          └── {YYYY-MM-DD}/
              └── total: 250  (in ml)
```

**How it works:**
1. Each day gets a unique entry (e.g., "2025-12-07")
2. Water intake is stored per day under `total`
3. Real-time sync between app and database
4. Data persists across app restarts

### 3. Water Tracking Flow

**When user drinks water (tap Home button):**
```
1. User taps Home tab
2. Event emitted: 'addWater'
3. Calculate new intake: current + 250ml
4. Save to Firebase: users/{userId}/daily_water/{today}/total
5. Firebase triggers onValue listener
6. UI updates automatically
```

**Real-time Sync:**
- Firebase `onValue` listener continuously monitors water intake
- Any changes automatically update the UI
- Works even if data changes from another device

### 4. Props Flow

```
App.tsx
  └── user (from Firebase Auth)
      └── BottomTabNavigator (receives user prop)
          └── HomeScreen (receives user via initialParams)
              └── Uses user.uid, user.displayName, user.email
```

## Code Implementation

### Getting User Info in HomeScreen

```typescript
export default function HomeScreen({ route }: HomeScreenProps) {
    const { user } = route.params;  // Get user from navigation params
    
    // Display user name
    <Text>{user?.displayName || 'User'}</Text>
    
    // Display user email
    <Text>{user?.email}</Text>
}
```

### Firebase Database Operations

```typescript
// Read water intake (real-time listener)
const waterRef = ref(db, `users/${user.uid}/daily_water/${getTodayDate()}/total`);
const unsubscribe = onValue(waterRef, (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
        setWaterIntake(data);
    }
});

// Write water intake
const newIntake = waterIntake + 250;
await set(waterRef, newIntake);
```

## User Experience

### First Login
1. User signs up or logs in
2. HomeScreen loads with user's name and email
3. Water intake starts at 0ml
4. First tap adds 250ml to database

### Returning User (Same Day)
1. User opens app
2. Firebase loads today's water intake
3. Continues from where they left off

### New Day
1. App creates new database entry for today
2. Water intake resets to 0ml
3. Previous days' data preserved in database

## Database Security

**Recommended Firebase Rules:**
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

This ensures:
- Users can only read their own data
- Users can only write to their own data
- Prevents unauthorized access

## Customization Options

### Change Daily Goal
```typescript
const DAILY_GOAL = 3000;  // Change from 2500ml to 3000ml
```

### Change Drink Amount
```typescript
const DRINK_AMOUNT = 500;  // Change from 250ml to 500ml
```

### Add More User Info
You can display additional user information:
- Profile photo: `user.photoURL`
- User ID: `user.uid`
- Email verified: `user.emailVerified`
- Creation time: `user.metadata.creationTime`

### Example:
```typescript
<Text>Member since: {new Date(user.metadata.creationTime).toLocaleDateString()}</Text>
```

## Troubleshooting

### User info not showing
**Issue**: `user` is undefined
**Solution**: Make sure user is logged in and props are passed correctly

### Water intake not saving
**Issue**: Firebase permission denied
**Solution**: Check Firebase Database Rules allow writes

### Data not syncing
**Issue**: `onValue` listener not triggering
**Solution**: 
- Verify database path is correct
- Check internet connection
- Ensure Firebase is properly initialized

## Future Enhancements

Consider adding:
1. **Weekly/Monthly Stats**: Track historical data
2. **Achievements**: Badges for streaks
3. **Reminders**: Push notifications to drink water
4. **Social Features**: Share progress with friends
5. **Custom Goals**: Let users set their own daily target
6. **Charts**: Visualize water intake over time

## Summary

Your app now:
✅ Displays logged-in user's name and email on HomeScreen
✅ Syncs water intake with Firebase in real-time
✅ Stores data per-user, per-day
✅ Persists across app restarts
✅ Updates UI automatically when data changes
✅ Provides a personalized experience for each user
