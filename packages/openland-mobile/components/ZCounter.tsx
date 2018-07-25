import * as React from 'react';
import { View, Text } from 'react-native';

export class ZCounter extends React.PureComponent<{ value: number | string }> {
    render() {
        return (
            <View style={{ height: 16, paddingLeft: 8, paddingRight: 8, backgroundColor: 'red', borderRadius: 8 }}>
                <Text style={{ color: '#fff', fontSize: 12, height: 16, textAlignVertical: 'center' }}>{this.props.value}</Text>
            </View>
        );
    }
}