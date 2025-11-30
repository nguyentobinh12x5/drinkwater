import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { GraduationCap, BarChart3, AlertCircle, Trophy } from 'lucide-react-native';
import { getAllClassStats, getStudentFlags, getActiveChallenges, getChallengeProgress } from '../utils/SchoolData';
import ClassStatsCard from '../components/ClassStatsCard';
import HealthFlags from '../components/HealthFlags';
import ChallengeCard from '../components/ChallengeCard';

type TabType = 'overview' | 'health' | 'challenges';

export default function SchoolScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const classStats = getAllClassStats();
    const healthFlags = getStudentFlags();
    const activeChallenges = getActiveChallenges();

    const renderTabButton = (tab: TabType, icon: React.ReactNode, label: string) => (
        <TouchableOpacity
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
        >
            {icon}
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {label}
            </Text>
            {tab === 'health' && healthFlags.length > 0 && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>{healthFlags.length}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <GraduationCap size={32} color="#1ecbe1" />
                    <Text style={styles.title}>Teacher Dashboard</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabBar}>
                {renderTabButton('overview', <BarChart3 size={20} color={activeTab === 'overview' ? '#FFFFFF' : '#666'} />, 'Overview')}
                {renderTabButton('health', <AlertCircle size={20} color={activeTab === 'health' ? '#FFFFFF' : '#666'} />, 'Health')}
                {renderTabButton('challenges', <Trophy size={20} color={activeTab === 'challenges' ? '#FFFFFF' : '#666'} />, 'Challenges')}
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>📊 Class Statistics</Text>
                            <Text style={styles.sectionSubtitle}>
                                Privacy-first: Anonymized class-level data only
                            </Text>
                        </View>

                        {classStats.map(stats => (
                            <ClassStatsCard key={stats.classId} stats={stats} />
                        ))}

                        <View style={styles.privacyNote}>
                            <Text style={styles.privacyText}>
                                🔒 Individual student data is protected. Only aggregated,
                                anonymized statistics are shown to respect student privacy.
                            </Text>
                        </View>
                    </>
                )}

                {/* Health Tab */}
                {activeTab === 'health' && (
                    <>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>🏥 Health Monitoring</Text>
                            <Text style={styles.sectionSubtitle}>
                                Identify students needing support (not punishment)
                            </Text>
                        </View>

                        <HealthFlags flags={healthFlags} />

                        <View style={styles.infoCard}>
                            <Text style={styles.infoTitle}>💡 Best Practices</Text>
                            <Text style={styles.infoText}>
                                • Approach with care and concern, not discipline{'\n'}
                                • Consider health factors (illness, medication, etc.){'\n'}
                                • Involve parents/guardians for support{'\n'}
                                • Provide encouragement and positive reinforcement
                            </Text>
                        </View>
                    </>
                )}

                {/* Challenges Tab */}
                {activeTab === 'challenges' && (
                    <>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>🏆 Active Challenges</Text>
                            <Text style={styles.sectionSubtitle}>
                                School-wide and inter-class competitions
                            </Text>
                        </View>

                        {activeChallenges.length > 0 ? (
                            activeChallenges.map(challenge => (
                                <ChallengeCard
                                    key={challenge.id}
                                    challenge={challenge}
                                    progress={getChallengeProgress(challenge.id)}
                                />
                            ))
                        ) : (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>No active challenges</Text>
                                <Text style={styles.emptySubtext}>
                                    Create a new challenge to motivate students!
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity style={styles.createButton}>
                            <Text style={styles.createButtonText}>+ Create New Challenge</Text>
                        </TouchableOpacity>
                    </>
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
        justifyContent: 'center',
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
        borderRadius: 8,
        position: 'relative',
    },
    activeTab: {
        backgroundColor: '#1ecbe1',
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    notificationBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#FF9800',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    notificationText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
    },
    privacyNote: {
        backgroundColor: '#E8F5E9',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    privacyText: {
        fontSize: 13,
        color: '#2E7D32',
        lineHeight: 20,
    },
    infoCard: {
        backgroundColor: '#FFF9F0',
        borderRadius: 12,
        padding: 16,
        marginTop: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 22,
    },
    emptyState: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#999',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    createButton: {
        backgroundColor: '#1ecbe1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#1ecbe1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    createButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomSpacer: {
        height: 20,
    },
});
