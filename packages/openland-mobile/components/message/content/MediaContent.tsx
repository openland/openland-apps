import * as React from 'react';
import { View, Text } from 'react-native';
import { DownloadState } from '../../../files/DownloadManagerInterface';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage } from 'openland-api/spacex.types';
import FastImage from 'react-native-fast-image';
import { PreviewWrapper } from './PreviewWrapper';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { MAX_FILES_PER_MESSAGE } from 'openland-engines/messenger/MessageSender';
import { PendingAttachProps } from 'openland-engines/messenger/ConversationEngine';
import { layoutImage, IMAGE_MIN_SIZE } from 'openland-mobile/messenger/components/content/MediaContent';

type AttachType = FullMessage_GeneralMessage_attachments_MessageAttachmentFile & PendingAttachProps;

interface MediaContentProps {
    message: FullMessage_GeneralMessage;
    theme: ThemeGlobal;
    maxWidth: number;
}

export class MediaContent extends React.PureComponent<MediaContentProps, { downloadStates: DownloadState }> {
    mounted = false;
    serverDownloadManager = false;
    constructor(props: MediaContentProps) {
        super(props);
        this.state = {
            downloadStates: {},
        };
    }

    private downloadManagerWatches?: WatchSubscription[];

    bindDownloadManager = () => {
        let fileAttachements = this.getFileAttachments();

        let watches = fileAttachements.map(attach => {
            const isDownloading = attach && attach.fileId && attach!!.fileMetadata.imageWidth!! && attach!!.fileMetadata.imageHeight!!;
            if (isDownloading) {
                this.serverDownloadManager = true;
                let optimalSize = layoutMedia(attach!!.fileMetadata.imageWidth!!, attach!!.fileMetadata.imageHeight!!, 1024, 1024);
                return DownloadManagerInstance.watch(attach!!.fileId!, (attach!!.fileMetadata.imageFormat !== 'GIF') ? optimalSize : null, (state) => {
                    if (this.mounted) {
                        this.setState(prev => ({ downloadStates: { ...prev.downloadStates, [attach!!.fileId!]: state } }));
                    }
                });
            }
            return null;
        }).filter(Boolean) as WatchSubscription[];
        this.downloadManagerWatches = watches;
    }

    unbindDownloadManager = () => {
        if (this.downloadManagerWatches) {
            this.downloadManagerWatches.forEach(f => f());
        }
    }

    getFileAttachments(): AttachType[] {
        return (this.props.message.attachments?.filter(x => x.__typename === 'MessageAttachmentFile') || []).slice(0, MAX_FILES_PER_MESSAGE) as AttachType[];
    }

    componentDidMount() {
        this.mounted = true;
        this.bindDownloadManager();
    }

    componentDidUpdate(prevProps: MediaContentProps) {
        let { attachments } = this.props.message;
        let prevAttachments = prevProps.message.attachments;

        if (attachments !== prevAttachments && !this.serverDownloadManager) {
            this.unbindDownloadManager();
            this.bindDownloadManager();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.unbindDownloadManager();
    }

    render() {
        const { theme, message, maxWidth } = this.props;
        const maxHeight = maxWidth / 1.6;
        const attachments = this.getFileAttachments();
        const layout = layoutImage(attachments[0].fileMetadata, maxWidth);
        let wrapperWidth = attachments.length === 1 ? Math.max(layout?.width || maxWidth, IMAGE_MIN_SIZE) : maxWidth;
        let wrapperHeight = attachments.length === 1 ? Math.max(layout?.height || maxHeight, IMAGE_MIN_SIZE) : maxHeight;
        let content = this.getFileAttachments()
            .reduce((acc, file, i) => {
                let state = this.state.downloadStates[file.fileId];
                let path = state && state.path;
                let el = { file, uri: path ? ('file://' + path) : file.uri };

                if (acc.length < 2) {
                    acc.push([el]);
                } else if (i === 2) {
                    acc[1].push(el);
                } else if (i === 3) {
                    let prevLast = acc[1].pop();
                    acc[0].push(prevLast!);
                    acc[1].push(el);
                }
                return acc;
            }, [] as { file: AttachType, uri: string | undefined }[][])
            .map((column, columnIndex, row) => {
                return (
                    <View
                        key={columnIndex}
                        style={{
                            flexDirection: 'column',
                            marginLeft: columnIndex === 1 ? 2 : 0
                        }}
                    >
                        {column.map(({ file, uri }, rowIndex) => {
                            let width = attachments.length === 1
                                ? layout?.width || maxWidth
                                : (maxWidth / row.length - (row.length === 2 ? 1 : 0));
                            let height = attachments.length === 1
                                ? layout?.height || maxWidth
                                : (maxHeight / column.length - (column.length === 2 ? 1 : 0));
                            let state = this.state.downloadStates[file.fileId];

                            return (
                                <View
                                    key={file.id || file.fileId || file.key}
                                    style={{
                                        width,
                                        height,
                                        marginTop: rowIndex === 1 ? 2 : 0
                                    }}
                                >
                                    <PreviewWrapper
                                        path={uri}
                                        width={file.fileMetadata.imageWidth}
                                        height={file.fileMetadata.imageHeight}
                                        radius={18}
                                        senderName={message.sender.name}
                                        date={message.date}
                                        crossFade={attachments.length > 1}
                                    >
                                        <FastImage
                                            style={{ width: width, height: height }}
                                            source={{ uri: uri, priority: 'normal', ...{ disableAnimations: true } as any }}
                                        />
                                    </PreviewWrapper>

                                    {state && state.progress !== undefined && state.progress < 1 && !state.path && (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#0008',
                                                borderRadius: 8,
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0
                                            }}
                                        >
                                            <Text style={{ color: '#fff', opacity: 0.8, marginLeft: 20, marginTop: 20, marginRight: 20, marginBottom: 20, textAlign: 'center' }} allowFontScaling={false}>{'Loading ' + Math.round(state.progress * 100)}</Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                );
            });

        return (
            <View
                style={{
                    backgroundColor: theme.incomingBackgroundPrimary,
                    borderRadius: 18,
                    overflow: 'hidden',
                    marginVertical: 5,
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    height: wrapperHeight,
                    width: wrapperWidth,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {content}
            </View>
        );
    }
}