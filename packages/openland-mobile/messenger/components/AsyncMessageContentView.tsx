import * as React from 'react';
import { Platform, Linking } from 'react-native';
import { DataSourceMessageItem, PendingAttachProps } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView, bubbleMaxWidth, bubbleMaxWidthIncoming } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { resolveInternalLink } from '../../utils/resolveInternalLink';
import { FontStyles } from '../../styles/AppStyles';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ReplyContent, shiftReplyMeta } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { RichAttachContent, richAttachImageShouldBeCompact } from './content/RichAttachContent';
import { MediaContent, layoutImage } from './content/MediaContent';
import { DocumentContent, DocumentContentPreview } from './content/DocumentContent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment, FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase } from 'openland-api/spacex.types';
import { OthersUsersWrapper } from './content/OthersUsersWrapper';
import { openCalendar } from 'openland-mobile/utils/openCalendar';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { Span, SpanType } from 'openland-y-utils/spans/Span';
import { EmojiOnlyContent } from './content/EmojiOnlyContent';
import { StickerContent } from './content/StickerContent';
import { StickerBox } from './content/StickerBox';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { MetaInfoIndicator } from './content/MetaInfoIndicator';
import { SenderContent } from './content/SenderContent';
import { DonationContent } from './content/DonationContent';
import { isAudio, isVideo } from 'openland-y-utils/mediaExtension';
import { AudioContent } from './content/AudioContent';
import { TFn } from 'openland-mobile/text/useText';

export const paddedText = (edited?: boolean) => <ASText key="padded-text" fontSize={17}>{' ' + '\u00A0'.repeat(Platform.select({ default: edited ? 20 : 16, ios: edited ? 17 : 14 }))}</ASText>;

