import * as React from 'react';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { Platform, Linking, PixelRatio, View, Text, TouchableWithoutFeedback } from 'react-native';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { resolveInternalLink } from 'openland-mobile/utils/resolveInternalLink';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment, FullMessage_GeneralMessage } from 'openland-api/spacex.types';
import { richAttachImageShouldBeCompact, isInvite } from 'openland-mobile/messenger/components/content/RichAttachContent';
import FastImage from 'react-native-fast-image';
import { PreviewWrapper } from './PreviewWrapper';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface RichAttachContentProps {
    message: FullMessage_GeneralMessage;
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
    imageLayout?: { width: number, height: number };
    wrapped?: boolean;
    theme: ThemeGlobal;
    maxWidth: number;
}

const paddedTextPrefix = <Text>{' ' + '\u00A0'.repeat(Platform.select({ default: 12, ios: 11 }))}</Text>;

export class RichAttachContent extends React.PureComponent<RichAttachContentProps, { downloadState?: DownloadState }> {
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

    onTitleClick = async () => {
        if (this.props.attach.titleLink) {
            (await resolveInternalLink(this.props.attach.titleLink, () => Linking.openURL(this.props.attach.titleLink!)))();
        }
    }

    render() {
        const { wrapped, maxWidth } = this.props;
        const { theme } = this.props;
        const { title, text, subTitle, keyboard } = this.props.attach;

        // prepare image
        let imgCompact = this.imageCompact;
        let imgLayout = this.augLayout;
        let imagePath = (this.state && this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined;
        let imageSource = { uri: imagePath, priority: 'normal', ...{ disableAnimations: true } as any };

        // invite link image placeholder
        if (richAttachImageShouldBeCompact(this.props.attach)) {
            imgCompact = true;
            imgLayout = !!imgLayout ? { width: 36, height: 36 } : undefined;

        }

        if (isInvite(this.props.attach) && !this.props.attach.image) {
            imgCompact = true;
            imgLayout = { width: 36, height: 36 };
            imageSource = require('assets/img-thn-in.png');
        }

        const titleMaxWidth = (imgCompact && imgLayout && imageSource) ? maxWidth - 26 - 36 - 9 : undefined;

        return (
            <View flexDirection="column" alignItems="stretch" alignSelf="stretch" marginTop={!wrapped ? 10 : undefined} marginVertical={wrapped ? 5 : undefined} backgroundColor={theme.incomingBackgroundPrimary} borderRadius={8} paddingHorizontal={13} paddingVertical={10}>
                {!!this.props.attach.titleLinkHostname && imgCompact && (
                    <Text
                        style={{
                            color: theme.foregroundPrimary,
                            opacity: 0.6,
                            fontSize: 14,
                            fontWeight: FontStyles.Weight.Regular,
                        }}
                        numberOfLines={1}
                        allowFontScaling={false}
                    >
                        {this.props.attach.titleLinkHostname}
                    </Text>
                )}

                {!imgCompact && this.props.attach.image && imgLayout && (
                    <View justifyContent="center" borderRadius={8} marginTop={-10} marginHorizontal={-13} marginBottom={6} backgroundColor="rgba(0, 0, 0, 0.03)">
                        <View width={imgLayout.width} height={imgLayout.height} alignSelf="center">
                            <PreviewWrapper
                                path={imagePath}
                                width={this.props.attach.image.metadata?.imageWidth}
                                height={this.props.attach.image.metadata?.imageHeight}
                                isGif={this.props.attach.image.metadata?.mimeType === 'gif'}
                                senderName={this.props.message.sender.name}
                                date={this.props.message.date}
                                radius={8}
                            >
                                <FastImage
                                    source={imageSource}
                                    style={{
                                        width: imgLayout.width,
                                        height: imgLayout.height,
                                        borderRadius: 8
                                    }}
                                />
                            </PreviewWrapper>

                            {this.state && this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path &&
                                <View
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    bottom={0}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <View backgroundColor="#0008" borderRadius={20}>
                                        <Text style={{ color: '#fff', opacity: 0.8, marginLeft: 20, marginTop: 20, marginRight: 20, marginBottom: 20, textAlign: 'center' }} allowFontScaling={false}>{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                )}

                {!!this.props.attach.titleLinkHostname && !imgCompact && (
                    <Text
                        style={{
                            marginTop: 5,
                            color: theme.foregroundPrimary,
                            opacity: 0.6,
                            fontSize: 14,
                            fontWeight: FontStyles.Weight.Regular
                        }}
                        numberOfLines={1}
                        allowFontScaling={false}
                    >
                        {this.props.attach.titleLinkHostname}
                    </Text>
                )}

                <View flexDirection="row" marginTop={5} zIndex={2}>
                    {imgCompact && imgLayout && imageSource && this.props.attach.image && (
                        <View marginRight={9}>
                            <PreviewWrapper
                                path={imagePath}
                                width={this.props.attach.image.metadata?.imageWidth}
                                height={this.props.attach.image.metadata?.imageHeight}
                                isGif={this.props.attach.image.metadata?.mimeType === 'gif'}
                                senderName={this.props.message.sender.name}
                                date={this.props.message.date}
                                radius={10}
                            >
                                <FastImage
                                    source={imageSource}
                                    style={{
                                        width: imgLayout.width,
                                        height: imgLayout.height,
                                        borderRadius: 10,
                                    }}
                                />
                            </PreviewWrapper>
                        </View>
                    )}

                    {imgCompact && imgLayout && imageSource && !this.props.attach.image && (
                        <View marginRight={9}>
                            <FastImage
                                source={imageSource}
                                style={{
                                    width: imgLayout.width,
                                    height: imgLayout.height,
                                    borderRadius: 10,
                                }}
                            />
                        </View>
                    )}

                    <View flexDirection="column" width={titleMaxWidth}>
                        {!!title && (
                            <Text
                                style={{
                                    color: theme.foregroundPrimary,
                                    letterSpacing: 0,
                                    fontSize: 14,
                                    marginTop: Platform.OS === 'android' ? -4 : -1,
                                    marginBottom: 4,
                                    fontWeight: FontStyles.Weight.Medium,
                                }}
                                numberOfLines={this.imageCompact ? 1 : 3}
                                onPress={this.onTitleClick}
                                allowFontScaling={false}
                            >
                                {title}
                            </Text>
                        )}
                        {!!subTitle && (
                            <Text
                                style={{
                                    marginTop: (Platform.OS === 'android' ? -4 : -1),
                                    color: theme.foregroundPrimary,
                                    opacity: 0.6,
                                    fontSize: 14,
                                    marginBottom: 4,
                                    fontWeight: FontStyles.Weight.Regular,
                                }}
                                numberOfLines={1}
                                allowFontScaling={false}
                            >
                                {subTitle}
                            </Text>
                        )}
                    </View>
                </View>

                {!!text && (
                    <Text
                        style={{
                            color: theme.foregroundPrimary,
                            fontSize: 14,
                            marginTop: this.imageCompact && imgLayout ? (subTitle ? 4 : -19) : 0,
                            marginBottom: 4,
                            lineHeight: 19,
                            fontWeight: FontStyles.Weight.Regular,
                            zIndex: 1,
                        }}
                        numberOfLines={5}
                        onPress={this.onTitleClick}
                        allowFontScaling={false}
                    >
                        {!subTitle && this.imageCompact && imgLayout && paddedTextPrefix}
                        {text}
                    </Text>
                )}

                {!!keyboard && keyboard.buttons.map((line, i) =>
                    <View key={'attch-btn-' + i} flexDirection="row" marginTop={6} alignSelf="stretch" marginBottom={i === keyboard!.buttons.length - 1 ? 4 : 0}>
                        {!!line && line.map((button, j) =>
                            <TouchableWithoutFeedback key={'button-' + i + '-' + j} onPress={resolveInternalLink(button.url!, () => Linking.openURL(button.url!))}>
                                <View
                                    marginTop={i !== 0 ? 4 : 0}
                                    backgroundColor={theme.backgroundPrimary}
                                    borderRadius={8}
                                    marginLeft={j > 0 ? 4 : 0}
                                    marginRight={j < line.length - 1 ? 4 : 0}
                                    alignItems="center"
                                    justifyContent="center"
                                    height={30}
                                    flexGrow={1}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: theme.accentPrimary,
                                            fontSize: 14,
                                            fontWeight: FontStyles.Weight.Medium,
                                        }}
                                        allowFontScaling={false}
                                    >
                                        {button.title}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                )}
            </View>
        );
    }
}