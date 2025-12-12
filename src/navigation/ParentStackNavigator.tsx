import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParentScreen from '../screens/ParentScreen';
import RewardsScreen from '../screens/RewardsScreen';

const Stack = createNativeStackNavigator();

export default function ParentStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ParentDashboard" component={ParentScreen} />
            <Stack.Screen name="Rewards" component={RewardsScreen} />
        </Stack.Navigator>
    );
}
