import { ref, get, set, push, update, remove } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { Reward } from '../types/Reward';

/**
 * Get all rewards for a specific user
 */
export const getUserRewards = async (userId: string): Promise<Reward[]> => {
    try {
        const rewardsRef = ref(db, `users/${userId}/rewards`);
        const snapshot = await get(rewardsRef);

        if (!snapshot.exists()) {
            return [];
        }

        const rewardsData = snapshot.val();
        return Object.keys(rewardsData).map(key => ({
            id: key,
            ...rewardsData[key]
        }));
    } catch (error) {
        console.error('Error fetching rewards:', error);
        return [];
    }
};

/**
 * Add a new reward for a user
 */
export const addReward = async (
    userId: string,
    rewardData: Omit<Reward, 'id' | 'createdDate' | 'isClaimed'>
): Promise<string | null> => {
    try {
        const rewardsRef = ref(db, `users/${userId}/rewards`);
        const newRewardRef = push(rewardsRef);

        const reward: Omit<Reward, 'id'> = {
            ...rewardData,
            createdDate: new Date().toISOString(),
            isClaimed: false,
        };

        await set(newRewardRef, reward);
        return newRewardRef.key;
    } catch (error) {
        console.error('Error adding reward:', error);
        return null;
    }
};

/**
 * Update an existing reward
 */
export const updateReward = async (
    userId: string,
    rewardId: string,
    updates: Partial<Reward>
): Promise<boolean> => {
    try {
        const rewardRef = ref(db, `users/${userId}/rewards/${rewardId}`);
        await update(rewardRef, updates);
        return true;
    } catch (error) {
        console.error('Error updating reward:', error);
        return false;
    }
};

/**
 * Delete a reward
 */
export const deleteReward = async (userId: string, rewardId: string): Promise<boolean> => {
    try {
        const rewardRef = ref(db, `users/${userId}/rewards/${rewardId}`);
        await remove(rewardRef);
        return true;
    } catch (error) {
        console.error('Error deleting reward:', error);
        return false;
    }
};

/**
 * Claim a reward
 */
export const claimReward = async (userId: string, rewardId: string): Promise<boolean> => {
    try {
        const rewardRef = ref(db, `users/${userId}/rewards/${rewardId}`);
        await update(rewardRef, {
            isClaimed: true,
            claimedDate: new Date().toISOString(),
            isActive: false,
        });
        return true;
    } catch (error) {
        console.error('Error claiming reward:', error);
        return false;
    }
};

/**
 * Check if user has achieved a reward based on consecutive days
 */
export const checkRewardEligibility = async (
    userId: string,
    requiredDays: number
): Promise<boolean> => {
    try {
        // Get user's water intake history
        const historyRef = ref(db, `users/${userId}/history`);
        const snapshot = await get(historyRef);

        if (!snapshot.exists()) {
            return false;
        }

        const history = snapshot.val();
        const dates = Object.keys(history).sort().reverse();

        // Check consecutive days
        let consecutiveDays = 0;
        const today = new Date();

        for (let i = 0; i < dates.length && i < requiredDays; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];

            if (dates[i] === dateStr && history[dates[i]].goalMet) {
                consecutiveDays++;
            } else {
                break;
            }
        }

        return consecutiveDays >= requiredDays;
    } catch (error) {
        console.error('Error checking reward eligibility:', error);
        return false;
    }
};

/**
 * Get consecutive days streak
 */
export const getConsecutiveDaysStreak = async (userId: string): Promise<number> => {
    try {
        const historyRef = ref(db, `users/${userId}/history`);
        const snapshot = await get(historyRef);

        if (!snapshot.exists()) {
            return 0;
        }

        const history = snapshot.val();
        const dates = Object.keys(history).sort().reverse();

        let streak = 0;
        const today = new Date();

        for (let i = 0; i < dates.length; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];

            if (dates[i] === dateStr && history[dates[i]].goalMet) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    } catch (error) {
        console.error('Error getting streak:', error);
        return 0;
    }
};
