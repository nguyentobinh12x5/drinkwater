# Rewards Feature Documentation

## Overview
The Rewards feature allows parents to incentivize their children to meet their daily hydration goals by setting up rewards that can be claimed after achieving consecutive days of goal completion.

## Features

### For Parents
1. **Add Rewards**: Parents can add rewards from preset options or create custom rewards
2. **Preset Rewards**: 12 pre-configured reward options including:
   - Trip to Park 🏞️
   - Ice Cream Treat 🍦
   - Movie Night 🎬
   - Extra Playtime 🎮
   - Zoo Visit 🦁
   - Pizza Party 🍕
   - Beach Day 🏖️
   - Toy Shop Visit 🧸
   - Sleepover 🛏️
   - Amusement Park 🎢
   - Camping Trip ⛺
   - Art Supplies 🎨

3. **Custom Rewards**: Create personalized rewards with custom emoji icons, titles, and descriptions
4. **Reward Requirements**: Set the number of consecutive days required to earn each reward
5. **Manage Rewards**: View active and claimed rewards, delete rewards as needed
6. **Track Progress**: Monitor child's current streak and reward eligibility

### For Children
1. **View Rewards**: See all available rewards and their progress
2. **Track Streak**: View current consecutive days streak
3. **Claim Rewards**: Claim rewards once eligible (after meeting consecutive day requirements)
4. **Celebration**: Enjoy a fun celebration animation when claiming rewards
5. **Progress Visualization**: See progress bars showing how close they are to earning each reward

## File Structure

```
src/
├── types/
│   └── Reward.ts                    # Reward type definitions and presets
├── utils/
│   ├── RewardUtils.ts               # Reward CRUD operations and streak calculations
│   └── HydrationHistory.ts          # Track daily goal achievements
├── components/
│   ├── RewardCard.tsx               # Reusable reward card component
│   └── ChildRewardsModal.tsx        # Child-facing rewards modal
├── screens/
│   ├── RewardsScreen.tsx            # Parent rewards management screen
│   ├── HomeScreen.tsx               # Updated with rewards button
│   └── ParentScreen.tsx             # Updated with rewards navigation
└── navigation/
    ├── ParentStackNavigator.tsx     # Stack navigator for parent screens
    └── BottomTabNavigator.tsx       # Updated to use stack navigator
```

## Data Structure (Firebase)

### User Rewards
```
users/
  {userId}/
    rewards/
      {rewardId}/
        title: string
        description: string
        icon: string (emoji)
        requiredDays: number
        isActive: boolean
        isClaimed: boolean
        claimedDate: string (ISO date)
        createdDate: string (ISO date)
```

### Hydration History
```
users/
  {userId}/
    history/
      {YYYY-MM-DD}/
        date: string
        waterIntake: number
        goal: number
        goalMet: boolean
        timestamp: string (ISO timestamp)
```

## How It Works

### Streak Calculation
1. The system tracks daily hydration goal achievements in Firebase
2. Each day the user meets their goal, it's recorded in the history
3. Streak is calculated by checking consecutive days of goal achievement
4. Rewards become claimable when the streak meets or exceeds the required days

### Parent Flow
1. Navigate to Parent Dashboard
2. Tap the gift icon (🎁) in the top right
3. View current streak and all rewards
4. Tap the "+" button to add a new reward
5. Choose number of required streak days
6. Select from presets or create a custom reward
7. Manage rewards from the list (delete if needed)

### Child Flow
1. From the Home screen, tap the gift icon (🎁) in the top bar
2. View current streak and all rewards
3. See progress towards each reward
4. When eligible (green "Claim!" button), tap to claim reward
5. Enjoy celebration animation
6. Ask parent for the reward!

## Key Components

### RewardCard
Displays individual reward with:
- Icon and title
- Description
- Progress bar showing days completed
- Claim button (when eligible)
- Delete button (for parents)
- Claimed badge (for claimed rewards)

### ChildRewardsModal
Full-screen modal for children showing:
- Current streak display
- "Ready to Claim" section for eligible rewards
- "Keep Going" section for in-progress rewards
- "Earned" section for claimed rewards
- Celebration animation on claim

### RewardsScreen
Parent management screen with:
- Current streak card
- Active rewards list
- Claimed rewards history
- Add reward button (floating action button)
- Modal for adding new rewards with presets/custom options

## API Functions

### RewardUtils
- `getUserRewards(userId)`: Fetch all rewards for a user
- `addReward(userId, rewardData)`: Create a new reward
- `updateReward(userId, rewardId, updates)`: Update reward details
- `deleteReward(userId, rewardId)`: Remove a reward
- `claimReward(userId, rewardId)`: Mark reward as claimed
- `checkRewardEligibility(userId, requiredDays)`: Check if user has achieved required streak
- `getConsecutiveDaysStreak(userId)`: Calculate current consecutive days streak

### HydrationHistory
- `trackDailyGoalAchievement(userId, waterIntake, dailyGoal)`: Record goal achievement
- `updateTodayWaterIntake(userId, waterIntake, dailyGoal)`: Update today's progress
- `getHydrationHistory(userId, days)`: Fetch hydration history

## Usage Examples

### Adding a Preset Reward
1. Open Rewards screen
2. Tap "+" button
3. Set required days (e.g., 3)
4. Make sure "Presets" is selected
5. Tap on "Ice Cream Treat"
6. Reward is created and visible in the list

### Creating a Custom Reward
1. Open Rewards screen
2. Tap "+" button
3. Set required days (e.g., 7)
4. Toggle to "Custom"
5. Enter emoji (e.g., 🎸)
6. Enter title (e.g., "Guitar Lessons")
7. Enter description (optional)
8. Tap "Add Custom Reward"

### Claiming a Reward
1. Child opens rewards modal from home screen
2. Sees reward with "Claim!" button (green)
3. Taps "Claim!" button
4. Confirms in dialog
5. Sees celebration animation
6. Reward moves to "Earned" section
7. Asks parent for the reward

## Design Decisions

1. **Consecutive Days**: Rewards require consecutive days instead of total days to encourage daily consistency
2. **Preset Options**: Common rewards are preset to make it easy for parents to quickly add rewards
3. **Emoji Icons**: Using emojis for icons provides a fun, colorful, and universal visual language
4. **Two View Modes**: Separate views for parents (management) and children (claiming) for age-appropriate UX
5. **Celebration**: Simple animated celebration avoids external dependencies while providing positive feedback
6. **History Tracking**: Automatic tracking integrates seamlessly with existing water intake functionality

## Future Enhancements

Potential improvements for future versions:
- Multiple children support with individual reward lists
- Reward points system as an alternative to streak-based rewards
- Reward categories/tags
- Notification reminders for parents when rewards are claimed
- Image uploads for custom reward icons
- Reward expiration dates
- Weekly/monthly challenges
- Shareable achievements
