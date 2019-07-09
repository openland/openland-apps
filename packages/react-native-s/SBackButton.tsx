import * as React from 'react';
import { Image, View, Text, Platform, StyleSheet, ImageStyle } from 'react-native';
import { STouchable } from './STouchable';

let styles = StyleSheet.create({
    image: Platform.select({
        default: {
            height: 24,
            width: 24,
            margin: 3,
            resizeMode: 'center'
        } as ImageStyle,
        ios: {
            height: 21,
            width: 13,
            marginLeft: 12,
            marginVertical: 12,
            resizeMode: 'contain',
        } as ImageStyle
    })
});

export class SBackButton extends React.PureComponent<{ tintColor?: string, onPress?: () => void, hideText?: boolean }> {
    render() {
        return (
            <STouchable onPress={this.props.onPress} style={{ backgroundColor: 'transparent' }} hitSlop={Platform.OS === 'android' ? { top: 13, left: 13, bottom: 13, right: 13 } : { top: 8, left: 8, bottom: 8, right: 8 }}>
                <View style={{ width: 36, height: 44, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <Image source={require('assets-s/ic-back.png')} style={[styles.image, { tintColor: this.props.tintColor }]} />
                </View>
            </STouchable>
        );
    }
}