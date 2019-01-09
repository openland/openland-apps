import * as React from 'react';
import { Text, Image } from 'react-native';
import { STouchable } from 'react-native-s/STouchable';

export class ActionButtonAndroid extends React.PureComponent<{ title: string, icon?: any, tintColor?: string, onPress?: () => void }> {
    render() {
        return (
            <STouchable style={{ paddingVertical: 16, paddingLeft: 16, height: 56, minWidth: 48, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' }} onPress={this.props.onPress}>
                {!this.props.icon && <Text style={{ color: this.props.tintColor || '#49288f', lineHeight: 32, fontSize: 14, fontWeight: '500', textAlignVertical: 'center' }} >{this.props.title.toUpperCase()}</Text>}
                {this.props.icon && <Image source={this.props.icon} style={{ width: 24, height: 24, tintColor: this.props.tintColor || '#4747ec' }} resizeMode="stretch" />}
            </STouchable>
        );
    }
}