import * as React from 'react';
import { Image, View, Text, Platform } from 'react-native';
import { FastTouchable } from '../implementation/utils/FastTouchable';

let image = (inverted: boolean) => Platform.OS === 'android' ?
    (
        <Image
            source={require('assets/ic-back.png')}
            style={{
                height: 24,
                width: 24,
                margin: 3,
                resizeMode: 'center',
                tintColor: inverted ? '#fff' : undefined
            }}
        />
    ) : (
        <Image
            source={require('assets/ic-back.png')}
            style={{
                height: 21,
                width: 13,
                marginLeft: 9,
                marginVertical: 12,
                resizeMode: 'contain',
                tintColor: inverted ? '#fff' : undefined
            }}
        />
    );

export class FastHeaderBackButton extends React.PureComponent<{ inverted?: boolean, onPress?: () => void }> {
    render() {
        return (
            <FastTouchable onPress={this.props.onPress} style={{ margin: Platform.OS === 'android' ? 13 : 0, backgroundColor: 'transparent' }} hitSlop={Platform.OS === 'android' ? { top: 13, left: 13, bottom: 13, right: 13 } : undefined}>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row' }}>
                    {image(this.props.inverted !== undefined ? this.props.inverted : false)}
                    {Platform.OS === 'ios' && <Text style={{ height: 44, lineHeight: 44, marginLeft: 3, fontSize: 16, paddingRight: 10, color: this.props.inverted ? '#fff' : '#4747ec' }}>Back</Text>}
                </View>
            </FastTouchable>
        );
    }
}