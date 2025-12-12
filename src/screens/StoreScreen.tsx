import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, Alert, DeviceEventEmitter } from 'react-native';
import { Store, Coins, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// All pots with default pot included
export const POTS = [
    {
        id: 'default',
        name: 'Default Pot',
        price: 0,
        image: require('../../assets/characters/plot/pot-default.png'),
        unlocked: true
    },
    {
        id: '1',
        name: 'Jar of Crunch',
        price: 0,
        image: require('../../assets/characters/plot/pot1.png'),
        unlocked: true
    },
    {
        id: '2',
        name: 'Electric Star',
        price: 0,
        image: require('../../assets/characters/plot/pot3.png'),
        unlocked: true
    },
    {
        id: '3',
        name: 'Resting Fox',
        price: 0,
        image: require('../../assets/characters/plot/pot4.png'),
        unlocked: true
    },
    {
        id: '4',
        name: 'Classic Clay',
        price: 0,
        image: require('../../assets/characters/plot/pot5.png'),
        unlocked: true
    }
];


const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 3; // 3 columns with padding
const EQUIPPED_POT_KEY = '@equipped_pot';

export default function StoreScreen() {
    const [coins, setCoins] = useState(31);
    const [equippedPotId, setEquippedPotId] = useState('default');

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

    const handleEquip = async (item: typeof POTS[0]) => {
        try {
            // Save to AsyncStorage (local storage)
            await AsyncStorage.setItem(EQUIPPED_POT_KEY, item.id);
            setEquippedPotId(item.id);

            // Notify HomeScreen about the change
            DeviceEventEmitter.emit('potChanged', item.id);

            Alert.alert('Success', `${item.name} equipped!`);
        } catch (error) {
            console.error('Error equipping pot:', error);
            Alert.alert('Error', 'Failed to equip pot');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header with Awning effect */}
            <View style={styles.headerContainer}>
                <LinearGradient
                    colors={['#8BC34A', '#7CB342']}
                    style={styles.header}
                >
                    <View style={styles.headerContent}>
                        <View style={styles.titleRow}>
                            <Store color="#FFFFFF" size={28} />
                            <Text style={styles.headerTitle}>Shop</Text>
                        </View>
                        <View style={styles.coinBadge}>
                            <Coins size={16} color="#FFD700" fill="#FFD700" />
                            <Text style={styles.coinText}>{coins}</Text>
                        </View>
                    </View>
                </LinearGradient>
                {/* Awning scallops */}
                <View style={styles.awningRow}>
                    {[...Array(10)].map((_, i) => (
                        <View key={i} style={styles.scallop} />
                    ))}
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Banner */}
                <LinearGradient
                    colors={['#AED581', '#8BC34A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.banner}
                >
                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Explore a Fun Plant World</Text>
                        <Text style={styles.bannerText}>
                            Unlock 60+ exclusive plants, unique flower pots, custom decors, and many more!
                        </Text>
                        <TouchableOpacity style={styles.subscribeButton}>
                            <Text style={styles.subscribeText}>Subscribe to Get!</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Plant Pots */}
                <Text style={styles.sectionTitle}>Plant Pots</Text>
                <View style={styles.grid}>
                    {POTS.map((item) => {
                        const isEquipped = equippedPotId === item.id;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.itemCard,
                                    isEquipped && styles.equippedCard
                                ]}
                                onPress={() => handleEquip(item)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.imageContainer}>
                                    <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                                    {isEquipped && (
                                        <View style={styles.equippedBadge}>
                                            <Check size={16} color="#FFFFFF" />
                                        </View>
                                    )}
                                </View>

                                <View style={[
                                    styles.equipButton,
                                    isEquipped && styles.equippedButton
                                ]}>
                                    <Text style={[
                                        styles.equipText,
                                        isEquipped && styles.equippedText
                                    ]}>
                                        {isEquipped ? 'Equipped' : 'Equip'}
                                    </Text>
                                </View>

                                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        zIndex: 10,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    coinBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    coinText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    awningRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -10,
        overflow: 'hidden',
    },
    scallop: {
        width: 40,
        height: 20,
        backgroundColor: '#7CB342', // Match darker gradient color
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginHorizontal: -2,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    banner: {
        borderRadius: 20,
        padding: 24,
        marginBottom: 30,
        overflow: 'hidden',
    },
    bannerContent: {
        gap: 12,
    },
    bannerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    bannerText: {
        fontSize: 14,
        color: '#F1F8E9',
        lineHeight: 20,
        marginBottom: 12,
    },
    subscribeButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    subscribeText: {
        color: '#558B2F',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'flex-start',
    },
    itemCard: {
        width: COLUMN_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    equippedCard: {
        borderWidth: 2,
        borderColor: '#8BC34A',
        backgroundColor: '#F1F8E9',
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    equippedBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#8BC34A',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    equipButton: {
        backgroundColor: '#1ecbe1',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 6,
        minWidth: 80,
        alignItems: 'center',
    },
    equippedButton: {
        backgroundColor: '#8BC34A',
    },
    equipText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    equippedText: {
        color: '#FFFFFF',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    rateText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    itemName: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
});

