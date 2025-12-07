// Example: How to use Redux user information in any component
import { Text, View } from 'react-native';

import { useAppSelector } from '../store/hooks';

export default function ExampleComponent() {
    // Access user information from Redux store
    const { user, isLoading } = useAppSelector((state) => state.user);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Text>Not logged in</Text>;
    }

    // Access user properties
    const userId = user.uid;
    const userEmail = user.email;
    const userName = user.displayName || user.email?.split('@')[0] || 'User';
    const userPhotoUrl = user.photoURL;

    return (
        <View>
            <Text>User ID: {userId}</Text>
            <Text>Email: {userEmail}</Text>
            <Text>Name: {userName}</Text>
        </View>
    );
}
