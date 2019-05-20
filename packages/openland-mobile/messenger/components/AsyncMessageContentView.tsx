import * as React from 'react';
import { Platform, Linking } from 'react-native';
import { DataSourceMessageItem, ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView, bubbleMaxWidth, bubbleMaxWidthIncoming } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatTime } from '../../utils/formatTime';
import { ASImage } from 'react-native-async-view/ASImage';
import { resolveInternalLink } from '../../utils/internalLnksResolver';
import { TextStyles } from '../../styles/AppStyles';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { ReplyContent } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { RichAttachContent, richAttachImageShouldBeCompact } from './content/RichAttachContent';
import { MediaContent, layoutImage } from './content/MediaContent';
import { DocumentContent } from './content/DocumentContent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { OthersUsersWrapper } from './service/views/OthersUsersWrapper';
import { AppTheme } from 'openland-mobile/themes/themes';
import { openCalendar } from 'openland-mobile/utils/openCalendar';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { Span } from 'openland-y-utils/spans/Span';

export const paddedText = (edited?: boolean) => <ASText key="padded-text" fontSize={16}>{' ' + '\u00A0'.repeat(Platform.select({ default: edited ? 14 : 11, ios: edited ? 14 : 11 }))}</ASText>;
export const paddedTextOut = (edited?: boolean) => <ASText key="padded-text-out" fontSize={16}>{' ' + '\u00A0'.repeat(Platform.select({ default: edited ? 17 : 14, ios: edited ? 17 : 14 }))}</ASText>;

interface AsyncMessageTextViewProps {
    theme: AppTheme;
    engine: ConversationEngine;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}

export let renderPreprocessedText = (spans: Span[], message: DataSourceMessageItem, theme: AppTheme, onUserPress: (id: string) => void, onGroupPress: (id: string) => void) => {
    const SpanView = (props: { span: Span, children?: any }) => {
        const { span, children } = props;

        if (span.type === 'link') {
            return <ASText key={'link'} color={(message.isOut && !message.isService) ? theme.linkOutColor : theme.linkColor} onPress={resolveInternalLink(span.link, async () => await Linking.openURL(span.link))} textDecorationLine={message.isOut && !message.isService ? 'underline' : undefined}>{children}</ASText>;
        } else if (span.type === 'mention_user') {
            return <ASText key={'mention-user'} color={(message.isOut && !message.isService) ? theme.linkOutColor : theme.linkColor} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'} onPress={() => onUserPress(span.user.id)}>{children}</ASText>;
        } else if (span.type === 'mention_room') {
            return <ASText key={'mention-room'} color={(message.isOut && !message.isService) ? theme.linkOutColor : theme.linkColor} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'} onPress={() => onGroupPress(span.id)}>{children}</ASText>;
        } else if (span.type === 'mention_users') {
            return <OthersUsersWrapper key={'mentions'} theme={theme} onUserPress={uid => onUserPress(uid)} users={span.users} useAsync={true}>{children}</OthersUsersWrapper>;
        } else if (span.type === 'bold') {
            return <ASText key={'bold'} fontWeight={TextStyles.weight.bold}>{children}</ASText>;
        } else if (span.type === 'date') {
            return <ASText key={'date'} color={(message.isOut && !message.isService) ? theme.linkOutColor : theme.linkColor} onPress={openCalendar(span.date)} textDecorationLine={message.isOut && !message.isService ? 'underline' : undefined}>{children}</ASText>;
        } else if (span.type === 'code_block') {
            return <ASText key={'code-block'} fontType="monospace">{children}</ASText>;
        } else if (span.type === 'code_inline') {
            return <ASText key={'code-inline'} fontType="monospace" backgroundColor={(message.isOut && !message.isService) ? theme.codeSpan.backgroundOut : theme.codeSpan.background}>{theme.codeSpan.paddedText}{children}{theme.codeSpan.paddedText}</ASText>;
        } else if (span.type === 'insane') {
            return <ASText key={'insane'}>{children}</ASText>;
        } else if (span.type === 'irony') {
            return <ASText key={'irony'} fontStyle="italic" backgroundColor={(message.isOut && !message.isService) ? theme.ironySpan.backgroundOut : theme.ironySpan.background} color={(message.isOut && !message.isService) ? theme.ironySpan.colorOut : theme.ironySpan.color}>{theme.ironySpan.paddedText}{children}{theme.ironySpan.paddedText}</ASText>;
        } else if (span.type === 'italic') {
            return <ASText key={'italic'} fontStyle="italic">{children}</ASText>;
        } else if (span.type === 'loud') {
            if (Platform.OS === 'android') {
                return <ASText key={'loud'} fontWeight={TextStyles.weight.bold}>{children}</ASText>;
            } else {
                return <ASText key={'loud'} fontSize={26} lineHeight={28} fontWeight={TextStyles.weight.medium}>{children}</ASText>;
            }
        } else if (span.type === 'rotating') {
            return <ASText key={'rotating'}>{children}</ASText>;
        } else if (span.type === 'new_line') {
            return <ASText key={'br'}>{'\n'}</ASText>;
        } else if (span.type === 'text') {
            return <ASText key={'text'}>{span.text}</ASText>;
        }
    
        return props.children ? <span>{props.children}</span> : null;
    }
    
    return renderSpans(SpanView, spans) || [];
}

