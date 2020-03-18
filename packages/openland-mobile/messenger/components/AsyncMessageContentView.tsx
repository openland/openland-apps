import * as React from 'react';
import { Platform, Linking } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
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
import { DocumentContent } from './content/DocumentContent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/spacex.types';
import { OthersUsersWrapper } from './content/OthersUsersWrapper';
import { openCalendar } from 'openland-mobile/utils/openCalendar';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { EmojiOnlyContent } from './content/EmojiOnlyContent';
import { StickerContent } from './content/StickerContent';
import { StickerBox } from './content/StickerBox';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { MetaInfoIndicator } from './content/MetaInfoIndicator';
import { SenderContent } from './content/SenderContent';

export const paddedText = (edited?: boolean) => <ASText key="padded-text" fontSize={17}>{' ' + '\u00A0'.repeat(Platform.select({ default: edited ? 20 : 16, ios: edited ? 17 : 14 }))}</ASText>;

interface AsyncMessageTextViewProps {
    conversationId?: string;
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onLongPress: (e: ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onReplyPress?: (message: DataSourceMessageItem) => void;
}

export let renderPreprocessedText = (spans: Span[], message: DataSourceMessageItem, theme: ThemeGlobal, onUserPress: (id: string) => void, onGroupPress: (id: string) => void, onOrganizationPress: (id: string) => void) => {
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

        if (span.type === 'link') {
            return <ASText key={'link'} color={linkColor} onPress={resolveInternalLink(span.link, async () => await Linking.openURL(span.link))} textDecorationLine={linkTextDecoration}>{children}</ASText>;
        } else if (span.type === 'mention_user') {
            return <ASText key={'mention-user'} fontWeight={message.isService ? FontStyles.Weight.Bold : undefined} color={linkColor} textDecorationLine={linkTextDecoration} onPress={() => onUserPress(span.user.id)}>{children}</ASText>;
        } else if (span.type === 'mention_all') {
            return <ASText key={'mention-all'} color={linkColor} textDecorationLine={linkTextDecoration}>{children}</ASText>;
        } else if (span.type === 'mention_room') {
            return <ASText key={'mention-room'} color={linkColor} textDecorationLine={linkTextDecoration} onPress={() => onGroupPress(span.room.id)}>{children}</ASText>;
        } else if (span.type === 'mention_organization') {
            return <ASText key={'mention-organization'} color={linkColor} textDecorationLine={linkTextDecoration} onPress={() => onOrganizationPress(span.organization.id)}>{children}</ASText>;
        } else if (span.type === 'mention_users') {
            return <OthersUsersWrapper key={'mentions'} theme={theme} onUserPress={uid => onUserPress(uid)} users={span.users} useAsync={true}>{children}</OthersUsersWrapper>;
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
    const { conversationId, theme, message, onUserPress, onGroupPress, onOrganizationPress, onMediaPress, onDocumentPress, onLongPress, onReplyPress } = props;

    // todo: handle multiple attaches
    const attaches = (message.attachments || []);
    const fileAttach = attaches.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
    const augmenationAttach = attaches.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
    const hasImage = !!(fileAttach && fileAttach.fileMetadata.isImage);
    const hasReply = !!(message.reply && message.reply.length > 0);
    const hasForward = !!(hasReply && conversationId && message.reply![0].source && message.reply![0].source.chat.id !== conversationId);
    const hasText = !!(message.text);
    const hasUrlAug = !!augmenationAttach;
    const sticker = message.sticker && message.sticker.__typename === 'ImageSticker' ? message.sticker : undefined;

    const isEmojiOnly = message.textSpans.length === 1 && message.textSpans[0].type === 'emoji' && (message.attachments || []).length === 0 && (message.reply || []).length === 0;
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

    const hasDocument = !!(fileAttach && !hasImage);
    const imageOnly = hasImage && !(hasReply || hasText || hasUrlAug);

    let topContent = [];

    const textSize = !compensateBubble ? maxSize : undefined;

    // if (hasImage && imageLayout) {
    //     topContent.push(<MediaContent key="msg-media" theme={theme} compensateBubble={compensateBubble} layout={imageLayout} message={message} attach={fileAttach!} onUserPress={onUserPress} onGroupPress={onGroupPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} onLongPress={onLongPress} hasTopContent={hasReply} hasBottomContent={hasText || hasUrlAug} />);
    // }
    if (sticker) {
        topContent.push(<StickerContent key="msg-sticker" sticker={sticker} message={message} padded={hasReply} />);
    }
    if (hasText) {
        topContent.push(<TextContent key="msg-text" compensateBubble={compensateBubble} width={textSize} emojiOnly={isEmojiOnly} theme={theme} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onGroupPress={onGroupPress} onOrganizationPress={onOrganizationPress} onMediaPress={onMediaPress} />);
    }
    if (hasDocument) {
        topContent.push(<DocumentContent key="msg-document" theme={theme} compensateBubble={compensateBubble} attach={fileAttach!} message={message} onUserPress={onUserPress} onGroupPress={onGroupPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} onLongPress={onLongPress} />);
    }
    if (hasReply) {
        let replyContent = <ReplyContent key="msg-reply" isForward={hasForward} compensateBubble={compensateBubble} width={textSize} theme={theme} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onGroupPress={onGroupPress} onOrganizationPress={onOrganizationPress} onMediaPress={onMediaPress} onPress={onReplyPress} />;
        if (hasForward) {
            topContent.push(replyContent);
        } else {
            topContent.unshift(replyContent);
        }
    }

    let bottomContent: any[] = [];
    if (hasUrlAug) {
        bottomContent.push(<RichAttachContent key="msg-rich" theme={theme} padded={!topContent.length} compensateBubble={compensateBubble} attach={augmenationAttach!} maxWidth={maxSize} imageLayout={richAttachImageLayout} socialImageLayout={richAttachSocialImageLayout} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} />);
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
                onUserPress={onUserPress}
            />
        );
    }

    return {
        hasDocument,
        hasImage,
        hasReply,
        hasForward,
        hasText,
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
        hasDocument,
        hasImage,
        hasText,
        hasForward,
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
    const isImageBottom = hasImage && !hasText && !hasDocument;
    // sorry
    const shiftMeta = !!(!bottomContent.length && (message.attachments || []).filter(a => a.__typename === 'MessageRichAttachment' && a.keyboard).length) 
        || shiftReplyMeta(message, hasForward);
    const meta = <MetaInfoIndicator type={isImageBottom ? 'media' : 'default'} message={message} theme={theme} />;

    const bubbleBackgroundPrimary = message.isOut ? theme.outgoingBackgroundPrimary : theme.incomingBackgroundPrimary;
    const bubbleBackgroundSecondary = message.isOut ? theme.outgoingBackgroundSecondary : theme.incomingBackgroundSecondary;

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