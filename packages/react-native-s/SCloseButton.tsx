import * as React from 'react';
import { STouchable } from './STouchable';
import { View, Platform, Image, Text } from 'react-native';
import { SDevice } from './SDevice';

export class SCloseButton extends React.PureComponent<{ tintColor?: string, onPress?: () => void }> {
    render() {
        return (
            <STouchable onPress={this.props.onPress}>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row' }} marginHorizontal={15} height={SDevice.navigationBarHeight}>
                    {Platform.OS !== 'ios' && (<Image source={require('assets-s/ic-cancel.png')} style={{ tintColor: this.props.tintColor }} />)}
                    {Platform.OS === 'ios' && <Text style={{ height: 44, lineHeight: 44, marginLeft: 3, fontSize: 16, paddingRight: 10, color: this.props.tintColor, fontWeight: '600' }}>Close</Text>}
                </View>
            </STouchable>
        );
    }
}