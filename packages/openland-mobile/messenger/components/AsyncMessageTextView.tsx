import * as React from 'react';
import { Platform, Linking, Image, Dimensions } from 'react-native';
import { DataSourceMessageItem, convertMessage, ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { preprocessText, Span } from '../../utils/TextProcessor';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView, bubbleMaxWidth } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatTime } from '../../utils/formatTime';
import { ASImage } from 'react-native-async-view/ASImage';
import { doSimpleHash } from 'openland-y-utils/hash';
import { resolveInternalLink } from '../../utils/internalLnksResolver';
import { layoutMedia } from '../../../openland-web/utils/MediaLayout';
import { TextStyles, AppStyles } from '../../styles/AppStyles';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { AsyncReplyMessageMediaView } from './AsyndReplyMessageMediaView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { AsyncMessageDocumentView } from './AsyncMessageDocumentView';
import { AsyncReplyMessageDocumentView } from './AsyncReplyMessageDocumentView';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { ConversationTheme, getDefaultConversationTheme, ConversationThemeResolver } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

const paddedText = <ASText fontSize={16} > {' ' + '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }))}</ASText >;
const paddedTextOut = <ASText fontSize={16}>{' ' + '\u00A0'.repeat(Platform.select({ default: 16, ios: 14 }))}</ASText>;

interface AsyncMessageTextViewProps {
    engine: ConversationEngine;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}
export class AsyncMessageTextView extends React.PureComponent<AsyncMessageTextViewProps, { downloadState?: DownloadState, theme: ConversationTheme }> {

    private downloadManagerWatch?: WatchSubscription;
    private augLayout?: { width: number, height: number };
    themeSub?: () => void;

    constructor(props: AsyncMessageTextViewProps) {
        super(props);
        this.state = { theme: getDefaultConversationTheme(props.engine.conversationId) }
    }

    componentWillMount() {
        if (this.props.message.urlAugmentation && this.props.message.urlAugmentation.imageURL) {
            let maxSize = (this.props.message.isOut ? bubbleMaxWidth : bubbleMaxWidth) - 90

            console.warn('boom', JSON.stringify(this.props.message.urlAugmentation));
            let width = this.props.message.urlAugmentation.imageInfo && this.props.message.urlAugmentation.imageInfo.imageWidth || maxSize;
            let height = this.props.message.urlAugmentation.imageInfo && this.props.message.urlAugmentation.imageInfo.imageHeight || maxSize;
            this.augLayout = layoutMedia(width!, height!, maxSize, maxSize);

            this.downloadManagerWatch = DownloadManagerInstance.watch(this.props.message.urlAugmentation.imageURL, this.augLayout, (state) => {
                console.warn('boom', JSON.stringify(state));
                this.setState({ downloadState: state });
            });
        }
        ConversationThemeResolver.subscribe(this.props.engine.conversationId, theme => this.setState({ theme: theme })).then(sub => this.themeSub = sub);
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
        if (this.themeSub) {
            this.themeSub();
        }
    }

    prprocessedRender = (v: Span, i: number) => {
        if (v.type === 'new_line') {
            return <ASText key={'br-' + i} >{'\n'}</ASText>;
        } else if (v.type === 'link') {
            return <ASText key={'link-' + i} color={this.props.message.isOut ? this.state.theme.linkColorOut : this.state.theme.linkColorIn} onPress={resolveInternalLink(v.link!, () => Linking.openURL(v.link!))} textDecorationLine="underline">{v.text}</ASText>;
        } else if (v.type === 'mention_user') {
            return <ASText key={'mention-' + i} color={this.props.message.isOut ? this.state.theme.linkColorOut : this.state.theme.linkColorIn} textDecorationLine={this.props.message.isOut ? 'underline' : 'none'} onPress={() => this.props.onUserPress(v.link!)}> {v.text}</ASText >;
        } else {
            return <ASText key={'text-' + i}>{v.text}</ASText>;
        }
    }
    render() {
        let preprocessed = preprocessText(this.props.message.text || '', this.props.message.mentions);
        let big = false;
        if (this.props.message.text) {
            big = this.props.message.text.length <= 3 && this.props.message.text.search(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) !== -1;
            big = big || (this.props.message.text.length <= 302 && this.props.message.text.startsWith(':') && this.props.message.text.endsWith(':'));
        }

        let parts = preprocessed.map(this.prprocessedRender);
        if (this.props.message.title) {
            parts.unshift(<ASText key={'br-title'} >{'\n'}</ASText>);
            parts.unshift(<ASText key={'text-title'} fontWeight={Platform.select({ ios: '600', android: '500' })}>{this.props.message.title}</ASText>);
        }
        let placeholderIndex = 0;
        if (this.props.message.senderId) {
            placeholderIndex = doSimpleHash(this.props.message.senderId);
        }
        let placeholderStyle = ZStyles.avatars[placeholderIndex % ZStyles.avatars.length];
        let lineBAckgroundPatch: any;
        let capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

        if (this.props.message.urlAugmentation || this.props.message.reply) {
            // for left accent line
            let image = require('assets/chat-link-line-my.png');
            lineBAckgroundPatch = Image.resolveAssetSource(image);
        }

        let mainTextColor = this.props.message.isOut ? this.state.theme.textColorOut : this.state.theme.textColorIn;

        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom} colorIn={this.state.theme.bubbleColorIn}>
                <ASFlex
                    flexDirection="column"
                >

                    {!this.props.message.isOut && !this.props.message.attachTop && <ASText key={'name-' + this.state.theme.senderNameColor} fontWeight={TextStyles.weight.medium} marginBottom={2} color={this.props.message.isOut ? this.state.theme.senderNameColorOut : this.state.theme.senderNameColor}>{this.props.message.senderName}</ASText>}

                    {/* forward/reply */}
                    {this.props.message.reply && (

                        this.props.message.reply.map(m => (
                            <ASFlex flexDirection="column" marginTop={5} marginLeft={1} marginBottom={6} backgroundPatch={{ source: lineBAckgroundPatch.uri, scale: lineBAckgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={this.props.message.isOut ? this.state.theme.linkColorOut : this.state.theme.linkColorIn}>

                                <ASText
                                    marginTop={-2}
                                    height={15}
                                    textAlign="center"
                                    lineHeight={15}
                                    marginLeft={10}
                                    color={this.props.message.isOut ? this.state.theme.senderNameColorOut : this.state.theme.senderNameColor}
                                    letterSpacing={-0.3}
                                    fontSize={12}
                                    onPress={() => this.props.onUserPress(m.sender.id)}
                                    fontWeight={TextStyles.weight.medium}
                                >
                                    {m.sender.name || ''}
                                </ASText>

                                {!!m.message && <ASText
                                    marginLeft={10}
                                    color={mainTextColor}
                                    lineHeight={20}
                                    fontSize={14}
                                    fontWeight={TextStyles.weight.regular}
                                >
                                    {preprocessText(m.message, this.props.message.mentions).map(this.prprocessedRender)}
                                    {(!this.props.message.text && this.props.message.isOut) ? paddedTextOut : paddedText}
                                </ASText>}
                                {m.fileMetadata && m.fileMetadata.isImage ? <AsyncReplyMessageMediaView onPress={this.props.onMediaPress} message={convertMessage(m as any, getMessenger().engine)} /> : null}
                                {m.fileMetadata && !m.fileMetadata.isImage ? <AsyncReplyMessageDocumentView onPress={this.props.onDocumentPress} parent={this.props.message} message={convertMessage(m as any, getMessenger().engine)} /> : null}

                            </ASFlex>
                        ))

                    )}

                    {/* main content */}
                    {this.props.message.text && <ASText
                        key={'text-' + this.state.theme.senderNameColor}
                        color={mainTextColor}
                        lineHeight={big ? 60 : 20}
                        letterSpacing={-0.3}
                        fontSize={big ? 52 : 16}
                        fontWeight={TextStyles.weight.regular}
                    >
                        {parts}
                        {this.props.message.isOut ? paddedTextOut : paddedText}
                    </ASText>}

                    {/* url augmentation */}
                    {this.props.message.urlAugmentation && (
                        <ASFlex onPress={() => Linking.openURL(this.props.message.urlAugmentation!.url)} flexDirection="column" marginTop={12} marginBottom={5} backgroundPatch={{ source: lineBAckgroundPatch.uri, scale: lineBAckgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={this.props.message.isOut ? 'rgba(255,255,255, 0.5)' : this.state.theme.linkColorIn}>
                            {this.props.message.urlAugmentation.imageURL && this.augLayout && (
                                <ASFlex marginBottom={8}>
                                    <ASImage
                                        marginLeft={10}
                                        source={{ uri: (this.state && this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                                        width={this.augLayout!.width}
                                        height={this.augLayout!.height}
                                        borderRadius={10}
                                    />
                                    {this.state && this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path &&
                                        <ASFlex
                                            overlay={true}
                                            width={this.augLayout.width}
                                            height={this.augLayout.height}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <ASFlex backgroundColor="#0008" borderRadius={20}>
                                                <ASText color="#fff" opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</ASText>
                                            </ASFlex>
                                        </ASFlex>
                                    }
                                </ASFlex>
                            )}

                            {!!this.props.message.urlAugmentation.title && <ASText
                                marginLeft={10}
                                color={mainTextColor}
                                lineHeight={big ? 60 : 20}
                                letterSpacing={-0.3}
                                fontSize={18}
                                marginTop={-3}
                                fontWeight={TextStyles.weight.medium}
                            >
                                {this.props.message.urlAugmentation.title}
                                {this.props.message.isOut ? paddedTextOut : paddedText}
                            </ASText>
                            }
                            {!!this.props.message.urlAugmentation.description && <ASText
                                marginLeft={10}
                                color={mainTextColor}
                                lineHeight={big ? 60 : 20}
                                letterSpacing={-0.3}
                                fontSize={big ? 52 : 16}
                                fontWeight={TextStyles.weight.regular}
                            >
                                {this.props.message.urlAugmentation.description}
                            </ASText>}

                        </ASFlex>
                    )}

                    <ASFlex
                        overlay={true}
                        alignItems="flex-end"
                        justifyContent="flex-end"
                        marginRight={this.props.message.isOut ? -8 : 0}
                        marginBottom={-4}
                    >
                        <ASFlex
                            flexDirection="row"
                            height={14}
                        >
                            <ASText
                                fontSize={11}
                                lineHeight={13}
                                color={this.props.message.isOut ? this.state.theme.textColorSecondaryOut : this.state.theme.textColorSecondaryIn}
                                opacity={this.props.message.isOut ? 0.7 : 0.6}
                            >
                                {formatTime(this.props.message.date)}
                            </ASText>
                            {this.props.message.isOut && (
                                <ASFlex width={18} height={13} marginLeft={2} marginTop={1} justifyContent="flex-start" alignItems="center">
                                    {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                    {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} />}
                                </ASFlex>
                            )}
                        </ASFlex>
                    </ASFlex>
                </ASFlex>

            </AsyncBubbleView >
        );
    }
}