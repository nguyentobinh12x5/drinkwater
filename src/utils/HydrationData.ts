import { Child, HydrationRecord, ChartDataPoint, ChildHydrationSummary, TimeFilter } from '../types';

// Mock children data
export const mockChildren: Child[] = [
    {
        id: 'child-1',
        name: 'Emma',
        age: 8,
        avatar: '👧',
        dailyGoal: 8,
    },
    {
        id: 'child-2',
        name: 'Lucas',
        age: 10,
        avatar: '👦',
        dailyGoal: 10,
    },
];

// Generate mock hydration records for the past 30 days
export const generateMockRecords = (childId: string, dailyGoal: number): HydrationRecord[] => {
    const records: HydrationRecord[] = [];
    const now = new Date();

    for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
        const date = new Date(now);
        date.setDate(date.getDate() - dayOffset);

        // Random number of glasses per day (varying between 60-120% of goal)
        const glassesPerDay = Math.floor(dailyGoal * (0.6 + Math.random() * 0.6));

        // Create 3-8 random entries throughout the day
        const entriesCount = 3 + Math.floor(Math.random() * 6);
        let remainingGlasses = glassesPerDay;

        for (let i = 0; i < entriesCount && remainingGlasses > 0; i++) {
            const timestamp = new Date(date);
            timestamp.setHours(8 + Math.floor(Math.random() * 12)); // Between 8 AM - 8 PM
            timestamp.setMinutes(Math.floor(Math.random() * 60));

            const glasses = Math.min(1 + Math.floor(Math.random() * 2), remainingGlasses);
            remainingGlasses -= glasses;

            records.push({
                id: `record-${childId}-${dayOffset}-${i}`,
                childId,
                timestamp,
                glasses,
                source: Math.random() > 0.3 ? 'nfc' : 'manual',
            });
        }
    }

    return records.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Get records for a specific child
export const getChildRecords = (childId: string): HydrationRecord[] => {
    const child = mockChildren.find(c => c.id === childId);
    if (!child) return [];
    return generateMockRecords(childId, child.dailyGoal);
};

// Filter records by time period
const filterRecordsByTime = (records: HydrationRecord[], filter: TimeFilter): HydrationRecord[] => {
    const now = new Date();
    const startDate = new Date();

    switch (filter) {
        case 'day':
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'week':
            startDate.setDate(now.getDate() - 7);
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'month':
            startDate.setDate(now.getDate() - 30);
            startDate.setHours(0, 0, 0, 0);
            break;
    }

    return records.filter(r => r.timestamp >= startDate);
};

// Get chart data for a specific time filter
export const getChartData = (childId: string, filter: TimeFilter): ChartDataPoint[] => {
    const child = mockChildren.find(c => c.id === childId);
    if (!child) return [];

    const records = getChildRecords(childId);
    const dataPoints: ChartDataPoint[] = [];
    const now = new Date();

    if (filter === 'day') {
        // Last 7 days
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDay = new Date(date);
            nextDay.setDate(nextDay.getDate() + 1);

            const dayRecords = records.filter(
                r => r.timestamp >= date && r.timestamp < nextDay
            );

            const consumption = dayRecords.reduce((sum, r) => sum + r.glasses, 0);

            dataPoints.push({
                label: date.toLocaleDateString('en-US', { weekday: 'short' }),
                consumption,
                goal: child.dailyGoal,
            });
        }
    } else if (filter === 'week') {
        // Last 4 weeks
        for (let i = 3; i >= 0; i--) {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - (i * 7) - 6);
            weekStart.setHours(0, 0, 0, 0);

            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);

            const weekRecords = records.filter(
                r => r.timestamp >= weekStart && r.timestamp < weekEnd
            );

            const consumption = weekRecords.reduce((sum, r) => sum + r.glasses, 0);
            const weekGoal = child.dailyGoal * 7;

            dataPoints.push({
                label: `W${4 - i}`,
                consumption,
                goal: weekGoal,
            });
        }
    } else {
        // Last 6 months
        for (let i = 5; i >= 0; i--) {
            const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

            const monthRecords = records.filter(
                r => r.timestamp >= monthStart && r.timestamp < monthEnd
            );

            const daysInMonth = new Date(monthEnd.getTime() - 1).getDate();
            const consumption = monthRecords.reduce((sum, r) => sum + r.glasses, 0);
            const monthGoal = child.dailyGoal * daysInMonth;

            dataPoints.push({
                label: monthStart.toLocaleDateString('en-US', { month: 'short' }),
                consumption,
                goal: monthGoal,
            });
        }
    }

    return dataPoints;
};

// Get today's summary for a child
export const getTodaySummary = (childId: string): ChildHydrationSummary => {
    const child = mockChildren.find(c => c.id === childId);
    if (!child) {
        return {
            childId,
            todayGlasses: 0,
            todayGoal: 8,
            todayPercentage: 0,
            lastLoggedTime: null,
            weeklyAverage: 0,
            currentStreak: 0,
        };
    }

    const records = getChildRecords(childId);
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // Today's records
    const todayRecords = records.filter(r => r.timestamp >= todayStart);
    const todayGlasses = todayRecords.reduce((sum, r) => sum + r.glasses, 0);

    // Last logged time
    const lastLoggedTime = todayRecords.length > 0 ? todayRecords[0].timestamp : null;

    // Weekly average
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekRecords = records.filter(r => r.timestamp >= weekStart);
    const weeklyAverage = weekRecords.reduce((sum, r) => sum + r.glasses, 0) / 7;

    // Calculate streak (days meeting goal)
    let currentStreak = 0;
    for (let i = 0; i < 30; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);

        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);

        const dayRecords = records.filter(
            r => r.timestamp >= date && r.timestamp < nextDay
        );

        const dayTotal = dayRecords.reduce((sum, r) => sum + r.glasses, 0);

        if (dayTotal >= child.dailyGoal) {
            currentStreak++;
        } else {
            break;
        }
    }

    return {
        childId,
        todayGlasses,
        todayGoal: child.dailyGoal,
        todayPercentage: Math.round((todayGlasses / child.dailyGoal) * 100),
        lastLoggedTime,
        weeklyAverage: Math.round(weeklyAverage * 10) / 10,
        currentStreak,
    };
};
