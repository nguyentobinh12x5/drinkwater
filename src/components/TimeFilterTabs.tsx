import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TimeFilter } from '../types';

interface TimeFilterTabsProps {
    activeFilter: TimeFilter;
    onFilterChange: (filter: TimeFilter) => void;
}

export default function TimeFilterTabs({ activeFilter, onFilterChange }: TimeFilterTabsProps) {
    const filters: { value: TimeFilter; label: string }[] = [
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
    ];

    return (
        <View style={styles.container}>
            {filters.map((filter) => (
                <TouchableOpacity
                    key={filter.value}
                    style={[
                        styles.tab,
                        activeFilter === filter.value && styles.activeTab,
                    ]}
                    onPress={() => onFilterChange(filter.value)}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeFilter === filter.value && styles.activeTabText,
                        ]}
                    >
                        {filter.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        padding: 4,
        marginVertical: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#1ecbe1',
        shadowColor: '#1ecbe1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
});
