import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Settings, LogOut } from 'lucide-react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { mockChildren } from '../utils/HydrationData';
import {
    getTodaySummary,
    getWeeklyStreakData,
    getUserProfileStats,
    getMonthlyAverage
} from '../utils/HydrationData';
import DailyGoalCard from '../components/DailyGoalCard';
import WeeklyStreakCalendar from '../components/WeeklyStreakCalendar';
import ProfileStatsCard from '../components/ProfileStatsCard';
import Avatar from '../components/Avatar';
import { useAppSelector } from '../store/hooks';

export default function ProfileScreen() {
    const { user } = useAppSelector((state) => state.user);
    // For now, use the first child's data. In a real app, this would be the logged-in user
    const [userId] = useState(mockChildren[0]?.id || 'child-1');

    const userProfile = getUserProfileStats(userId);
    const todaySummary = getTodaySummary(userId);
    const weekData = getWeeklyStreakData(userId);
    const monthlyAverage = getMonthlyAverage(userId);

    // Get user display name from Firebase auth (email or displayName)
    const userName = user?.displayName || user?.email?.split('@')[0] || 'User';

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut(auth);
                        } catch (error) {
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Avatar
                        source={userProfile.avatar}
                        name={userName}
                        size={60}
                    />
                    <View style={styles.headerText}>
                        <Text style={styles.title}>{userName}</Text>
                        {user?.email && (
                            <Text style={styles.emailText}>{user.email}</Text>
                        )}
                    </View>
                </View>
                <TouchableOpacity style={styles.settingsButton}>
                    <Settings color="#666" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Daily Goal Card */}
                <DailyGoalCard
                    percentage={todaySummary.todayPercentage}
                    glasses={todaySummary.todayGlasses}
                    goal={todaySummary.todayGoal}
                />

                {/* Weekly Streak Calendar */}
                <WeeklyStreakCalendar
                    weekData={weekData}
                    currentStreak={todaySummary.currentStreak}
                />

                {/* Statistics Card */}
                <ProfileStatsCard
                    totalGlasses={userProfile.totalGlassesAllTime}
                    currentStreak={todaySummary.currentStreak}
                    weeklyAverage={todaySummary.weeklyAverage}
                    monthlyAverage={monthlyAverage}
                    bestStreak={userProfile.bestStreak}
                />

                {/* Motivational Message */}
                {todaySummary.currentStreak >= 7 && (
                    <View style={styles.achievementCard}>
                        <Text style={styles.achievementIcon}>🏆</Text>
                        <View style={styles.achievementContent}>
                            <Text style={styles.achievementTitle}>Amazing Streak!</Text>
                            <Text style={styles.achievementText}>
                                You've maintained your hydration goal for {todaySummary.currentStreak} days straight! Keep it up!
                            </Text>
                        </View>
                    </View>
                )}

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut color="#ff4444" size={20} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1ecbe1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarEmoji: {
        fontSize: 32,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    emailText: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    settingsButton: {
        padding: 8,
        marginLeft: -30,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    infoCard: {
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoLabel: {
        fontSize: 15,
        color: '#666',
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    achievementCard: {
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        gap: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    achievementIcon: {
        fontSize: 32,
    },
    achievementContent: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 4,
    },
    achievementText: {
        fontSize: 14,
        color: '#2E7D32',
        lineHeight: 20,
    },
    bottomSpacer: {
        height: 20,
    },
    logoutButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#ff4444',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff4444',
    },
});
