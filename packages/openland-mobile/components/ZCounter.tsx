import * as React from 'react';
import { Text, StyleSheet, ViewStyle, Animated, View } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
});

const containerBySize: {[sizeKey in ZCounterSize]: ViewStyle} = {
    small: {
        borderRadius: 8,
        minWidth: 16,
        height: 16,
    },
    medium: {
        borderRadius: 11,
        minWidth: 22,
        height: 22,
    }
};
const textBySize: {[sizeKey in ZCounterSize]: ViewStyle} = {
    small: TextStyles.Detail,
    medium: TextStyles.Label3,
};

type ZCounterSize = 'small' | 'medium';

export interface ZCounterProps {
    value: number;
    size?: ZCounterSize;
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
        const size = this.props.size || 'small';

        return (
            <Animated.View style={{ opacity: this.opacity }}>
                <View style={[styles.container, { ...containerBySize[size], backgroundColor: theme.accentNegative }]}>
                    <Text style={{ ...textBySize[size], color: theme.foregroundContrast }} allowFontScaling={false}>{this.state.value}</Text>
                </View>
            </Animated.View>
        );
    }
}