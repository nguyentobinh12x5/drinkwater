import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Calendar, Target } from 'lucide-react-native';
import { Challenge, ChallengeProgress } from '../types';

interface ChallengeCardProps {
    challenge: Challenge;
    progress: ChallengeProgress[];
}

export default function ChallengeCard({ challenge, progress }: ChallengeCardProps) {
    const daysRemaining = Math.ceil((challenge.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isEnding = daysRemaining <= 2;

    const getChallengeTypeLabel = () => {
        switch (challenge.type) {
            case 'school': return '🏫 School-Wide';
            case 'inter_class': return '⚔️ Class Battle';
            case 'class': return '👥 Class Challenge';
            default: return 'Challenge';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Text style={styles.typeLabel}>{getChallengeTypeLabel()}</Text>
                    <Text style={styles.title}>{challenge.title}</Text>
                </View>
                {isEnding && (
                    <View style={styles.urgentBadge}>
                        <Text style={styles.urgentText}>Ending Soon!</Text>
                    </View>
                )}
            </View>

            <Text style={styles.description}>{challenge.description}</Text>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Calendar color="#666" size={16} />
                    <Text style={styles.infoText}>{daysRemaining} days left</Text>
                </View>
                <View style={styles.infoItem}>
                    <Target color="#666" size={16} />
                    <Text style={styles.infoText}>
                        Goal: {challenge.goal}{challenge.goal < 100 ? '%' : ' glasses'}
                    </Text>
                </View>
            </View>

            <View style={styles.leaderboard}>
                <Text style={styles.leaderboardTitle}>🏆 Leaderboard</Text>
                {progress.map((p, index) => (
                    <View key={p.classId} style={styles.leaderboardRow}>
                        <View style={styles.rankSection}>
                            <View style={[
                                styles.rankBadge,
                                index === 0 && styles.firstPlace,
                                index === 1 && styles.secondPlace,
                                index === 2 && styles.thirdPlace,
                            ]}>
                                <Text style={[
                                    styles.rankText,
                                    index < 3 && styles.rankTextHighlight
                                ]}>
                                    #{p.rank}
                                </Text>
                            </View>
                            <Text style={styles.className}>{p.className}</Text>
                        </View>

                        <View style={styles.progressSection}>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${Math.min(p.percentageComplete, 100)}%` },
                                        index === 0 && { backgroundColor: '#FFD700' },
                                        index === 1 && { backgroundColor: '#C0C0C0' },
                                        index === 2 && { backgroundColor: '#CD7F32' },
                                    ]}
                                />
                            </View>
                            <Text style={styles.progressText}>
                                {p.currentProgress}/{p.goalProgress}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
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
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    titleSection: {
        flex: 1,
    },
    typeLabel: {
        fontSize: 12,
        color: '#1ecbe1',
        fontWeight: '600',
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    urgentBadge: {
        backgroundColor: '#FF9800',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    urgentText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: {
        fontSize: 13,
        color: '#666',
    },
    leaderboard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 12,
    },
    leaderboardTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    leaderboardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 12,
    },
    rankSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: 120,
    },
    rankBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstPlace: {
        backgroundColor: '#FFD700',
    },
    secondPlace: {
        backgroundColor: '#C0C0C0',
    },
    thirdPlace: {
        backgroundColor: '#CD7F32',
    },
    rankText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
    },
    rankTextHighlight: {
        color: '#FFFFFF',
    },
    className: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    progressSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#1ecbe1',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
        width: 60,
        textAlign: 'right',
    },
});
