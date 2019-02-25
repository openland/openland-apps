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
            <STouchable onPress={this.props.onPress} style={{ margin: Platform.OS === 'android' ? 13 : 0, backgroundColor: 'transparent' }} hitSlop={Platform.OS === 'android' ? { top: 13, left: 13, bottom: 13, right: 13 } : { top: 8, left: 8, bottom: 8, right: 8 }}>
                <View style={{ backgroundColor: 'transparent', flexDirection: 'row', marginRight: (Platform.OS === 'ios' && this.props.hideText === true) ? 12 : 0 }}>
                    <Image source={require('assets-s/ic-back.png')} style={[styles.image, { tintColor: this.props.tintColor }]} />
                    {Platform.OS === 'ios' && this.props.hideText !== true && <Text style={{ height: 44, lineHeight: 44, marginLeft: 3, fontSize: 16, paddingRight: 10, color: this.props.tintColor }} allowFontScaling={false}>Back</Text>}
                </View>
            </STouchable>
        );
    }
}