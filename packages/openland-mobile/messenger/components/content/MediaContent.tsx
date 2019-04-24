import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { Platform, Dimensions, Image } from 'react-native';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from '../../../files/DownloadManagerInterface';
import { layoutMedia } from '../../../../openland-web/utils/MediaLayout';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { contentInsetsHorizontal, contentInsetsBottom, contentInsetsTop } from '../AsyncBubbleView';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { AppTheme } from 'openland-mobile/themes/themes';

interface MediaContentProps {
    single?: boolean;
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    layout: { width: number, height: number },
    compensateBubble?: boolean;
    theme: AppTheme;
}

export let layoutImage = (fileMetadata?: { imageWidth: number | null, imageHeight: number | null }, maxSize?: number) => {
    maxSize = maxSize || Platform.select({
        default: 400,
        ios: Math.min(Dimensions.get('window').width - 120, 400),
        android: Math.min(Dimensions.get('window').width - 120, 400)
    });

    if (fileMetadata && fileMetadata.imageHeight && fileMetadata.imageWidth) {
        return layoutMedia(fileMetadata.imageWidth, fileMetadata.imageHeight, maxSize, maxSize);
    }
    return undefined;
}
export class MediaContent extends React.PureComponent<MediaContentProps, { downloadState?: DownloadState }> {
    mounted = false;
    serverDownloadManager = false;
    constructor(props: MediaContentProps) {
        super(props);
        this.state = {};
    }

    private downloadManagerWatch?: WatchSubscription;
    private handlePress = (event: ASPressEvent) => {
        // Ignore clicks for not-downloaded files
        let path = (this.state.downloadState && this.state.downloadState.path) || (this.props.attach && this.props.attach.uri);
        if (path && this.props.attach.fileMetadata.imageHeight && this.props.attach.fileMetadata.imageWidth) {
            let w = this.props.attach.fileMetadata.imageWidth;
            let h = this.props.attach.fileMetadata.imageHeight;

            this.props.onMediaPress({ imageHeight: h, imageWidth: w }, { path, ...event });
        }
    }

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

        if (fileAttach && fileAttach.uri) {
            this.downloadManagerWatch = UploadManagerInstance.watch(this.props.message.key, s => {
                if (this.mounted) {
                    this.setState({ downloadState: { progress: s.progress } })
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
        let fileAttach = this.props.attach;
        return (
            <ASFlex
                flexDirection="column"
                width={this.props.single ? this.props.layout.width : undefined}
                height={this.props.layout.height}
                marginTop={this.props.compensateBubble ? (this.props.single ? -contentInsetsTop : 8) : undefined}
                marginLeft={this.props.compensateBubble ? - contentInsetsHorizontal : undefined}
                marginRight={this.props.compensateBubble ? - contentInsetsHorizontal : undefined}
                marginBottom={this.props.compensateBubble ? - contentInsetsBottom : undefined}
                backgroundColor={!this.props.single ? '#dbdce1' : undefined}
                borderRadius={18}
                alignItems="center"
            >
                <ASImage
                    maxWidth={this.props.layout.width}
                    onPress={this.handlePress}
                    source={{ uri: (fileAttach && fileAttach.uri) ? fileAttach.uri : (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                    isGif={fileAttach!!.fileMetadata.imageFormat === 'GIF'}
                    borderRadius={16}
                    marginLeft={2}
                    marginRight={2}
                    marginTop={2}
                    marginBottom={2}
                    width={this.props.layout.width - 4}
                    height={this.props.layout.height - 4}

                />

                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={8}
                >
                    {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && <ASFlex
                        overlay={true}
                        width={this.props.layout.width}
                        height={this.props.layout.height}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ASFlex
                            backgroundColor="#0008"
                            borderRadius={20}
                        >
                            <ASText color="#fff" opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</ASText>
                        </ASFlex>
                    </ASFlex>}
                </ASFlex>
            </ASFlex>
        )
    }
}