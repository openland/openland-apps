import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatar } from './AsyncAvatar';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASImage } from 'react-native-async-view/ASImage';
import { formatTime } from '../../utils/formatTime';
import { formatBytes } from '../../utils/formatBytes';
import { AsyncMessageMediaView } from './AsyndMessageMediaView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';

const paddedText = ' ' + '\u00A0'.repeat(10);
const paddedTextOut = ' ' + '\u00A0'.repeat(13);

export class AsyncMessageTextView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom}>
                <ASFlex
                    marginLeft={10}
                    marginRight={10}
                    marginTop={7}
                    marginBottom={8}
                    flexDirection="column"
                >
                    <ASText
                        color={this.props.message.isOut ? '#fff' : '#000'}
                        lineHeight={20}
                        letterSpacing={-0.3}
                        fontSize={16}
                        fontWeight="400"
                    >
                        {this.props.message.text}
                        {this.props.message.isOut ? paddedTextOut : paddedText}
                    </ASText>
                </ASFlex>
                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={this.props.message.isOut ? 4 : 8}
                    marginBottom={6}
                >
                    <ASFlex
                        flexDirection="row"
                        height={14}
                    >
                        <ASText
                            backgroundColor="#f00"
                            fontSize={11}
                            lineHeight={13}
                            color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                            opacity={this.props.message.isOut ? 0.7 : 0.6}
                        >
                            {formatTime(this.props.message.date)}
                        </ASText>
                        {this.props.message.isOut && (
                            <ASFlex width={18} height={13} marginLeft={2} marginTop={1} justifyContent="flex-start" alignItems="center">
                                {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </AsyncBubbleView>
        );
    }
}

export class AsyncDocumentView extends React.PureComponent<{ message: DataSourceMessageItem, onPress: (document: DataSourceMessageItem) => void }> {
    private handlePress = () => {
        this.props.onPress(this.props.message);
    }
    render() {
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom}>
                <ASFlex height={60} flexDirection="row" onPress={this.handlePress}>
                    <ASFlex
                        width={40}
                        height={40}
                        backgroundColor={this.props.message.isOut ? '#5555ea' : 'rgba(224, 227, 231, 0.5)'}
                        borderRadius={20}
                        marginLeft={10}
                        marginTop={10}
                        marginBottom={10}
                        marginRight={10}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ASImage
                            source={this.props.message.isOut ? require('assets/ic-file-download-out.png') : require('assets/ic-file-download.png')}
                            width={16}
                            height={20}
                        />
                    </ASFlex>
                    <ASFlex
                        flexGrow={1}
                        flexDirection="column"
                        marginTop={12}
                        marginBottom={12}
                        marginRight={14}
                        alignSelf="center"
                    >
                        <ASText
                            color={this.props.message.isOut ? '#ffffff' : '#000000'}
                            height={18}
                            fontSize={15}
                            lineHeight={18}
                            numberOfLines={1}
                        >
                            {this.props.message.file!!.fileName}
                        </ASText>
                        <ASText
                            color={this.props.message.isOut ? '#ffffff' : '#8a8a8f'}
                            height={15}
                            lineHeight={15}
                            fontSize={13}
                            marginTop={3}
                            numberOfLines={1}
                            opacity={0.7}
                        >
                            {formatBytes(this.props.message.file!!.fileSize)}
                        </ASText>
                    </ASFlex>
                </ASFlex>
                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={this.props.message.isOut ? 10 : 12}
                    marginBottom={10}
                >
                    <ASFlex
                        flexDirection="row"
                        height={14}
                    >
                        <ASText
                            backgroundColor="#f00"
                            fontSize={11}
                            lineHeight={13}
                            color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                            opacity={this.props.message.isOut ? 0.7 : 0.6}
                        >
                            {formatTime(this.props.message.date)}
                        </ASText>
                        {this.props.message.isOut && (
                            <ASFlex width={18} height={13} marginLeft={2} marginTop={1} justifyContent="flex-start" alignItems="center">
                                {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </AsyncBubbleView>
        );
    }
}

export interface AsyncMessageViewProps {
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onMessagePress: (message: DataSourceMessageItem) => void;
    onAvatarPress: (id: string) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
}

export class AsyncMessageView extends React.PureComponent<AsyncMessageViewProps> {

    private handlePress = () => {
        this.props.onAvatarPress(this.props.message.senderId);
    }

    private handleLongPress = () => {
        this.props.onMessagePress(this.props.message);
    }

    render() {
        return (
            <ASFlex flexDirection="row" marginLeft={!this.props.message.isOut && this.props.message.attachBottom ? 33 : 4} marginRight={4} marginTop={this.props.message.attachTop ? 2 : 14} marginBottom={2} alignItems="flex-end" onLongPress={this.handleLongPress}>
                {!this.props.message.isOut && !this.props.message.attachBottom &&
                    <ASFlex marginBottom={0} marginRight={-1} marginLeft={4} onPress={this.handlePress}>
                        <AsyncAvatar
                            size={28}
                            src={this.props.message.senderPhoto}
                            placeholderKey={this.props.message.senderId}
                            placeholderTitle={this.props.message.senderName}
                        />
                    </ASFlex>
                }
                <ASFlex flexDirection="column" alignItems={this.props.message.isOut ? 'flex-end' : 'flex-start'} flexGrow={1} flexBasis={0} marginLeft={this.props.message.isOut ? 50 : 0} marginRight={this.props.message.isOut ? 0 : 50}>
                    {this.props.message.text && !this.props.message.file && (
                        <AsyncMessageTextView message={this.props.message} />
                    )}
                    {this.props.message.file && this.props.message.file.isImage && (
                        <AsyncMessageMediaView message={this.props.message} onPress={this.props.onMediaPress} />
                    )}
                    {this.props.message.file && !this.props.message.file.isImage && (
                        <AsyncDocumentView message={this.props.message} onPress={this.props.onDocumentPress} />
                    )}
                </ASFlex>
            </ASFlex>
        );
    }
}