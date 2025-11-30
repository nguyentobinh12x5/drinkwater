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

// Guardian Mode Types

export interface Child {
    id: string;
    name: string;
    age: number;
    avatar: string; // emoji or image
    dailyGoal: number; // glasses per day
}

export interface HydrationRecord {
    id: string;
    childId: string;
    timestamp: Date;
    glasses: number;
    source: 'nfc' | 'manual'; // NFC dispenser or manual entry
}

export type TimeFilter = 'day' | 'week' | 'month';

export interface ChartDataPoint {
    label: string; // Date label
    consumption: number; // Actual glasses consumed
    goal: number; // Daily goal
}

export interface ChildHydrationSummary {
    childId: string;
    todayGlasses: number;
    todayGoal: number;
    todayPercentage: number;
    lastLoggedTime: Date | null;
    weeklyAverage: number;
    currentStreak: number; // Days meeting goal
}
