import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
    Dimensions,
    Animated,
} from 'react-native';
import { Gift, X, Sparkles } from 'lucide-react-native';
import { useAppSelector } from '../store/hooks';
import { Reward } from '../types/Reward';
import {
    getUserRewards,
    getConsecutiveDaysStreak,
    claimReward,
} from '../utils/RewardUtils';
import RewardCard from './RewardCard';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ChildRewardsModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function ChildRewardsModal({ visible, onClose }: ChildRewardsModalProps) {
    const { user } = useAppSelector((state) => state.user);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [loading, setLoading] = useState(true);
    const celebrationAnim = React.useRef(new Animated.Value(0)).current;
    const [showCelebration, setShowCelebration] = React.useState(false);

    useEffect(() => {
        if (visible) {
            loadData();
        }
    }, [visible, user]);

    const loadData = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const [rewardsData, streak] = await Promise.all([
                getUserRewards(user.uid),
                getConsecutiveDaysStreak(user.uid),
            ]);

            setRewards(rewardsData.filter((r) => r.isActive || r.isClaimed));
            setCurrentStreak(streak);
        } catch (error) {
            console.error('Error loading rewards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClaimReward = async (reward: Reward) => {
        if (!user) return;

        Alert.alert(
            '🎉 Claim Reward',
            `Congratulations! You've earned "${reward.title}"! Ask your parent to give you this reward!`,
            [
                {
                    text: 'Claim',
                    onPress: async () => {
                        const success = await claimReward(user.uid, reward.id);
                        if (success) {
                            // Trigger celebration animation
                            setShowCelebration(true);
                            Animated.sequence([
                                Animated.timing(celebrationAnim, {
                                    toValue: 1,
                                    duration: 500,
                                    useNativeDriver: true,
                                }),
                                Animated.timing(celebrationAnim, {
                                    toValue: 0,
                                    duration: 500,
                                    useNativeDriver: true,
                                }),
                            ]).start(() => setShowCelebration(false));

                            loadData();
                        } else {
                            Alert.alert('Error', 'Failed to claim reward');
                        }
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    const eligibleRewards = rewards.filter(
        (r) => !r.isClaimed && currentStreak >= r.requiredDays
    );
    const inProgressRewards = rewards.filter(
        (r) => !r.isClaimed && currentStreak < r.requiredDays
    );
    const claimedRewards = rewards.filter((r) => r.isClaimed);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <LinearGradient
                        colors={['#FFD700', '#FFA500']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.header}
                    >
                        <View style={styles.headerContent}>
                            <Gift size={28} color="#FFFFFF" />
                            <Text style={styles.headerTitle}>My Rewards</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Streak Display */}
                    <View style={styles.streakBanner}>
                        <Sparkles color="#FFD700" size={24} />
                        <Text style={styles.streakText}>
                            {currentStreak} Day Streak! 🔥
                        </Text>
                        <Sparkles color="#FFD700" size={24} />
                    </View>

                    <ScrollView
                        style={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Eligible Rewards */}
                        {eligibleRewards.length > 0 && (
                            <>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>
                                        🎉 Ready to Claim!
                                    </Text>
                                </View>
                                {eligibleRewards.map((reward) => (
                                    <RewardCard
                                        key={reward.id}
                                        reward={reward}
                                        currentStreak={currentStreak}
                                        onClaim={handleClaimReward}
                                        isParentView={false}
                                    />
                                ))}
                            </>
                        )}

                        {/* In Progress Rewards */}
                        {inProgressRewards.length > 0 && (
                            <>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>Keep Going! 💪</Text>
                                </View>
                                {inProgressRewards.map((reward) => (
                                    <RewardCard
                                        key={reward.id}
                                        reward={reward}
                                        currentStreak={currentStreak}
                                        isParentView={false}
                                    />
                                ))}
                            </>
                        )}

                        {/* Claimed Rewards */}
                        {claimedRewards.length > 0 && (
                            <>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>Earned! ✨</Text>
                                </View>
                                {claimedRewards.map((reward) => (
                                    <RewardCard
                                        key={reward.id}
                                        reward={reward}
                                        currentStreak={currentStreak}
                                        isParentView={false}
                                    />
                                ))}
                            </>
                        )}

                        {/* Empty State */}
                        {rewards.length === 0 && !loading && (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyIcon}>🎁</Text>
                                <Text style={styles.emptyTitle}>No Rewards Yet</Text>
                                <Text style={styles.emptyText}>
                                    Ask your parent to add rewards for you!
                                </Text>
                            </View>
                        )}

                        <View style={styles.bottomSpacer} />
                    </ScrollView>

                    {/* Celebration Animation */}
                    {showCelebration && (
                        <Animated.View
                            style={[
                                styles.celebrationOverlay,
                                {
                                    opacity: celebrationAnim,
                                    transform: [
                                        {
                                            scale: celebrationAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0.5, 1.5],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Text style={styles.celebrationText}>🎉✨🎊</Text>
                        </Animated.View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#F0F8FF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    closeButton: {
        padding: 4,
    },
    streakBanner: {
        backgroundColor: '#FFF9E6',
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#FFE5B4',
    },
    streakText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8C00',
    },
    scrollContent: {
        flex: 1,
        padding: 20,
    },
    sectionHeader: {
        marginBottom: 12,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    bottomSpacer: {
        height: 20,
    },
    celebrationOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        pointerEvents: 'none',
    },
    celebrationText: {
        fontSize: 100,
    },
});
