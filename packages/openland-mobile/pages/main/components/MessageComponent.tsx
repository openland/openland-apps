import * as React from 'react';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 8,
        paddingBottom: 8,
        width: '100%'
    } as ViewStyle,
    messageContainer: {
        flexDirection: 'column',
        paddingLeft: 10,
        flexGrow: 1,
        flexBasis: 0
    } as ViewStyle,
    sender: {
        height: 18,
        lineHeight: 18,
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 3
    } as TextStyle,
    message: {
        lineHeight: 18,
        fontSize: 14,
        fontWeight: '400',
        color: '#181818',
        paddingRight: 15
    } as TextStyle
});

export class MessageComponent extends React.PureComponent<{ message: ModelMessage, engine: ConversationEngine }> {
    render() {
        let sender = isServerMessage(this.props.message) ? this.props.message.sender : this.props.engine.engine.user;
        return (
            <View style={styles.container}>
                <ZAvatar src={sender.picture} size={40} placeholderKey={sender.id} placeholderTitle={sender.name} />
                <View style={styles.messageContainer}>
                    <Text style={styles.sender}>{sender.name}</Text>
                    <Text style={styles.message}>{this.props.message.message}</Text>
                </View>
            </View>
        );
    }
}