import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { WeeklyStreakData } from '../types';

interface WeeklyStreakCalendarProps {
    weekData: WeeklyStreakData[];
    currentStreak: number;
}

export default function WeeklyStreakCalendar({ weekData, currentStreak }: WeeklyStreakCalendarProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Flame color="#FF6B35" size={20} fill="#FF6B35" />
                <Text style={styles.title}>Weekly Streak</Text>
            </View>

            <View style={styles.streakInfo}>
                <Text style={styles.streakNumber}>{currentStreak}</Text>
                <Text style={styles.streakLabel}>day{currentStreak !== 1 ? 's' : ''} streak</Text>
            </View>

            <View style={styles.daysContainer}>
                {weekData.map((day, index) => (
                    <View key={index} style={styles.dayItem}>
                        <Text style={styles.dayLabel}>{day.dayLabel}</Text>
                        <View
                            style={[
                                styles.dayCircle,
                                day.metGoal && styles.dayCircleActive,
                            ]}
                        >
                            <Text style={[
                                styles.dayNumber,
                                day.metGoal && styles.dayNumberActive,
                            ]}>
                                {day.glasses}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            <Text style={styles.motivationText}>
                Keep drinking & your plant will grow!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    streakInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    streakNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FF6B35',
    },
    streakLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: -8,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    dayItem: {
        alignItems: 'center',
        gap: 8,
    },
    dayLabel: {
        fontSize: 12,
        color: '#999',
        fontWeight: '500',
    },
    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E0E0E0',
    },
    dayCircleActive: {
        backgroundColor: '#333',
        borderColor: '#333',
    },
    dayNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#999',
    },
    dayNumberActive: {
        color: '#FFFFFF',
    },
    motivationText: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 16,
    },
});
