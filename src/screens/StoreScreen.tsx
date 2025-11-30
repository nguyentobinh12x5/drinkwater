import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';

export default function StoreScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ShoppingBag color="#1ecbe1" size={48} />
                <Text style={styles.title}>Store</Text>
                <Text style={styles.subtitle}>Shop for rewards and items</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🎁 Coming Soon</Text>
                    <Text style={styles.cardText}>
                        Browse and purchase rewards with your earned points!
                    </Text>
                </View>
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
        alignItems: 'center',
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
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1ecbe1',
        marginTop: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    cardText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
});
