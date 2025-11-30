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

export interface UserProfile extends User {
    age: number;
    avatar: any; // ImageSourcePropType or emoji string
    joinDate: Date;
    totalGlassesAllTime: number;
    bestStreak: number;
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
    avatar: any; // ImageSourcePropType or emoji string
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

// School/Teacher Mode Types

export interface Student {
    id: string;
    name: string;
    classId: string;
    dailyGoal: number;
    isAnonymized?: boolean; // For privacy
}

export interface ClassRoom {
    id: string;
    name: string; // e.g., "Class 4A"
    teacherId: string;
    studentCount: number;
}

export interface ClassStats {
    classId: string;
    className: string;
    totalStudents: number;
    studentsMetGoal: number;
    percentageMetGoal: number;
    averageConsumption: number;
    lowIntakeCount: number; // Students below threshold
}

export interface StudentFlag {
    studentId: string;
    studentName: string;
    classId: string;
    reason: 'low_intake' | 'no_activity' | 'health_concern';
    severity: 'low' | 'medium' | 'high';
    daysConsecutive: number;
    averageIntake: number;
    recommendedGoal: number;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: 'class' | 'school' | 'inter_class';
    startDate: Date;
    endDate: Date;
    goal: number; // Total glasses or percentage
    participants: string[]; // Class IDs
    isActive: boolean;
}

export interface ChallengeProgress {
    challengeId: string;
    classId: string;
    className: string;
    currentProgress: number;
    goalProgress: number;
    percentageComplete: number;
    rank: number;
}

export interface WeeklyStreakData {
    date: Date;
    dayLabel: string; // 'Sun', 'Mon', etc.
    glasses: number;
    goal: number;
    metGoal: boolean;
}
