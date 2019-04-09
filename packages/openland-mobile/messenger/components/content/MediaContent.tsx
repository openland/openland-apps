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
import { MediaContentAsyncRender } from './renders/MediaContentAsyncRender';

interface MediaContentProps {
    single?: boolean;
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    layout: { width: number, height: number },
    compensateBubble?: boolean;
    useAsync: boolean;
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
            this.downloadManagerWatch = DownloadManagerInstance.watch(fileAttach!!.fileId!, (fileAttach!!.fileMetadata.imageFormat !== 'gif') ? optimalSize : null, (state) => {
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
        return this.props.useAsync ? (
            <MediaContentAsyncRender
                layout={this.props.layout}
                downloadProgress={(this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path) ? this.state.downloadState.progress : undefined}
                compensateBubble={this.props.compensateBubble}
                single={this.props.single}
                imageSource={{ uri: (fileAttach && fileAttach.uri) ? fileAttach.uri : (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                fileMetadata={this.props.attach.fileMetadata}
                handlePress={this.handlePress}
            />
        ) : undefined;
    }
}