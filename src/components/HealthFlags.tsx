import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { StudentFlag } from '../types';

interface HealthFlagsProps {
    flags: StudentFlag[];
}

export default function HealthFlags({ flags }: HealthFlagsProps) {
    if (flags.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <AlertCircle color="#4CAF50" size={24} />
                    <Text style={styles.title}>Health Monitoring</Text>
                </View>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>✅ No health concerns detected</Text>
                    <Text style={styles.emptySubtext}>All students are maintaining healthy hydration levels</Text>
                </View>
            </View>
        );
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return '#F44336';
            case 'medium': return '#FF9800';
            case 'low': return '#FFC107';
            default: return '#999';
        }
    };

    const getSeverityLabel = (severity: string) => {
        switch (severity) {
            case 'high': return 'Urgent';
            case 'medium': return 'Moderate';
            case 'low': return 'Minor';
            default: return 'Unknown';
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AlertCircle color="#FF9800" size={24} />
                <Text style={styles.title}>Health Monitoring</Text>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{flags.length}</Text>
                </View>
            </View>

            <Text style={styles.subtitle}>
                Students requiring attention (for health follow-up, not punishment)
            </Text>

            <ScrollView style={styles.flagsList} showsVerticalScrollIndicator={false}>
                {flags.map((flag, index) => (
                    <View key={flag.studentId} style={styles.flagCard}>
                        <View style={styles.flagHeader}>
                            <Text style={styles.studentName}>{flag.studentName}</Text>
                            <View style={[
                                styles.severityBadge,
                                { backgroundColor: getSeverityColor(flag.severity) + '20' }
                            ]}>
                                <Text style={[
                                    styles.severityText,
                                    { color: getSeverityColor(flag.severity) }
                                ]}>
                                    {getSeverityLabel(flag.severity)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.flagDetails}>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Average Intake:</Text>
                                <Text style={styles.detailValue}>
                                    {flag.averageIntake * 250} / {flag.recommendedGoal * 250} ml
                                </Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Duration:</Text>
                                <Text style={styles.detailValue}>
                                    {flag.daysConsecutive} consecutive days
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.recommendation}>
                            💡 Recommended: Gentle encouragement and health check
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    countBadge: {
        backgroundColor: '#FF9800',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    countText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 13,
        color: '#666',
        marginBottom: 12,
        fontStyle: 'italic',
    },
    emptyState: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
        marginBottom: 4,
    },
    emptySubtext: {
        fontSize: 13,
        color: '#666',
    },
    flagsList: {
        maxHeight: 300,
    },
    flagCard: {
        backgroundColor: '#FFF9F0',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    flagHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    studentName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    severityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    severityText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    flagDetails: {
        gap: 4,
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailLabel: {
        fontSize: 13,
        color: '#666',
    },
    detailValue: {
        fontSize: 13,
        color: '#333',
        fontWeight: '600',
    },
    recommendation: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 4,
    },
});
