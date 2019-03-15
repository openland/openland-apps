import * as React from 'react';
import { Platform, Linking, Image, PixelRatio } from 'react-native';
import { DataSourceMessageItem, ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
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
import { UrlAugmentationContent } from './content/UrlAugmentationContent';
import { MediaContent, layoutImage } from './content/MediaContent';
import { DocumentContent } from './content/DocumentContent';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { file } from '@babel/types';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';

export const paddedText = <ASText fontSize={16} > {' ' + '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }))}</ASText >;
export const paddedTextOut = <ASText fontSize={16}>{' ' + '\u00A0'.repeat(Platform.select({ default: 16, ios: 14 }))}</ASText>;

interface AsyncMessageTextViewProps {
    engine: ConversationEngine;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}
export let renderPrprocessedText = (v: Span, i: number, message: DataSourceMessageItem, onUserPress: (id: string) => void) => {
    if (v.type === 'new_line') {
        return <ASText key={'br-' + i} >{'\n'}</ASText>;
    } else if (v.type === 'link') {
        return <ASText key={'link-' + i} color={message.isOut ? DefaultConversationTheme.linkColorOut : DefaultConversationTheme.linkColorIn} onPress={resolveInternalLink(v.link!, async () => await Linking.openURL(v.link!))} textDecorationLine="underline">{v.text}</ASText>;
    } else if (v.type === 'mention_user') {
        return <ASText key={'mention-' + i} color={message.isOut ? DefaultConversationTheme.linkColorOut : DefaultConversationTheme.linkColorIn} textDecorationLine={message.isOut ? 'underline' : 'none'} onPress={() => onUserPress(v.id)}>{useNonBreakingSpaces(v.text)}</ASText>;
    } else {
        return <ASText key={'text-' + i}>{v.text}</ASText>;
    }
}

export const AsyncMessageContentView = React.memo<AsyncMessageTextViewProps>((props) => {
    let theme = React.useContext(ThemeContext);

    // todo: handle multiple attaches
    let attaches = (props.message.attachments || []);
    let fileAttach = attaches.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
    let augmenationAttach = attaches.filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;
    let hasImage = !!(fileAttach && fileAttach.fileMetadata.isImage);
    let hasReply = !!(props.message.reply && props.message.reply.length > 0);
    let hasText = !!(props.message.text);
    let hasUrlAug = !!augmenationAttach;

    let layout;
    if (hasImage) {
        layout = layoutImage(props.message);
        hasImage = hasImage && !!layout;
    }
    let hasDocument = !!(fileAttach && !hasImage);
    let imageOnly = hasImage && !(hasReply || hasText || hasUrlAug);

    return (
        <AsyncBubbleView width={layout ? layout.width : undefined} isOut={props.message.isOut} compact={props.message.attachBottom || hasImage} appearance={imageOnly ? 'media' : 'text'} colorIn={DefaultConversationTheme.bubbleColorIn} backgroundColor={theme.backgroundColor}>
            <ASFlex
                flexDirection="column"
            >

                {!props.message.isOut && !props.message.attachTop && !hasImage && !hasDocument && <ASText fontSize={13} key={'name-' + DefaultConversationTheme.senderNameColor} fontWeight={TextStyles.weight.medium} marginBottom={2} color={props.message.isOut ? DefaultConversationTheme.senderNameColorOut : DefaultConversationTheme.senderNameColor}>{props.message.senderName}</ASText>}
                {hasReply && <ReplyContent message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />}
                {hasText && <TextContent attach={augmenationAttach} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />}
                {hasUrlAug && <UrlAugmentationContent attach={augmenationAttach!} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />}
                {(hasImage && layout) && <MediaContent layout={layout} message={props.message} attach={fileAttach!} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} single={imageOnly} />}
                {hasDocument && <DocumentContent attach={fileAttach!} message={props.message} onUserPress={props.onUserPress} onDocumentPress={props.onDocumentPress} onMediaPress={props.onMediaPress} />}

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
                            <ASFlex width={13} height={13} marginLeft={2} marginTop={1} marginRight={0} justifyContent="flex-start" alignItems="center">
                                {props.message.isSending && <ASImage source={require('assets/ic-status-sending-10.png')} width={10} height={10} tintColor="white" opacity={0.7} />}
                                {!props.message.isSending && <ASImage source={require('assets/ic-status-sent-10.png')} width={10} height={10} tintColor="white" opacity={0.7} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </ASFlex>

        </AsyncBubbleView >
    );
});