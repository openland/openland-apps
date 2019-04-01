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
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { ReplyContent } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { Span } from 'openland-mobile/utils/TextProcessor';
import { RichAttachContent, ricjAttachImageShouldBeCompact } from './content/RichAttachContent';
import { MediaContent, layoutImage } from './content/MediaContent';
import { DocumentContent } from './content/DocumentContent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { OthersUsersWrapper } from './service/views/OthersUsersWrapper';
import { AppTheme } from 'openland-mobile/themes/themes';

export const paddedText = <ASText fontSize={16} > {' ' + '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }))}</ASText >;
export const paddedTextOut = <ASText fontSize={16}>{' ' + '\u00A0'.repeat(Platform.select({ default: 16, ios: 14 }))}</ASText>;

interface AsyncMessageTextViewProps {
    theme: AppTheme;
    engine: ConversationEngine;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}
export let renderPreprocessedText = (v: Span, i: number, message: DataSourceMessageItem, onUserPress: (id: string) => void) => {
    if (v.type === 'new_line') {
        return <ASText key={'br-' + i} >{'\n'}</ASText>;
    } else if (v.type === 'link') {
        return <ASText key={'link-' + i} color={(message.isOut && !message.isService) ? DefaultConversationTheme.linkColorOut : DefaultConversationTheme.linkColorIn} onPress={resolveInternalLink(v.link!, async () => await Linking.openURL(v.link!))} textDecorationLine={message.isOut && !message.isService ? 'underline' : undefined}>{v.text}</ASText>;
    } else if (v.type === 'mention_user') {
        return <ASText key={'mention-' + i} color={(message.isOut && !message.isService) ? DefaultConversationTheme.linkColorOut : DefaultConversationTheme.linkColorIn} textDecorationLine={(message.isOut && !message.isService) ? 'underline' : 'none'} onPress={() => onUserPress(v.id)}>{useNonBreakingSpaces(v.text)}</ASText>;
    } else if (v.type === 'mention_users') {
        return <OthersUsersWrapper onUserPress={uid => onUserPress(uid)} users={v.users} text={v.text!} />
    } else {
        return <ASText key={'text-' + i}>{v.text}</ASText>;
    }
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
    let richAttachIsCompact = ricjAttachImageShouldBeCompact(augmenationAttach);

    let hasDocument = !!(fileAttach && !hasImage);
    let imageOnly = hasImage && !(hasReply || hasText || hasUrlAug);

    let topContnet = [];

    if (hasReply) {
        topContnet.push(<ReplyContent message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />);
    }
    if (hasText) {
        topContnet.push(<TextContent message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />);
    }
    if (hasImage && imageLayout) {
        topContnet.push(<MediaContent compensateBubble={compensateBubble} layout={imageLayout} message={props.message} attach={fileAttach!} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} single={imageOnly} />);
    }
    if (hasDocument) {
        topContnet.push(<DocumentContent compensateBubble={compensateBubble} attach={fileAttach!} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />);
    }

    let bottomContent: any[] = [];
    if (hasUrlAug) {
        bottomContent.push(<RichAttachContent padded={!topContnet.length} compensateBubble={compensateBubble} attach={augmenationAttach!} maxWidth={maxSize} imageLayout={richAttachImageLayout} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />);
    }

    if (!topContnet.length && bottomContent.length) {
        topContnet = bottomContent;
        bottomContent = [];
    }

    if (!props.message.isOut && !props.message.attachTop && !hasImage && !hasDocument) {
        topContnet.unshift(<ASText fontSize={13} onPress={() => props.onUserPress(props.message.senderId)} key={'name-' + DefaultConversationTheme.senderNameColor} fontWeight={TextStyles.weight.medium} marginBottom={2} color={props.message.isOut ? DefaultConversationTheme.senderNameColorOut : DefaultConversationTheme.senderNameColor}>{props.message.senderName}</ASText>);
    }

    return {
        hasDocument,
        hasImage,
        hasReply,
        hasText,
        hasUrlAug,
        topContnet,
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
        topContnet,
        imageLayout,
        richAttachImageLayout,
        bottomContent,
        richAttachIsCompact
    } = extractContent(props, (props.message.isOut ? bubbleMaxWidth - 12 : bubbleMaxWidthIncoming - 4), true);
    // let width = imageLayout ? imageLayout.previewWidth : (richAttachImageLayout && !richAttachIsCompact) ? richAttachImageLayout.previewWidth : undefined;
    let fixedSize = !imageOnly && (imageLayout || richAttachImageLayout);
    return (
        <ASFlex flexDirection="column" alignItems="stretch" marginLeft={props.message.isOut ? -4 : 0}>
            <AsyncBubbleView width={fixedSize ? (props.message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined} pair={bottomContent.length ? 'top' : undefined} isOut={props.message.isOut} compact={props.message.attachBottom || hasImage} appearance={imageOnly ? 'media' : 'text'} colorIn={DefaultConversationTheme.bubbleColorIn} backgroundColor={theme.backgroundColor}>
                <ASFlex
                    flexDirection="column"
                    alignItems="stretch"
                >

                    {topContnet}

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
                            <ASText
                                marginLeft={3}
                                marginTop={Platform.OS === 'android' ? -2 : undefined}
                                marginRight={!props.message.isOut ? 3 : 0}
                                fontSize={11}
                                color={hasImage ? '#fff' : props.message.isOut ? DefaultConversationTheme.textColorSecondaryOut : DefaultConversationTheme.textColorSecondaryIn}
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
            {!!bottomContent.length && <ASFlex height={3} backgroundColor='white' />}
            {!!bottomContent.length && <AsyncBubbleView pair={'bottom'} width={fixedSize ? (props.message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) : undefined} isOut={props.message.isOut} compact={props.message.attachBottom || hasImage} appearance={imageOnly ? 'media' : 'text'} colorIn={DefaultConversationTheme.bubbleColorIn} backgroundColor={theme.backgroundColor}>
                {bottomContent}
            </AsyncBubbleView >}
        </ASFlex>

    );
});