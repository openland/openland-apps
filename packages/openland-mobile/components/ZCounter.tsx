import * as React from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle, Animated } from 'react-native';
import { AppStyles } from '../styles/AppStyles';

const styles = StyleSheet.create({
    container: {
        height: 16,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: AppStyles.primaryColor,
        borderRadius: 8,
        minWidth: 16,
        flexDirection: 'row',
    } as ViewStyle,
    containerMuted: {
        backgroundColor: '#bcc3cc'
    } as ViewStyle,
    containerContrast: {
        backgroundColor: '#ff3b30'
    } as ViewStyle,
    text: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 12,
        minWidth: 8,
        textAlign: 'center',
        marginTop: 3,
    } as TextStyle
});

export interface ZCounterProps {
    value: number;
    appearance?: 'default' | 'muted' | 'contrast';
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
            <Animated.View style={[{ opacity: this.opacity }, styles.container, this.props.appearance === 'muted' && styles.containerMuted, , this.props.appearance === 'contrast' && styles.containerContrast]}>
                <Text style={styles.text}>{this.state.value}</Text>
            </Animated.View>
        );
    }
}