import * as React from 'react';
import { Image, View, Platform } from 'react-native';
import { STouchable } from './STouchable';

export class SBackButton extends React.PureComponent<{ tintColor?: string, onPress?: () => void, hideText?: boolean }> {
    render() {
        return (
            <STouchable onPress={this.props.onPress}>
                <View style={{ width: 36, height: Platform.OS === 'ios' ? 44 : 48, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('assets/ic-back-24.png')} style={{ tintColor: this.props.tintColor }} />
                </View>
            </STouchable>
        );
    }
}