export let extractContent = (props: AsyncMessageTextViewProps, maxSize?: number, compensateBubble?: boolean) => {
    // todo: handle multiple attaches
    let attaches = (props.message.attachments || []);
    let fileAttach = attaches.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
    let augmenationAttach = attaches.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
    let hasImage = !!(fileAttach && fileAttach.fileMetadata.isImage);
    let hasReply = !!(props.message.reply && props.message.reply.length > 0);
    let hasText = !!(props.message.text);
    let hasUrlAug = !!augmenationAttach;

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

    if (hasReply) {
        topContent.push(<ReplyContent key="msg-reply" theme={props.theme} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onGroupPress={props.onGroupPress} onMediaPress={props.onMediaPress} />);
    }
    if (hasText) {
        topContent.push(<TextContent key="msg-text" theme={props.theme} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onGroupPress={props.onGroupPress} onMediaPress={props.onMediaPress} />);
    }
    if (hasImage && imageLayout) {
        topContent.push(<MediaContent key="msg-media" theme={props.theme} compensateBubble={compensateBubble} layout={imageLayout} message={props.message} attach={fileAttach!} onUserPress={props.onUserPress} onGroupPress={props.onGroupPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} single={imageOnly} />);
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

    if (!props.message.isOut && !props.message.attachTop && !hasImage && !hasDocument) {
        topContent.unshift(<ASText fontSize={13} onPress={() => props.onUserPress(props.message.senderId)} key={'name-' + props.theme.linkColor} fontWeight={TextStyles.weight.medium} marginBottom={2} color={props.theme.linkColor}>{props.message.senderName}</ASText>);
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
        richAttachIsCompact
    }
}

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
        richAttachIsCompact
    } = extractContent(props, (props.message.isOut ? bubbleMaxWidth - 12 : bubbleMaxWidthIncoming - 4), true);
    // let width = imageLayout ? imageLayout.previewWidth : (richAttachImageLayout && !richAttachIsCompact) ? richAttachImageLayout.previewWidth : undefined;
    let fixedSize = !imageOnly && (imageLayout || richAttachImageLayout);
    return (
        <ASFlex flexDirection="column" alignItems="stretch" marginLeft={props.message.isOut ? -4 : 0}>
            <AsyncBubbleView width={fixedSize ? (props.message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined} pair={bottomContent.length ? 'top' : undefined} isOut={props.message.isOut} compact={props.message.attachBottom || hasImage} appearance={imageOnly ? 'media' : 'text'} colorIn={theme.bubbleColorIn} backgroundColor={theme.backgroundColor}>
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
                                    <ASImage source={require('assets/ic-edited-10.png')} width={10} height={10} tintColor={props.message.isOut ? props.theme.textColorOut : props.theme.textColor} opacity={props.message.isOut ? 0.7 : 0.5} />
                                </ASFlex>
                            )}
                            <ASText
                                marginLeft={3}
                                marginTop={Platform.OS === 'android' ? -2 : undefined}
                                marginRight={!props.message.isOut ? 3 : 0}
                                fontSize={11}
                                color={hasImage ? '#fff' : props.message.isOut ? props.theme.textColorOut : props.theme.textColor}
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

            </AsyncBubbleView >
            {!!bottomContent.length && <ASFlex height={3} backgroundColor={theme.backgroundColor} />}
            {!!bottomContent.length && <AsyncBubbleView pair={'bottom'} width={fixedSize ? (props.message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined} isOut={props.message.isOut} compact={props.message.attachBottom || hasImage} appearance={imageOnly ? 'media' : 'text'} colorIn={theme.bubbleColorIn} backgroundColor={theme.backgroundColor}>
                {bottomContent}
            </AsyncBubbleView >}
        </ASFlex>

    );
});