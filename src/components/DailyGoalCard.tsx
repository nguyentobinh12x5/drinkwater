import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target } from 'lucide-react-native';

interface DailyGoalCardProps {
    percentage: number;
    glasses: number;
    goal: number;
}

export default function DailyGoalCard({ percentage, glasses, goal }: DailyGoalCardProps) {
    // Calculate ml (assuming 250ml per glass)
    const mlConsumed = glasses * 250;
    const mlGoal = goal * 250;
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4A90E2', '#1ecbe1', '#95c6ffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Target color="#FFFFFF" size={20} />
                    <Text style={styles.titleText}>Daily Goal</Text>
                </View>

                {/* Percentage Display */}
                <View style={styles.percentageContainer}>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                    <Text style={styles.mlText}>
                        {mlConsumed} ml / {mlGoal} ml
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    gradient: {
        padding: 24,
        minHeight: 200,
        justifyContent: 'space-between',
    },
    percentageContainer: {
        alignItems: 'flex-start',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    percentageText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    mlText: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
        marginTop: 4,
    },
});
