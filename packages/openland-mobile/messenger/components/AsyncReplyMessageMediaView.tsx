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
import { isVideo } from 'openland-mobile/utils/mediaExtension';

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
        let state = this.state.downloadStates[attach.previewFileId || attach.fileId];
        let w = attach.previewFileMetadata?.imageWidth || attach.fileMetadata.imageWidth;
        let h = attach.previewFileMetadata?.imageHeight || attach.fileMetadata.imageHeight;
        // Ignore clicks for not-downloaded files
        if (state && state.path && w && h) {
            this.props.onPress({ imageHeight: h, imageWidth: w }, { path: state.path, ...event }, radius, this.props.message.sender.name, this.props.message.date);
        }
    }

    componentWillMount() {
        this.props.attachments.forEach(attach => {
            if (isVideo(attach.fileMetadata.name) && attach.previewFileId) {
                let size = attach.previewFileMetadata ?
                    layoutMedia(attach.previewFileMetadata.imageWidth || 0, attach.previewFileMetadata.imageHeight || 0, 1024, 1024)
                    : null;

                this.downloadManagerWatch = DownloadManagerInstance.watch(attach.previewFileId!, size, (state) => {
                    this.setState(prev => ({ downloadStates: { ...prev.downloadStates, [attach.previewFileId!]: state } }));
                });
                return;
            }
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
                    let state = this.state.downloadStates[attach.previewFileId || attach.fileId];
                    let sourceUri = state && state.path ? ('file://' + state.path) : undefined;
                    let sizes = { width: layout.width, height: layout.height };
                    let isVideoFile = isVideo(attach.fileMetadata.name);

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
                                source={{ uri: sourceUri || attach.filePreview }}
                                borderRadius={8}
                                backgroundColor={bgColor}
                                isGif={attach!!.fileMetadata.imageFormat === 'GIF'}
                                {...sizes}
                            />
                            {isVideoFile && (
                                <ASFlex
                                    flexGrow={1}
                                    justifyContent="center"
                                    alignItems="center"
                                    overlay={true}
                                >
                                    <ASFlex
                                        width={isForward ? 36 : 20}
                                        height={isForward ? 36 : 20}
                                        justifyContent="center"
                                        alignItems="center"
                                        backgroundColor={theme.overlayMedium}
                                        borderRadius={isForward ? 18 : 10}
                                    >
                                        <ASImage width={isForward ? 18 : 10} height={isForward ? 18 : 10} source={require('assets/ic-play-glyph-24.png')} tintColor={theme.foregroundContrast} />
                                    </ASFlex>
                                </ASFlex>
                            )}
                        </ASFlex>
                    );
                })}
            </ASFlex>
        );
    }
}