import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export class ActionButtonAndroid extends React.PureComponent<{ title: string, icon?: any, tintColor?: string, onPress?: () => void }> {
    render() {
        return (
            <View style={{ paddingVertical: 16, paddingLeft: 16, height: 56, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={{ height: 32, borderRadius: 16, backgroundColor: '#fff', paddingHorizontal: 12 }}>
                        {!this.props.icon && <Text style={{ color: this.props.tintColor || '#49288f', lineHeight: 32, fontSize: 14, fontWeight: '500', textAlignVertical: 'center' }} >{this.props.title.toUpperCase()}</Text>}
                        {this.props.icon && <Image source={this.props.icon} style={{ width: 22, height: 22, tintColor: this.props.tintColor || '#4747ec' }} resizeMode="stretch" />}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}