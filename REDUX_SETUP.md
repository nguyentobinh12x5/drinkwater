# Redux Store Setup - User Management

## Overview
This app now uses **Redux Toolkit** to manage user authentication state globally. The user information from Firebase Authentication is stored in Redux and can be accessed from any component.

## Structure

```
src/
├── store/
│   ├── store.ts          # Redux store configuration
│   ├── userSlice.ts      # User state slice (actions & reducers)
│   └── hooks.ts          # Typed Redux hooks
```

## How It Works

### 1. Store Configuration (`store.ts`)
- Configures the Redux store with the user reducer
- Sets up middleware to handle non-serializable Firebase User objects
- Exports `RootState` and `AppDispatch` types for TypeScript

### 2. User Slice (`userSlice.ts`)
Manages user authentication state with three actions:
- **`setUser(user)`** - Sets the current user (called when auth state changes)
- **`setLoading(isLoading)`** - Updates loading state
- **`clearUser()`** - Clears user data (used during logout)

### 3. Typed Hooks (`hooks.ts`)
- **`useAppDispatch()`** - Typed version of `useDispatch`
- **`useAppSelector()`** - Typed version of `useSelector`

## Usage in Components

### Accessing User Information

```typescript
import { useAppSelector } from '../store/hooks';

function YourComponent() {
  const { user, isLoading } = useAppSelector((state) => state.user);

  // User properties available:
  const userId = user?.uid;
  const userEmail = user?.email;
  const userName = user?.displayName;
  const userPhoto = user?.photoURL;
  
  return (
    <View>
      <Text>{userName || userEmail}</Text>
    </View>
  );
}
```

### Checking Loading State

```typescript
const { isLoading } = useAppSelector((state) => state.user);

if (isLoading) {
  return <ActivityIndicator />;
}
```

### Checking If User Is Logged In

```typescript
const { user } = useAppSelector((state) => state.user);

if (!user) {
  return <Text>Please log in</Text>;
}
```

## Integration Points

### App.tsx
- Wraps the entire app with Redux `Provider`
- Listens to Firebase auth changes with `onAuthStateChanged`  
- Dispatches `setUser` action when auth state changes
- Shows loading screen while checking auth state

### HomeScreen.tsx
- Uses `useAppSelector` to get current user
- Accesses user ID for Firebase Realtime Database queries
- Example: `ref(db, \`users/\${user.uid}/total_water\`)`

### ProfileScreen.tsx
- Gets user information from Redux store
- Displays user email and display name
- Uses email prefix as fallback username

## Benefits

✅ **Global State** - User info accessible from any component  
✅ **Type Safety** - Full TypeScript support  
✅ **Single Source of Truth** - No prop drilling required  
✅ **Firebase Integration** - Automatically syncs with Firebase Auth  
✅ **React Native Compatible** - Works seamlessly with React Navigation  

## Available User Properties

From Firebase Auth User object:
- `uid` - Unique user ID
- `email` - User email address
- `displayName` - User display name (may be null)
- `photoURL` - User profile photo URL (may be null)
- `emailVerified` - Boolean indicating if email is verified
- `phoneNumber` - User phone number (may be null)
- `metadata` - User metadata (creation time, last sign in, etc.)

## Example: Using User ID in Firebase Database Queries

```typescript
import { useAppSelector } from '../store/hooks';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebaseConfig';

function WaterIntakeComponent() {
  const { user } = useAppSelector((state) => state.user);
  const [waterIntake, setWaterIntake] = useState(0);

  useEffect(() => {
    if (!user) return;

    const waterRef = ref(db, `users/${user.uid}/total_water`);
    const unsubscribe = onValue(waterRef, (snapshot) => {
      setWaterIntake(snapshot.val() || 0);
    });

    return () => unsubscribe();
  }, [user]);

  return <Text>{waterIntake} ml</Text>;
}
```

## Next Steps

Consider extending the Redux store with:
- User preferences (theme, language, etc.)
- Water intake goals and history
- Achievement/badge data
- App settings

Example:
```typescript
// Create new slices:
// - src/store/preferencesSlice.ts
// - src/store/waterIntakeSlice.ts
// - src/store/achievementsSlice.ts
```
