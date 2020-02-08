import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { AsyncReplyMessageMediaView } from '../AsyncReplyMessageMediaView';
import { AsyncReplyMessageDocumentView } from '../AsyncReplyMessageDocumentView';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { RenderSpans } from './AsyncRenderSpans';
import { bubbleMaxWidth, bubbleMaxWidthIncoming, contentInsetsHorizontal } from '../AsyncBubbleView';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { StickerContent } from './StickerContent';

interface ReplyContentProps {
    message: DataSourceMessageItem;
    maxWidth?: number;
    width?: number;
    compensateBubble?: boolean;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onPress?: () => void;
    theme: ThemeGlobal;
}
export class ReplyContent extends React.PureComponent<ReplyContentProps> {

    render() {
        let { message, maxWidth, width, compensateBubble, theme, onPress } = this.props;

        let lineBackgroundPatch: any;
        let capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

        if (message.reply) {
            // for left accent line
            let image = require('assets/chat-link-line-my.png');
            lineBackgroundPatch = Image.resolveAssetSource(image);
        }

        const bubbleForegroundPrimary = message.isOut ? theme.outgoingForegroundPrimary : theme.incomingForegroundPrimary;
        const bubbleForegroundTertiary = message.isOut ? theme.outgoingForegroundTertiary : theme.incomingForegroundTertiary;

        return (
            <>
                {message.reply && (
                    message.reply.map((m, i) => {
                        const needPaddedText = !message.text && !message.sticker && (i + 1 === message.reply!.length);
                        const repliedMessage = !m.isService ? m : undefined;

                        if (repliedMessage) {
                            const attachFile = repliedMessage.attachments && repliedMessage.attachments.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
                            const sticker = m.sticker && m.sticker.__typename === 'ImageSticker' ? m.sticker : undefined;

                            return (
                                <ASFlex key={'reply-' + m.id} flexDirection="column" alignItems="stretch" marginTop={5} marginLeft={1} marginBottom={6} backgroundPatch={{ source: lineBackgroundPatch.uri, scale: lineBackgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={bubbleForegroundTertiary} onPress={onPress}>
                                    <ASText
                                        key={'reply-author-' + m.id}
                                        marginTop={-2}
                                        height={15}
                                        lineHeight={15}
                                        marginLeft={10}
                                        color={bubbleForegroundPrimary}
                                        letterSpacing={0}
                                        fontSize={13}
                                        onPress={() => this.props.onUserPress(repliedMessage!.sender.id)}
                                        fontWeight={FontStyles.Weight.Medium}
                                        marginBottom={2}
                                    >
                                        {repliedMessage.sender.name || ''}
                                    </ASText>

                                    {repliedMessage.textSpans.length > 0 && (
                                        <ASFlex key={'reply-spans-' + m.id} flexDirection="column" alignItems="stretch" marginLeft={10} onPress={onPress}>
                                            <RenderSpans
                                                spans={repliedMessage.textSpans}
                                                message={message}
                                                padded={compensateBubble ? needPaddedText : false}
                                                theme={theme}
                                                maxWidth={maxWidth ? maxWidth : (message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - 70}
                                                width={width}
                                                insetLeft={8}
                                                insetRight={contentInsetsHorizontal}
                                                insetVertical={4}
                                                numberOfLines={1}

                                                onUserPress={this.props.onUserPress}
                                                onGroupPress={this.props.onGroupPress}
                                                onOrganizationPress={this.props.onOrganizationPress}
                                            />
                                        </ASFlex>
                                    )}

                                    {sticker && (
                                        <ASFlex key={'reply-sticker-' + m.id} flexDirection="column" alignItems="stretch" marginLeft={10}>
                                            <StickerContent sticker={sticker} message={m} padded={needPaddedText} />
                                        </ASFlex>
                                    )}

                                    {attachFile && attachFile.fileMetadata.isImage ? (
                                        <AsyncReplyMessageMediaView
                                            attach={attachFile}
                                            onPress={this.props.onMediaPress}
                                            message={repliedMessage}
                                        />
                                    ) : null}
                                    {attachFile && !attachFile.fileMetadata.isImage ? (
                                        <AsyncReplyMessageDocumentView
                                            maxWidth={message.isOut ? bubbleMaxWidth - 100 : bubbleMaxWidthIncoming - 80}
                                            theme={theme}
                                            attach={attachFile}
                                            onPress={this.props.onDocumentPress}
                                            parent={message}
                                            message={repliedMessage}
                                        />
                                    ) : null}
                                </ASFlex>
                            );
                        } else {
                            return (
                                <ASFlex key={'reply-' + m.id} flexDirection="column" alignItems="stretch" marginTop={5} marginLeft={1} marginBottom={6} backgroundPatch={{ source: lineBackgroundPatch.uri, scale: lineBackgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={bubbleForegroundTertiary}>
                                    {m.textSpans.length > 0 && (
                                        <ASFlex key={'reply-spans-' + m.id} flexDirection="column" alignItems="stretch" marginLeft={10}>
                                            <RenderSpans
                                                spans={m.textSpans}
                                                message={m}
                                                padded={compensateBubble ? needPaddedText : false}
                                                theme={theme}
                                                maxWidth={maxWidth ? maxWidth : (message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - 70}
                                                width={width}
                                                insetLeft={8}
                                                insetRight={contentInsetsHorizontal}
                                                insetVertical={4}

                                                onUserPress={this.props.onUserPress}
                                                onGroupPress={this.props.onGroupPress}
                                                onOrganizationPress={this.props.onOrganizationPress}
                                            />
                                        </ASFlex>
                                    )}
                                </ASFlex>
                            );
                        }
                    })
                )}
            </>
        );
    }
}