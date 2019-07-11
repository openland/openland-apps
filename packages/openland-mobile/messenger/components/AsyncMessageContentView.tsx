import * as React from 'react';
import { Platform, Linking } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView, bubbleMaxWidth, bubbleMaxWidthIncoming } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatTime } from '../../utils/formatTime';
import { ASImage } from 'react-native-async-view/ASImage';
import { resolveInternalLink } from '../../utils/internalLnksResolver';
import { TextStyles } from '../../styles/AppStyles';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ReplyContent } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { RichAttachContent, richAttachImageShouldBeCompact } from './content/RichAttachContent';
import { MediaContent, layoutImage } from './content/MediaContent';
import { DocumentContent } from './content/DocumentContent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { OthersUsersWrapper } from './service/views/OthersUsersWrapper';
import { openCalendar } from 'openland-mobile/utils/openCalendar';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { EmojiOnlyContent } from './content/EmojiOnlyContent';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

export const paddedText = (edited?: boolean) => <ASText key="padded-text" fontSize={16}>{' ' + '\u00A0'.repeat(Platform.select({ default: edited ? 14 : 11, ios: edited ? 14 : 11 }))}</ASText>;
export const paddedTextOut = (edited?: boolean) => <ASText key="padded-text-out" fontSize={16}>{' ' + '\u00A0'.repeat(Platform.select({ default: edited ? 17 : 14, ios: edited ? 17 : 14 }))}</ASText>;

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

        if (span.type === 'link') {
            return <ASText key={'link'} color={(message.isOut && !message.isService) ? theme.contrastPrimary : theme.accentPrimary} onPress={resolveInternalLink(span.link, async () => await Linking.openURL(span.link))} textDecorationLine={message.isOut && !message.isService ? 'underline' : undefined}>{children}</ASText>;
        } else if (span.type === 'mention_user') {
            return <ASText key={'mention-user'} color={(message.isOut && !message.isService) ? theme.contrastPrimary : theme.accentPrimary} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'} onPress={() => onUserPress(span.user.id)}>{children}</ASText>;
        } else if (span.type === 'mention_all') {
            return <ASText key={'mention-all'} color={(message.isOut && !message.isService) ? theme.contrastPrimary : theme.accentPrimary} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'}>{children}</ASText>;
        } else if (span.type === 'mention_room') {
            return <ASText key={'mention-room'} color={(message.isOut && !message.isService) ? theme.contrastPrimary : theme.accentPrimary} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'} onPress={() => onGroupPress(span.id)}>{children}</ASText>;
        } else if (span.type === 'mention_users') {
            return <OthersUsersWrapper key={'mentions'} theme={theme} onUserPress={uid => onUserPress(uid)} users={span.users} useAsync={true}>{children}</OthersUsersWrapper>;
        } else if (span.type === 'bold') {
            return <ASText key={'bold'} fontWeight={TextStyles.weight.bold}>{children}</ASText>;
        } else if (span.type === 'date') {
            return <ASText key={'date'} color={(message.isOut && !message.isService) ? theme.contrastPrimary : theme.accentPrimary} onPress={openCalendar(span.date)} textDecorationLine={message.isOut && !message.isService ? 'underline' : undefined}>{children}</ASText>;
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
            return <ASText key={'loud'} fontSize={20} lineHeight={24} fontWeight={TextStyles.weight.medium}>{children}</ASText>;
        } else if (span.type === 'rotating') {
            return <ASText key={'rotating'}>{children}</ASText>;
        } else if (span.type === 'new_line') {
            return <ASText key={'br'}>{'\n'}</ASText>;
        } else if (span.type === 'emoji') {
            return <ASText key={'emoji'} fontSize={48} lineHeight={58}>{children}</ASText>;
        } else if (span.type === 'text') {
            return <ASText key={'text'}>{span.text}</ASText>;
        }

        return props.children ? <ASText key={'unknown'}>{props.children}</ASText> : null;
    };

    return renderSpans(SpanView, spans) || [];
};

