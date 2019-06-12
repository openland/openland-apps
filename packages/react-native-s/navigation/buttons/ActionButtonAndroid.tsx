import * as React from 'react';
import { Text, Image, Platform } from 'react-native';
import { STouchable } from 'react-native-s/STouchable';
import { XMemo } from 'openland-y-utils/XMemo';

export class ActionButtonAndroid extends React.PureComponent<{ title: string, icon?: any, tintColor?: string, onPress?: () => void }> {
    render() {
        return (
            <STouchable style={{ alignItems: 'center', justifyContent: 'center', padding: Platform.OS === 'android' ? 4 : 0, margin: Platform.OS === 'android' ? 8 : 0, backgroundColor: 'transparent' }} hitSlop={Platform.OS === 'android' ? { top: 13, left: 13, bottom: 13, right: 13 } : { top: 8, left: 8, bottom: 8, right: 8 }} onPress={this.props.onPress}>
                {!this.props.icon && <Text style={{ color: this.props.tintColor || '#49288f', lineHeight: 32, fontSize: 14, fontWeight: '500', textAlignVertical: 'center' }} >{this.props.title.toUpperCase()}</Text>}
                {this.props.icon && <Image source={this.props.icon} style={{ width: 24, height: 24, tintColor: this.props.tintColor || '#4747ec' }} resizeMode="contain" />}
            </STouchable>
        );
    }
}

export const ActionButtonAndroidView = XMemo<{ onPress?: () => void; children?: any }>((props) => (
    <STouchable style={{ alignItems: 'center', justifyContent: 'center', padding: 4, margin: 8, backgroundColor: 'transparent' }} hitSlop={{ top: 13, left: 13, bottom: 13, right: 13 }} onPress={props.onPress}>
        {props.children}
    </STouchable>
));