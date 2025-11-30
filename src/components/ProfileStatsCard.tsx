import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, Award, Droplet, Calendar } from 'lucide-react-native';

interface ProfileStatsCardProps {
    totalGlasses: number;
    currentStreak: number;
    weeklyAverage: number;
    monthlyAverage: number;
    bestStreak: number;
}

export default function ProfileStatsCard({
    totalGlasses,
    currentStreak,
    weeklyAverage,
    monthlyAverage,
    bestStreak,
}: ProfileStatsCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Statistics</Text>

            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Droplet color="#1ecbe1" size={24} />
                    <Text style={styles.statValue}>{totalGlasses}</Text>
                    <Text style={styles.statLabel}>Total Glasses</Text>
                </View>

                <View style={styles.statCard}>
                    <Award color="#FFD700" size={24} />
                    <Text style={styles.statValue}>{bestStreak}</Text>
                    <Text style={styles.statLabel}>Best Streak</Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <TrendingUp color="#4CAF50" size={24} />
                    <Text style={styles.statValue}>{weeklyAverage}</Text>
                    <Text style={styles.statLabel}>Weekly Avg</Text>
                </View>

                <View style={styles.statCard}>
                    <Calendar color="#9C27B0" size={24} />
                    <Text style={styles.statValue}>{monthlyAverage}</Text>
                    <Text style={styles.statLabel}>Monthly Avg</Text>
                </View>
            </View>
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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        gap: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});
