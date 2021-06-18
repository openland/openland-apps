import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { Platform, Linking, PixelRatio } from 'react-native';
import { paddedText } from '../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { bubbleMaxWidth, bubbleMaxWidthIncoming, contentInsetsHorizontal, contentInsetsTop } from '../AsyncBubbleView';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { resolveInternalLink } from 'openland-mobile/utils/resolveInternalLink';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/spacex.types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { isInternalLink } from 'openland-y-utils/isInternalLink';
import { isYoutubeLink } from 'openland-y-utils/isYoutubeLink';
import { TFn } from 'openland-mobile/text/useText';

interface UrlAugmentationContentProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
    imageLayout?: { width: number, height: number };
    socialImageLayout?: { width: number, height: number };
    compensateBubble?: boolean;
    maxWidth?: number;
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onLongPress: (e: ASPressEvent) => void;
    padded?: boolean;
    hasPurchase?: boolean;
    theme: ThemeGlobal;
    t: TFn;
}

export let isInvite = (attach?: FullMessage_GeneralMessage_attachments_MessageRichAttachment) => {
    return attach && attach.titleLink && (attach.titleLink.includes('openland.com/invite') || attach.titleLink.includes('openland.com/joinChannel'));
};

export let richAttachImageShouldBeCompact = (attach?: FullMessage_GeneralMessage_attachments_MessageRichAttachment) => {
    const aspectRatio = attach && attach.image && attach.image.metadata && attach.image.metadata.imageWidth && attach.image.metadata.imageHeight ? (attach.image.metadata.imageWidth / attach.image.metadata.imageHeight) : undefined;

    return ((aspectRatio && aspectRatio >= 0.8 && aspectRatio <= 1.2) || isInvite(attach));
};

export const paddedTextPrfix = <ASText fontSize={16} > {' ' + '\u00A0'.repeat(Platform.select({ default: 11, ios: 11 }))}</ASText >;

const getImageSize = ({ width, height }: { width: number, height: number }) => {
    let ratio = PixelRatio.get();
    return ({
        width: Math.floor(width * ratio),
        height: Math.floor(height * ratio)
    });
};

export class RichAttachContent extends React.PureComponent<UrlAugmentationContentProps, { compactDownloadState?: DownloadState, largeDownloadState?: DownloadState }> {
    private compactImageLayout: { width: number, height: number } = { width: 40, height: 40 };
    private compactDownloadManagerWatch?: WatchSubscription;
    private largeDownloadManagerWatch?: WatchSubscription;
    private imageCompact = false;
    private imageLarge = false;

    componentWillMount() {
        if (this.props.attach && this.props.attach.image && this.props.imageLayout) {
            if (richAttachImageShouldBeCompact(this.props.attach)) {
                this.imageCompact = true;
                this.compactDownloadManagerWatch = DownloadManagerInstance.watch(this.props.attach.image.url, getImageSize(this.compactImageLayout), (state) => {
                    this.setState({ compactDownloadState: state });
                });
            } else {
                this.imageLarge = true;
                this.largeDownloadManagerWatch = DownloadManagerInstance.watch(this.props.attach.image.url, getImageSize(this.props.imageLayout), (state) => {
                    this.setState({ largeDownloadState: state });
                });
            }
        }
        if (this.props.attach && this.props.attach.socialImage && this.props.socialImageLayout) {
            this.imageLarge = true;
            this.largeDownloadManagerWatch = DownloadManagerInstance.watch(this.props.attach.socialImage.url, getImageSize(this.props.socialImageLayout), (state) => {
                this.setState({ largeDownloadState: state });
            });
        }
    }

    componentWillUnmount() {
        if (this.compactDownloadManagerWatch) {
            this.compactDownloadManagerWatch();
        }
        if (this.largeDownloadManagerWatch) {
            this.largeDownloadManagerWatch();
        }
    }

    onMediaPress = (event: ASPressEvent) => {
        if (isYoutubeLink(this.props.attach.titleLink)) {
            (async () => {
                if (this.props.attach.titleLink && (await Linking.canOpenURL(this.props.attach.titleLink))) {
                    Linking.openURL(this.props.attach.titleLink);
                }
            })();
            return;
        }
        let imageSize = this.props.attach.image && this.props.attach.image.metadata && this.props.attach.image.metadata.imageHeight && this.props.attach.image.metadata.imageWidth && {
            imageWidth: this.props.attach.image.metadata.imageWidth,
            imageHeight: this.props.attach.image.metadata.imageHeight,
        };
        let socialImageSize = this.props.attach.socialImage && this.props.attach.socialImage.metadata && this.props.attach.socialImage.metadata.imageHeight && this.props.attach.socialImage.metadata.imageWidth && {
            imageWidth: this.props.attach.socialImage.metadata.imageWidth,
            imageHeight: this.props.attach.socialImage.metadata.imageHeight,
        };
        let largeImageSize = socialImageSize || imageSize;

        if (this.state && this.state.largeDownloadState && this.state.largeDownloadState.path && largeImageSize) {
            this.props.onMediaPress(largeImageSize, { ...event, path: this.state.largeDownloadState.path }, 0, this.props.message.sender.name, this.props.message.date);
        }
    }

