import { StyleSheet, Animated, Image } from 'react-native';

import { ThemedText } from '@/components/segments/ThemedText';

export function Header() {
    /*const rotationAnimation = useSharedValue(0);
  
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
      4 // Run the animation 4 times
    );
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotationAnimation.value}deg` }],
    }));*/

    return (
        <Animated.View style={styles.header}>
            <Image
                source={require('@/assets/images/icon_bank.png')}
                style={styles.logo}
                resizeMode='contain'
            />
            <ThemedText type='title'>BANCO</ThemedText>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: '#d6dae3',
        paddingTop: 15,
        paddingBottom: 10
    },
    logo: {
        height: 25,
        width: 25,
        marginRight: 8
    }
});