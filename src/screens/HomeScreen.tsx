import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Droplet, Target, TrendingUp, Award } from 'lucide-react-native';


export default function HomeScreen() {
    const [waterCount, setWaterCount] = React.useState(0);

    const handleDrinkWater = () => {
        setWaterCount(prev => prev + 1);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                    <TrendingUp color="#666" size={18} />
                    <Text style={styles.progressTitle}>Daily Progress</Text>
                </View>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${Math.min((waterCount / 8) * 100, 100)}%` }
                        ]}
                    />
                </View>
                <Text style={styles.progressText}>
                    {Math.round((waterCount / 8) * 100)}% of daily goal
                </Text>
            </View>

            <View style={styles.counterContainer}>
                <View style={styles.counterHeader}>
                    <Target color="#1ecbe1" size={20} />
                    <Text style={styles.counterLabel}>Glasses Today</Text>
                </View>
                <Text style={styles.counterValue}>{waterCount}</Text>
                <Text style={styles.counterGoal}>Goal: 8 glasses</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleDrinkWater}
                activeOpacity={0.8}
            >
                <Droplet color="#FFFFFF" size={24} fill="#FFFFFF" />
                <Text style={styles.buttonText}>I Drank Water</Text>
            </TouchableOpacity>

            {waterCount >= 8 && (
                <View style={styles.achievementBanner}>
                    <Award color="#4CAF50" size={24} fill="#4CAF50" />
                    <Text style={styles.achievementText}>🎉 Goal Achieved!</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#1ecbe1',
    },
    subtitle: {
        fontSize: 18,
        color: '#4682B4',
        fontWeight: '500',
    },
    counterContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    counterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    counterLabel: {
        fontSize: 16,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    counterValue: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#1ecbe1',
        marginBottom: 8,
    },
    counterGoal: {
        fontSize: 14,
        color: '#999',
    },
    button: {
        backgroundColor: '#1ecbe1',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 40,
        shadowColor: '#1ecbe1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    progressContainer: {
        alignItems: 'center',
    },
    progressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    progressTitle: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    progressBar: {
        width: '100%',
        height: 12,
        backgroundColor: '#E0E0E0',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#1ecbe1',
        borderRadius: 6,
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    achievementBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: '#E8F5E9',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        marginTop: 20,
    },
    achievementText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});
