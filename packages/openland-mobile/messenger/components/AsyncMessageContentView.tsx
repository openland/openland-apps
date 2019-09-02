import * as React from 'react';
import { Platform, Linking } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView, bubbleMaxWidth, bubbleMaxWidthIncoming } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { resolveInternalLink } from '../../utils/internalLnksResolver';
import { FontStyles } from '../../styles/AppStyles';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ReplyContent } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { RichAttachContent, richAttachImageShouldBeCompact } from './content/RichAttachContent';
import { MediaContent, layoutImage } from './content/MediaContent';
import { DocumentContent } from './content/DocumentContent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { OthersUsersWrapper } from './content/OthersUsersWrapper';
import { openCalendar } from 'openland-mobile/utils/openCalendar';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { EmojiOnlyContent } from './content/EmojiOnlyContent';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { MetaInfoIndicator } from './content/MetaInfoIndicator';
import { SenderContent } from './content/SenderContent';

export const paddedText = (edited?: boolean) => <ASText key="padded-text" fontSize={17}>{' ' + '\u00A0'.repeat(Platform.select({ default: edited ? 20 : 16, ios: edited ? 17 : 14 }))}</ASText>;

interface AsyncMessageTextViewProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}

export let renderPreprocessedText = (spans: Span[], message: DataSourceMessageItem, theme: ThemeGlobal, onUserPress: (id: string) => void, onGroupPress: (id: string) => void) => {
    const SpanView = (props: { span: Span, children?: any }) => {
        const { span, children } = props;
        const linkColor = !message.isService ? (message.isOut ? theme.foregroundContrast : theme.accentPrimary) : undefined;
        const linkTextDecoration = ((message.isOut || theme.type === 'Dark') && !message.isService) ? 'underline' : 'none';

        if (span.type === 'link') {
            return <ASText key={'link'} color={linkColor} onPress={resolveInternalLink(span.link, async () => await Linking.openURL(span.link))} textDecorationLine={linkTextDecoration}>{children}</ASText>;
        } else if (span.type === 'mention_user') {
            return <ASText key={'mention-user'} fontWeight={message.isService ? FontStyles.Weight.Bold : undefined} color={linkColor} textDecorationLine={linkTextDecoration} onPress={() => onUserPress(span.user.id)}>{children}</ASText>;
        } else if (span.type === 'mention_all') {
            return <ASText key={'mention-all'} color={(message.isOut && !message.isService) ? theme.foregroundContrast : theme.accentPrimary} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'}>{children}</ASText>;
        } else if (span.type === 'mention_room') {
            return <ASText key={'mention-room'} color={(message.isOut && !message.isService) ? theme.foregroundContrast : theme.accentPrimary} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'} onPress={() => onGroupPress(span.id)}>{children}</ASText>;
        } else if (span.type === 'mention_users') {
            return <OthersUsersWrapper key={'mentions'} theme={theme} onUserPress={uid => onUserPress(uid)} users={span.users} useAsync={true}>{children}</OthersUsersWrapper>;
        } else if (span.type === 'bold') {
            return <ASText key={'bold'} fontWeight={FontStyles.Weight.Bold}>{children}</ASText>;
        } else if (span.type === 'date') {
            return <ASText key={'date'} color={(message.isOut && !message.isService) ? theme.foregroundContrast : theme.accentPrimary} onPress={openCalendar(span.date)} textDecorationLine={message.isOut && !message.isService ? 'underline' : undefined}>{children}</ASText>;
        } else if (span.type === 'code_block') {
            return <ASText key={'code-block'} fontType="monospace">{children}</ASText>;
        } else if (span.type === 'code_inline') {
            return <ASText key={'code-inline'} fontType="monospace" fontSize={14} backgroundColor={(message.isOut && !message.isService) ? theme.codeSpan.backgroundOut : theme.codeSpan.background}>{theme.codeSpan.paddedText}{children}{theme.codeSpan.paddedText}</ASText>;
        } else if (span.type === 'insane') {
            return <ASText key={'insane'}>{children}</ASText>;
        } else if (span.type === 'irony') {
            return <ASText key={'irony'} fontStyle="italic" backgroundColor={(message.isOut && !message.isService) ? theme.ironySpan.backgroundOut : theme.ironySpan.background} color={(message.isOut && !message.isService) ? theme.ironySpan.colorOut : theme.ironySpan.color}>{theme.ironySpan.paddedText}{children}{theme.ironySpan.paddedText}</ASText>;
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
    const { theme, message, onUserPress, onGroupPress, onMediaPress, onDocumentPress } = props;

    // todo: handle multiple attaches
    const attaches = (message.attachments || []);
    const fileAttach = attaches.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
    const augmenationAttach = attaches.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
    const hasImage = !!(fileAttach && fileAttach.fileMetadata.isImage);
    const hasReply = !!(message.reply && message.reply.length > 0);
    const hasText = !!(message.text);
    const hasUrlAug = !!augmenationAttach;

    const isEmojiOnly = message.textSpans.length === 1 && message.textSpans[0].type === 'emoji' && (message.attachments || []).length === 0 && (message.reply || []).length === 0;

    let imageLayout;
    if (hasImage) {
        imageLayout = layoutImage(fileAttach!.fileMetadata, maxSize);
    }
    let richAttachImageLayout;
    if (augmenationAttach && augmenationAttach.image && augmenationAttach.image.metadata) {
        richAttachImageLayout = layoutImage(augmenationAttach.image.metadata, maxSize);
    }
    const richAttachIsCompact = richAttachImageShouldBeCompact(augmenationAttach);

    const hasDocument = !!(fileAttach && !hasImage);
    const imageOnly = hasImage && !(hasReply || hasText || hasUrlAug);

    let topContent = [];

    const textSize = !compensateBubble ? maxSize : undefined;

    if (hasReply) {
        topContent.push(<ReplyContent key="msg-reply" compensateBubble={compensateBubble} width={textSize} theme={theme} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onGroupPress={onGroupPress} onMediaPress={onMediaPress} />);
    }
    if (hasImage && imageLayout) {
        topContent.push(<MediaContent key="msg-media" theme={theme} compensateBubble={compensateBubble} layout={imageLayout} message={message} attach={fileAttach!} onUserPress={onUserPress} onGroupPress={onGroupPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} hasTopContent={hasReply} hasBottomContent={hasText || hasUrlAug} />);
    }
    if (hasText) {
        topContent.push(<TextContent key="msg-text" compensateBubble={compensateBubble} width={textSize} emojiOnly={isEmojiOnly} theme={theme} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onGroupPress={onGroupPress} onMediaPress={onMediaPress} />);
    }
    if (hasDocument) {
        topContent.push(<DocumentContent key="msg-document" theme={theme} compensateBubble={compensateBubble} attach={fileAttach!} message={message} onUserPress={onUserPress} onGroupPress={onGroupPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} />);
    }

    let bottomContent: any[] = [];
    if (hasUrlAug) {
        bottomContent.push(<RichAttachContent key="msg-rich" theme={theme} padded={!topContent.length} compensateBubble={compensateBubble} attach={augmenationAttach!} maxWidth={maxSize} imageLayout={richAttachImageLayout} message={message} onUserPress={onUserPress} onDocumentPress={onDocumentPress} onMediaPress={onMediaPress} />);
    }

    if (!topContent.length && bottomContent.length) {
        topContent = bottomContent;
        bottomContent = [];
    }

    if (!isEmojiOnly && !message.isOut && !message.attachTop && !hasImage && !hasDocument && compensateBubble) {
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
        hasText,
        hasUrlAug,
        topContent,
        bottomContent,
        imageLayout,
        imageOnly,
        richAttachImageLayout,
        richAttachIsCompact,
        isEmojiOnly
    };
};

export const AsyncMessageContentView = React.memo<AsyncMessageTextViewProps>((props) => {
    const { theme, message } = props;
    const { isOut, attachTop, attachBottom } = message;
    const {
        hasDocument,
        hasImage,
        hasText,
        imageOnly,
        topContent,
        imageLayout,
        richAttachImageLayout,
        bottomContent,
        isEmojiOnly
    } = extractContent(props, (isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming), true);

    if (isEmojiOnly) {
        return <EmojiOnlyContent theme={theme} content={topContent} message={message} />;
    }

    const fixedSize = !imageOnly && (imageLayout || richAttachImageLayout);
    const isImageBottom = hasImage && !hasText && !hasDocument;

    return (
        <ASFlex flexDirection="column" alignItems="stretch">
            <AsyncBubbleView
                width={fixedSize ? (isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined}
                isOut={isOut}
                attachTop={attachTop}
                attachBottom={attachBottom}
                color={theme.bubble(isOut).backgroundPrimary}
                hasAfter={!!(bottomContent && bottomContent.length)}
            >
                <ASFlex flexDirection="column" alignItems="stretch">
                    {topContent}

                    <MetaInfoIndicator type={isImageBottom ? 'media' : 'default'} message={message} theme={theme} />
                </ASFlex>
            </AsyncBubbleView>

            {!!(bottomContent && bottomContent.length) && (
                <AsyncBubbleView
                    width={fixedSize ? (isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined}
                    isOut={isOut}
                    attachTop={attachTop}
                    attachBottom={attachBottom}
                    color={theme.bubble(isOut).backgroundSecondary}
                    hasBefore={!!(topContent && topContent.length)}
                >
                    {bottomContent}
                </AsyncBubbleView>
            )}
        </ASFlex>
    );
});