interface AsyncMessageTextViewProps {
    conversationId?: string;
    theme: ThemeGlobal;
    t: TFn;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
    onHashtagPress: (d?: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onLongPress: (e: ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onReplyPress?: (message: DataSourceMessageItem) => void;
    onPress?: () => void;
}

export let renderPreprocessedText = (
    spans: Span[],
    message: DataSourceMessageItem,
    theme: ThemeGlobal,
    onUserPress: (id: string) => void,
    onGroupPress: (id: string) => void,
    onOrganizationPress: (id: string) => void,
    onHashtagPress: (d?: string, chatId?: string) => void,
    ignoreMarkdown?: boolean,
) => {
    const SpanView = (props: { span: Span, children?: any }) => {
        const { span, children } = props;

        const bubbleForegroundPrimary = message.isOut ? theme.outgoingForegroundPrimary : theme.incomingForegroundPrimary;
        const bubbleBackgroundSecondary = message.isOut ? theme.outgoingBackgroundSecondary : theme.incomingBackgroundSecondary;

        let linkColor: string | undefined = message.isOut ? theme.foregroundContrast : theme.accentPrimary;
        let linkTextDecoration: 'underline' | 'none' = linkColor === bubbleForegroundPrimary ? 'underline' : 'none';

        if (!!message.isService) {
            linkColor = undefined;
            linkTextDecoration = 'none';
        }

        const markdownTypes = ['bold', 'loud', 'code_block', 'code_inline', 'insane', 'irony', 'italic', 'loud', 'rotating'] as SpanType[];
        if (ignoreMarkdown && markdownTypes.includes(span.type)) {
            return <ASText key={span.type + ' ignored'}>{children}</ASText>;
        }

        if (span.type === 'link') {
            return <ASText key={'link'} color={linkColor} onPress={resolveInternalLink(span.link, async () => await Linking.openURL(span.link))} textDecorationLine={linkTextDecoration}>{children}</ASText>;
        } else if (span.type === 'hashtag') {
            return <ASText key={'hashtag'} color={linkColor} onPress={() => onHashtagPress(span.textRaw, message.chatId)} textDecorationLine={linkTextDecoration}>{children}</ASText>;
        } else if (span.type === 'search_highlight') {
            return <ASText key={'search_highlight'} backgroundColor={message.isOut ? theme.outgoingBackgroundSecondary : theme.accentPrimaryTrans}>{children}</ASText>;
        } else if (span.type === 'mention_user') {
            return <ASText key={'mention-user'} fontWeight={message.isService ? FontStyles.Weight.Bold : undefined} color={linkColor} textDecorationLine={linkTextDecoration} onPress={() => onUserPress(span.user.id)}>{children}</ASText>;
        } else if (span.type === 'mention_all') {
            return <ASText key={'mention-all'} color={linkColor} textDecorationLine={linkTextDecoration}>{children}</ASText>;
        } else if (span.type === 'mention_room') {
            return <ASText key={'mention-room'} color={linkColor} textDecorationLine={linkTextDecoration} onPress={() => onGroupPress(span.room.id)}>{children}</ASText>;
        } else if (span.type === 'mention_organization') {
            return <ASText key={'mention-organization'} color={linkColor} textDecorationLine={linkTextDecoration} onPress={() => onOrganizationPress(span.organization.id)}>{children}</ASText>;
        } else if (span.type === 'mention_users') {
            return <OthersUsersWrapper key={'mentions'} theme={theme} onUserPress={uid => onUserPress(uid)} useAsync={true} mId={message.id || ''}>{children}</OthersUsersWrapper>;
        } else if (span.type === 'bold') {
            return <ASText key={'bold'} fontWeight={FontStyles.Weight.Bold}>{children}</ASText>;
        } else if (span.type === 'date') {
            return <ASText key={'date'} color={linkColor} onPress={openCalendar(span.date)} textDecorationLine={linkTextDecoration}>{children}</ASText>;
        } else if (span.type === 'code_block') {
            return <ASText key={'code-block'} fontType="monospace">{children}</ASText>;
        } else if (span.type === 'code_inline') {
            return <ASText key={'code-inline'} fontType="monospace" fontSize={14} backgroundColor={bubbleBackgroundSecondary}>{'\u2005'}{children}{'\u2005'}</ASText>;
        } else if (span.type === 'insane') {
            return <ASText key={'insane'}>{children}</ASText>;
        } else if (span.type === 'irony') {
            return <ASText key={'irony'} fontStyle="italic" backgroundColor={bubbleBackgroundSecondary}>{'\u2009'}{children}{'\u2009'}</ASText>;
        } else if (span.type === 'italic') {
            return <ASText key={'italic'} fontStyle="italic">{children}</ASText>;
        } else if (span.type === 'loud') {
            return <ASText key={'loud'} fontWeight={FontStyles.Weight.Medium}>{children}</ASText>;
        } else if (span.type === 'rotating') {
            return <ASText key={'rotating'}>{children}</ASText>;
        } else if (span.type === 'new_line') {
            return <ASText key={'br'}>{'\n'}</ASText>;
        } else if (span.type === 'emoji') {
            return <ASText key={'emoji'}>{children}</ASText>;
        } else if (span.type === 'text') {
            return <ASText key={'text'}>{span.text}</ASText>;
        }

        return props.children ? <ASText key={'unknown'}>{props.children}</ASText> : null;
    };

    return renderSpans(SpanView, spans) || [];
};

export let extractContent = (props: AsyncMessageTextViewProps, maxSize?: number, compensateBubble?: boolean) => {
    const { conversationId, theme, t, message, onUserPress, onGroupPress, onOrganizationPress, onHashtagPress, onMediaPress, onDocumentPress, onLongPress, onReplyPress, onPress } = props;

    // todo: handle multiple attaches
    const attaches = (message.attachments || []);
    const fileAttach = attaches.filter(a => a.__typename === 'MessageAttachmentFile')[0] as (FullMessage_GeneralMessage_attachments_MessageAttachmentFile & PendingAttachProps) | undefined;
    const augmenationAttach = attaches.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
    const purchaseAttach = attaches.filter(a => a.__typename === 'MessageAttachmentPurchase')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase | undefined;
    const hasImage = !!(fileAttach && fileAttach.fileMetadata.isImage);
    const hasVideo = !!(fileAttach && isVideo(fileAttach.fileMetadata.name) && fileAttach.filePreview);
    const hasReply = !!(message.reply && message.reply.length > 0);
    const hasForward = !!(hasReply && conversationId && message.reply![0].source && message.reply![0].source?.__typename === 'MessageSourceChat' && message.reply![0].source.chat.id !== conversationId);
    const hasText = !!(message.text);
    const hasUrlAug = !!augmenationAttach;
    const hasPurchase = !!purchaseAttach;
    const sticker = message.sticker && message.sticker.__typename === 'ImageSticker' ? message.sticker : undefined;

    const isEmojiOnly = theme.largeEmoji && message.textSpans.length === 1 && message.textSpans[0].type === 'emoji' && (message.attachments || []).length === 0 && (message.reply || []).length === 0;
    const isStickerOnly = sticker && (message.attachments || []).length === 0 && (message.reply || []).length === 0;

    let imageLayout;
    if (hasImage) {
        imageLayout = layoutImage(fileAttach!.fileMetadata, maxSize);
    }
    let richAttachImageLayout;
    let richAttachSocialImageLayout;
    if (augmenationAttach && augmenationAttach.image && augmenationAttach.image.metadata) {
        richAttachImageLayout = layoutImage(augmenationAttach.image.metadata, maxSize);
    }
    if (augmenationAttach && augmenationAttach.socialImage && augmenationAttach.socialImage.metadata) {
        richAttachSocialImageLayout = layoutImage(augmenationAttach.socialImage.metadata, maxSize);
    }
    const richAttachIsCompact = richAttachImageShouldBeCompact(augmenationAttach);
    let videoPreviewLayout;
    if (hasVideo && fileAttach) {
        videoPreviewLayout = layoutImage(fileAttach.previewFileMetadata, maxSize);
    }

    const hasDocument = !!(fileAttach && !hasImage);
    const imageOnly = hasImage && !(hasReply || hasText || hasUrlAug);

    let topContent = [];

    const textSize = !compensateBubble ? maxSize : undefined;

    if (hasImage && imageLayout) {
        topContent.push(<MediaContent key="msg-media" maxSize={maxSize!} theme={theme} compensateBubble={compensateBubble} layout={imageLayout} message={message} onUserPress={onUserPress} onGroupPress={onGroupPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} onLongPress={onLongPress} hasTopContent={hasReply && !hasForward} hasBottomContent={hasText || hasUrlAug || hasForward} />);
    }
    if (sticker) {
        topContent.push(<StickerContent key="msg-sticker" sticker={sticker} message={message} padded={hasReply} />);
    }
    if (!!purchaseAttach) {
        topContent.push(<DonationContent key="msg-donation" attach={purchaseAttach} hasText={hasText} isOut={message.isOut} />);
    }
    if (hasText) {
        topContent.push(<TextContent key="msg-text" compensateBubble={compensateBubble} width={textSize} emojiOnly={isEmojiOnly} hasPurchase={hasPurchase} theme={theme} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onGroupPress={onGroupPress} onOrganizationPress={onOrganizationPress} onHashtagPress={onHashtagPress} onMediaPress={onMediaPress} />);
    }
    if (hasDocument) {
        if ((fileAttach?.filePreview || fileAttach?.previewFileId) && videoPreviewLayout?.width && videoPreviewLayout?.height) {
            topContent.push(
                <DocumentContentPreview
                    key="msg-document-preview"
                    theme={theme}
                    compensateBubble={compensateBubble}
                    attach={fileAttach!}
                    message={message}
                    onDocumentPress={onDocumentPress}
                    onLongPress={onLongPress}
                    hasTopContent={hasReply && !hasForward}
                    hasBottomContent={hasText || hasUrlAug || hasForward}
                    layout={videoPreviewLayout}
                />
            );
        } else if (fileAttach?.fileMetadata.name && isAudio(fileAttach?.fileMetadata.name)) {
            topContent.push(
                <AudioContent
                    key="msg-audio"
                    theme={theme}
                    attach={fileAttach!}
                    message={message}
                    maxWidth={maxSize!}
                    onDocumentPress={onDocumentPress}
                    onLongPress={onLongPress}
                />
            );
        } else {
            topContent.push(
                <DocumentContent
                    key="msg-document"
                    theme={theme}
                    compensateBubble={compensateBubble}
                    attach={fileAttach!}
                    message={message}
                    onDocumentPress={onDocumentPress}
                    onLongPress={onLongPress}
                />
            );
        }
    }
    if (hasReply) {
        let replyContent = <ReplyContent key="msg-reply" isForward={hasForward} compensateBubble={compensateBubble} width={textSize} theme={theme} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onGroupPress={onGroupPress} onOrganizationPress={onOrganizationPress} onHashtagPress={onHashtagPress} onMediaPress={onMediaPress} onContentPress={onPress} onPress={onReplyPress} onLongPress={onLongPress} />;
        if (hasForward) {
            topContent.push(replyContent);
        } else {
            topContent.unshift(replyContent);
        }
    }

    let bottomContent: any[] = [];
    if (hasUrlAug) {
        bottomContent.push(<RichAttachContent key="msg-rich" theme={theme} t={t} padded={!topContent.length} compensateBubble={compensateBubble} hasPurchase={hasPurchase} attach={augmenationAttach!} maxWidth={maxSize} imageLayout={richAttachImageLayout} socialImageLayout={richAttachSocialImageLayout} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} onLongPress={onLongPress} />);
    }

    if (!topContent.length && bottomContent.length) {
        topContent = bottomContent;
        bottomContent = [];
    }

    if (!isEmojiOnly && !isStickerOnly && !message.isOut && !message.attachTop && !hasImage && !hasDocument && compensateBubble) {
        topContent.unshift(
            <SenderContent
                key={'name-' + theme.accentPrimary}
                message={message}
                theme={theme}
                hasPurchase={hasPurchase}
                onUserPress={onUserPress}
            />
        );
    }

    return {
        hasDocument,
        hasVideo,
        hasImage,
        hasReply,
        hasForward,
        hasText,
        hasPurchase,
        hasUrlAug,
        topContent,
        bottomContent,
        imageLayout,
        imageOnly,
        richAttachImageLayout,
        richAttachIsCompact,
        isEmojiOnly,
        isStickerOnly
    };
};

export const AsyncMessageContentView = React.memo<AsyncMessageTextViewProps>((props) => {
    const { theme, message } = props;
    const { isOut, attachTop, attachBottom } = message;
    const {
        hasImage,
        hasVideo,
        hasText,
        hasForward,
        hasPurchase,
        imageOnly,
        topContent,
        imageLayout,
        richAttachImageLayout,
        bottomContent,
        isEmojiOnly,
        isStickerOnly
    } = extractContent(props, (isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming), true);

    if (isEmojiOnly) {
        return <EmojiOnlyContent theme={theme} content={topContent} message={message} />;
    }

    if (isStickerOnly) {
        return <StickerBox theme={theme} content={topContent} message={message} />;
    }

    const fixedSize = !imageOnly && (imageLayout || richAttachImageLayout);
    const isImageBottom = (hasImage || hasVideo) && !hasText;
    // sorry
    const shiftMeta = !!(!bottomContent.length && (message.attachments || []).filter(a => a.__typename === 'MessageRichAttachment' && a.keyboard).length)
        || shiftReplyMeta(message, hasForward);
    const meta = <MetaInfoIndicator type={hasPurchase ? 'pay' : isImageBottom ? 'media' : 'default'} message={message} theme={theme} />;

    let bubbleBackgroundPrimary = message.isOut ? theme.outgoingBackgroundPrimary : theme.incomingBackgroundPrimary;
    let bubbleBackgroundSecondary = message.isOut ? theme.outgoingBackgroundSecondary : theme.incomingBackgroundSecondary;

    if (hasPurchase) {
        bubbleBackgroundPrimary = theme.payBackgroundPrimary;
        bubbleBackgroundSecondary = theme.payBackgroundSecondary;
    }

    return (
        <ASFlex flexDirection="column" alignItems="stretch">
            <AsyncBubbleView
                width={fixedSize ? (isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined}
                isOut={isOut}
                attachTop={attachTop}
                attachBottom={attachBottom}
                color={bubbleBackgroundPrimary}
                hasAfter={!!(bottomContent && bottomContent.length)}
            >
                <ASFlex flexDirection="column" alignItems="stretch">
                    {topContent}
                    {!shiftMeta && meta}
                    {shiftMeta && (
                        <ASFlex height={14} flexShrink={0} flexGrow={2}>{meta}</ASFlex>
                    )}
                </ASFlex>
            </AsyncBubbleView>

            {!!(bottomContent && bottomContent.length) && (
                <AsyncBubbleView
                    width={fixedSize ? (isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined}
                    isOut={isOut}
                    attachTop={attachTop}
                    attachBottom={attachBottom}
                    color={bubbleBackgroundSecondary}
                    hasBefore={!!(topContent && topContent.length)}
                >
                    {bottomContent}
                </AsyncBubbleView>
            )}
        </ASFlex>
    );
});