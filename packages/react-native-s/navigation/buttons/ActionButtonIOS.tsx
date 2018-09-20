import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export class ActionButtonIOS extends React.PureComponent<{ title: string, tintColor?: string, icon?: any, onPress?: () => void }> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} hitSlop={{ bottom: 8, top: 8, left: 8, right: 8 }}>
                <View style={{ height: 44, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                    {!this.props.icon && <Text style={{ color: this.props.tintColor || '#4747ec', fontSize: 16, height: 22, lineHeight: 22, fontWeight: '600' }}>{this.props.title}</Text>}
                    {this.props.icon && <Image source={this.props.icon} style={{ width: 22, height: 22, tintColor: this.props.tintColor || '#4747ec' }} resizeMode="center" />}
                </View>
            </TouchableOpacity>
        );
    }
}