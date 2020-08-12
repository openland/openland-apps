import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { DownloadState } from '../../../files/DownloadManagerInterface';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage } from 'openland-api/spacex.types';
import FastImage from 'react-native-fast-image';
import { PreviewWrapper } from './PreviewWrapper';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface MediaContentProps {
    message: FullMessage_GeneralMessage;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    imageLayout: { width: number, height: number };
    theme: ThemeGlobal;
}

export class MediaContent extends React.PureComponent<MediaContentProps, { downloadState?: DownloadState }> {
    mounted = false;
    serverDownloadManager = false;
    constructor(props: MediaContentProps) {
        super(props);
        this.state = {};
    }

    private downloadManagerWatch?: WatchSubscription;

    bindDownloadManager = () => {
        let fileAttach = this.props.attach;
        if (fileAttach && fileAttach.fileId && fileAttach!!.fileMetadata.imageWidth!! && fileAttach!!.fileMetadata.imageHeight!!) {
            this.serverDownloadManager = true;
            let optimalSize = layoutMedia(fileAttach!!.fileMetadata.imageWidth!!, fileAttach!!.fileMetadata.imageHeight!!, 1024, 1024);
            this.downloadManagerWatch = DownloadManagerInstance.watch(fileAttach!!.fileId!, (fileAttach!!.fileMetadata.imageFormat !== 'GIF') ? optimalSize : null, (state) => {
                if (this.mounted) {
                    this.setState({ downloadState: state });
                }
            });
        }
    }

    unbindDownloadManager = () => {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.bindDownloadManager();
    }

    componentDidUpdate() {
        let fileAttach = this.props.attach;

        if (fileAttach && fileAttach.fileId && !this.serverDownloadManager) {
            this.unbindDownloadManager();
            this.bindDownloadManager();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.unbindDownloadManager();
    }

    render() {
        const { imageLayout, theme, message } = this.props;

        let imagePath = (this.state.downloadState && this.state.downloadState.path) ? ((Platform.OS === 'android' ? 'file://' : '') + this.state.downloadState.path) : undefined;

        return (
            <View
                backgroundColor={theme.incomingBackgroundPrimary}
                borderRadius={8}
                marginVertical={5}
                alignSelf="flex-start"
            >
                <View width={imageLayout.width} height={imageLayout.height} alignSelf="center">
                    <PreviewWrapper
                        path={imagePath}
                        width={this.props.attach.fileMetadata.imageWidth}
                        height={this.props.attach.fileMetadata.imageHeight}
                        radius={8}
                        senderName={message.sender.name}
                        date={message.date}
                    >
                        <FastImage
                            style={{ borderRadius: 8, width: imageLayout.width, height: imageLayout.height }}
                            source={{ uri: imagePath, priority: 'normal', ...{ disableAnimations: true } as any }}
                        />
                    </PreviewWrapper>

                    {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && (
                        <View
                            justifyContent="center"
                            alignItems="center"
                            backgroundColor="#0008"
                            borderRadius={8}
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                        >
                            <Text style={{ color: '#fff', opacity: 0.8, marginLeft: 20, marginTop: 20, marginRight: 20, marginBottom: 20, textAlign: 'center' }} allowFontScaling={false}>{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}