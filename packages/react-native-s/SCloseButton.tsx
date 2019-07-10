import * as React from 'react';
import { STouchable } from './STouchable';
import { View, Image } from 'react-native';

export class SCloseButton extends React.PureComponent<{ tintColor?: string, onPress?: () => void }> {
    render() {
        return (
            <STouchable onPress={this.props.onPress}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} width={44} height={44}>
                    <Image source={require('assets/ic-header-close-24.png')} style={{ width: 24, height: 24, tintColor: this.props.tintColor }} />
                </View>
            </STouchable>
        );
    }
}