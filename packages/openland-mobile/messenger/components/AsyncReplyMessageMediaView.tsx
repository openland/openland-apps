import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadManagerInstance } from '../../files/DownloadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { layoutMedia } from '../../../openland-web/utils/MediaLayout';
import { DownloadState } from '../../files/DownloadManagerInterface';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';

export interface AsyncMessageMediaViewProps {
    message: DataSourceMessageItem;
    onPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number) => void;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
}

export class AsyncReplyMessageMediaView extends React.PureComponent<AsyncMessageMediaViewProps, { downloadState?: DownloadState }> {

    private downloadManagerWatch?: WatchSubscription;

    constructor(props: AsyncMessageMediaViewProps) {
        super(props);
        this.state = {};
    }

    private handlePress = (event: ASPressEvent, radius?: number) => {
        // Ignore clicks for not-downloaded files
        if (this.state.downloadState && this.state.downloadState.path && this.props.attach.fileMetadata.imageHeight && this.props.attach.fileMetadata.imageWidth) {
            let w = this.props.attach.fileMetadata.imageWidth;
            let h = this.props.attach.fileMetadata.imageHeight;
            this.props.onPress({ imageHeight: h, imageWidth: w }, { path: this.state.downloadState.path, ...event }, radius);
        }
    }

    componentWillMount() {
        let optimalSize = layoutMedia(this.props.attach!!.fileMetadata.imageWidth || 0, this.props.attach!!.fileMetadata.imageHeight || 0, 1024, 1024);
        this.downloadManagerWatch = DownloadManagerInstance.watch(this.props.attach!!.fileId!, (this.props.attach!!.fileMetadata.mimeType !== 'gif') ? optimalSize : null, (state) => {
            this.setState({ downloadState: state });
        });
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    render() {
        let maxSize = 100;
        let layout = layoutMedia(this.props.attach!!.fileMetadata.imageWidth || 0, this.props.attach!!.fileMetadata.imageHeight || 0, maxSize, maxSize);
        return (
            <ASFlex width={layout.width} height={layout.height} marginLeft={10} marginTop={5} marginRight={7}>
                <ASImage
                    source={{ uri: (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                    width={layout.width}
                    height={layout.height}
                    isGif={this.props.attach!!.fileMetadata.imageFormat === 'gif'}
                    onPress={(e) => this.handlePress(e, 0)}
                />

            </ASFlex>
        );
    }
}