import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Award } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

//              onPress={handleDrinkWater}
export default function HomeScreen() {
    const [waterCount, setWaterCount] = React.useState(0);
    const DAILY_GOAL = 8;
    const GLASS_VOLUME = 250; // ml

    const handleDrinkWater = () => {
        setWaterCount(prev => prev + 1);
    };

    // Determine plant status based on water count
    const getPlantImage = () => {
        if (waterCount >= DAILY_GOAL) {
            return require('../../assets/characters/tree/castus-happy.png');
        } else if (waterCount >= DAILY_GOAL / 2) {
            return require('../../assets/characters/tree/castus-growth.png');
        } else {
            return require('../../assets/characters/tree/castus-sad.png');
        }
    };

    const progressPercentage = Math.min((waterCount / DAILY_GOAL) * 100, 100);

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
                                    {waterCount * GLASS_VOLUME} ml
                                </Text>
                            </View>
                            <Text style={styles.percentageText}>{Math.round(progressPercentage)}%</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Main Game Area */}
            <View style={styles.gameArea}>
                {/* Plant Container */}
                <View style={styles.plantContainer}>
                    {/* Plant Image - Changes based on status */}
                    <Image
                        source={getPlantImage()}
                        style={styles.plantImage}
                        resizeMode="contain"
                    />
                    {/* Pot Image */}
                    <Image
                        source={require('../../assets/characters/plot/pot-default.png')}
                        style={styles.potImage}
                        resizeMode="contain"
                    />
                </View>
            </View>
            {/* Achievement Toast */}
            {waterCount >= DAILY_GOAL && (
                <View style={styles.achievementToast}>
                    <Award color="#FFD700" size={24} fill="#FFD700" />
                    <Text style={styles.achievementText}>Goal Met!</Text>
                </View>
            )}
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
    },
    plantContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 300,
    },
    plantImage: {
        width: 250,
        height: 250,
        marginBottom: -90, // Overlap with pot
        zIndex: 1,
    },
    potImage: {
        width: 180,
        height: 140,
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
    waterButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        shadowColor: '#0288D1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
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
});
