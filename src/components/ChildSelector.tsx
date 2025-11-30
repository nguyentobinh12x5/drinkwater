import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Child } from '../types';
import Avatar from './Avatar';

interface ChildSelectorProps {
    children: Child[];
    activeChildId: string;
    onChildSelect: (childId: string) => void;
}

export default function ChildSelector({ children, activeChildId, onChildSelect }: ChildSelectorProps) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {children.map((child) => (
                    <TouchableOpacity
                        key={child.id}
                        style={[
                            styles.childPill,
                            activeChildId === child.id && styles.activeChildPill,
                        ]}
                        onPress={() => onChildSelect(child.id)}
                        activeOpacity={0.7}
                    >
                        <Avatar source={child.avatar} name={child.name} size={40} />
                        <Text
                            style={[
                                styles.childName,
                                activeChildId === child.id && styles.activeChildName,
                            ]}
                        >
                            {child.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    scrollContent: {
        paddingHorizontal: 4,
        gap: 12,
    },
    childPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        gap: 8,
    },
    activeChildPill: {
        backgroundColor: '#1ecbe1',
        shadowColor: '#1ecbe1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    avatar: {
        fontSize: 24,
    },
    childName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    activeChildName: {
        color: '#FFFFFF',
    },
});
