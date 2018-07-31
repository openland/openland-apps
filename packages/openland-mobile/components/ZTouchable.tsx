import * as React from 'react';
import { isAndroid } from '../utils/isAndroid';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform, ViewStyle, Insets } from 'react-native';
import ViewOverflow from 'react-native-view-overflow';

export class ZTouchable extends React.PureComponent<{ onPress: () => void, style?: ViewStyle, hitSlop?: Insets }> {
    render() {
        if (isAndroid && Platform.Version >= 21) {
            return (
                <TouchableNativeFeedback onPress={this.props.onPress} hitSlop={this.props.hitSlop} background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .32)', true)} delayPressIn={0} style={{ padding: 13 }}>
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