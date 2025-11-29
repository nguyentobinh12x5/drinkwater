// Common type definitions for the app

export interface WaterLog {
    id: string;
    timestamp: Date;
    amount: number; // in ml or glasses
}

export interface User {
    id: string;
    name: string;
    dailyGoal: number; // glasses per day
    reminderEnabled: boolean;
}

export interface DailyStats {
    date: string;
    totalGlasses: number;
    goal: number;
    percentage: number;
}
