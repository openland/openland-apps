import * as React from 'react';
import { View, Text, Image, StyleSheet, TextStyle } from 'react-native';
import { formatBytes } from './utils/formatBytes';
import { XPBubbleView } from 'openland-xp/XPBubbleView';
import { formatTime } from './utils/formatTime';

let styles = StyleSheet.create({
    date: {
        fontSize: 13,
        lineHeight: 15,
        color: '#8a8a8f',
        // fontWeight: '00',
        opacity: 0.6
    } as TextStyle,
    dateOut: {
        color: '#fff',
        opacity: 0.7
    } as TextStyle
});
export interface MessageDocumentViewProps {
    date: string;
    isSending: boolean;
    file: string;
    fileName?: string;
    size?: number;
    isOut: boolean;
    attach?: 'bottom' | 'top' | 'both';
}

export class MessageDocumentView extends React.PureComponent<MessageDocumentViewProps> {
    render() {
        return (
            <XPBubbleView isOut={this.props.isOut} attach={this.props.attach}>
                <View style={{ height: 64, flexDirection: 'row', minWidth: this.props.isOut ? 200 : 180 }}>
                    <View style={{ width: 40, height: 40, backgroundColor: this.props.isOut ? '#2828c9' : '#ffffff', borderRadius: 20, margin: 12, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={this.props.isOut ? require('assets/ic-file-download-my.png') : require('assets/ic-file-download-ios.png')} style={{ width: 16, height: 20 }} />
                    </View>
                    <View flexGrow={1} flexDirection="column" marginTop={12} marginBottom={12} marginRight={14} alignSelf="center">
                        <Text style={{ color: this.props.isOut ? '#ffffff' : '#000000', height: 16, fontSize: 15, lineHeight: 18, fontWeight: '600' }}>{this.props.fileName || 'file'}</Text>
                        <Text style={{ color: this.props.isOut ? '#ffffff' : '#000000', height: 15, fontSize: 13, lineHeight: 15, marginTop: 4, fontWeight: '500', opacity: 0.7 }}>{formatBytes(this.props.size)}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', bottom: 6, height: 15, alignItems: 'center', justifyContent: 'center', right: this.props.isOut ? 0 : 8, flexDirection: 'row' }}>
                    <Text style={[styles.date, this.props.isOut && styles.dateOut]}>{formatTime(parseInt(this.props.date, 10))}</Text>
                    {this.props.isOut && (
                        <View style={{ width: 18, height: 13, marginLeft: 2, justifyContent: 'center', alignItems: 'flex-start' }}>
                            {this.props.isSending && <Image source={require('assets/ic-sending.png')} style={{ width: 13, height: 13 }} />}
                            {!this.props.isSending && <Image source={require('assets/ic-sent.png')} style={{ marginTop: 2, width: 9, height: 8 }} />}
                        </View>
                    )}
                </View>
            </XPBubbleView>
        );
    }
}