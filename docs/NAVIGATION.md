# Bottom Tab Navigation Guide

## 📱 Navigation Structure

Your app now has a bottom tab navigation with 5 screens:

1. **Store** 🛍️ - Shopping and rewards
2. **Parent** 👨‍👩‍👧‍👦 - Parent dashboard
3. **Home** 🏠 - Main water tracking screen
4. **School** 🎓 - Educational content
5. **Profile** 👤 - User profile and settings

## 🎨 Navigation Features

### Active/Inactive States

- **Active Tab**: Icon color is **black** (#000000)
- **Inactive Tab**: Icon color is **grey** (#999999)
- **Home Icon**: Fills when active for extra emphasis

### Tab Bar Styling

- White background (#FFFFFF)
- Height: 60px
- Top border with light grey color
- Padding for better touch targets
- Bold labels (600 weight)

## 📁 File Structure

```
src/
├── navigation/
│   └── BottomTabNavigator.tsx    # Main navigation component
└── screens/
    ├── StoreScreen.tsx            # Store tab
    ├── ParentScreen.tsx           # Parent tab
    ├── HomeScreen.tsx             # Home tab (water tracker)
    ├── SchoolScreen.tsx           # School tab
    └── ProfileScreen.tsx          # Profile tab
```

## 🔧 How It Works

### Navigation Setup (App.tsx)

```typescript
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
```

### Tab Navigator Configuration

```typescript
<Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: '#000000',    // Black when active
    tabBarInactiveTintColor: '#999999',  // Grey when inactive
    tabBarStyle: {
      backgroundColor: '#FFFFFF',
      height: 60,
      paddingBottom: 8,
      paddingTop: 8,
    },
  }}
>
```

### Icon Rendering

Icons change color based on the `focused` state:

```typescript
tabBarIcon: ({ focused, color, size }) => {
  switch (route.name) {
    case 'Home':
      return <Home color={color} size={24} fill={focused ? color : 'none'} />;
    // ... other cases
  }
}
```

## 🎯 Customization Options

### Change Tab Order

Edit the order in `BottomTabNavigator.tsx`:

```typescript
<Tab.Screen name="Store" component={StoreScreen} />
<Tab.Screen name="Parent" component={ParentScreen} />
<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="School" component={SchoolScreen} />
<Tab.Screen name="Profile" component={ProfileScreen} />
```

### Change Active Color

```typescript
tabBarActiveTintColor: '#1E90FF',  // Change to blue
```

### Change Inactive Color

```typescript
tabBarInactiveTintColor: '#CCCCCC',  // Lighter grey
```

### Add Badge (Notifications)

```typescript
<Tab.Screen 
  name="Profile" 
  component={ProfileScreen}
  options={{
    tabBarBadge: 3,  // Shows a badge with number
  }}
/>
```

### Hide Specific Tab Labels

```typescript
<Tab.Screen 
  name="Home" 
  component={HomeScreen}
  options={{
    tabBarLabel: '',  // Hide label
  }}
/>
```

## 🚀 Navigation Usage in Screens

### Navigate to Another Tab

```typescript
import { useNavigation } from '@react-navigation/native';

function MyComponent() {
  const navigation = useNavigation();
  
  const goToProfile = () => {
    navigation.navigate('Profile');
  };
  
  return (
    <TouchableOpacity onPress={goToProfile}>
      <Text>Go to Profile</Text>
    </TouchableOpacity>
  );
}
```

### Get Current Route

```typescript
import { useRoute } from '@react-navigation/native';

function MyComponent() {
  const route = useRoute();
  console.log('Current screen:', route.name);
}
```

### Check if Tab is Focused

```typescript
import { useIsFocused } from '@react-navigation/native';

function MyComponent() {
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
      // Refresh data when tab becomes active
    }
  }, [isFocused]);
}
```

## 📦 Installed Packages

- `@react-navigation/native` - Core navigation library
- `@react-navigation/bottom-tabs` - Bottom tab navigator
- `react-native-screens` - Native screen components
- `react-native-safe-area-context` - Safe area handling

## 🎨 Icons Used

All icons are from **Lucide React Native**:

- **Store**: `ShoppingBag`
- **Parent**: `Users`
- **Home**: `Home`
- **School**: `GraduationCap`
- **Profile**: `User`

## 💡 Best Practices

1. **Keep tab count to 5 or fewer** - More tabs make it harder to use
2. **Use clear, recognizable icons** - Users should instantly understand each tab
3. **Maintain consistent styling** - All screens should feel cohesive
4. **Handle safe areas** - Especially important for iPhone X and newer
5. **Test on both iOS and Android** - Tab bars render differently on each platform

## 🐛 Troubleshooting

### Tabs not showing?

Make sure you have all required packages installed:
```bash
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

### Icons not displaying?

Verify Lucide icons are installed:
```bash
npx expo install lucide-react-native
```

### Navigation errors?

Ensure `NavigationContainer` wraps your navigator in `App.tsx`.

---

**Your bottom navigation is ready! 🎉** The app will automatically reload with the new navigation.
