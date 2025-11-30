import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Droplet, Clock } from 'lucide-react-native';
import { ChildHydrationSummary } from '../types';

interface TodayProgressProps {
    summary: ChildHydrationSummary;
}

export default function TodayProgress({ summary }: TodayProgressProps) {
    const percentage = Math.min(summary.todayPercentage, 100);
    const isOnTrack = percentage >= 75;
    const isComplete = percentage >= 100;

    const statusText = isComplete ? 'Goal Achieved! 🎉' : isOnTrack ? 'On Track' : 'Behind Schedule';
    const statusColor = isComplete ? '#4CAF50' : isOnTrack ? '#1ecbe1' : '#FF9800';

    const formatTime = (date: Date | null) => {
        if (!date) return 'No logs today';
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Progress</Text>

            <View style={styles.progressSection}>
                <View style={styles.circleContainer}>
                    <LinearGradient
                        colors={isComplete ? ['#4CAF50', '#45A049'] : ['#95c6ffff', '#1ecbe1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.progressCircle}
                    >
                        <Text style={styles.percentageText}>{percentage}%</Text>
                        <Droplet color="#FFFFFF" size={28} fill="#FFFFFF" />
                    </LinearGradient>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Consumed</Text>
                        <Text style={styles.statValue}>
                            {summary.todayGlasses * 250} / {summary.todayGoal * 250} ml
                        </Text>
                    </View>

                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Remaining</Text>
                        <Text style={styles.statValue}>
                            {Math.max(0, (summary.todayGoal - summary.todayGlasses) * 250)} ml
                        </Text>
                    </View>

                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                        <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Clock color="#666" size={16} />
                    <Text style={styles.infoText}>Last logged: {formatTime(summary.lastLoggedTime)}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    progressSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 16,
    },
    circleContainer: {
        alignItems: 'center',
    },
    progressCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3096fdff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    percentageText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statsContainer: {
        flex: 1,
        gap: 8,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    statValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    statusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
    },
    infoRow: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        fontSize: 13,
        color: '#666',
    },
});