    onCompactMediaPress = (event: ASPressEvent) => {
        if (this.state && this.state.compactDownloadState && this.state.compactDownloadState.path && this.props.attach.image && this.props.attach.image.metadata && this.props.attach.image.metadata.imageHeight && this.props.attach.image.metadata.imageWidth) {
            let w = this.props.attach.image.metadata.imageWidth;
            let h = this.props.attach.image.metadata.imageHeight;
            let isInternal = !!(this.props.attach.titleLink && isInternalLink(this.props.attach.titleLink));

            this.props.onMediaPress({ imageHeight: h, imageWidth: w }, { ...event, path: this.state.compactDownloadState.path }, isInternal ? 20 : 10, this.props.message.sender.name, this.props.message.date);
        }
    }

    onPress = async () => {
        if (this.props.attach.titleLink) {
            (await resolveInternalLink(this.props.attach.titleLink, () => Linking.openURL(this.props.attach.titleLink!)))();
        }
    }

    render() {
        let { theme, message, hasPurchase, t } = this.props;
        let isOut = message.isOut;
        // let link = this.props.attach!.titleLink || '';
        let { text, subTitle, keyboard, titleLink } = this.props.attach;

        // prepare image
        let imgCompact = this.imageCompact;
        let compactImageSource = { uri: (this.state && this.state.compactDownloadState && this.state.compactDownloadState.path) ? ('file://' + this.state.compactDownloadState.path) : undefined };
        let largeImageSource = { uri: (this.state && this.state.largeDownloadState && this.state.largeDownloadState.path) ? ('file://' + this.state.largeDownloadState.path) : undefined };
        let largeImageLayout = this.props.socialImageLayout || this.props.imageLayout;

        // invite link image placeholder
        if (richAttachImageShouldBeCompact(this.props.attach)) {
            imgCompact = true;

        }

        if (isInvite(this.props.attach) && !this.props.attach.image) {
            imgCompact = true;
            compactImageSource = isOut ? require('assets/ing-thn-out.png') : require('assets/img-thn-in.png');
        }
        let isInternal = !!(titleLink && isInternalLink(titleLink));
        let hasFeaturedIcon = this.props.attach.featuredIcon && theme.displayFeaturedIcon;

        let maxWidth = this.props.maxWidth || ((this.props.imageLayout && !imgCompact) ? (this.props.imageLayout.width - contentInsetsHorizontal * 2) : (isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming));

        let bubbleForegroundPrimary = message.isOut ? theme.outgoingForegroundPrimary : theme.incomingForegroundPrimary;
        let bubbleForegroundSecondary = message.isOut ? theme.outgoingForegroundSecondary : theme.incomingForegroundSecondary;
        let loadingBackground = theme.backgroundPrimary;
        let loadingForeground = theme.foregroundPrimary;
        if (hasPurchase) {
            bubbleForegroundPrimary = theme.payForegroundPrimary;
            bubbleForegroundSecondary = theme.payForegroundSecondary;
            loadingBackground = theme.payBackgroundSecondary;
            loadingForeground = theme.payForegroundSecondary;
        }
        const isYtbLink = isYoutubeLink(this.props.attach.titleLink);

        const textWrapperMarginTop = !!this.props.attach.titleLinkHostname && !imgCompact ? 0
            : imgCompact && this.imageLarge ? 12
                : 5;

        return (
            <ASFlex flexDirection="column" alignItems="stretch" alignSelf="stretch" onPress={this.onPress} onLongPress={this.props.onLongPress}>
                {!!this.props.attach.titleLinkHostname && imgCompact && (
                    <ASText
                        maxWidth={maxWidth}
                        color={bubbleForegroundSecondary}
                        numberOfLines={1}
                        {...TextStylesAsync.Label3}
                    >
                        {this.props.attach.titleLinkHostname}
                    </ASText>
                )}

                {this.imageLarge && largeImageLayout && (
                    <ASFlex
                        marginTop={this.props.compensateBubble ? -contentInsetsTop : 5}
                        marginLeft={this.props.compensateBubble ? -contentInsetsHorizontal : 0}
                        marginRight={this.props.compensateBubble ? -contentInsetsHorizontal : 0}
                        justifyContent="center"
                    >
                        <ASImage
                            onPress={this.onMediaPress}
                            source={largeImageSource}
                            width={largeImageLayout.width}
                            height={largeImageLayout.height}
                        />
                        {this.state && this.state.largeDownloadState && this.state.largeDownloadState.progress !== undefined && this.state.largeDownloadState.progress < 1 && !this.state.largeDownloadState.path
                            ? (
                                <ASFlex
                                    overlay={true}
                                    width={largeImageLayout.width}
                                    height={largeImageLayout.height}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <ASFlex backgroundColor={loadingBackground} borderRadius={20}>
                                        <ASText color={loadingForeground} opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{t('loading', 'Loading') + ' ' + Math.round(this.state.largeDownloadState.progress * 100)}</ASText>
                                    </ASFlex>
                                </ASFlex>
                            ) : isYtbLink ? (
                                <ASFlex
                                    flexGrow={1}
                                    justifyContent="center"
                                    alignItems="center"
                                    overlay={true}
                                >
                                    <ASFlex
                                        width={48}
                                        height={48}
                                        justifyContent="center"
                                        alignItems="center"
                                        backgroundColor={theme.overlayMedium}
                                        borderRadius={24}
                                    >
                                        <ASImage width={24} height={24} source={require('assets/ic-play-glyph-24.png')} tintColor={theme.foregroundContrast} />
                                    </ASFlex>
                                </ASFlex>
                            ) : null}
                    </ASFlex>
                )}

                {!!this.props.attach.titleLinkHostname && !imgCompact && <ASText
                    marginTop={5}
                    maxWidth={maxWidth}
                    color={bubbleForegroundSecondary}
                    numberOfLines={1}
                    {...TextStylesAsync.Label3}
                >
                    {this.props.attach.titleLinkHostname}
                </ASText>}

                <ASFlex flexDirection="row" marginTop={textWrapperMarginTop}>
                    {imgCompact && this.compactImageLayout && compactImageSource && (
                        <ASImage
                            marginTop={1}
                            onPress={this.onCompactMediaPress}
                            source={compactImageSource}
                            width={this.compactImageLayout.width}
                            height={this.compactImageLayout.height}
                            borderRadius={isInternal ? 20 : 10}
                            marginRight={11}
                        />
                    )}

                    <ASFlex
                        flexDirection="column"
                        maxWidth={maxWidth - (imgCompact ? 90 : 0)}
                    >
                        {!hasFeaturedIcon && !!this.props.attach.title && <ASText
                            maxWidth={maxWidth - 36}
                            color={bubbleForegroundPrimary}
                            numberOfLines={imgCompact ? 1 : 3}
                            {...TextStylesAsync.Label2}
                        >
                            {this.props.attach.title}
                            {this.props.padded && !subTitle && paddedText(message.isEdited)}
                        </ASText>}
                        {hasFeaturedIcon && !!this.props.attach.title && (
                            <ASFlex alignItems="center">
                                <ASText
                                    maxWidth={maxWidth - 106}
                                    color={bubbleForegroundPrimary}
                                    numberOfLines={1}
                                    {...TextStylesAsync.Label2}
                                >
                                    {this.props.attach.title}
                                </ASText>
                                <ASImage
                                    source={require('assets/ic-verified-16.png')}
                                    width={16}
                                    height={16}
                                    tintColor={isOut ? theme.foregroundContrast : '#3DA7F2'}
                                    marginLeft={4}
                                    marginRight={20}
                                />
                            </ASFlex>
                        )}
                        {!!subTitle && <ASText
                            marginTop={1}
                            maxWidth={maxWidth - 36}
                            color={bubbleForegroundSecondary}
                            numberOfLines={1}
                            {...TextStylesAsync.Caption}
                        >
                            {subTitle}
                            {this.props.padded && paddedText(message.isEdited)}
                        </ASText>}
                    </ASFlex>
                </ASFlex>

                {!!text && <ASText
                    maxWidth={maxWidth}
                    color={bubbleForegroundPrimary}
                    backgroundColor="transparent"
                    marginTop={imgCompact ? (subTitle ? 6 : -21) : 0}
                    numberOfLines={5}
                    {...TextStylesAsync.Subhead}
                >
                    {!subTitle && imgCompact && compactImageSource && paddedTextPrfix}
                    {text}
                    {this.props.padded && paddedText(message.isEdited)}
                </ASText>}

                {!!keyboard && keyboard.buttons.map((line, i) =>
                    <ASFlex
                        key={i + ''}
                        flexDirection="row"
                        maxWidth={maxWidth - 24}
                        marginTop={!!text ? 9 : 12}
                        alignSelf="stretch"
                        marginBottom={i === keyboard!.buttons.length - 1 ? 4 : 0}
                    >
                        {!!line && line.map((button, j) =>
                            <ASFlex
                                marginTop={i !== 0 ? 4 : 0}
                                key={'button-' + i + '-' + j}
                                backgroundColor={theme.backgroundPrimary}
                                marginLeft={j > 0 ? 4 : 0}
                                marginRight={j < line.length - 1 ? 4 : 0}
                                height={36}
                                flexGrow={1}
                                borderRadius={8}
                            >
                                <ASFlex
                                    height={36}
                                    borderRadius={8}
                                    alignItems="center"
                                    justifyContent="center"
                                    flexGrow={1}
                                    onPress={resolveInternalLink(button.url!, () => Linking.openURL(button.url!))}
                                    onLongPress={this.props.onLongPress}
                                    highlightColor={theme.backgroundPrimaryActive}
                                >
                                    <ASText
                                        textAlign='center'
                                        color={theme.accentPrimary}
                                        {...TextStylesAsync.Label2}
                                        height={20}
                                        marginTop={-2}
                                        maxWidth={maxWidth - 24 - 16}
                                    >
                                        {button.title}
                                    </ASText>
                                </ASFlex>
                            </ASFlex>
                        )}
                    </ASFlex>
                )}

            </ASFlex>

        );
    }
}