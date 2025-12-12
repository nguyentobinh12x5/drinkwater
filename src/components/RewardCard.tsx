import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Reward } from '../types/Reward';
import { Trash2, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface RewardCardProps {
    reward: Reward;
    currentStreak: number;
    onClaim?: (reward: Reward) => void;
    onDelete?: (reward: Reward) => void;
    isParentView?: boolean;
}

export default function RewardCard({
    reward,
    currentStreak,
    onClaim,
    onDelete,
    isParentView = false
}: RewardCardProps) {
    const progress = Math.min((currentStreak / reward.requiredDays) * 100, 100);
    const isEligible = currentStreak >= reward.requiredDays && !reward.isClaimed;

    return (
        <View style={[
            styles.card,
            reward.isClaimed && styles.claimedCard
        ]}>
            {/* Icon Section */}
            <View style={styles.iconContainer}>
                <Text style={styles.iconText}>{reward.icon}</Text>
            </View>

            {/* Content Section */}
            <View style={styles.content}>
                <Text style={[styles.title, reward.isClaimed && styles.claimedText]}>
                    {reward.title}
                </Text>
                {reward.description && (
                    <Text style={[styles.description, reward.isClaimed && styles.claimedText]}>
                        {reward.description}
                    </Text>
                )}

                {/* Progress Section */}
                {!reward.isClaimed ? (
                    <View style={styles.progressSection}>
                        <View style={styles.progressBar}>
                            <LinearGradient
                                colors={['#95c6ffff', '#52d0faff', '#1ecbe1']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.progressFill, { width: `${progress}%` }]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {currentStreak}/{reward.requiredDays} days
                        </Text>
                    </View>
                ) : (
                    <View style={styles.claimedBadge}>
                        <Check color="#4CAF50" size={16} />
                        <Text style={styles.claimedBadgeText}>Claimed!</Text>
                    </View>
                )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
                {isParentView && !reward.isClaimed && onDelete && (
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => onDelete(reward)}
                        activeOpacity={0.7}
                    >
                        <Trash2 color="#ff4444" size={20} />
                    </TouchableOpacity>
                )}

                {!isParentView && isEligible && onClaim && (
                    <TouchableOpacity
                        style={styles.claimButton}
                        onPress={() => onClaim(reward)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.claimButtonText}>Claim!</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    claimedCard: {
        backgroundColor: '#F5F5F5',
        opacity: 0.8,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconText: {
        fontSize: 32,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    claimedText: {
        color: '#999',
        textDecorationLine: 'line-through',
    },
    progressSection: {
        marginTop: 4,
    },
    progressBar: {
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
    },
    progressText: {
        fontSize: 11,
        color: '#666',
        fontWeight: '600',
    },
    claimedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    claimedBadgeText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    actions: {
        marginLeft: 8,
    },
    deleteButton: {
        padding: 8,
    },
    claimButton: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    claimButtonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
