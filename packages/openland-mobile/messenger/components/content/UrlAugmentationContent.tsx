import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Platform, Linking, PixelRatio, Image } from 'react-native';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { bubbleMaxWidth, bubbleMaxWidthIncoming, AsyncBubbleView, contentInsetsHorizontal } from '../AsyncBubbleView';
import { layoutMedia } from '../../../../openland-web/utils/MediaLayout';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment, ModernMessageButtonStyle } from 'openland-api/Types';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { AppTheme } from 'openland-mobile/themes/themes';

interface UrlAugmentationContentProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
    imageLayout?: { width: number, height: number };
    onUserPress: (id: string) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}
export class UrlAugmentationContent extends React.PureComponent<UrlAugmentationContentProps, { downloadState?: DownloadState }> {
    private augLayout?: { width: number, height: number };
    private downloadManagerWatch?: WatchSubscription;
    private imageCompact = false;

    componentWillMount() {
        if (this.props.attach && this.props.attach.image && this.props.imageLayout) {

            this.augLayout = this.props.imageLayout;
            if (this.props.attach.image.metadata!.imageHeight === this.props.attach.image.metadata!.imageWidth) {
                this.imageCompact = true;
                this.augLayout = { width: 36, height: 36 };
            }

            let ratio = PixelRatio.get();
            let imageSize = { width: this.augLayout.width * ratio, height: this.augLayout.height * ratio };

            this.downloadManagerWatch = DownloadManagerInstance.watch(this.props.attach.image.url, imageSize, (state) => {
                this.setState({ downloadState: state });
            });
        }
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    render() {
        let mainTextColor = this.props.message.isOut ? DefaultConversationTheme.textColorOut : DefaultConversationTheme.textColorIn;

        let preprocessed = preprocessText(this.props.message.text || '', []);
        let big = false;
        if (this.props.message.text) {
            big = this.props.message.text.length <= 3 && this.props.message.text.search(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) !== -1;
            big = big || (this.props.message.text.length <= 302 && this.props.message.text.startsWith(':') && this.props.message.text.endsWith(':'));
        }

        let parts = preprocessed.map((p, i) => renderPreprocessedText(p, i, this.props.message, this.props.onUserPress));
        if (this.props.message.title) {
            parts.unshift(<ASText key={'br-title'} >{'\n'}</ASText>);
            parts.unshift(<ASText key={'text-title'} fontWeight={Platform.select({ ios: '600', android: '500' })}>{this.props.message.title}</ASText>);
        }

        let out = this.props.message.isOut;

        let link = this.props.attach!.titleLink || '';

        let { text, subTitle, keyboard } = this.props.attach;

        // keyboard = {
        //     __typename: 'MessageKeyboard',
        //     buttons: [
        //         [
        //             { __typename: 'ModernMessageButton', style: ModernMessageButtonStyle.DEFAULT, url: '', id: '1', title: '1', },
        //             { __typename: 'ModernMessageButton', style: ModernMessageButtonStyle.DEFAULT, url: '', id: '2', title: '2', },
        //         ],
        //         [
        //             { __typename: 'ModernMessageButton', style: ModernMessageButtonStyle.DEFAULT, url: '', id: '3', title: '3', },
        //             // { __typename: 'ModernMessageButton', style: ModernMessageButtonStyle.DEFAULT, url: '', id: '4', title: '4', },
        //         ],
        //         [
        //             { __typename: 'ModernMessageButton', style: ModernMessageButtonStyle.DEFAULT, url: '', id: '5', title: '5', },
        //             { __typename: 'ModernMessageButton', style: ModernMessageButtonStyle.DEFAULT, url: 'https://wopwop.app/', id: '6', title: '6', },
        //             { __typename: 'ModernMessageButton', style: ModernMessageButtonStyle.DEFAULT, url: 'https://wopwop.app/', id: '7', title: '7', },
        //         ]
        //     ]
        // }

        let maxWidth = (this.augLayout && !this.imageCompact) ? (this.augLayout.width - contentInsetsHorizontal * 2) : (this.props.message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming);
        console.warn('boom', this.props.attach.subTitle);
        return (

            <ASFlex onPress={resolveInternalLink(link, async () => await Linking.openURL(link))} flexDirection={'column'} >
                {!!this.props.attach.titleLinkHostname && this.imageCompact && <ASText
                    maxWidth={maxWidth}
                    color={out ? '#fff' : '#000'}
                    opacity={out ? 0.7 : 0.6}
                    fontSize={14}
                    numberOfLines={1}
                    fontWeight={TextStyles.weight.regular}
                >
                    {this.props.attach.titleLinkHostname}
                </ASText>}

                {!this.imageCompact && this.props.attach.image && this.augLayout && (
                    <ASFlex>
                        <ASImage
                            marginTop={-5}
                            marginLeft={-contentInsetsHorizontal}
                            marginRight={-contentInsetsHorizontal}
                            source={{ uri: (this.state && this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                            width={this.augLayout!.width}
                            height={this.augLayout!.height}
                            borderRadius={8}
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

                {!!this.props.attach.titleLinkHostname && !this.imageCompact && <ASText
                    marginTop={5}
                    maxWidth={maxWidth}
                    color={out ? '#fff' : '#000'}
                    opacity={out ? 0.7 : 0.6}
                    fontSize={14}
                    numberOfLines={1}
                    fontWeight={TextStyles.weight.regular}
                >
                    {this.props.attach.titleLinkHostname}
                </ASText>}

                <ASFlex flexDirection="row" marginTop={5}>
                    {this.imageCompact && this.props.attach.image && this.augLayout && (
                        <ASFlex>
                            <ASImage
                                source={{ uri: (this.state && this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                                width={this.augLayout!.width}
                                height={this.augLayout!.height}
                                borderRadius={10}
                                marginRight={10}
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

                    <ASFlex
                        flexDirection="column"
                        maxWidth={maxWidth - (this.imageCompact ? 90 : 0)}
                    >

                        {!!this.props.attach.title && <ASText
                            maxWidth={maxWidth}
                            color={mainTextColor}
                            lineHeight={20}
                            letterSpacing={-0.3}
                            fontSize={14}
                            marginTop={-3}
                            numberOfLines={subTitle && this.imageCompact ? 1 : 2}
                            fontWeight={TextStyles.weight.medium}
                        >
                            {this.props.attach.title}
                            {/* {!this.props.attach.subTitle && (this.props.message.isOut ? paddedTextOut : paddedText)} */}
                        </ASText>}
                        {!!subTitle && <ASText
                            marginTop={4}
                            maxWidth={maxWidth - 36}
                            color={out ? '#fff' : '#000'}
                            opacity={out ? 0.7 : 0.6}
                            fontSize={14}
                            numberOfLines={1}
                            fontWeight={TextStyles.weight.regular}
                        >
                            {subTitle}
                            {/* {this.props.message.isOut ? paddedTextOut : paddedText} */}
                        </ASText>}
                    </ASFlex>

                </ASFlex>

                {!!text && <ASText
                    marginTop={8}
                    maxWidth={maxWidth}
                    color={out ? '#fff' : '#000'}
                    fontSize={14}
                    fontWeight={TextStyles.weight.regular}
                >
                    {text}
                    {/* {this.props.message.isOut ? paddedTextOut : paddedText} */}
                </ASText>}

                {!!keyboard && keyboard.buttons.map((line, i) =>
                    <ASFlex key={i + ''} flexDirection="row" width={maxWidth} marginTop={9} marginBottom={i === keyboard!.buttons.length - 1 ? 4 : 0}>
                        {!!line && line.map((button, j) =>
                            <ASFlex
                                key={button.id}
                                backgroundColor='#fff'
                                borderRadius={8}
                                // flexShrink={1}
                                // flexGrow={1}
                                marginLeft={j > 0 ? 4 : 0}
                                marginRight={j < line.length - 1 ? 4 : 0}
                                alignItems="center"
                                justifyContent="center"
                                height={30}
                                width={(maxWidth - (line.length - 1) * 8) / line.length}
                                onPress={resolveInternalLink(button.url!, () => Linking.openURL(button.url!))}

                            >
                                <ASText
                                    textAlign='center'
                                    color={'#0084fe'}
                                    fontSize={14}
                                    fontWeight={TextStyles.weight.medium}
                                >
                                    {button.title}
                                </ASText>

                            </ASFlex>
                        )}
                    </ASFlex>
                )}

            </ASFlex>

        )
    }
}