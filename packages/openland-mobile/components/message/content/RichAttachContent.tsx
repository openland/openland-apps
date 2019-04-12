import * as React from 'react';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Platform, Linking, PixelRatio, View, Text, TextStyle, TouchableWithoutFeedback, Image } from 'react-native';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment, FullMessage_GeneralMessage } from 'openland-api/Types';
import { richAttachImageShouldBeCompact, isInvite } from 'openland-mobile/messenger/components/content/RichAttachContent';
import FastImage from 'react-native-fast-image';

interface RichAttachContentProps {
    message: FullMessage_GeneralMessage;
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
    imageLayout?: { width: number, height: number };

    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string }, radius?: number) => void;
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

    onMediaPress = (radius?: number) => {
        if (this.state && this.state.downloadState && this.state.downloadState.path && this.props.attach.image && this.props.attach.image.metadata && this.props.attach.image.metadata.imageHeight && this.props.attach.image.metadata.imageWidth) {
            let w = this.props.attach.image.metadata.imageWidth;
            let h = this.props.attach.image.metadata.imageHeight;

            this.props.onMediaPress({ imageHeight: h, imageWidth: w }, { path: this.state.downloadState.path }, radius);
        }
    }

    onTitleClick = async () => {
        if (this.props.attach.titleLink) {
            (await resolveInternalLink(this.props.attach.titleLink, () => Linking.openURL(this.props.attach.titleLink!)))();
        }
    }

    render() {
        let { text, subTitle, keyboard } = this.props.attach;

        let mainTextColor = DefaultConversationTheme.textColorIn;

        // prepare image
        let imgCompact = this.imageCompact;
        let imgLayout = this.augLayout;
        let imageSource = { uri: (this.state && this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : '', priority: 'normal', ...{ disableAnimations: true } as any };

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

        return (
            <View flexDirection="column" alignItems="stretch" alignSelf="stretch" marginTop={10}>
                {!!this.props.attach.titleLinkHostname && imgCompact && (
                    <Text
                        style={{
                            color: '#000',
                            opacity: 0.6,
                            fontSize: 14,
                            fontWeight: TextStyles.weight.regular,
                        } as TextStyle}
                        numberOfLines={1}
                    >
                        {this.props.attach.titleLinkHostname}
                    </Text>
                )}

                {!imgCompact && this.props.attach.image && imgLayout && (
                    <View backgroundColor="#dbdce1" marginTop={5} justifyContent="center" borderRadius={8}>
                        <TouchableWithoutFeedback onPress={() => this.onMediaPress(8)}>
                            <FastImage
                                source={imageSource}
                                style={{
                                    width: imgLayout.width,
                                    height: imgLayout.height,
                                    borderRadius: 8
                                }}
                            />
                        </TouchableWithoutFeedback>

                        {this.state && this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path &&
                            <View
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                                width={imgLayout.width}
                                height={imgLayout.height}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <View backgroundColor="#0008" borderRadius={20}>
                                    <Text style={{ color: '#fff', opacity: 0.8, marginLeft: 20, marginTop: 20, marginRight: 20, marginBottom: 20, textAlign: 'center'}}>{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</Text>
                                </View>
                            </View>
                        }
                    </View>
                )}

                {!!this.props.attach.titleLinkHostname && !imgCompact && (
                    <Text
                        style={{
                            marginTop: 5,
                            color: '#000',
                            opacity: 0.6,
                            fontSize: 14,
                            fontWeight: TextStyles.weight.regular
                        } as TextStyle}
                        numberOfLines={1}
                    >
                        {this.props.attach.titleLinkHostname}
                    </Text>
                )}

                <View flexDirection="row" marginTop={5}>
                    {imgCompact && imgLayout && imageSource && (
                        <TouchableWithoutFeedback onPress={() => this.onMediaPress(10)}>
                            <FastImage
                                source={imageSource}
                                style={{
                                    width: imgLayout.width,
                                    height: imgLayout.height,
                                    borderRadius: 10,
                                    marginRight: 9,
                                }}
                            />
                        </TouchableWithoutFeedback>
                    )}

                    <View flexDirection="column">
                        {!!this.props.attach.title && (
                            <Text
                                style={{
                                    color: mainTextColor,
                                    letterSpacing: -0.3,
                                    fontSize: 14,
                                    marginTop: Platform.OS === 'android' ? -4 : -1,
                                    marginBottom: 4,
                                    fontWeight: TextStyles.weight.medium,
                                } as TextStyle}
                                numberOfLines={this.imageCompact ? 1 : 3}
                                onPress={this.onTitleClick}
                            >
                                {this.props.attach.title}
                            </Text>
                        )}
                        {!!subTitle && (
                            <Text
                                style={{
                                    marginTop: (Platform.OS === 'android' ? -4 : -1),
                                    color: '#000',
                                    opacity: 0.6,
                                    fontSize: 14,
                                    marginBottom: 4,
                                    fontWeight: TextStyles.weight.regular,
                                } as TextStyle}
                                numberOfLines={1}
                            >
                                {subTitle}
                            </Text>
                        )}
                    </View>
                </View>

                {!!text && (
                    <Text
                        style={{
                            color: '#000',
                            fontSize: 14,
                            marginTop: this.imageCompact && imgLayout ? (subTitle ? 4 : -19) : 0,
                            marginBottom: 4,
                            lineHeight: 19,
                            fontWeight: TextStyles.weight.regular,
                        } as TextStyle}
                        numberOfLines={5}
                    >
                        {!subTitle && this.imageCompact && imgLayout && paddedTextPrefix}
                        {text}
                    </Text>
                )}

                {!!keyboard && keyboard.buttons.map((line, i) =>
                    <View key={'attch-btn-' + i} flexDirection="row" marginTop={10} alignSelf="stretch" marginBottom={i === keyboard!.buttons.length - 1 ? 4 : 0}>
                        {!!line && line.map((button, j) =>
                            <TouchableWithoutFeedback key={'button-' + i + '-' + j} onPress={resolveInternalLink(button.url!, () => Linking.openURL(button.url!))}>
                                <View
                                    marginTop={i !== 0 ? 4 : 0}
                                    backgroundColor="#F7F7F7"
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
                                            color: '#0084fe',
                                            fontSize: 14,
                                            fontWeight: TextStyles.weight.medium,
                                        } as TextStyle}
                                    >
                                        {button.title}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                )}
            </View>
        )
    }
}