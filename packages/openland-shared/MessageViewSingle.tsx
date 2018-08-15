import * as React from 'react';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageFullFragment } from 'openland-api/Types';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { MessageTextView } from './MessageTextView';
import { MessageImageView } from './MessageImageView';
import { MessageDocumentView } from './MessageDocumentView';
import { XPAvatar } from 'openland-xp/XPAvatar';

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        // paddingVertical: 5,
        width: '100%',
        alignItems: 'flex-end'
    } as ViewStyle,
    messageContainer: {
        flexDirection: 'column',
        paddingLeft: 7,
        flexGrow: 1,
        flexBasis: 0,
        alignItems: 'flex-start',
        paddingRight: 50,
    } as ViewStyle,
    messageContainerOut: {
        alignItems: 'flex-end',
        paddingLeft: 51,
        paddingRight: 0
    } as ViewStyle
});

export interface MessageViewSingleProps {
    engine: ConversationEngine;
    onAvatarPress?: (userId: string) => void;
    onPhotoPress?: (message: MessageFullFragment, view?: View) => void;
    message: ModelMessage;
    attach?: 'top' | 'bottom' | 'both';
}

export class MessageViewSingle extends React.PureComponent<MessageViewSingleProps> {
    handleAvatarPress = () => {
        const message = this.props.message;
        const sender = isServerMessage(message) ? message.sender : this.props.engine.engine.user;
        if (this.props.onAvatarPress) {
            this.props.onAvatarPress(sender.id);
        }
    }

    hanlePhotoPress = (message: MessageFullFragment, view?: View) => {
        if (this.props.onPhotoPress) {
            this.props.onPhotoPress(message, view);
        }
    }

    render() {
        let content: any[] = [];
        const message = this.props.message;
        const sender = isServerMessage(message) ? message.sender : this.props.engine.engine.user;
        const isOut = sender.id === this.props.engine.engine.user.id;
        const key = isServerMessage(message) ? message.id : message.key;

        // Text Content
        if (message.message) {
            content.push(
                <MessageTextView
                    key={'msg-text-' + key}
                    date={message.date}
                    text={message.message}
                    isOut={isOut}
                    attach={this.props.attach}
                    sender={!isOut ? sender : undefined}
                />
            );
        }

        // File content
        if (isServerMessage(message)) {
            if (message.file) {
                let w = message.fileMetadata!!.imageWidth ? message.fileMetadata!!.imageWidth!! : undefined;
                let h = message.fileMetadata!!.imageHeight ? message.fileMetadata!!.imageHeight!! : undefined;
                let name = message.fileMetadata!!.name ? message.fileMetadata!!.name!! : undefined;
                let size = message.fileMetadata!!.size ? message.fileMetadata!!.size!! : undefined;
                if (message.fileMetadata!!.isImage && !!w && !!h) {
                    content.push(
                        <MessageImageView
                            key={'msg-file-' + key}
                            file={message.file}
                            width={w}
                            height={h}
                            isGif={message.fileMetadata!!.imageFormat === 'GIF'}
                            isOut={isOut}
                            onPress={this.props.onPhotoPress}
                            message={message}
                        />
                    );
                } else {
                    content.push(
                        <MessageDocumentView
                            key={'msg-file-' + key}
                            file={message.file}
                            fileName={name}
                            size={size}
                            isOut={isOut}
                            attach={this.props.attach}
                        />
                    );
                }
            }
        }

        // Unsupported content
        if (content.length === 0) {
            content.push(
                <MessageTextView
                    date={this.props.message.date}
                    key={'msg-empty'}
                    sender={!isOut ? sender : undefined}
                    text="Unsupported content"
                    isOut={isOut}
                    attach={this.props.attach}
                />
            );
        }

        return (
            <View style={styles.container}>
                {!isOut && this.props.attach !== 'both' && this.props.attach !== 'bottom' && (
                    <View paddingBottom={7} marginRight={-8}>
                        <TouchableOpacity onPress={this.handleAvatarPress}>
                            <XPAvatar
                                src={sender.picture}
                                size={36}
                                placeholderKey={sender.id}
                                placeholderTitle={sender.name}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {!isOut && (this.props.attach === 'both' || this.props.attach === 'bottom') && (
                    <View width={35} />
                )}
                <View style={[styles.messageContainer, isOut && styles.messageContainerOut]}>
                    {content}
                </View>
            </View>
        );
    }
}