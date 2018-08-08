import * as React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        // backgroundColor: this.props.transparent !== true ? '#fff' : undefined,
        justifyContent: 'center',
        alignItems: 'center'
    } as ViewStyle,
    containerFilled: {
        backgroundColor: '#fff'
    } as ViewStyle
});

export interface ZLoaderProps {
    enabled?: boolean;
    transparent?: boolean;
}

export class ZLoader extends React.PureComponent<ZLoaderProps> {

    opacity = new Animated.Value(0);
    wasStarted = false;
    // opacity = Animated.timing({

    // });

    componentDidMount() {
        if (this.props.enabled !== false) {
            this.wasStarted = true;
            Animated.timing(this.opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        }
    }

    componentDidUpdate() {
        if (this.props.enabled !== false && !this.wasStarted) {
            this.wasStarted = true;
            Animated.timing(this.opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        } else if (this.props.enabled === false && this.wasStarted) {
            Animated.timing(this.opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
        }
    }

    render() {
        return (
            <View style={[styles.container, (this.props.transparent !== true) && styles.containerFilled]}>
                <Animated.View style={{ width: 100, height: 100, opacity: this.opacity }}>
                    <LottieView source={require('assets/loader.json')} autoPlay={true} loop={true} style={{ width: 100, height: 100 }} />
                </Animated.View>
            </View>
        );
    }
}