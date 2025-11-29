import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { GraduationCap } from 'lucide-react-native';

export default function SchoolScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <GraduationCap color="#1E90FF" size={48} />
                <Text style={styles.title}>School</Text>
                <Text style={styles.subtitle}>Educational content and activities</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>🎓 Learning Center</Text>
                    <Text style={styles.cardText}>
                        Access educational content and track your learning progress.
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
        color: '#1E90FF',
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
