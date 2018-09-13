import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export class ActionButtonAndroid extends React.PureComponent<{ title: string, onPress?: () => void }> {
    render() {
        return (
            <View style={{ paddingVertical: 16, paddingLeft: 16, height: 56, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={{ height: 32, borderRadius: 16, backgroundColor: '#fff', paddingHorizontal: 12 }}>
                        <Text style={{ color: '#49288f', lineHeight: 32, fontSize: 14, fontWeight: '500', textAlignVertical: 'center' }} >{this.props.title.toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}