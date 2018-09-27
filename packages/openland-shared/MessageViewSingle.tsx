import * as React from 'react';
import { ModelMessage, isServerMessage, isPendingMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageFull } from 'openland-api/Types';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { MessageTextView } from './MessageTextView';
import { MessageImageView } from './MessageImageView';
import { MessageDocumentView } from './MessageDocumentView';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { DownloadManagerInterface } from './DownloadManagerInterface';

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 4,
        // paddingVertical: 5,
        width: '100%',
        alignItems: 'flex-end'
    } as ViewStyle,
    messageContainer: {
        flexDirection: 'column',
        paddingLeft: 0,
        flexGrow: 1,
        flexBasis: 0,
        alignItems: 'flex-start',
        paddingRight: 50,
    } as ViewStyle,
    messageContainerOut: {
        alignItems: 'flex-end',
        paddingLeft: 50,
        paddingRight: 0
    } as ViewStyle
});

export interface MessageViewSingleProps {
    engine: ConversationEngine;
    downloadManager?: DownloadManagerInterface;
    onAvatarPress?: (userId: string) => void;
    onPhotoPress?: (message: MessageFull, view?: View) => void;
    onDocumentPress?: (message: MessageFull) => void;
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

    hanlePhotoPress = (message: MessageFull, view?: View) => {
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
                    isSending={isPendingMessage(this.props.message)}
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
                            date={message.date}
                            isSending={false}
                            downloadManager={this.props.downloadManager}
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
                            date={message.date}
                            message={message}
                            isSending={false}
                            onPress={this.props.onDocumentPress}
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
                    isSending={isPendingMessage(this.props.message)}
                />
            );
        }

        return (
            <View style={styles.container}>
                {!isOut && this.props.attach !== 'both' && this.props.attach !== 'bottom' && (
                    <View paddingBottom={7} marginRight={-4} marginLeft={4}>
                        <TouchableOpacity onPress={this.handleAvatarPress}>
                            <XPAvatar
                                src={sender.picture}
                                size={28}
                                placeholderKey={sender.id}
                                placeholderTitle={sender.name}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {!isOut && (this.props.attach === 'both' || this.props.attach === 'bottom') && (
                    <View width={28} />
                )}
                <View style={[styles.messageContainer, isOut && styles.messageContainerOut]}>
                    {content}
                </View>
            </View>
        );
    }
}