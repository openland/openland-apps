import * as React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform, ViewStyle, Insets } from 'react-native';

export class FastTouchable extends React.PureComponent<{ onPress?: () => void, style?: ViewStyle, hitSlop?: Insets }> {
    render() {
        if (Platform.OS === 'android' && Platform.Version >= 21) {
            return (
                <TouchableNativeFeedback onPress={this.props.onPress} hitSlop={this.props.hitSlop} background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', true)} delayPressIn={0} style={{ padding: 13 }}>
                    <View style={this.props.style}>
                        {this.props.children}
                    </View>
                </TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.props.onPress} style={this.props.style} hitSlop={this.props.hitSlop} delayPressIn={0}>
                    {this.props.children}
                </TouchableOpacity>
            );
        }
    }
}