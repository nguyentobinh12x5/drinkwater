import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Gift, Plus, X } from 'lucide-react-native';
import { useAppSelector } from '../store/hooks';
import { Reward, REWARD_PRESETS, RewardPreset } from '../types/Reward';
import {
    getUserRewards,
    addReward,
    deleteReward,
    getConsecutiveDaysStreak,
} from '../utils/RewardUtils';
import RewardCard from '../components/RewardCard';

export default function RewardsScreen() {
    const { user } = useAppSelector((state) => state.user);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPresets, setShowPresets] = useState(true);
    const [customTitle, setCustomTitle] = useState('');
    const [customIcon, setCustomIcon] = useState('🎁');
    const [customDescription, setCustomDescription] = useState('');
    const [requiredDays, setRequiredDays] = useState('3');

    // Load rewards and streak data
    useEffect(() => {
        loadData();
    }, [user]);

    const loadData = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const [rewardsData, streak] = await Promise.all([
                getUserRewards(user.uid),
                getConsecutiveDaysStreak(user.uid),
            ]);

            setRewards(rewardsData.filter(r => r.isActive || r.isClaimed));
            setCurrentStreak(streak);
        } catch (error) {
            console.error('Error loading rewards:', error);
            Alert.alert('Error', 'Failed to load rewards');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPreset = async (preset: RewardPreset) => {
        if (!user) return;

        const days = parseInt(requiredDays) || 3;
        const rewardData = {
            title: preset.title,
            description: preset.description,
            icon: preset.icon,
            requiredDays: days,
            isActive: true,
        };

        const rewardId = await addReward(user.uid, rewardData);
        if (rewardId) {
            Alert.alert('Success', `Reward "${preset.title}" added!`);
            loadData();
            setShowAddModal(false);
            setRequiredDays('3');
        } else {
            Alert.alert('Error', 'Failed to add reward');
        }
    };

    const handleAddCustom = async () => {
        if (!user || !customTitle.trim()) {
            Alert.alert('Error', 'Please enter a reward title');
            return;
        }

        const days = parseInt(requiredDays) || 3;
        const rewardData = {
            title: customTitle.trim(),
            description: customDescription.trim() || undefined,
            icon: customIcon,
            requiredDays: days,
            isActive: true,
        };

        const rewardId = await addReward(user.uid, rewardData);
        if (rewardId) {
            Alert.alert('Success', 'Custom reward added!');
            loadData();
            setShowAddModal(false);
            setCustomTitle('');
            setCustomDescription('');
            setCustomIcon('🎁');
            setRequiredDays('3');
            setShowPresets(true);
        } else {
            Alert.alert('Error', 'Failed to add reward');
        }
    };

    const handleDeleteReward = async (reward: Reward) => {
        if (!user) return;

        Alert.alert(
            'Delete Reward',
            `Are you sure you want to delete "${reward.title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const success = await deleteReward(user.uid, reward.id);
                        if (success) {
                            Alert.alert('Success', 'Reward deleted');
                            loadData();
                        } else {
                            Alert.alert('Error', 'Failed to delete reward');
                        }
                    },
                },
            ]
        );
    };

    const activeRewards = rewards.filter((r) => !r.isClaimed);
    const claimedRewards = rewards.filter((r) => r.isClaimed);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Gift size={32} color="#FFD700" />
                <Text style={styles.title}>Rewards</Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1ecbe1" />
                </View>
            ) : (
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Current Streak Card */}
                    <View style={styles.streakCard}>
                        <Text style={styles.streakTitle}>Current Streak</Text>
                        <Text style={styles.streakValue}>🔥 {currentStreak} days</Text>
                        <Text style={styles.streakSubtext}>
                            Keep meeting your daily goal!
                        </Text>
                    </View>

                    {/* Active Rewards */}
                    {activeRewards.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Active Rewards</Text>
                            {activeRewards.map((reward) => (
                                <RewardCard
                                    key={reward.id}
                                    reward={reward}
                                    currentStreak={currentStreak}
                                    onDelete={handleDeleteReward}
                                    isParentView={true}
                                />
                            ))}
                        </>
                    )}

                    {/* Claimed Rewards */}
                    {claimedRewards.length > 0 && (
                        <>
                            <Text style={styles.sectionTitle}>Claimed Rewards</Text>
                            {claimedRewards.map((reward) => (
                                <RewardCard
                                    key={reward.id}
                                    reward={reward}
                                    currentStreak={currentStreak}
                                    isParentView={true}
                                />
                            ))}
                        </>
                    )}

                    {/* Empty State */}
                    {activeRewards.length === 0 && claimedRewards.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🎁</Text>
                            <Text style={styles.emptyTitle}>No Rewards Yet</Text>
                            <Text style={styles.emptyText}>
                                Add rewards to motivate your child to meet their hydration goals!
                            </Text>
                        </View>
                    )}

                    <View style={styles.bottomSpacer} />
                </ScrollView>
            )}

            {/* Add Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddModal(true)}
                activeOpacity={0.8}
            >
                <Plus color="#FFFFFF" size={32} />
            </TouchableOpacity>

            {/* Add Reward Modal */}
            <Modal
                visible={showAddModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowAddModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add Reward</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowAddModal(false);
                                    setShowPresets(true);
                                }}
                            >
                                <X size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Days Selector */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Required Days</Text>
                                <TextInput
                                    style={styles.input}
                                    value={requiredDays}
                                    onChangeText={setRequiredDays}
                                    keyboardType="number-pad"
                                    placeholder="3"
                                />
                                <Text style={styles.helpText}>
                                    Number of consecutive days to achieve goal
                                </Text>
                            </View>

                            {/* Toggle between Presets and Custom */}
                            <View style={styles.toggleContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.toggleButton,
                                        showPresets && styles.toggleButtonActive,
                                    ]}
                                    onPress={() => setShowPresets(true)}
                                >
                                    <Text
                                        style={[
                                            styles.toggleText,
                                            showPresets && styles.toggleTextActive,
                                        ]}
                                    >
                                        Presets
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.toggleButton,
                                        !showPresets && styles.toggleButtonActive,
                                    ]}
                                    onPress={() => setShowPresets(false)}
                                >
                                    <Text
                                        style={[
                                            styles.toggleText,
                                            !showPresets && styles.toggleTextActive,
                                        ]}
                                    >
                                        Custom
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Presets List */}
                            {showPresets ? (
                                <View style={styles.presetsGrid}>
                                    {REWARD_PRESETS.map((preset, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.presetCard}
                                            onPress={() => handleAddPreset(preset)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.presetIcon}>{preset.icon}</Text>
                                            <Text style={styles.presetTitle}>
                                                {preset.title}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                /* Custom Form */
                                <View>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Icon (Emoji)</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={customIcon}
                                            onChangeText={setCustomIcon}
                                            placeholder="🎁"
                                            maxLength={2}
                                        />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Reward Title</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={customTitle}
                                            onChangeText={setCustomTitle}
                                            placeholder="Enter reward name"
                                        />
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>
                                            Description (Optional)
                                        </Text>
                                        <TextInput
                                            style={styles.input}
                                            value={customDescription}
                                            onChangeText={setCustomDescription}
                                            placeholder="Enter description"
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={styles.addCustomButton}
                                        onPress={handleAddCustom}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.addCustomButtonText}>
                                            Add Custom Reward
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 20,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    streakCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    streakTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    streakValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    streakSubtext: {
        fontSize: 12,
        color: '#999',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        marginTop: 8,
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
        height: 100,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#F8F9FA',
    },
    helpText: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleButtonActive: {
        backgroundColor: '#FFFFFF',
    },
    toggleText: {
        fontSize: 14,
        color: '#999',
        fontWeight: '600',
    },
    toggleTextActive: {
        color: '#333',
    },
    presetsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    presetCard: {
        width: '30%',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    presetIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    presetTitle: {
        fontSize: 11,
        color: '#333',
        textAlign: 'center',
        fontWeight: '600',
    },
    addCustomButton: {
        backgroundColor: '#1ecbe1',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    addCustomButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
