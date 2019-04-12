import * as React from 'react';
import { Image, View, TouchableWithoutFeedback, Text } from 'react-native';
import { DownloadState } from '../../../files/DownloadManagerInterface';
import { layoutMedia } from '../../../../openland-web/utils/MediaLayout';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage } from 'openland-api/Types';

interface MediaContentProps {
    message: FullMessage_GeneralMessage;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    imageLayout: { width: number, height: number },

    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string }) => void;
}

export class MediaContent extends React.PureComponent<MediaContentProps, { downloadState?: DownloadState }> {
    mounted = false;
    serverDownloadManager = false;
    constructor(props: MediaContentProps) {
        super(props);
        this.state = {};
    }

    private downloadManagerWatch?: WatchSubscription;
    private handlePress = () => {
        // Ignore clicks for not-downloaded files
        let path = (this.state.downloadState && this.state.downloadState.path);
        if (path && this.props.attach.fileMetadata.imageHeight && this.props.attach.fileMetadata.imageWidth) {
            let w = this.props.attach.fileMetadata.imageWidth;
            let h = this.props.attach.fileMetadata.imageHeight;

            this.props.onMediaPress({ imageHeight: h, imageWidth: w }, { path });
        }
    }

    bindDownloadManager = () => {
        let fileAttach = this.props.attach;
        if (fileAttach && fileAttach.fileId && fileAttach!!.fileMetadata.imageWidth!! && fileAttach!!.fileMetadata.imageHeight!!) {
            this.serverDownloadManager = true;
            let optimalSize = layoutMedia(fileAttach!!.fileMetadata.imageWidth!!, fileAttach!!.fileMetadata.imageHeight!!, 1024, 1024);
            this.downloadManagerWatch = DownloadManagerInstance.watch(fileAttach!!.fileId!, (fileAttach!!.fileMetadata.imageFormat !== 'gif') ? optimalSize : null, (state) => {
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
        let { imageLayout } = this.props;

        return (
            <View
                flexDirection="column"
                width={imageLayout.width}
                height={imageLayout.height}
                borderRadius={18}
                alignItems="center"
            >
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <Image
                        style={{ width: imageLayout.width, height: imageLayout.height }}
                        source={{ uri: (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path + '.jpg') : undefined }}
                    />
                </TouchableWithoutFeedback>

                {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && (
                    <View
                        width={imageLayout.width}
                        height={imageLayout.height}
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="#0008"
                        borderRadius={20}
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                    >
                        <Text style={{ color: '#fff', opacity: 0.8, marginLeft: 20, marginTop: 20, marginRight: 20, marginBottom: 20, textAlign: 'center'}}>{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</Text>
                    </View>
                )}
            </View>
        )
    }
}