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
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

export interface AsyncMessageMediaViewProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    onPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
    isForward?: boolean;
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
            this.props.onPress({ imageHeight: h, imageWidth: w }, { path: this.state.downloadState.path, ...event }, radius, this.props.message.sender.name, this.props.message.date);
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
        const { theme, attach, message, isForward } = this.props;
        let layout = isForward ? layoutMedia(this.props.attach!!.fileMetadata.imageWidth || 0, this.props.attach!!.fileMetadata.imageHeight || 0, 160, 160) : { width: 40, height: 40 };
        let sourceUri = (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined;
        let bgColor = message.isOut ? theme.outgoingForegroundTertiary : theme.incomingForegroundTertiary;
        let sizes = { width: layout.width, height: layout.height };
        const resolved = Image.resolveAssetSource(require('assets/bg-shared-link-border.png'));
        const capInsets = { top: 12, right: 12, bottom: 12, left: 12 };
        const bgPatch = !isForward ? {
            backgroundPatch: {
                source: resolved.uri,
                scale: resolved.scale,
                ...capInsets
            },
            backgroundPatchTintColor: theme.borderLight,
        } : {};
        return (
            <ASFlex
                borderRadius={8}
                alignItems="center"
                marginTop={isForward ? 5 : undefined}
                marginLeft={isForward ? 9 : undefined}
                {...sizes}
                {...bgPatch}
            >
                <ASImage
                    onPress={(e) => this.handlePress(e, 8)}
                    source={{ uri: sourceUri }}
                    borderRadius={8}
                    backgroundColor={bgColor}
                    isGif={attach!!.fileMetadata.imageFormat === 'GIF'}
                    {...sizes}
                />
            </ASFlex>
        );
    }
}