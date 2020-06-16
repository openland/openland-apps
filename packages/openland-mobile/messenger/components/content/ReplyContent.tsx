import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { FontStyles, TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { AsyncReplyMessageMediaView } from '../AsyncReplyMessageMediaView';
import { AsyncReplyMessageDocumentView } from '../AsyncReplyMessageDocumentView';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment, FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase } from 'openland-api/spacex.types';
import { RenderSpans, TextWrapper } from './AsyncRenderSpans';
import { bubbleMaxWidth, bubbleMaxWidthIncoming, contentInsetsHorizontal } from '../AsyncBubbleView';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { StickerContent } from './StickerContent';

const getAttachFile = (message: DataSourceMessageItem) => {
    return message.attachments && message.attachments.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
};
const getAttachRich = (message: DataSourceMessageItem) => {
    return message.attachments && message.attachments.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
};
const getAttachPurchase = (message: DataSourceMessageItem) => {
    return message.attachments && message.attachments.filter(a => a.__typename === 'MessageAttachmentPurchase')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase | undefined;
};

export const shiftReplyMeta = (message: DataSourceMessageItem, isForward: boolean) => {
    if (!message.reply) {
        return false;
    }
    let lastReply = message.reply[message.reply.length - 1];
    if (!lastReply) {
        return false;
    }
    let attachFile = getAttachFile(lastReply);
    let isImage = attachFile && attachFile.fileMetadata.isImage;
    let isSticker = !!lastReply.sticker;
    let isRichAttach = !!getAttachRich(lastReply);
    let isPurchaseAttach = getAttachPurchase(lastReply);

    return isForward && (isImage || isSticker)
        || !isForward && !message.text && (isRichAttach || isSticker)
        || (isPurchaseAttach && isForward);
};

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
    onPress?: (message: DataSourceMessageItem) => void;
    theme: ThemeGlobal;
    isForward?: boolean;
}
export class ReplyContent extends React.PureComponent<ReplyContentProps> {

    render() {
        let { message, maxWidth, width, compensateBubble, theme, isForward, onPress } = this.props;

        let lineBackgroundPatch: any;
        let capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

        if (message.reply) {
            // for left accent line
            let image = require('assets/chat-link-line-my.png');
            lineBackgroundPatch = Image.resolveAssetSource(image);
        }

        const bubbleForegroundPrimary = message.isOut ? theme.outgoingForegroundPrimary : theme.incomingForegroundPrimary;
        const bubbleForegroundTertiary = message.isOut ? theme.outgoingForegroundTertiary : theme.incomingForegroundTertiary;
        const forwardColor = message.isOut ? theme.tintInverted : theme.foregroundTertiary;

        return (
            <>
                {message.reply && isForward && (
                    <ASText {...TextStylesAsync.Densed} color={forwardColor}>
                        {message.reply.length} forwarded {message.reply.length === 1 ? 'message' : 'messages'}
                    </ASText>
                )}
                {message.reply && (
                    message.reply.map((m, i) => {
                        const hasAttachments = m.attachments && m.attachments.length > 0;
                        const needPaddedText = !m.isService && !!m.text && !hasAttachments && (i + 1 === message.reply!.length);
                        const repliedMessage = !m.isService ? m : undefined;
                        const paddedMargin = needPaddedText && !isForward && !message.text;

                        const handlePress = () => {
                            if (!isForward && onPress) {
                                onPress(m);
                            }
                        };

                        if (repliedMessage) {
                            const attachFile = repliedMessage.attachments && repliedMessage.attachments.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
                            const sticker = m.sticker && m.sticker.__typename === 'ImageSticker' ? m.sticker : undefined;
                            const attachPurchase = getAttachPurchase(repliedMessage);

                            return (
                                <ASFlex key={'reply-' + m.id} flexDirection="column" alignItems="stretch" marginTop={5} marginLeft={1} marginBottom={6} backgroundPatch={{ source: lineBackgroundPatch.uri, scale: lineBackgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={bubbleForegroundTertiary} onPress={handlePress}>
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
                                        <ASFlex key={'reply-spans-' + m.id} flexDirection="column" alignItems="stretch" marginLeft={10} marginRight={paddedMargin ? 65 : undefined} onPress={handlePress}>
                                            <RenderSpans
                                                spans={repliedMessage.textSpans}
                                                message={message}
                                                padded={compensateBubble && isForward ? needPaddedText : false}
                                                theme={theme}
                                                maxWidth={maxWidth ? maxWidth : (message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - (paddedMargin ? 95 : 70)}
                                                width={width}
                                                insetLeft={8}
                                                insetRight={paddedMargin ? 0 : contentInsetsHorizontal}
                                                insetVertical={4}
                                                numberOfLines={isForward ? undefined : 1}

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
                                    {attachPurchase && (
                                        <TextWrapper
                                            key={'reply-donation-' + m.id}
                                            marginLeft={10} 
                                            fontSize={17}
                                            lineHeight={22}
                                            letterSpacing={-0.41}
                                            onPress={handlePress}
                                            color={bubbleForegroundPrimary}
                                        >
                                            {attachPurchase.fallback}
                                        </TextWrapper>
                                    )}
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