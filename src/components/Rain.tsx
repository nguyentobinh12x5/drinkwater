import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get('window');

export default function Rain() {
    return (
        <View style={styles.container}>
            {/* Rain Background - Full Screen Layer */}
            <LottieView
                source={require('../../assets/characters/animation/rain-background.json')}
                autoPlay
                loop
                style={styles.backgroundAnimation}
            />

            {/* Rain Icon - Centered Layer */}
            <LottieView
                source={require('../../assets/characters/animation/rainyicon.json')}
                autoPlay
                loop
                style={styles.iconAnimation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundAnimation: {
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        left: 0,
    },
    iconAnimation: {
        width: 300,
        height: 500,
        zIndex: 1,
    },
});