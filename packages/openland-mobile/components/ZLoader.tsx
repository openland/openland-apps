import * as React from 'react';
import { View, StyleSheet, ViewStyle, Animated, Platform, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { AppTheme, ThemeContext } from 'openland-mobile/themes/ThemeContext';

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
    // containerFilled: {
    //     backgroundColor: '#fff'
    // } as ViewStyle
});

export interface ZLoaderProps {
    appearance?: 'normal' | 'large' | 'small';
    enabled?: boolean;
    transparent?: boolean;
}

class FixedLottie extends React.PureComponent<any> {

    private ref = React.createRef<LottieView>();

    render() {
        return (<LottieView ref={this.ref} {...this.props as any} />);
    }

    componentWillUnmount() {
        if (this.ref.current) {
            this.ref.current.reset();
        }
    }
}

class ZLoaderComponent extends React.PureComponent<ZLoaderProps & { theme: AppTheme }, { visible: boolean }> {

    opacity = new Animated.Value(0);
    wasStarted = false;
    // opacity = Animated.timing({

    // });

    constructor(props: ZLoaderProps & { theme: AppTheme }) {
        super(props);
        this.state = {
            visible: props.enabled !== false
        };
    }

    componentDidMount() {
        if (this.props.enabled !== false) {
            this.wasStarted = true;
            this.setState({ visible: true });
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
            this.setState({ visible: true });
            Animated.timing(this.opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start();
        } else if (this.props.enabled === false && this.wasStarted) {
            Animated.timing(this.opacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start(() => { this.setState({ visible: false }); });
        }
    }

    render() {
        let size = this.props.appearance === 'large' ? 100 : this.props.appearance === 'small' ? 48 : 100;
        return (
            <View style={[styles.container, (this.props.transparent !== true) && { backgroundColor: this.props.theme.backgroundColor }]} pointerEvents={this.props.transparent ? 'auto' : undefined}>
                {this.state.visible && (
                    <KeyboardSafeAreaView >
                        <Animated.View style={{ width: size, height: size, opacity: this.opacity }}>
                            {Platform.OS === 'ios' && <FixedLottie source={require('assets/material_loading.json')} autoPlay={true} loop={true} style={{ width: size, height: size }} />}
                            {Platform.OS !== 'ios' && <ActivityIndicator size="large" color="#0084fe" />}
                        </Animated.View>
                    </KeyboardSafeAreaView>
                )}
            </View>
        );
    }
}

export const ZLoader = React.memo<ZLoaderProps>((props) => {
    let theme = React.useContext(ThemeContext);
    return (<ZLoaderComponent {...props} theme={theme} />)
});