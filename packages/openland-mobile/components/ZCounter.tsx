import * as React from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle, Animated, View } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { FontStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    text: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: FontStyles.Weight.Bold
    } as TextStyle
});

export interface ZCounterProps {
    value: number;
    theme: ThemeGlobal;
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
        const { theme } = this.props;

        return (
            <Animated.View style={{ opacity: this.opacity }}>
                <View style={[styles.container, { backgroundColor: theme.accentNegative }]}>
                    <Text style={[styles.text, { color: theme.foregroundContrast }]} allowFontScaling={false}>{this.state.value}</Text>
                </View>
            </Animated.View>
        );
    }
}