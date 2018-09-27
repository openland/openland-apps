import * as React from 'react';
import { UserShort } from 'openland-api/Types';
import { Text, Linking, TextStyle, StyleSheet, Platform, View, Image, ViewStyle } from 'react-native';
import { doSimpleHash } from 'openland-y-utils/hash';
import { XPStyles } from 'openland-xp/XPStyles';
import { XPBubbleView } from 'openland-xp/XPBubbleView';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { formatTime } from './utils/formatTime';

let styles = StyleSheet.create({
    container: {
        paddingHorizontal: 14,
        paddingTop: 7,
        paddingBottom: 8,
    } as ViewStyle,
    sender: {
        height: 14,
        lineHeight: 14,
        fontSize: 12,
        letterSpacing: -0.1,
        fontWeight: '500'
    } as TextStyle,
    message: {
        color: '#000',
        letterSpacing: -0.3,
        ...Platform.select({
            default: {
                lineHeight: 22,
                fontSize: 16,
                fontWeight: '500',
            },
            macos: {
                lineHeight: 22,
                fontSize: 14,
                fontWeight: '400',
            }
        })
    } as TextStyle,
    messageOut: {
        color: '#fff',
    } as TextStyle,
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

export class MessageTextView extends React.PureComponent<{ date: string, text: string, sender?: UserShort, isOut: boolean, attach?: 'bottom' | 'top' | 'both', isSending: boolean }> {

    paddedText = ' ' + '\u00A0'.repeat(13);
    paddedTextOut = ' ' + '\u00A0'.repeat(16);

    render() {
        let preprocessed = preprocessText(this.props.text);
        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <Text key={'br-' + i} >{'\n'}</Text>;
            } else if (v.type === 'link') {
                return <Text key={'link-' + i} style={{ color: '#654bfa' }} onPress={() => Linking.openURL(v.link!!)}>{v.text}</Text>;
            } else {
                return <Text key={'text-' + i}>{v.text}</Text>;
            }
        });
        let sender: any = undefined;
        if (this.props.sender && (this.props.attach !== 'top' && this.props.attach !== 'both')) {
            let placeholderIndex = doSimpleHash(this.props.sender.id) % XPStyles.avatars.length;
            sender = <Text key="sender-name" style={[styles.sender, { color: XPStyles.avatars[placeholderIndex].nameColor }]}>{this.props.sender.name}</Text>;
        }

        return (
            <XPBubbleView appearance="text" isOut={this.props.isOut} attach={this.props.attach}>
                <View style={styles.container}>
                    {sender}
                    <Text key="message" style={[styles.message, this.props.isOut && styles.messageOut]}>
                        {parts}
                        <Text>{this.props.isOut ? this.paddedTextOut : this.paddedText}</Text>
                    </Text>
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