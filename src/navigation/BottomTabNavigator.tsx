import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShoppingBag, Users, Home, GraduationCap, User, Droplet } from 'lucide-react-native';


// Import screens
import StoreScreen from '../screens/StoreScreen';
import ParentScreen from '../screens/ParentScreen';
import HomeScreen from '../screens/HomeScreen';
import SchoolScreen from '../screens/SchoolScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#999999',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    height: 60 + insets.bottom + 20,
                    paddingBottom: insets.bottom + 20,
                    paddingTop: 8,
                },
                tabBarIcon: ({ focused, color, size = 32 }) => {
                    const iconSize = size;

                    switch (route.name) {
                        case 'Store':
                            return <ShoppingBag color={color} size={iconSize} />;
                        case 'Parent':
                            return <Users color={color} size={iconSize} />;
                        case 'Home':
                            return focused ? (
                                <LinearGradient
                                    colors={['#95c6ffff', '#52d0faff', '#1ecbe1']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Droplet color="#fdfdfdff" size={48} fill="#ffffffff" />
                                </LinearGradient>
                            ) : (
                                <Home color={color} size={iconSize} />
                            );
                        case 'School':
                            return <GraduationCap color={color} size={iconSize} />;
                        case 'Profile':
                            return <User color={color} size={iconSize} />;
                        default:
                            return null;
                    }
                },
            })}
        >
            <Tab.Screen
                name="Store"
                component={StoreScreen}
            />
            <Tab.Screen
                name="Parent"
                component={ParentScreen}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="School"
                component={SchoolScreen}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}
