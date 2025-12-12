import { ref, get, set, update } from 'firebase/database';
import { db } from '../../firebaseConfig';

/**
 * Track daily water intake goal achievement
 * This function is called when user's water intake reaches the daily goal
 */
export const trackDailyGoalAchievement = async (
    userId: string,
    waterIntake: number,
    dailyGoal: number = 1250
): Promise<boolean> => {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        const historyRef = ref(db, `users/${userId}/history/${today}`);

        const goalMet = waterIntake >= dailyGoal;

        await set(historyRef, {
            date: today,
            waterIntake: waterIntake,
            goal: dailyGoal,
            goalMet: goalMet,
            timestamp: new Date().toISOString(),
        });

        return true;
    } catch (error) {
        console.error('Error tracking daily goal:', error);
        return false;
    }
};

/**
 * Update today's water intake in history
 * Call this whenever water intake changes
 */
export const updateTodayWaterIntake = async (
    userId: string,
    waterIntake: number,
    dailyGoal: number = 1250
): Promise<void> => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const historyRef = ref(db, `users/${userId}/history/${today}`);

        const snapshot = await get(historyRef);
        const goalMet = waterIntake >= dailyGoal;

        if (snapshot.exists()) {
            // Update existing record
            await update(historyRef, {
                waterIntake: waterIntake,
                goalMet: goalMet,
                timestamp: new Date().toISOString(),
            });
        } else {
            // Create new record
            await set(historyRef, {
                date: today,
                waterIntake: waterIntake,
                goal: dailyGoal,
                goalMet: goalMet,
                timestamp: new Date().toISOString(),
            });
        }
    } catch (error) {
        console.error('Error updating today water intake:', error);
    }
};

/**
 * Get user's hydration history
 */
export const getHydrationHistory = async (
    userId: string,
    days: number = 30
): Promise<any[]> => {
    try {
        const historyRef = ref(db, `users/${userId}/history`);
        const snapshot = await get(historyRef);

        if (!snapshot.exists()) {
            return [];
        }

        const history = snapshot.val();
        const dates = Object.keys(history)
            .sort()
            .reverse()
            .slice(0, days);

        return dates.map(date => ({
            date,
            ...history[date],
        }));
    } catch (error) {
        console.error('Error getting hydration history:', error);
        return [];
    }
};
