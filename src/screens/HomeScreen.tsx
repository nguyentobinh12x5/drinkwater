import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Dimensions, DeviceEventEmitter, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Award, Volume2, VolumeX, Gift } from 'lucide-react-native';
import { ref, onValue, off, set, get } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { useAppSelector } from '../store/hooks';
import { CircleX } from 'lucide-react-native';
import Rain from '../components/Rain';
import ChildRewardsModal from '../components/ChildRewardsModal';
import { updateTodayWaterIntake } from '../utils/HydrationHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width, height } = Dimensions.get('window');
const EQUIPPED_POT_KEY = '@equipped_pot';

export default function HomeScreen() {
    const { user } = useAppSelector((state) => state.user);
    const [waterIntake, setWaterIntake] = React.useState(0);
    const [displayWaterIntake, setDisplayWaterIntake] = React.useState(0); // For plant visual display
    const [showRain, setShowRain] = React.useState(false);
    const [sound, setSound] = React.useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showHappyVideo, setShowHappyVideo] = React.useState(false);
    const [hasInitialized, setHasInitialized] = React.useState(false);
    const [showRewardsModal, setShowRewardsModal] = React.useState(false);
    const [equippedPotId, setEquippedPotId] = React.useState('default');
    const DAILY_GOAL = 1250;
    const DRINK_AMOUNT = 250;

    // Load equipped pot from AsyncStorage (local)
    useEffect(() => {
        loadEquippedPot();
    }, []);

    const loadEquippedPot = async () => {
        try {
            const savedPot = await AsyncStorage.getItem(EQUIPPED_POT_KEY);
            if (savedPot) {
                setEquippedPotId(savedPot);
            }
        } catch (error) {
            console.error('Error loading equipped pot:', error);
        }
    };

    // Listen for pot change events from StoreScreen
    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('potChanged', (newPotId: string) => {
            console.log('Pot changed to:', newPotId);
            setEquippedPotId(newPotId);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Video player for happy animation
    const videoSource = require('../../assets/video/video-catus-happy.mp4');
    const player = useVideoPlayer(videoSource, player => {
        player.loop = false;
        player.volume = 0.5;
    });

    // Fetch water intake from Firebase and detect changes
    useEffect(() => {
        if (!user) return;

        const waterRef = ref(db, `users/${user.uid}/total_water`);
        const unsubscribe = onValue(waterRef, (snapshot) => {
            const data = snapshot.val();
            const newWaterIntake = data !== null ? data : 0;

            // Check if water increased (realtime update detected)
            // Use hasInitialized instead of waterIntake > 0
            if (newWaterIntake > waterIntake && hasInitialized) {
                console.log(`${waterIntake}ml → ${newWaterIntake}ml`);
                triggerRainAnimation();
            }

            // Check if plant just became happy (reached goal for the first time)
            const isNowHappy = newWaterIntake >= DAILY_GOAL;
            const wasNotHappy = displayWaterIntake < DAILY_GOAL; // Use displayWaterIntake for visual state check

            if (isNowHappy && wasNotHappy && hasInitialized) {
                console.log('🎉 Goal reached! Starting animation sequence');
                triggerHappyVideo();
                // DON'T update displayWaterIntake - keep showing old plant state
                // Will update after video finishes
            } else if (!hasInitialized) {
                // First load - initialize both states
                setDisplayWaterIntake(newWaterIntake);
                setHasInitialized(true);
            } else if (!isNowHappy || !wasNotHappy) {
                // Normal update - not transitioning to happy, update display immediately
                setDisplayWaterIntake(newWaterIntake);
            }

            setWaterIntake(newWaterIntake);

            // Update history for streak tracking
            if (user) {
                updateTodayWaterIntake(user.uid, newWaterIntake, DAILY_GOAL);
            }
        });

        return () => off(waterRef);
    }, [user, waterIntake, displayWaterIntake, hasInitialized]);

    // Function to trigger rain animation
    const triggerRainAnimation = () => {
        setShowRain(true);
        // Hide rain after 2 seconds
        setTimeout(() => {
            setShowRain(false);
        }, 2000);
    };

    // Function to trigger happy video (after rain finishes)
    const triggerHappyVideo = () => {
        // Wait 2 seconds for rain animation to finish before showing video
        setTimeout(() => {
            setShowHappyVideo(true);
            player.replay();
        }, 2000);
    };

    // Listen for video end to hide overlay immediately
    useEffect(() => {
        if (!showHappyVideo) return;

        const subscription = player.addListener('playingChange', (payload) => {
            // When video stops playing and has progressed beyond start
            if (!payload.isPlaying && payload.oldIsPlaying && player.currentTime > 0) {
                console.log('✅ Video finished, hiding overlay');
                console.log('🌵 NOW changing plant to happy state');
                setShowHappyVideo(false);
                // NOW update the display to show happy plant
                setDisplayWaterIntake(waterIntake);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [showHappyVideo, player]);


    // Function to add water and update Firebase
    const addWater = async () => {
        if (!user) {
            Alert.alert('Error', 'User not logged in');
            return;
        }

        try {
            const waterRef = ref(db, `users/${user.uid}/total_water`);
            const snapshot = await get(waterRef);
            const currentWater = snapshot.val() || 0;
            const newWater = Math.min(currentWater + DRINK_AMOUNT, DAILY_GOAL + 1000);

            // Update Firebase (this will trigger the onValue listener)
            await set(waterRef, newWater);

            console.log(`${DRINK_AMOUNT}ml. Total: ${newWater}ml`);
        } catch (error) {
            console.error('Error adding water:', error);
            Alert.alert('Error', 'Failed to add water. Please try again.');
        }
    };

    // Function to reset water intake to 0
    const resetWater = async () => {
        if (!user) {
            Alert.alert('Error', 'User not logged in');
            return;
        }
        try {
            const waterRef = ref(db, `users/${user.uid}/total_water`);
            await set(waterRef, 0);
            console.log('Water intake reset to 0ml');
        } catch (error) {
            console.error('Error resetting water:', error);
            Alert.alert('Error', 'Failed to reset water. Please try again.');
        }
    };

    // Listen for DeviceEventEmitter 'addWater' event
    React.useEffect(() => {
        const subscription = DeviceEventEmitter.addListener('addWater', () => {
            addWater();
        });

        return () => {
            subscription.remove();
        };
    }, [user]);

    // Load and setup background music
    useEffect(() => {
        let isMounted = true;

        async function loadSound() {
            try {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: false,
                });

                const { sound: newSound } = await Audio.Sound.createAsync(
                    require('../../assets/audio/background-sound.mp3'),
                    { shouldPlay: false, isLooping: true, volume: 0.3 }
                );

                if (isMounted) {
                    setSound(newSound);
                }
            } catch (error) {
                console.error('Error loading sound:', error);
            }
        }

        loadSound();

        // Cleanup function
        return () => {
            isMounted = false;
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    // Toggle sound play/pause
    const toggleSound = async () => {
        if (!sound) return;

        try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                if (isPlaying) {
                    await sound.pauseAsync();
                    setIsPlaying(false);
                } else {
                    await sound.playAsync();
                    setIsPlaying(true);
                }
            }
        } catch (error) {
            console.error('Error toggling sound:', error);
        }
    };

    const getPlantImage = () => {
        if (displayWaterIntake >= DAILY_GOAL) {
            return require('../../assets/characters/tree/castus-happy.png');
        } else if (displayWaterIntake >= DAILY_GOAL / 2) {
            return require('../../assets/characters/tree/castus-growth.png');
        } else {
            return require('../../assets/characters/tree/castus-sad.png');
        }
    };

    const getPotImage = () => {
        switch (equippedPotId) {
            case '1':
                return require('../../assets/characters/plot/pot1.png');
            case '2':
                return require('../../assets/characters/plot/pot3.png');
            case '3':
                return require('../../assets/characters/plot/pot4.png');
            case '4':
                return require('../../assets/characters/plot/pot5.png');
            default:
                return require('../../assets/characters/plot/pot-default.png');
        }
    };

    const progressPercentage = Math.min((waterIntake / DAILY_GOAL) * 100, 100);

    return (
        <ImageBackground
            source={require('../../assets/background/background1.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <StatusBar style="light" />

            {/* Top Status Bar */}
            <View style={styles.topBar}>
                <View style={styles.statusCard}>
                    <View style={styles.plantIconContainer}>
                        <Image
                            source={require('../../assets/characters/tree/castus-happy.png')}
                            style={styles.miniPlantIcon}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.statusInfo}>
                        <View style={styles.statusHeader}>
                            <Text style={styles.plantName}>Devil's Ivy</Text>
                            <Text style={styles.plantLevel}>Lv3</Text>
                        </View>
                        <View style={styles.progressRow}>
                            <Text style={styles.todayLabel}>Today</Text>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                                <Text style={styles.progressText}>
                                    {waterIntake} ml
                                </Text>
                            </View>
                            <Text style={styles.percentageText}>{Math.round(progressPercentage)}%</Text>
                        </View>
                    </View>
                </View>

                {/* Reset Button */}
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={resetWater}
                    activeOpacity={0.7}
                >
                    <CircleX color="#ff4444" size={20} />
                </TouchableOpacity>

                {/* Sound Toggle Button */}
                <TouchableOpacity
                    style={styles.soundButton}
                    onPress={toggleSound}
                    activeOpacity={0.7}
                >
                    {isPlaying ? (
                        <Volume2 color="#1ecbe1" size={20} />
                    ) : (
                        <VolumeX color="#999" size={20} />
                    )}
                </TouchableOpacity>

                {/* Rewards Button */}
                <TouchableOpacity
                    style={styles.rewardsButton}
                    onPress={() => setShowRewardsModal(true)}
                    activeOpacity={0.7}
                >
                    <Gift color="#FFD700" size={20} />
                </TouchableOpacity>
            </View>

            {/* Main Game Area */}
            <View style={styles.gameArea}>
                {/* Plant Container */}
                <View style={styles.plantContainer}>
                    {/* Pot Image - Base layer */}
                    <Image
                        source={getPotImage()}
                        style={styles.potImage}
                        resizeMode="contain"
                    />
                    {/* Plant Image - Positioned above pot */}
                    <Image
                        source={getPlantImage()}
                        style={styles.plantImage}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Achievement Toast */}
            {waterIntake >= DAILY_GOAL && (
                <View style={styles.achievementToast}>
                    <Award color="#FFD700" size={24} fill="#FFD700" />
                    <Text style={styles.achievementText}>Goal Met!</Text>
                </View>
            )}

            {/* Rain Animation Overlay */}
            {showRain && (
                <>
                    {/* Dark Overlay */}
                    <View style={styles.darkOverlay} />

                    {/* Rain Animation */}
                    <View style={styles.rainOverlay}>
                        <Rain />
                    </View>
                </>
            )}

            {/* Happy Video Overlay - Above all layers */}
            {showHappyVideo && (
                <View style={styles.videoOverlay} pointerEvents="none">
                    <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen={false}
                        allowsPictureInPicture={false}
                        nativeControls={false}
                        contentFit="contain"
                    />
                </View>
            )}

            {/* Rewards Modal */}
            <ChildRewardsModal
                visible={showRewardsModal}
                onClose={() => setShowRewardsModal(false)}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    statusCard: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 8,
        marginRight: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resetButton: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginLeft: 8,
    },
    soundButton: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginLeft: 8,
    },
    rewardsButton: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF9E6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginLeft: 8,
    },
    plantIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        overflow: 'hidden',
    },
    miniPlantIcon: {
        width: 30,
        height: 30,
    },
    statusInfo: {
        flex: 1,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    plantName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 6,
    },
    plantLevel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    todayLabel: {
        fontSize: 12,
        color: '#29B6F6',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        flex: 1,
        height: 16,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    progressBarFill: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: '#B3E5FC',
    },
    progressText: {
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
        zIndex: 1,
    },
    percentageText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#29B6F6',
    },
    topIcons: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 280, // Push plant down a bit
        zIndex: 102,
    },
    plantContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        position: 'relative',
    },
    potImage: {
        width: 180,
        height: 140,
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    plantImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: '20%', // Plant starts at 25% from bottom, auto-adjusts based on pot
        zIndex: 2,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 40,
        paddingHorizontal: 30,
    },
    menuButton: {
        width: 50,
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    menuIconInner: {
        width: 24,
        height: 24,
        backgroundColor: '#E0E0E0',
        borderRadius: 6,
    },
    waterButtonContainer: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        zIndex: 10,
    },
    waterButton: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#1ecbe1',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#0288D1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    waterButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 4,
    },
    waterButtonGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    waterBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 24,
        height: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    waterBadgeText: {
        color: '#0288D1',
        fontWeight: 'bold',
        fontSize: 16,
    },
    achievementToast: {
        position: 'absolute',
        top: 130,
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    achievementText: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 16,
    },
    darkOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 100,
    },
    rainOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 101,
        pointerEvents: 'none',
    },
    videoOverlay: {
        position: 'absolute',
        top: 380,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: width,
        height: height,
    },
});
