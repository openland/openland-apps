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
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { ReplyContent } from './content/ReplyContent';
import { TextContent } from './content/TextContent';
import { Span } from 'openland-mobile/utils/TextProcessor';
import { UrlAugmentationContent } from './content/UrlAugmentationContent';
import { MediaContent, layoutImage } from './content/MediaContent';
import { DefaultTheme } from 'openland-web/modules/theme/ThemeContext';

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
        return <ASText key={'link-' + i} color={message.isOut ? DefaultConversationTheme.linkColorOut : DefaultConversationTheme.linkColorIn} onPress={resolveInternalLink(v.link!, () => Linking.openURL(v.link!))} textDecorationLine="underline">{v.text}</ASText>;
    } else if (v.type === 'mention_user') {
        return <ASText key={'mention-' + i} color={message.isOut ? DefaultConversationTheme.linkColorOut : DefaultConversationTheme.linkColorIn} textDecorationLine={message.isOut ? 'underline' : 'none'} onPress={() => onUserPress(v.link!)}>{useNonBreakingSpaces(v.text)}</ASText>;
    } else {
        return <ASText key={'text-' + i}>{v.text}</ASText>;
    }
}
export class AsyncMessageContentView extends React.PureComponent<AsyncMessageTextViewProps, { downloadState?: DownloadState }> {

    private downloadManagerWatch?: WatchSubscription;
    private augLayout?: { width: number, height: number };

    constructor(props: AsyncMessageTextViewProps) {
        super(props);
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    render() {

        let hasImage = !!(this.props.message.file && this.props.message.file.isImage);
        let hasReply = this.props.message.reply;
        let hasText = this.props.message.text;
        let hasUrlAug = this.props.message.urlAugmentation;

        let imageOnly = hasImage && !(hasReply || hasText || hasUrlAug);

        let layout;
        if (hasImage) {
            layout = layoutImage(this.props.message);
        }

        return (
            <AsyncBubbleView maxWidth={layout ? layout.width : undefined} isOut={this.props.message.isOut} compact={this.props.message.attachBottom || hasImage} appearance={hasImage ? 'media' : 'text'} colorIn={DefaultConversationTheme.bubbleColorIn}>
                <ASFlex
                    flexDirection="column"
                >

                    {!this.props.message.isOut && !this.props.message.attachTop && !hasImage && <ASText fontSize={13} key={'name-' + DefaultConversationTheme.senderNameColor} fontWeight={TextStyles.weight.medium} marginBottom={2} color={this.props.message.isOut ? DefaultConversationTheme.senderNameColorOut : DefaultConversationTheme.senderNameColor}>{this.props.message.senderName}</ASText>}
                    {hasReply && <ReplyContent message={this.props.message} onUserPress={this.props.onUserPress} onDocumentPress={this.props.onDocumentPress} onMediaPress={this.props.onMediaPress} />}
                    {hasText && <TextContent message={this.props.message} onUserPress={this.props.onUserPress} onDocumentPress={this.props.onDocumentPress} onMediaPress={this.props.onMediaPress} />}
                    {hasUrlAug && <UrlAugmentationContent message={this.props.message} onUserPress={this.props.onUserPress} onDocumentPress={this.props.onDocumentPress} onMediaPress={this.props.onMediaPress} />}
                    {hasImage && layout && <MediaContent layout={layout} message={this.props.message} onUserPress={this.props.onUserPress} onDocumentPress={this.props.onDocumentPress} onMediaPress={this.props.onMediaPress} single={imageOnly} />}

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
                            backgroundColor={hasImage ? DefaultConversationTheme.textColorSecondaryIn : undefined}
                            borderRadius={4}
                        >
                            <ASText
                                marginLeft={3}
                                marginRight={!this.props.message.isOut ? 3 : 0}

                                fontSize={11}
                                lineHeight={13}
                                color={hasImage ? '#fff' : this.props.message.isOut ? DefaultConversationTheme.textColorSecondaryOut : DefaultConversationTheme.textColorSecondaryIn}
                                opacity={(this.props.message.isOut || hasImage) ? 0.7 : 0.6}
                            >
                                {formatTime(this.props.message.date)}
                            </ASText>
                            {this.props.message.isOut && (
                                <ASFlex width={13} height={13} marginLeft={2} marginTop={1} marginRight={0} justifyContent="flex-start" alignItems="center">
                                    {this.props.message.isSending && <ASImage source={require('assets/ic-status-sending-10.png')} width={10} height={10} tintColor="white" opacity={0.7} />}
                                    {!this.props.message.isSending && <ASImage source={require('assets/ic-status-sent-10.png')} width={10} height={10} tintColor="white" opacity={0.7} />}
                                </ASFlex>
                            )}
                        </ASFlex>
                    </ASFlex>
                </ASFlex>

            </AsyncBubbleView >
        );
    }
}