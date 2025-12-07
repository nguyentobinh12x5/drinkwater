# Water Tracking System - Implementation Guide

## Overview
The water tracking system allows users to:
1. **Read** total water intake from Firebase Realtime Database
2. **Add water** manually by clicking a button
3. **Add water** programmatically using DeviceEventEmitter

## Architecture

### Firebase Structure
```
users/
  └── {userId}/
      └── total_water: number (in ml)
```

### Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Firebase Database                     │
│              users/{userId}/total_water                  │
└─────────────────────────┬───────────────────────────────┘
                          │
                          │ Real-time sync (onValue)
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    HomeScreen State                      │
│                  waterIntake (local)                     │
└─────────────────────────┬───────────────────────────────┘
                          │
                          │ Display
                          ↓
┌─────────────────────────────────────────────────────────┐
│                         UI                               │
│     Progress Bar | Plant Status | Achievement Badge     │
└─────────────────────────────────────────────────────────┘
```

## Implementation Details

### 1. Reading Water Data from Firebase

```typescript
useEffect(() => {
    if (!user) return;

    const waterRef = ref(db, `users/${user.uid}/total_water`);
    const unsubscribe = onValue(waterRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            setWaterIntake(data);
        } else {
            setWaterIntake(0); // Initialize if no data exists
        }
    });

    return () => off(waterRef); // Cleanup on unmount
}, [user]);
```

**Features:**
- ✅ Real-time updates (automatically updates when Firebase data changes)
- ✅ Initializes to 0 if no data exists
- ✅ Cleanup on component unmount
- ✅ User-specific data using `user.uid`

### 2. Adding Water to Firebase

```typescript
const addWater = async () => {
    if (!user) {
        Alert.alert('Error', 'User not logged in');
        return;
    }

    try {
        const waterRef = ref(db, `users/${user.uid}/total_water`);
        const snapshot = await get(waterRef);
        const currentWater = snapshot.val() || 0;
        const newWater = Math.min(currentWater + DRINK_AMOUNT, DAILY_GOAL + 1000);
        
        // Update Firebase
        await set(waterRef, newWater);
        
        console.log(`Added ${DRINK_AMOUNT}ml. Total: ${newWater}ml`);
    } catch (error) {
        console.error('Error adding water:', error);
        Alert.alert('Error', 'Failed to add water. Please try again.');
    }
};
```

**Features:**
- ✅ Reads current value first
- ✅ Adds DRINK_AMOUNT (250ml)
- ✅ Has a maximum cap (DAILY_GOAL + 1000)
- ✅ Updates Firebase directly
- ✅ Error handling with user feedback
- ✅ Logging for debugging

### 3. Manual Button Trigger

```typescript
<TouchableOpacity 
    style={styles.waterButton} 
    onPress={addWater}
    activeOpacity={0.8}
>
    <Droplet color="#FFFFFF" size={32} fill="#FFFFFF" />
    <Text style={styles.waterButtonText}>+{DRINK_AMOUNT}ml</Text>
</TouchableOpacity>
```

**Features:**
- ✅ Floating button positioned at bottom center
- ✅ Blue gradient background (#1ecbe1)
- ✅ Water droplet icon
- ✅ Shows amount being added (+250ml)
- ✅ Visual feedback on press (activeOpacity)

### 4. DeviceEventEmitter Integration

```typescript
React.useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('addWater', () => {
        addWater();
    });

    return () => {
        subscription.remove();
    };
}, [user]);
```

**Features:**
- ✅ Listens for 'addWater' events
- ✅ Triggers the same `addWater` function
- ✅ Can be called from anywhere in the app
- ✅ Cleanup on unmount

## Usage Examples

### From Any Component

**Trigger add water event:**
```typescript
import { DeviceEventEmitter } from 'react-native';

// Somewhere in your component
DeviceEventEmitter.emit('addWater');
```

**Direct Firebase update (alternative):**
```typescript
import { ref, set, get } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { useAppSelector } from '../store/hooks';

function MyComponent() {
    const { user } = useAppSelector((state) => state.user);
    
    const addCustomWater = async (amount: number) => {
        if (!user) return;
        
        const waterRef = ref(db, `users/${user.uid}/total_water`);
        const snapshot = await get(waterRef);
        const currentWater = snapshot.val() || 0;
        await set(waterRef, currentWater + amount);
    };
    
    return (
        <TouchableOpacity onPress={() => addCustomWater(500)}>
            <Text>Add 500ml</Text>
        </TouchableOpacity>
    );
}
```

## UI Components

### Water Button Styles

```typescript
waterButtonContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    zIndex: 10,
},
waterButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1ecbe1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0288D1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
},
waterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
},
```

### Progress Display

The water intake is displayed in multiple places:
1. **Progress Bar** - Shows percentage towards daily goal
2. **Plant Status** - Changes plant image based on intake
3. **Achievement Toast** - Appears when goal is met
4. **Text Display** - Shows "{waterIntake} ml"

## Constants

```typescript
const DAILY_GOAL = 2500;      // Daily water goal in ml
const DRINK_AMOUNT = 250;     // Amount per drink in ml
```

## Plant Status Logic

```typescript
const getPlantImage = () => {
    if (waterIntake >= DAILY_GOAL) {
        return require('../../assets/characters/tree/castus-happy.png');
    } else if (waterIntake >= DAILY_GOAL / 2) {
        return require('../../assets/characters/tree/castus-growth.png');
    } else {
        return require('../../assets/characters/tree/castus-sad.png');
    }
};
```

**States:**
- 😢 **Sad** (thirsty): 0 - 1249ml
- 🌱 **Growth**: 1250 - 2499ml
- 😊 **Happy**: 2500ml+

## Testing

### Test Manual Button
1. Open the app
2. Click the blue water button
3. Verify:
   - Water intake increases by 250ml
   - Progress bar updates
   - Plant status changes (if threshold crossed)
   - Firebase updates (check Firebase console)

### Test DeviceEventEmitter
```typescript
// Add this to any component
import { DeviceEventEmitter } from 'react-native';

<TouchableOpacity onPress={() => DeviceEventEmitter.emit('addWater')}>
    <Text>Test Add Water</Text>
</TouchableOpacity>
```

### Test Firebase Sync
1. Open app on two devices / simulators
2. Add water on device 1
3. Verify device 2 updates automatically (real-time)

## Debugging

### Console Logs
The system logs when water is added:
```
Added 250ml. Total: 750ml
```

### Check Firebase Database
1. Open Firebase Console
2. Navigate to Realtime Database
3. Look for: `users/{userId}/total_water`

### Common Issues

**Water not updating:**
- Check user is logged in
- Check Firebase rules allow writes
- Check network connection
- Check console for errors

**Water resets on app reload:**
- This is normal - it reads from Firebase
- If Firebase is 0, that's the initial value

**Button not working:**
- Check if user is defined
- Check Firebase permissions
- Look for errors in console

## Future Enhancements

1. **Daily Reset**: Reset water intake at midnight
2. **History Tracking**: Store daily water intake history
3. **Custom Amounts**: Allow different drink sizes
4. **Undo**: Remove last water entry
5. **Notifications**: Remind user to drink water
6. **Statistics**: Weekly/monthly averages
7. **Achievements**: Unlock achievements for streaks

## Related Files

- `src/screens/HomeScreen.tsx` - Main water tracking screen
- `src/store/userSlice.ts` - User state management
- `firebaseConfig.ts` - Firebase configuration
- `App.tsx` - Redux provider setup

## Firebase Security Rules (Example)

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

This ensures users can only read/write their own data.
