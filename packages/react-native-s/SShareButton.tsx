import * as React from 'react';
import { STouchable } from './STouchable';
import { View, Platform, Image, Text } from 'react-native';
import { SDevice } from './SDevice';

export class SShareButton extends React.PureComponent<{ tintColor?: string, onPress?: () => void }> {
    render() {
        return (
            <STouchable onPress={this.props.onPress}>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row', alignItems: 'center' }} marginHorizontal={15} height={SDevice.navigationBarHeight}>
                    <Image source={require('assets/ic-export-white-ios.png')} style={{ tintColor: this.props.tintColor }} />
                </View>
            </STouchable>
        );
    }
}