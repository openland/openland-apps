import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Platform, Linking, PixelRatio } from 'react-native';
import { paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { bubbleMaxWidth, bubbleMaxWidthIncoming, contentInsetsHorizontal } from '../AsyncBubbleView';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { AppTheme } from 'openland-mobile/themes/themes';

interface UrlAugmentationContentProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
    imageLayout?: { width: number, height: number };
    compensateBubble?: boolean;
    maxWidth?: number;
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    padded?: boolean;
    theme: AppTheme;
}

export let isInvite = (attach?: FullMessage_GeneralMessage_attachments_MessageRichAttachment) => {
    return attach && attach.titleLink && (attach.titleLink.includes('openland.com/invite') || attach.titleLink.includes('openland.com/joinChannel'));
}

export let richAttachImageShouldBeCompact = (attach?: FullMessage_GeneralMessage_attachments_MessageRichAttachment) => {
    return attach && attach.image &&
        (
            (attach.image.metadata && attach.image.metadata.imageHeight === attach.image.metadata.imageWidth)
            ||
            isInvite(attach)
        )
}

export const paddedTextPrfix = <ASText fontSize={16} > {' ' + '\u00A0'.repeat(Platform.select({ default: 9, ios: 8 }))}</ASText >;

export class RichAttachContent extends React.PureComponent<UrlAugmentationContentProps, { downloadState?: DownloadState }> {
    private augLayout?: { width: number, height: number };
    private downloadManagerWatch?: WatchSubscription;
    private imageCompact = false;

