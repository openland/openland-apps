import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export class FastHeaderActionButtonIOS extends React.PureComponent<{ title: string, icon?: any, onPress?: () => void }> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={{ height: 44, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                    {!this.props.icon && <Text style={{ color: '#4747ec', fontSize: 16, height: 22, lineHeight: 22, fontWeight: '500' }}>{this.props.title}</Text>}
                    {this.props.icon && <Image source={this.props.icon} style={{ width: 22, height: 22 }} />}
                </View>
            </TouchableOpacity>
        );
    }
}