import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { AsyncReplyMessageMediaView } from '../AsyncReplyMessageMediaView';
import { AsyncReplyMessageDocumentView } from '../AsyncReplyMessageDocumentView';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment, FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase } from 'openland-api/spacex.types';
import { RenderSpans } from './AsyncRenderSpans';
import { bubbleMaxWidth, bubbleMaxWidthIncoming, contentInsetsHorizontal } from '../AsyncBubbleView';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { StickerContent } from './StickerContent';
import { AsyncReplyMessageRichAttach } from '../AsyncReplyMessageRichAttach';

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
    let isMessageImage = !!getAttachFile(message)?.fileMetadata.isImage;
    let isSticker = !!lastReply.sticker;
    let isRichAttach = !!getAttachRich(lastReply);
    let isPurchaseAttach = getAttachPurchase(lastReply);

    return isForward && (isImage || isSticker)
        || !isForward && !message.text && (isRichAttach && !isMessageImage || isSticker)
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
    onHashtagPress: (d?: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onPress?: (message: DataSourceMessageItem) => void;
    onLongPress: (e: ASPressEvent) => void;
    theme: ThemeGlobal;
    isForward?: boolean;
}
export class ReplyContent extends React.PureComponent<ReplyContentProps> {

    render() {
        let { message, maxWidth, width, compensateBubble, theme, isForward, onPress, onLongPress } = this.props;

        let lineBackgroundPatch: any;
        let capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

        if (message.reply) {
            // for left accent line
            let image = require('assets/chat-link-line-my.png');
            lineBackgroundPatch = Image.resolveAssetSource(image);
        }

        const bubbleForegroundPrimary = message.isOut ? theme.outgoingForegroundPrimary : theme.incomingForegroundPrimary;
        const bubbleForegroundSecondary = message.isOut ? theme.outgoingForegroundSecondary : theme.incomingForegroundSecondary;
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
                            const attachRich = repliedMessage.attachments && repliedMessage.attachments.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
                            const sticker = m.sticker && m.sticker.__typename === 'ImageSticker' ? m.sticker : undefined;
                            const attachPurchase = getAttachPurchase(repliedMessage);
                            let miniContent = null;
                            let miniContentSubtitle = null;
                            let miniContentColor = bubbleForegroundSecondary;

                            if (sticker) {
                                miniContent = <StickerContent sticker={sticker} message={m} padded={needPaddedText} width={40} height={40} />;
                                miniContentSubtitle = repliedMessage.fallback;
                            } else if (attachFile && attachFile.fileMetadata.isImage && !isForward) {
                                miniContent = (
                                    <AsyncReplyMessageMediaView
                                        attach={attachFile}
                                        onPress={this.props.onMediaPress}
                                        message={repliedMessage}
                                        theme={theme}
                                    />
                                );
                                miniContentSubtitle = repliedMessage.fallback;
                            } else if (attachFile && !attachFile.fileMetadata.isImage) {
                                miniContent = (
                                    <AsyncReplyMessageDocumentView
                                        attach={attachFile}
                                        message={repliedMessage}
                                    />
                                );
                                miniContentSubtitle = attachFile.fileMetadata.name;
                            } else if (attachRich && !isForward) {
                                miniContent = (
                                    <AsyncReplyMessageRichAttach
                                        attach={attachRich}
                                        onPress={this.props.onMediaPress}
                                        message={repliedMessage}
                                        theme={theme}
                                    />
                                );
                                miniContentSubtitle = repliedMessage.text;
                                miniContentColor = bubbleForegroundPrimary;
                            } else if (attachPurchase) {
                                miniContentSubtitle = attachPurchase.fallback;
                            }

                            return (
                                <ASFlex
                                    key={'reply-' + m.id}
                                    flexDirection="column"
                                    alignItems="stretch"
                                    marginTop={6}
                                    marginBottom={3}
                                    backgroundPatch={{ source: lineBackgroundPatch.uri, scale: lineBackgroundPatch.scale, ...capInsets }}
                                    backgroundPatchTintColor={bubbleForegroundTertiary}
                                    onPress={handlePress}
                                    onLongPress={onLongPress}
                                >
                                    <ASFlex
                                        key={'mini-context-' + m.id}
                                        flexDirection="row"
                                        alignItems="stretch"
                                        marginLeft={9}
                                        flexShrink={1}
                                    >
                                        {miniContent && (
                                            <ASFlex marginRight={8}>
                                                {miniContent}
                                            </ASFlex>
                                        )}
                                        <ASFlex
                                            flexGrow={1}
                                            flexShrink={1}
                                            flexDirection="column"
                                            key={'reply-author-' + m.id}
                                            marginTop={-3}
                                            maxWidth={(message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - 92}
                                        >
                                            <ASText
                                                {...TextStylesAsync.Label2}
                                                height={20}
                                                color={bubbleForegroundPrimary}
                                                numberOfLines={1}
                                                onPress={() => this.props.onUserPress(repliedMessage!.sender.id)}
                                            >
                                                {repliedMessage.sender.name || ''}
                                            </ASText>
                                            {miniContentSubtitle && (
                                                <ASText
                                                    {...TextStylesAsync.Subhead}
                                                    height={20}
                                                    color={miniContentColor}
                                                    marginTop={2}
                                                    numberOfLines={1}
                                                    flexGrow={1}
                                                >
                                                    {miniContentSubtitle}
                                                </ASText>
                                            )}
                                        </ASFlex>
                                    </ASFlex>
                                    {attachFile && attachFile.fileMetadata.isImage && isForward && (
                                        <AsyncReplyMessageMediaView
                                            attach={attachFile}
                                            onPress={this.props.onMediaPress}
                                            message={repliedMessage}
                                            theme={theme}
                                            isForward={true}
                                        />
                                    )}
                                    {!miniContent && repliedMessage.textSpans.length > 0 && (
                                        <ASFlex
                                            key={'reply-spans-' + m.id}
                                            marginTop={2}
                                            flexDirection="row"
                                            marginLeft={9}
                                            marginRight={paddedMargin ? 65 : undefined}
                                            onPress={handlePress}
                                            onLongPress={onLongPress}
                                        >
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
                                                ignoreMarkdown={true}

                                                onUserPress={this.props.onUserPress}
                                                onGroupPress={this.props.onGroupPress}
                                                onOrganizationPress={this.props.onOrganizationPress}
                                                onHashtagPress={this.props.onHashtagPress}
                                            />
                                        </ASFlex>
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
                                                ignoreMarkdown={true}

                                                onUserPress={this.props.onUserPress}
                                                onGroupPress={this.props.onGroupPress}
                                                onOrganizationPress={this.props.onOrganizationPress}
                                                onHashtagPress={this.props.onHashtagPress}
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