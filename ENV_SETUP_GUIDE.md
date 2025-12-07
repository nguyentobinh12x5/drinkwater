# Environment Variables Setup Guide

## Overview
Your React Native/Expo project now uses environment variables to securely store Firebase configuration. This prevents sensitive credentials from being hardcoded in your source code.

## Package Installed
```bash
npm install react-native-dotenv
```

## Files Created/Modified

### ✅ Created Files

1. **`babel.config.js`** - Babel configuration
   - Configures `react-native-dotenv` plugin
   - Tells Babel to process `.env` file
   - Module name: `@env`

2. **`src/types/env.d.ts`** - TypeScript type definitions
   - Defines types for environment variables
   - Enables autocomplete and type checking

3. **`.env.example`** - Example environment file
   - Template for new developers
   - Shows which variables are needed
   - Safe to commit to Git

### ✅ Modified Files

1. **`.env`** - Environment variables (DO NOT COMMIT)
   - Fixed format (removed quotes and commas)
   - Contains your actual Firebase credentials

2. **`firebaseConfig.ts`** - Firebase configuration
   - Now imports from `@env` module
   - No hardcoded credentials

3. **`.gitignore`** - Git ignore file
   - Added `.env` to prevent committing secrets

## File Structure

```
drinkwater/
├── .env                          # Your actual credentials (git ignored)
├── .env.example                  # Template file (safe to commit)
├── babel.config.js               # Babel config for dotenv
├── firebaseConfig.ts             # Firebase config (uses @env)
└── src/
    └── types/
        └── env.d.ts              # TypeScript types for @env
```

## How to Use

### In firebaseConfig.ts (Already Set Up)

```typescript
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} from '@env';

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};
```

### In Any Other File

```typescript
import { API_KEY } from '@env';

console.log('API Key:', API_KEY);
```

## .env File Format

**Correct Format:**
```bash
API_KEY=AIzaSyAQpDtWsCLhLJV9Ps2D4Y1sHlQSm-imff8
AUTH_DOMAIN=water-reminder-8ba79.firebaseapp.com
```

**Incorrect Formats:**
```bash
# Don't use quotes
API_KEY="value"

# Don't use commas
API_KEY=value,

# Don't use semicolons
API_KEY=value;
```

## Important Notes

### 🔒 Security

1. **Never commit `.env` to Git**
   - Already added to `.gitignore`
   - Contains sensitive Firebase credentials

2. **Use `.env.example` for documentation**
   - Safe to commit
   - Shows what variables are needed
   - No actual values

3. **Share credentials securely**
   - Use password managers
   - Encrypted messaging
   - Never in public channels

### 🔄 After Making Changes

**You MUST restart the Metro bundler after:**
- Creating/modifying `.env`
- Changing `babel.config.js`
- Adding new environment variables

**How to restart:**
1. Stop the server (Ctrl+C or Cmd+C)
2. Clear cache: `npx expo start --clear`
3. Or just: `npx expo start`

### 📱 Platform Support

- ✅ **iOS**: Fully supported
- ✅ **Android**: Fully supported
- ✅ **Expo Go**: Fully supported
- ✅ **Development Builds**: Fully supported
- ⚠️ **Web**: May need different approach

## TypeScript Support

### Type Definitions (src/types/env.d.ts)

```typescript
declare module '@env' {
  export const API_KEY: string;
  export const AUTH_DOMAIN: string;
  export const DATABASE_URL: string;
  export const PROJECT_ID: string;
  export const STORAGE_BUCKET: string;
  export const MESSAGING_SENDER_ID: string;
  export const APP_ID: string;
}
```

This provides:
- ✅ Autocomplete in your IDE
- ✅ Type checking
- ✅ Error detection

## Adding New Environment Variables

### Step 1: Add to .env
```bash
NEW_VARIABLE=some_value
```

### Step 2: Add to .env.example
```bash
NEW_VARIABLE=placeholder_value
```

### Step 3: Add to TypeScript types
```typescript
// src/types/env.d.ts
declare module '@env' {
  export const NEW_VARIABLE: string;
  // ... other variables
}
```

### Step 4: Restart Metro bundler
```bash
npx expo start --clear
```

### Step 5: Use in your code
```typescript
import { NEW_VARIABLE } from '@env';

console.log(NEW_VARIABLE);
```

## Troubleshooting

### Problem: "Cannot find module '@env'"

**Solution:**
1. Check `babel.config.js` exists and is configured
2. Restart Metro bundler with `npx expo start --clear`
3. Ensure `react-native-dotenv` is installed

### Problem: Variables are undefined

**Solution:**
1. Check `.env` file format (no quotes, no commas)
2. Restart Metro bundler
3. Verify variable names match exactly (case-sensitive)

### Problem: TypeScript errors

**Solution:**
1. Check `src/types/env.d.ts` includes all variables
2. Restart TypeScript server in your IDE
3. Ensure names match exactly

### Problem: Changes not reflecting

**Solution:**
```bash
# Clear cache and restart
npx expo start --clear

# Or manually clear
rm -rf node_modules/.cache
npx expo start
```

## babel.config.js Explanation

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],    // Expo's Babel preset
    plugins: [
      [
        'module:react-native-dotenv',   // The plugin
        {
          moduleName: '@env',            // Import from '@env'
          path: '.env',                  // Use .env file
          safe: false,                   // Don't require .env.example
          allowUndefined: true,          // Allow undefined vars
        },
      ],
    ],
  };
};
```

### Configuration Options

- `moduleName`: Name to import from (`@env`)
- `path`: Path to env file (`.env`)
- `safe`: Require `.env.example` file
- `allowUndefined`: Allow undefined variables
- `blocklist`: Variables to exclude
- `allowlist`: Variables to include

## Multiple Environments (Optional)

### Development
```bash
# .env.development
API_KEY=dev_api_key
```

### Production
```bash
# .env.production
API_KEY=prod_api_key
```

### Usage
```javascript
// babel.config.js
const envFile = process.env.NODE_ENV === 'production' 
  ? '.env.production' 
  : '.env.development';

module.exports = {
  // ...
  plugins: [
    ['module:react-native-dotenv', { path: envFile }]
  ]
};
```

## Best Practices

### ✅ Do

- Keep `.env` in `.gitignore`
- Provide `.env.example` for team
- Document all variables
- Use descriptive variable names
- Restart Metro after .env changes

### ❌ Don't

- Commit `.env` to Git
- Share credentials in public
- Use quotes in `.env` file
- Forget to update `.env.example`
- Forget to restart after changes

## Team Setup

### For New Team Members

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd drinkwater
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Copy .env.example to .env**
   ```bash
   cp .env.example .env
   ```

4. **Get credentials from team**
   - Ask team lead for Firebase credentials
   - Update `.env` with real values

5. **Start the app**
   ```bash
   npx expo start
   ```

## Summary

✅ **Installed:** `react-native-dotenv`  
✅ **Created:** Babel config, TypeScript types, .env.example  
✅ **Updated:** firebaseConfig.ts, .gitignore, .env  
✅ **Protected:** Firebase credentials  
✅ **Ready:** To use environment variables  

**Next time you need to use `process.env`, just:**
1. Add variable to `.env`
2. Add to TypeScript types
3. Import from `@env`
4. Restart Metro bundler

🎉 **Your environment variables are now set up!**
