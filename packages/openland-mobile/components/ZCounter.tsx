import * as React from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle, Animated, View } from 'react-native';
import { AppStyles, TextStyles } from '../styles/AppStyles';
import { AppTheme } from 'openland-mobile/themes/themes';

const styles = StyleSheet.create({
    container: {
        height: 18,
        padding: 2,
        borderRadius: 9,
        minWidth: 18,
        flexDirection: 'row',
    } as ViewStyle,
    inner: {
        backgroundColor: AppStyles.primaryColor,
        paddingHorizontal: 3,
        borderRadius: 7
    } as ViewStyle,
    innerMuted: {
        backgroundColor: '#bcc3cc'
    } as ViewStyle,
    innerContrast: {
        backgroundColor: '#ff3b30'
    } as ViewStyle,
    text: {
        color: '#fff',
        fontSize: 10,
        lineHeight: 12,
        minWidth: 8,
        textAlign: 'center',
        fontWeight: TextStyles.weight.bold,
        marginTop: 1,
    } as TextStyle
});

export interface ZCounterProps {
    value: number;
    appearance?: 'default' | 'muted' | 'contrast';
    theme: AppTheme,
}

export class ZCounter extends React.PureComponent<ZCounterProps, { value: number }> {
    private opacity = new Animated.Value(0);

    constructor(props: ZCounterProps) {
        super(props);
        if (props.value > 0) {
            this.opacity.setValue(1);
        }
        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps: ZCounterProps) {
        if ((nextProps.value > 0) !== (this.props.value > 0)) {
            if (nextProps.value > 0) {
                this.setState({ value: nextProps.value });
                Animated.timing(this.opacity, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                    isInteraction: false
                }).start();
            } else {
                Animated.timing(this.opacity, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                    isInteraction: false
                }).start();
            }
        } else {
            this.setState({ value: nextProps.value });
        }
    }

    render() {
        return (
            <Animated.View style={[{ opacity: this.opacity }, styles.container, { backgroundColor: this.props.theme.backgroundColor }]}>
                <View style={[styles.inner, this.props.appearance === 'muted' && styles.innerMuted, , this.props.appearance === 'contrast' && styles.innerContrast]}>
                    <Text style={styles.text}>{this.state.value}</Text>
                </View>
            </Animated.View>
        );
    }
}