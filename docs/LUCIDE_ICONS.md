# Lucide Icons Usage Guide

## 📦 Installation

Lucide icons have been installed in your project:

```bash
npx expo install lucide-react-native
```

## 🎨 Using Lucide Icons

### Basic Import

```typescript
import { IconName } from 'lucide-react-native';
```

### Example Usage

```typescript
import { Droplet, Heart, Star, Check } from 'lucide-react-native';

// Basic icon
<Droplet color="#1ecbe1" size={24} />

// Filled icon
<Heart color="#FF0000" size={32} fill="#FF0000" />

// Custom styling
<Star 
  color="#FFD700" 
  size={40} 
  strokeWidth={2}
  fill="#FFD700"
/>
```

## 🔍 Common Icons Used in This App

### Current Implementation (HomeScreen.tsx)

```typescript
import { Droplet, Target, TrendingUp, Award } from 'lucide-react-native';

// Water droplet icon
<Droplet color="#1ecbe1" size={48} fill="#1ecbe1" />

// Target/goal icon
<Target color="#1ecbe1" size={20} />

// Progress/trending icon
<TrendingUp color="#666" size={18} />

// Achievement icon
<Award color="#4CAF50" size={24} fill="#4CAF50" />
```

## 📚 Popular Icons for Mobile Apps

### Navigation Icons
```typescript
import { 
  Home, 
  Settings, 
  User, 
  Menu, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react-native';
```

### Action Icons
```typescript
import { 
  Plus, 
  Minus, 
  Edit, 
  Trash2, 
  Save, 
  Download, 
  Upload 
} from 'lucide-react-native';
```

### Status Icons
```typescript
import { 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  CheckCircle 
} from 'lucide-react-native';
```

### Social Icons
```typescript
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bell, 
  Mail 
} from 'lucide-react-native';
```

### Utility Icons
```typescript
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MapPin, 
  Camera 
} from 'lucide-react-native';
```

## 🎯 Icon Properties

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | number | 24 | Icon size in pixels |
| `color` | string | 'currentColor' | Icon stroke color |
| `strokeWidth` | number | 2 | Stroke width |
| `fill` | string | 'none' | Fill color (for filled icons) |
| `absoluteStrokeWidth` | boolean | false | Use absolute stroke width |

### Example with All Props

```typescript
<Droplet 
  size={32}
  color="#1ecbe1"
  strokeWidth={2.5}
  fill="#1ecbe1"
  absoluteStrokeWidth={false}
/>
```

## 💡 Best Practices

### 1. Consistent Sizing
```typescript
// Define icon sizes in constants
const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48,
};

<Droplet size={ICON_SIZES.medium} color="#1ecbe1" />
```

### 2. Use Theme Colors
```typescript
import { COLORS } from '../constants';

<Heart color={COLORS.primary} size={24} />
```

### 3. Conditional Rendering
```typescript
{isActive ? (
  <Heart color="#FF0000" size={24} fill="#FF0000" />
) : (
  <Heart color="#999" size={24} />
)}
```

### 4. Icon Buttons
```typescript
<TouchableOpacity onPress={handlePress}>
  <Plus color="#1ecbe1" size={24} />
</TouchableOpacity>
```

## 🔗 Resources

- **Official Documentation**: [lucide.dev](https://lucide.dev/)
- **Icon Search**: Browse all available icons at [lucide.dev/icons](https://lucide.dev/icons)
- **React Native Package**: [lucide-react-native on npm](https://www.npmjs.com/package/lucide-react-native)

## 📝 Examples in Your App

Check out `src/screens/HomeScreen.tsx` to see real-world examples of:
- Icon placement in headers
- Icons with text labels
- Filled vs outlined icons
- Icon sizing and colors
- Conditional icon rendering (achievement banner)

## 🎨 Icon Customization Tips

### Gradient Icons (Advanced)
For gradient effects, you'll need to use SVG gradients or use multiple overlapping icons with opacity.

### Animated Icons
Combine with `react-native-reanimated` for icon animations:
```typescript
import Animated from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';

// Wrap icon in Animated.View for animations
<Animated.View style={animatedStyle}>
  <Heart color="#FF0000" size={24} />
</Animated.View>
```

### Icon with Badge
```typescript
<View style={{ position: 'relative' }}>
  <Bell color="#1ecbe1" size={24} />
  <View style={styles.badge}>
    <Text style={styles.badgeText}>3</Text>
  </View>
</View>
```

---

**Happy icon designing! 🎨**
