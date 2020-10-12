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
    attachments: (FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string })[];
    isForward?: boolean;
}

export class AsyncReplyMessageMediaView extends React.PureComponent<AsyncMessageMediaViewProps, { downloadStates: DownloadState }> {

    private downloadManagerWatch?: WatchSubscription;

    constructor(props: AsyncMessageMediaViewProps) {
        super(props);
        this.state = {
            downloadStates: {},
        };
    }

    private handlePress = (event: ASPressEvent, fileId: string, radius?: number) => {
        let attach = this.props.attachments.find(x => x.fileId === fileId);
        if (!attach) {
            return;
        }
        let state = this.state.downloadStates[attach.fileId];
        // Ignore clicks for not-downloaded files
        if (state && state.path && attach.fileMetadata.imageHeight && attach.fileMetadata.imageWidth) {
            let w = attach.fileMetadata.imageWidth;
            let h = attach.fileMetadata.imageHeight;
            this.props.onPress({ imageHeight: h, imageWidth: w }, { path: state.path, ...event }, radius, this.props.message.sender.name, this.props.message.date);
        }
    }

    componentWillMount() {
        this.props.attachments.forEach(attach => {
            let optimalSize = layoutMedia(attach.fileMetadata.imageWidth || 0, attach.fileMetadata.imageHeight || 0, 1024, 1024);
            this.downloadManagerWatch = DownloadManagerInstance.watch(attach.fileId!, (attach.fileMetadata.mimeType !== 'gif') ? optimalSize : null, (state) => {
                this.setState(prev => ({ downloadStates: { ...prev.downloadStates, [attach.fileId]: state } }));
            });
        });
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    render() {
        const { theme, message, isForward } = this.props;
        let bgColor = message.isOut ? theme.outgoingForegroundTertiary : theme.incomingForegroundTertiary;
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
        let attachments = isForward ? this.props.attachments : this.props.attachments.slice(0, 1);
        return (
            <ASFlex
                marginLeft={isForward ? 9 : undefined}
                flexDirection="column"
            >
                {attachments.map((attach, i) => {
                    let layout = isForward ? layoutMedia(attach!!.fileMetadata.imageWidth || 0, attach!!.fileMetadata.imageHeight || 0, 160, 160) : { width: 40, height: 40 };
                    let state = this.state.downloadStates[attach.fileId];
                    let sourceUri = state && state.path ? ('file://' + state.path) : undefined;
                    let sizes = { width: layout.width, height: layout.height };

                    return (
                        <ASFlex
                            key={i}
                            borderRadius={8}
                            alignItems="center"
                            marginTop={isForward ? 5 : undefined}
                            {...sizes}
                            {...bgPatch}
                        >
                            <ASImage
                                onPress={(e) => this.handlePress(e, attach.fileId, 8)}
                                source={{ uri: sourceUri }}
                                borderRadius={8}
                                backgroundColor={bgColor}
                                isGif={attach!!.fileMetadata.imageFormat === 'GIF'}
                                {...sizes}
                            />
                        </ASFlex>
                    );
                })}
            </ASFlex>
        );
    }
}