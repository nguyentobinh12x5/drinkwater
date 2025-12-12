import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Users, TrendingUp, Award, Flame, Gift } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { TimeFilter } from '../types';
import { mockChildren, getChartData, getTodaySummary } from '../utils/HydrationData';
import TimeFilterTabs from '../components/TimeFilterTabs';
import ConsumptionChart from '../components/ConsumptionChart';
import TodayProgress from '../components/TodayProgress';
import ChildSelector from '../components/ChildSelector';

export default function ParentScreen() {
    const navigation = useNavigation();
    const [activeChildId, setActiveChildId] = useState(mockChildren[0]?.id || '');
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');

    const chartData = getChartData(activeChildId, timeFilter).map(d => ({
        ...d,
        consumption: (d.consumption || 0) * 250
    }));
    const todaySummary = getTodaySummary(activeChildId);

    const activeChild = mockChildren.find(c => c.id === activeChildId);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Users size={32} />
                <Text style={styles.title}>Parent Dashboard</Text>
                <TouchableOpacity
                    style={styles.rewardsButton}
                    onPress={() => navigation.navigate('Rewards' as never)}
                    activeOpacity={0.7}
                >
                    <Gift size={24} color="#FFD700" />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Child Selector */}
                {mockChildren.length > 1 && (
                    <ChildSelector
                        children={mockChildren}
                        activeChildId={activeChildId}
                        onChildSelect={setActiveChildId}
                    />
                )}

                {/* Today's Progress */}
                <TodayProgress summary={todaySummary} />

                {/* Time Filter Tabs */}
                <TimeFilterTabs
                    activeFilter={timeFilter}
                    onFilterChange={setTimeFilter}
                />

                {/* Consumption Chart */}
                <ConsumptionChart data={chartData} timeFilter={timeFilter} />

                {/* Summary Stats */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Summary & Insights</Text>

                    <View style={styles.statGrid}>
                        <View style={styles.statCard}>
                            <TrendingUp color="#1ecbe1" size={24} />
                            <Text style={styles.statLabel}>Weekly Avg</Text>
                            <Text style={styles.statValue}>{Math.round(todaySummary.weeklyAverage * 250)} ml</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Award color="#FFD700" size={24} />
                            <Text style={styles.statLabel}>Goal</Text>
                            <Text style={styles.statValue}>{Math.round(todaySummary.todayGoal * 250)} ml/day</Text>
                        </View>
                    </View>
                </View>

                {/* Health Alert */}
                {todaySummary.todayPercentage < 50 && (
                    <View style={styles.alertCard}>
                        <Text style={styles.alertIcon}>⚠️</Text>
                        <View style={styles.alertContent}>
                            <Text style={styles.alertTitle}>Hydration Alert</Text>
                            <Text style={styles.alertText}>
                                {activeChild?.name} is behind on today's water intake.
                                Encourage them to drink water!
                            </Text>
                        </View>
                    </View>
                )}

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        gap: 12,
    },
    rewardsButton: {
        position: 'absolute',
        right: 20,
        top: 60,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF9E6',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    childTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
        marginBottom: 12,
    },
    summaryCard: {
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
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    statGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        gap: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    alertCard: {
        backgroundColor: '#FFF3CD',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        gap: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    alertIcon: {
        fontSize: 24,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#856404',
        marginBottom: 4,
    },
    alertText: {
        fontSize: 14,
        color: '#856404',
        lineHeight: 20,
    },
    bottomSpacer: {
        height: 20,
    },
});
