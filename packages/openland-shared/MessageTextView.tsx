import * as React from 'react';
import { UserShortFragment } from 'openland-api/Types';
import { Text, Linking, TextStyle, StyleSheet, Platform } from 'react-native';
import { doSimpleHash } from 'openland-y-utils/hash';
import { XPStyles } from 'openland-xp/XPStyles';
import { XPBubbleView } from 'openland-xp/XPBubbleView';
import { preprocessText } from 'openland-y-utils/TextProcessor';

let styles = StyleSheet.create({
    sender: {
        height: 14,
        lineHeight: 14,
        fontSize: 12,
        letterSpacing: 0.2
    } as TextStyle,
    message: {
        color: '#000',
        letterSpacing: 0.1,
        ...Platform.select({
            default: {
                lineHeight: 22,
                fontSize: 16,
                fontWeight: 'normal',
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
    } as TextStyle
});

export class MessageTextView extends React.PureComponent<{ text: string, sender?: UserShortFragment, isOut: boolean, attach?: 'bottom' | 'top' | 'both' }> {
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
        if (this.props.sender) {
            let placeholderIndex = doSimpleHash(this.props.sender.id) % XPStyles.avatars.length;
            sender = <Text key="sender-name" style={[styles.sender, { color: XPStyles.avatars[placeholderIndex].nameColor }]}>{this.props.sender.name}</Text>;
        }
        return (
            <XPBubbleView appearance="text" isOut={this.props.isOut} attach={this.props.attach}>
                {sender}
                <Text key="message" style={[styles.message, this.props.isOut && styles.messageOut]}>
                    {parts}
                </Text>
            </XPBubbleView>
        );
    }
}