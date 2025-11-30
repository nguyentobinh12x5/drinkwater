import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react-native';
import { ClassStats } from '../types';

interface ClassStatsCardProps {
    stats: ClassStats;
}

export default function ClassStatsCard({ stats }: ClassStatsCardProps) {
    const getStatusColor = () => {
        if (stats.percentageMetGoal >= 80) return '#4CAF50';
        if (stats.percentageMetGoal >= 60) return '#FF9800';
        return '#F44336';
    };

    const statusColor = getStatusColor();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.className}>{stats.className}</Text>
                <View style={[styles.badge, { backgroundColor: statusColor + '20' }]}>
                    <Text style={[styles.badgeText, { color: statusColor }]}>
                        {stats.percentageMetGoal}%
                    </Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <Users color="#666" size={18} />
                    <Text style={styles.statLabel}>Students</Text>
                    <Text style={styles.statValue}>{stats.totalStudents}</Text>
                </View>

                <View style={styles.statItem}>
                    <TrendingUp color="#1ecbe1" size={18} />
                    <Text style={styles.statLabel}>Met Goal</Text>
                    <Text style={styles.statValue}>{stats.studentsMetGoal}/{stats.totalStudents}</Text>
                </View>

                <View style={styles.statItem}>
                    <AlertTriangle
                        color={stats.lowIntakeCount > 0 ? '#FF9800' : '#999'}
                        size={18}
                    />
                    <Text style={styles.statLabel}>Low Intake</Text>
                    <Text style={[
                        styles.statValue,
                        stats.lowIntakeCount > 0 && { color: '#FF9800' }
                    ]}>
                        {stats.lowIntakeCount}
                    </Text>
                </View>
            </View>

            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${stats.percentageMetGoal}%`,
                            backgroundColor: statusColor
                        }
                    ]}
                />
            </View>

            <Text style={styles.averageText}>
                Average: {stats.averageConsumption} glasses/student
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    className: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    statLabel: {
        fontSize: 11,
        color: '#666',
        textAlign: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    progressBar: {
        height: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    averageText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});