    componentWillMount() {
        if (this.props.attach && this.props.attach.image && this.props.imageLayout) {

            this.augLayout = this.props.imageLayout;
            if (richAttachImageShouldBeCompact(this.props.attach)) {
                this.imageCompact = true;
                this.augLayout = { width: 36, height: 36 };
            }

            let ratio = PixelRatio.get();
            let imageSize = {
                width: Math.floor(this.augLayout.width * ratio),
                height: Math.floor(this.augLayout.height * ratio)
            };

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

    onMediaPress = (event: ASPressEvent, radius?: number) => {
        if (this.state && this.state.downloadState && this.state.downloadState.path && this.props.attach.image && this.props.attach.image.metadata && this.props.attach.image.metadata.imageHeight && this.props.attach.image.metadata.imageWidth) {
            let w = this.props.attach.image.metadata.imageWidth;
            let h = this.props.attach.image.metadata.imageHeight;

            this.props.onMediaPress({ imageHeight: h, imageWidth: w }, { ...event, path: this.state.downloadState.path }, radius);
        }
    }

    onTitleClick = async () => {
        if (this.props.attach.titleLink) {
            (await resolveInternalLink(this.props.attach.titleLink, () => Linking.openURL(this.props.attach.titleLink!)))();
        }
    }

    render() {
        let { theme, message } = this.props;
        let out = message.isOut;
        let link = this.props.attach!.titleLink || '';
        let { text, subTitle, keyboard } = this.props.attach;

        // prepare image
        let imgCompact = this.imageCompact;
        let imgLayout = this.augLayout;
        let imageSource = { uri: (this.state && this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined };

        // invite link image placeholder
        if (richAttachImageShouldBeCompact(this.props.attach)) {
            imgCompact = true;
            imgLayout = !!imgLayout ? { width: 36, height: 36 } : undefined;

        }

        if (isInvite(this.props.attach) && !this.props.attach.image) {
            imgCompact = true;
            imgLayout = { width: 36, height: 36 };
            imageSource = message.isOut ? require('assets/ing-thn-out.png') : require('assets/img-thn-in.png');
        }

        let maxWidth = this.props.maxWidth || ((imgLayout && !imgCompact) ? (imgLayout.width - contentInsetsHorizontal * 2) : (message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming));
        return (

            <ASFlex flexDirection="column" alignItems="stretch" alignSelf={'stretch'}>
                {!!this.props.attach.titleLinkHostname && imgCompact && <ASText
                    maxWidth={maxWidth}
                    color={out ? theme.textColorOut : theme.textColorOut}
                    opacity={out ? 0.7 : 0.6}
                    fontSize={14}
                    numberOfLines={1}
                    fontWeight={TextStyles.weight.regular}
                >
                    {this.props.attach.titleLinkHostname}
                </ASText>}

                {!imgCompact && this.props.attach.image && imgLayout && (
                    <ASFlex
                        backgroundColor={theme.chatImageBackground}
                        marginTop={this.props.compensateBubble ? -5 : 5}
                        marginLeft={this.props.compensateBubble ? -contentInsetsHorizontal : 0}
                        marginRight={this.props.compensateBubble ? -contentInsetsHorizontal : 0}
                        justifyContent="center"
                        borderRadius={8}
                    >
                        <ASImage
                            onPress={(e) => this.onMediaPress(e, 8)}
                            source={imageSource}
                            width={imgLayout!.width}
                            height={imgLayout!.height}
                            borderRadius={8}
                        />
                        {this.state && this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path &&
                            <ASFlex
                                overlay={true}
                                width={imgLayout.width}
                                height={imgLayout.height}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <ASFlex backgroundColor={theme.backgroundColor} borderRadius={20}>
                                    <ASText color={theme.textColor} opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</ASText>
                                </ASFlex>
                            </ASFlex>
                        }
                    </ASFlex>
                )}

                {!!this.props.attach.titleLinkHostname && !imgCompact && <ASText
                    marginTop={5}
                    maxWidth={maxWidth}
                    color={out ? theme.textColorOut : theme.textColor}
                    opacity={out ? 0.7 : 0.6}
                    fontSize={14}
                    numberOfLines={1}
                    fontWeight={TextStyles.weight.regular}
                >
                    {this.props.attach.titleLinkHostname}
                </ASText>}

                <ASFlex flexDirection="row" marginTop={5}>
                    {imgCompact && imgLayout && imageSource && (
                        <ASFlex>
                            <ASImage
                                onPress={(e) => this.onMediaPress(e, 10)}
                                source={imageSource}
                                width={imgLayout!.width}
                                height={imgLayout!.height}
                                borderRadius={10}
                                marginRight={9}
                            />
                        </ASFlex>
                    )}

                    <ASFlex
                        flexDirection="column"
                        maxWidth={maxWidth - (imgCompact ? 90 : 0)}
                    >

                        {!!this.props.attach.title && <ASText
                            maxWidth={maxWidth - 36}
                            color={out ? theme.textColorOut : theme.textColor}
                            letterSpacing={-0.3}
                            fontSize={14}
                            marginTop={Platform.OS === 'android' ? -4 : -1}
                            numberOfLines={this.imageCompact ? 1 : 3}
                            marginBottom={4}
                            fontWeight={TextStyles.weight.medium}
                            onPress={this.onTitleClick}
                        >
                            {this.props.attach.title}
                            {this.props.padded && !subTitle && (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited))}
                        </ASText>}
                        {!!subTitle && <ASText
                            marginTop={(Platform.OS === 'android' ? -4 : -1)}
                            maxWidth={maxWidth - 36}
                            color={out ? theme.textColorOut : theme.textColor}
                            opacity={out ? 0.7 : 0.6}
                            fontSize={14}
                            numberOfLines={1}
                            marginBottom={4}
                            fontWeight={TextStyles.weight.regular}
                        >
                            {subTitle}
                            {this.props.padded && (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited))}
                        </ASText>}
                    </ASFlex>
                </ASFlex>

                {!!text && <ASText
                    maxWidth={maxWidth}
                    color={out ? theme.textColorOut : theme.textColor}
                    fontSize={14}
                    marginTop={this.imageCompact && imgLayout ? (subTitle ? 4 : -19) : 0}
                    marginBottom={4}
                    lineHeight={19}
                    numberOfLines={5}
                    fontWeight={TextStyles.weight.regular}
                >
                    {!subTitle && this.imageCompact && imgLayout && paddedTextPrfix}
                    {text}
                    {this.props.padded && (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited))}
                </ASText>}

                {!!keyboard && keyboard.buttons.map((line, i) =>
                    <ASFlex key={i + ''} flexDirection="row" marginTop={4} alignSelf="stretch" width={Platform.OS === 'ios' ? maxWidth : undefined} marginBottom={i === keyboard!.buttons.length - 1 ? 4 : 0}>
                        {!!line && line.map((button, j) =>
                            <ASFlex
                                marginTop={i !== 0 ? 4 : 0}
                                key={'button-' + i + '-' + j}
                                borderRadius={8}
                                backgroundColor={theme.backgroundColor}
                                marginLeft={j > 0 ? 4 : 0}
                                marginRight={j < line.length - 1 ? 4 : 0}
                                alignItems="center"
                                justifyContent="center"
                                height={30}
                                // flexBasis={1}
                                flexGrow={1}
                                onPress={resolveInternalLink(button.url!, () => Linking.openURL(button.url!))}

                            >
                                <ASText
                                    textAlign='center'
                                    color={theme.linkColor}
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