export let extractContent = (props: AsyncMessageTextViewProps, maxSize?: number, compensateBubble?: boolean) => {
    // todo: handle multiple attaches
    let attaches = (props.message.attachments || []);
    let fileAttach = attaches.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
    let augmenationAttach = attaches.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
    let hasImage = !!(fileAttach && fileAttach.fileMetadata.isImage);
    let hasReply = !!(props.message.reply && props.message.reply.length > 0);
    let hasText = !!(props.message.text);
    let hasUrlAug = !!augmenationAttach;

    let isEmojiOnly = props.message.textSpans.length === 1 && props.message.textSpans[0].type === 'emoji' && (props.message.attachments || []).length === 0 && (props.message.reply || []).length === 0;

    let imageLayout;
    if (hasImage) {
        imageLayout = layoutImage(fileAttach!.fileMetadata, maxSize);
    }
    let richAttachImageLayout;
    if (augmenationAttach && augmenationAttach.image && augmenationAttach.image.metadata) {
        richAttachImageLayout = layoutImage(augmenationAttach.image.metadata, maxSize);
    }
    let richAttachIsCompact = richAttachImageShouldBeCompact(augmenationAttach);

    let hasDocument = !!(fileAttach && !hasImage);
    let imageOnly = hasImage && !(hasReply || hasText || hasUrlAug);

    let topContent = [];

    let maxTextSize = !compensateBubble ? maxSize : undefined;

    if (hasReply) {
        topContent.push(<ReplyContent key="msg-reply" compensateBubble={compensateBubble} maxWidth={maxTextSize} theme={props.theme} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onGroupPress={props.onGroupPress} onMediaPress={props.onMediaPress} />);
    }
    if (hasImage && imageLayout) {
        topContent.push(<MediaContent key="msg-media" theme={props.theme} compensateBubble={compensateBubble} layout={imageLayout} message={props.message} attach={fileAttach!} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} single={imageOnly} hasText={hasText} hasReply={hasReply} />);
    }
    if (hasText) {
        topContent.push(<TextContent key="msg-text" compensateBubble={compensateBubble} maxWidth={maxTextSize} emojiOnly={isEmojiOnly} theme={props.theme} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onGroupPress={props.onGroupPress} onMediaPress={props.onMediaPress} />);
    }
    if (hasDocument) {
        topContent.push(<DocumentContent key="msg-document" theme={props.theme} compensateBubble={compensateBubble} attach={fileAttach!} message={props.message} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />);
    }

    let bottomContent: any[] = [];
    if (hasUrlAug) {
        bottomContent.push(<RichAttachContent key="msg-rich" theme={props.theme} padded={!topContent.length} compensateBubble={compensateBubble} attach={augmenationAttach!} maxWidth={maxSize} imageLayout={richAttachImageLayout} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />);
    }

    if (!topContent.length && bottomContent.length) {
        topContent = bottomContent;
        bottomContent = [];
    }

    if (!isEmojiOnly && !props.message.isOut && !props.message.attachTop && !hasImage && !hasDocument && compensateBubble) {
        topContent.unshift(
            <ASFlex
                marginBottom={2}
                onPress={() => props.onUserPress(props.message.senderId)}
                key={'name-' + props.theme.accentPrimary}
                alignItems="center"
            >
                {!!props.message.senderBadge && (
                    <ASImage marginRight={3} source={require('assets/ic-featured-12.png')} width={12} height={12} tintColor={props.theme.foregroundPrimary} />
                )}
                <ASText
                    fontSize={15}
                    fontWeight={TextStyles.weight.medium}
                    color={props.theme.foregroundPrimary}
                >
                    {props.message.senderName}
                </ASText>
            </ASFlex>
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
    let theme = props.theme;

    let { hasDocument,
        hasImage,
        hasReply,
        hasText,
        hasUrlAug,
        imageOnly,
        topContent,
        imageLayout,
        richAttachImageLayout,
        bottomContent,
        richAttachIsCompact,
        isEmojiOnly
    } = extractContent(props, (props.message.isOut ? bubbleMaxWidth - 12 : bubbleMaxWidthIncoming - 4), true);
    // let width = imageLayout ? imageLayout.previewWidth : (richAttachImageLayout && !richAttachIsCompact) ? richAttachImageLayout.previewWidth : undefined;
    let fixedSize = !imageOnly && (imageLayout || richAttachImageLayout);

    if (isEmojiOnly) {
        return (
            <EmojiOnlyContent
                theme={theme}
                content={topContent}
                message={props.message}
            />
        );
    }

    return (
        <ASFlex flexDirection="column" alignItems="stretch" marginLeft={props.message.isOut ? -4 : 0}>
            <AsyncBubbleView width={fixedSize ? (props.message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined} isOut={props.message.isOut} attachTop={props.message.attachTop} attachBottom={props.message.attachBottom} appearance={imageOnly ? 'media' : 'text'} colorIn={theme.bubbleIn} colorOut={theme.bubbleOut} backgroundColor={theme.backgroundPrimary}>
                <ASFlex
                    flexDirection="column"
                    alignItems="stretch"
                >

                    {topContent}

                    <ASFlex
                        overlay={true}
                        alignItems="flex-end"
                        justifyContent="flex-end"
                        marginRight={-6}
                        marginBottom={-2}
                    >
                        <ASFlex
                            flexDirection="row"
                            height={14}
                            backgroundColor={hasImage ? 'rgba(0,0,0,0.3)' : undefined}
                            borderRadius={4}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {props.message.isEdited && (
                                <ASFlex width={10} height={10} marginTop={1} justifyContent="flex-start" alignItems="center">
                                    <ASImage source={require('assets/ic-edited-10.png')} width={10} height={10} tintColor={props.message.isOut ? props.theme.contrastPrimary : props.theme.foregroundPrimary} opacity={props.message.isOut ? 0.7 : 0.5} />
                                </ASFlex>
                            )}
                            <ASText
                                marginLeft={3}
                                marginRight={!props.message.isOut ? 3 : 0}
                                fontSize={11}
                                color={hasImage ? '#fff' : props.message.isOut ? props.theme.contrastPrimary : props.theme.foregroundPrimary}
                                opacity={(props.message.isOut || hasImage) ? 0.7 : 0.6}
                            >
                                {formatTime(props.message.date)}
                            </ASText>
                            {props.message.isOut && (
                                <ASFlex width={13} height={13} marginLeft={3} marginTop={1} marginRight={0} justifyContent="flex-start" alignItems="center">
                                    {props.message.isSending && <ASImage source={require('assets/ic-status-sending-10.png')} width={10} height={10} tintColor="white" opacity={0.7} />}
                                    {!props.message.isSending && <ASImage source={require('assets/ic-status-sent-10.png')} width={10} height={10} tintColor="white" opacity={0.7} />}
                                </ASFlex>
                            )}
                        </ASFlex>
                    </ASFlex>
                </ASFlex>

                {bottomContent}
            </AsyncBubbleView>
        </ASFlex>

    );
});