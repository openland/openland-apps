import * as React from 'react';
import { isAndroid } from '../utils/isAndroid';
import { TouchableNativeFeedback, TouchableOpacity, View, Platform } from 'react-native';
import ViewOverflow from 'react-native-view-overflow';

export class ZTouchable extends React.PureComponent<{ onPress: () => void }> {
    render() {
        if (isAndroid && Platform.Version >= 21) {
            return (
                <TouchableNativeFeedback onPress={this.props.onPress} background={TouchableNativeFeedback.Ripple('#fff', true)} useForeground={true}>
                    <View>
                        {this.props.children}
                    </View>
                </TouchableNativeFeedback>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.props.onPress}>
                    {this.props.children}
                </TouchableOpacity>
            );
        }
    }
}