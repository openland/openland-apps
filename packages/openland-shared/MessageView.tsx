import * as React from 'react';
import { MessageTextView } from './MessageTextView';
import { MessageGroup } from 'openland-engines/messenger/ConversationState';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { isServerMessage, ModelMessage } from 'openland-engines/messenger/types';
import { View, TouchableOpacity, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { MessageImageView } from './MessageImageView';
import { MessageDocumentView } from './MessageDocumentView';
import { MessageFullFragment } from 'openland-api/Types';

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
        alignItems: 'flex-start'
    } as ViewStyle,
    messageContainerOut: {
        alignItems: 'flex-end',
        paddingLeft: 51,
    } as ViewStyle,
    header: {
        flexDirection: 'row',
        height: 16,
        marginBottom: 1
    } as ViewStyle,
    sender: {
        height: 14,
        lineHeight: 14,
        fontSize: 12,
        letterSpacing: 0.2
    } as TextStyle,
    message: {
        lineHeight: 22,
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        letterSpacing: 0.1
    } as TextStyle,
    messageOut: {
        color: '#fff',
    } as TextStyle
});

export interface MessageViewProps {
    onAvatarPress?: (userId: string) => void;
    onPhotoPress?: (message: MessageFullFragment, view?: View) => void;
    message: MessageGroup;
    engine: ConversationEngine;
}

export class MessageView extends React.PureComponent<MessageViewProps> {
    handlePress = () => {
        if (this.props.onAvatarPress) {
            this.props.onAvatarPress(this.props.message.sender.id);
        }
    }

    hanlePhotoPress = (message: MessageFullFragment, view?: View) => {
        if (this.props.onPhotoPress) {
            this.props.onPhotoPress(message, view);
        }
    }

    render() {
        let isOut = this.props.message.sender.id === this.props.engine.engine.user.id;

        let content: any[] = [];
        let i = 0;
        for (let m of this.props.message.messages) {
            let key = isServerMessage(m) ? m.id : m.key;
            let attach: 'bottom' | 'top' | 'both' | undefined;
            if (i === 0 && this.props.message.messages.length > 1) {
                attach = 'bottom';
            } else if (i !== 0) {
                if (i === this.props.message.messages.length - 1) {
                    attach = 'top';
                } else {
                    attach = 'both';
                }
            }
            let sender = (i === 0 && !isOut) ? this.props.message.sender : undefined;
            // let content = <MessageTextContent text="" />;
            if (m.message) {
                content.push(<MessageTextView date={m.date} key={'msg-text-' + key} sender={sender} text={m.message} isOut={isOut} attach={attach} />);
            }
            if (isServerMessage(m)) {
                if (m.file) {
                    let w = m.fileMetadata!!.imageWidth ? m.fileMetadata!!.imageWidth!! : undefined;
                    let h = m.fileMetadata!!.imageHeight ? m.fileMetadata!!.imageHeight!! : undefined;
                    let name = m.fileMetadata!!.name ? m.fileMetadata!!.name!! : undefined;
                    let size = m.fileMetadata!!.size ? m.fileMetadata!!.size!! : undefined;
                    if (m.fileMetadata!!.isImage && !!w && !!h) {
                        content.push(<MessageImageView key={'msg-file-' + key} attach={attach} file={m.file} width={w} height={h} isGif={m.fileMetadata!!.imageFormat === 'GIF'} isOut={isOut} onPress={this.hanlePhotoPress} message={m} />);
                    } else {
                        content.push(<MessageDocumentView key={'msg-file-' + key} file={m.file} fileName={name} size={size} isOut={isOut} />);
                    }
                }
            }
            i++;
        }
        if (content.length === 0) {
            content.push(<MessageTextView date={this.props.message.messages[0].date} key={'msg-empty'} sender={!isOut ? this.props.message.sender : undefined} text="" isOut={isOut} />);
        }
        return (
            <View style={styles.container}>
                {!isOut && (
                    <View paddingBottom={7}>
                        <TouchableOpacity onPress={this.handlePress}>
                            <XPAvatar
                                src={this.props.message.sender.picture}
                                size={36}
                                placeholderKey={this.props.message.sender.id}
                                placeholderTitle={this.props.message.sender.name}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <View style={[styles.messageContainer, isOut && styles.messageContainerOut]}>
                    {content}
                </View>
            </View>
        );
    }
}