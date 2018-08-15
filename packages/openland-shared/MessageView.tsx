import * as React from 'react';
import { MessageGroup } from 'openland-engines/messenger/ConversationState';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { extractKey } from 'openland-engines/messenger/types';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { MessageFullFragment } from 'openland-api/Types';
import { MessageViewSingle } from './MessageViewSingle';

let styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    } as ViewStyle,
});

export interface MessageViewProps {
    onAvatarPress?: (userId: string) => void;
    onPhotoPress?: (message: MessageFullFragment, view?: View) => void;
    message: MessageGroup;
    engine: ConversationEngine;
}

export class MessageView extends React.PureComponent<MessageViewProps> {
    render() {
        return (
            <View style={styles.container}>
                {this.props.message.messages.map((v, i) => (
                    <MessageViewSingle
                        key={extractKey(v)}
                        message={v}
                        engine={this.props.engine}
                        onAvatarPress={this.props.onAvatarPress}
                        onPhotoPress={this.props.onPhotoPress}
                        attach={
                            this.props.message.messages.length > 1 ? (
                                i === 0 ? 'bottom' :
                                    i === this.props.message.messages.length - 1 ? 'top' :
                                        'both'
                            ) : undefined
                        }
                    />
                ))}
            </View>
        );
    }
}