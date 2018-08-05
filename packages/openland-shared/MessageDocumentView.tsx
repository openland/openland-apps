import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { formatBytes } from './utils/formatBytes';
import { XPBubbleView } from 'openland-xp/XPBubbleView';

export class MessageDocumentView extends React.PureComponent<{ file: string, fileName?: string, size?: number, isOut: boolean, attach?: 'bottom' | 'top' | 'both' }> {
    render() {
        return (
            <XPBubbleView isOut={this.props.isOut} attach={this.props.attach} appearance="media">
                <View style={{ height: 56, width: 250, flexDirection: 'row' }}>
                    <View style={{ width: 40, height: 40, backgroundColor: '#f4f4f4', borderRadius: 20, marginLeft: 12, marginRight: 12, marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('assets/ic-signup-1.png')} style={{ width: 12, height: 16 }} />
                    </View>
                    <View flexGrow={1} flexBasis={0} flexDirection="column" marginTop={10} marginBottom={10}>
                        <Text style={{ color: '#181818', height: 16, fontSize: 14, lineHeight: 16, fontWeight: '500' }}>{this.props.fileName || 'file'}</Text>
                        <Text style={{ color: '#aaaaaa', height: 16, fontSize: 14, lineHeight: 16, marginTop: 4 }}>{formatBytes(this.props.size)}</Text>
                    </View>
                </View>
            </XPBubbleView>
        );
    }
}