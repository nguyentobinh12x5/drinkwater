import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Store, Coins } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for pots
const POTS = [
    {
        id: '1',
        name: 'Jar of Crunch',
        price: 300,
        image: require('../../assets/characters/plot/pot1.png'),
        type: 'buy'
    },
    {
        id: '2',
        name: 'Electric Star',
        price: 0,
        image: require('../../assets/characters/plot/pot3.png'),
        type: 'rate'
    },
    {
        id: '3',
        name: 'Resting Fox',
        price: 300,
        image: require('../../assets/characters/plot/pot4.png'),
        type: 'buy'
    },
    {
        id: '4',
        name: 'Classic Clay',
        price: 100,
        image: require('../../assets/characters/plot/pot5.png'),
        type: 'buy'
    }
];

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 3; // 3 columns with padding

export default function StoreScreen() {
    const [coins, setCoins] = useState(31);

    const handleBuy = (item: typeof POTS[0]) => {
        if (item.type === 'rate') {
            alert('Rate us to unlock this pot!');
            return;
        }
        if (coins >= item.price) {
            setCoins(prev => prev - item.price);
            alert(`You bought ${item.name}!`);
        } else {
            alert('Not enough coins!');
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

                {/* Featured Pots */}
                <Text style={styles.sectionTitle}>Featured Pots</Text>
                <View style={styles.grid}>
                    {POTS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.itemCard}
                            onPress={() => handleBuy(item)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                            </View>

                            {item.type === 'rate' ? (
                                <Text style={styles.rateText}>Rate Us</Text>
                            ) : (
                                <View style={styles.priceRow}>
                                    <Coins size={14} color="#FFD700" fill="#FFD700" />
                                    <Text style={styles.priceText}>{item.price}</Text>
                                </View>
                            )}

                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
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
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: '100%',
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
