import * as React from 'react';
import { Image } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadManagerInstance } from '../../files/DownloadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { DownloadState } from '../../files/DownloadManagerInterface';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/spacex.types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

export interface AsyncReplyMessageRichAttachProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    onPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
}

export class AsyncReplyMessageRichAttach extends React.PureComponent<AsyncReplyMessageRichAttachProps, { downloadState?: DownloadState }> {

    private downloadManagerWatch?: WatchSubscription;

    constructor(props: AsyncReplyMessageRichAttachProps) {
        super(props);
        this.state = {};
    }

    private handlePress = (event: ASPressEvent, radius?: number) => {
        // Ignore clicks for not-downloaded files
        if (this.state.downloadState && this.state.downloadState.path && this.props.attach.image?.metadata?.imageHeight && this.props.attach.image?.metadata.imageWidth) {
            let w = this.props.attach.image?.metadata.imageWidth;
            let h = this.props.attach.image?.metadata.imageHeight;
            this.props.onPress({ imageHeight: h, imageWidth: w }, { path: this.state.downloadState.path, ...event }, radius, this.props.message.sender.name, this.props.message.date);
        }
    }

    componentWillMount() {
        let optimalSize = layoutMedia(this.props.attach.image?.metadata?.imageWidth || 0, this.props.attach.image?.metadata?.imageHeight || 0, 1024, 1024);
        if (this.props.attach.image?.url) {
            this.downloadManagerWatch = DownloadManagerInstance.watch(this.props.attach.image?.url, (this.props.attach!!.image?.metadata?.mimeType !== 'gif') ? optimalSize : null, (state) => {
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
        const { theme, attach, message } = this.props;
        let layout = { width: 40, height: 40 };
        const resolved = Image.resolveAssetSource(require('assets/bg-shared-link-border.png'));
        const capInsets = { top: 12, right: 12, bottom: 12, left: 12 };
        let sourceUri = (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined;
        let bgColor = message.isOut ? theme.outgoingForegroundTertiary : theme.incomingForegroundTertiary;
        const hasImage = !!attach.image;

        return (
            <ASFlex
                borderRadius={8}
                width={layout.width}
                height={layout.height}
                backgroundPatch={{
                    source: resolved.uri,
                    scale: resolved.scale,
                    ...capInsets
                }}
                backgroundPatchTintColor={theme.borderLight}
            >
                {hasImage ? (
                    <ASImage
                        onPress={(e) => this.handlePress(e, 8)}
                        source={{ uri: sourceUri }}
                        borderRadius={8}
                        width={layout.width}
                        height={layout.height}
                        backgroundColor={bgColor}
                        isGif={attach.image?.metadata?.imageFormat === 'GIF'}
                    />
                ) : (
                        <ASFlex
                            borderRadius={8}
                            width={layout.width}
                            height={layout.height}
                            alignItems="center"
                            justifyContent="center"
                            backgroundColor={bgColor}
                        >
                            <ASImage
                                source={require('assets/ic-link-glyph-24.png')}
                                width={24}
                                height={24}
                                tintColor={theme.foregroundContrast}
                            />
                        </ASFlex>
                    )}
            </ASFlex>
        );
    }
}
