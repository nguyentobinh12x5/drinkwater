# Plant Pot Selection - Local Storage Update

## ✅ Fixed: Real-time Pot Changes

The pot selection feature now works **instantly** and **locally** using AsyncStorage instead of Firebase.

## Changes Made

### 1. **Switched to AsyncStorage (Local Storage)**
- ✅ Removed Firebase dependency for pot selection
- ✅ Uses `@react-native-async-storage/async-storage` for local storage
- ✅ Data persists across app restarts
- ✅ Faster and more reliable

### 2. **Added Real-time Event System**
- ✅ Uses `DeviceEventEmitter` to notify HomeScreen instantly
- ✅ When you tap a pot in Store, HomeScreen updates immediately
- ✅ No need to refresh or restart

### 3. **Event Flow**
```
StoreScreen                    HomeScreen
    |                              |
    | User taps pot                |
    ↓                              |
Save to AsyncStorage              |
setEquippedPotId(newId)            |
    |                              |
    | emit('potChanged', newId)    |
    |----------------------------->|
                                   ↓
                            Listen for 'potChanged'
                            setEquippedPotId(newId)
                            Pot updates instantly!
```

## Storage Key
```typescript
const EQUIPPED_POT_KEY = '@equipped_pot';
// Stores: 'default' | '1' | '2' | '3' | '4'
```

## How It Works Now

### In StoreScreen:
```typescript
// 1. Save to AsyncStorage
await AsyncStorage.setItem(EQUIPPED_POT_KEY, item.id);

// 2. Update local state
setEquippedPotId(item.id);

// 3. Notify HomeScreen
DeviceEventEmitter.emit('potChanged', item.id);
```

### In HomeScreen:
```typescript
// Listen for pot changes
useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('potChanged', (newPotId) => {
        setEquippedPotId(newPotId); // Updates instantly!
    });
    return () => subscription.remove();
}, []);
```

## Benefits

✅ **Instant Updates** - Changes appear immediately, no delay
✅ **Works Offline** - No internet required
✅ **Fast** - Local storage is much faster than Firebase
✅ **Reliable** - No network errors
✅ **Simple** - Less code, easier to maintain

## Testing

1. Go to **Store** tab
2. Tap any pot (e.g., "Jar of Crunch")
3. You'll see "Success" alert
4. **Immediately** switch to **Home** tab
5. The pot should already be changed! 🎉

## Technical Details

- **AsyncStorage Location**: Device local storage
- **Event System**: Device-wide event emitter
- **Persistence**: Survives app restarts
- **Scope**: Per device (not synced across devices)
