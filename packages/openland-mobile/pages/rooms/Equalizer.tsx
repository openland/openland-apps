import * as React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
    },
    bar: {
        display: 'flex',
        flexShrink: 0,
        width: 1,
        marginLeft: 1,
        marginRight: 1,
    },
    barCenter: {
        height: 12,
    },
    barMiddle: {
        height: 8,
    },
    barOut: {
        height: 4,
    },
});

export const Equalizer = React.memo((props: { theme: ThemeGlobal; }) => {
    const [barAnimate] = React.useState(new Animated.Value(0));
    const theme = props.theme;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(barAnimate, {
                duration: 800,
                toValue: 1,
                useNativeDriver: false,
                easing: Easing.bounce,
            }),
        ).start();
    }, [barAnimate]);

    const centerAnimation = barAnimate.interpolate({
        inputRange: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1],
        outputRange: [12, 8, 6, 4, 2, 4, 6, 8, 12]
    });

    const middleAnimation = barAnimate.interpolate({
        inputRange: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1],
        outputRange: [8, 6, 4, 2, 4, 6, 8]
    });

    const outAnimation = barAnimate.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [4, 2, 4]
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.barOut,
                    styles.bar,
                    {
                        backgroundColor: theme.tintBlue,
                        height: outAnimation,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.barMiddle,
                    styles.bar,
                    {
                        backgroundColor: theme.tintBlue,
                        height: middleAnimation,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.barCenter,
                    styles.bar,
                    {
                        backgroundColor: theme.tintBlue,
                        height: centerAnimation,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.barMiddle,
                    styles.bar,
                    {
                        backgroundColor: theme.tintBlue,
                        height: middleAnimation,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.barOut,
                    styles.bar,
                    {
                        backgroundColor: theme.tintBlue,
                        height: outAnimation,
                    },
                ]}
            />
        </View>
    );
});