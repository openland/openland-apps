import * as React from 'react';
import { View, Text } from 'react-native';

export interface ZLinearProgressProps {
    progress: number;
    title?: string;
}

export class ZLinearProgress extends React.PureComponent<ZLinearProgressProps> {
    render() {
        const progress = Math.round(this.props.progress * 100) + '%';
        return (
            <View style={{ height: 16, backgroundColor: '#eff2f5', borderRadius: 8 }}>
                <View style={{ height: 16, width: progress, backgroundColor: '#8a7fff', borderRadius: 8 }} />
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff' }}>{this.props.title || progress}</Text>
                </View>
            </View>
        );
    }
}