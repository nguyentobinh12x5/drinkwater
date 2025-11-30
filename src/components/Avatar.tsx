import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface AvatarProps {
    source: ImageSourcePropType;
    name: string;
    size?: number;
}

const Avatar = ({ source, name, size = 40 }: AvatarProps) => {
    const containerSize = { width: size, height: size, borderRadius: size / 2 };

    return (
        <View style={[styles.container, containerSize]}>
            <Image source={source} style={styles.avatar} />
            {!source && (
                <View style={styles.initialsContainer}>
                    <Text style={styles.initials}>
                        {name.charAt(0).toUpperCase()}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#1ecbe1',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    initialsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1ecbe1',
    },
    initials: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default Avatar;