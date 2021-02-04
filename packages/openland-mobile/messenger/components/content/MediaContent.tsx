import * as React from 'react';
import { DataSourceMessageItem, PendingAttachProps } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { Platform, Dimensions } from 'react-native';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from '../../../files/DownloadManagerInterface';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { contentInsetsHorizontal, contentInsetsBottom, contentInsetsTop } from '../AsyncBubbleView';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { AsyncBubbleMediaView, getPilePosition } from '../AsyncBubbleMediaView';
import { MAX_FILES_PER_MESSAGE } from 'openland-engines/messenger/MessageSender';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';

type AttachType = FullMessage_GeneralMessage_attachments_MessageAttachmentFile & PendingAttachProps;

interface MediaContentProps {
    message: DataSourceMessageItem;
    maxSize: number;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    onLongPress: (e: ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    layout: { width: number, height: number };
    compensateBubble?: boolean;
    theme: ThemeGlobal;
    hasTopContent: boolean;
    hasBottomContent: boolean;
}

export let layoutImage = (fileMetadata?: { imageWidth: number | null, imageHeight: number | null } | null, maxSize?: number) => {
    maxSize = maxSize || Platform.select({
        default: 400,
        ios: Math.min(Dimensions.get('window').width - 120, 400),
        android: Math.min(Dimensions.get('window').width - 120, 400)
    });

    if (fileMetadata && fileMetadata.imageHeight && fileMetadata.imageWidth) {
        return layoutMedia(fileMetadata.imageWidth, fileMetadata.imageHeight, maxSize, maxSize);
    }
    return undefined;
};

export const IMAGE_MIN_SIZE = 120;

export class MediaContent extends React.PureComponent<
    MediaContentProps,
    {
        downloadStates: Record<string, DownloadState>,
        uploadStates: Record<string, DownloadState>
    }
    > {
    mounted = false;
    serverDownloadManager = false;
    constructor(props: MediaContentProps) {
        super(props);
        this.state = {
            downloadStates: {},
            uploadStates: {}
        };
    }

    private downloadManagerWatches?: WatchSubscription[];
    private handlePress = (event: ASPressEvent, fileId: string, radius: number = 18) => {
        const { message, layout, onMediaPress } = this.props;

        const downloadState = this.state.downloadStates[fileId];
        const attachments = this.getFileAttachments();
        const attach = attachments.find(f => f.fileId === fileId);
        // Ignore clicks for not-downloaded files
        let path = (downloadState && downloadState.path) || (attach && attach.uri);
        if (path && attach && attach.fileMetadata.imageHeight && attach.fileMetadata.imageWidth) {
            let w = attach.fileMetadata.imageWidth;
            let h = attach.fileMetadata.imageHeight;
            onMediaPress(
                { imageHeight: h, imageWidth: w },
                {
                    ...event,
                    path,
                    ...attachments.length === 1 ? {
                        // Sorry universe. Try to fix bug with distorted images in animation of ZPictureModal
                        w: layout.width,
                        h: layout.height,
                        x: event.w !== layout.width ? event.x + ((event.w - layout.width) / 2) : event.x,
                        y: event.h !== layout.height ? event.y + ((event.h - layout.height) / 2) : event.y,
                    } : {}
                },
                radius,
                message.sender.name,
                message.date
            );
        }
    }

    bindDownloadManager = () => {
        let fileAttachements = (this.props.message.attachments?.filter(x => x.__typename === 'MessageAttachmentFile') || []) as AttachType[];

        let watches = fileAttachements.map(attach => {
            const isDownloading = attach && attach.fileId && attach!!.fileMetadata.imageWidth!! && attach!!.fileMetadata.imageHeight!!;
            const isUploading = attach && attach.uri && attach.key;
            if (isDownloading) {
                this.serverDownloadManager = true;
                let optimalSize = layoutMedia(attach!!.fileMetadata.imageWidth!!, attach!!.fileMetadata.imageHeight!!, 1024, 1024);
                return DownloadManagerInstance.watch(attach!!.fileId!, (attach!!.fileMetadata.imageFormat !== 'GIF') ? optimalSize : null, (state) => {
                    if (this.mounted) {
                        this.setState(prev => ({ downloadStates: { ...prev.downloadStates, [attach!!.fileId!]: state } }));
                    }
                });
            } else if (isUploading) {
                return UploadManagerInstance.watch(attach!.key!, s => {
                    if (this.mounted) {
                        this.setState(prev => ({
                            uploadStates: {
                                ...prev.uploadStates, [attach!!.key!]: {
                                    progress: s.progress
                                }
                            }
                        }));
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

    componentDidMount() {
        this.mounted = true;
        this.bindDownloadManager();
    }

    componentDidUpdate(prevProps: MediaContentProps) {
        let attachments = this.props.message.attachments;
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

    getFileAttachments() {
        return (this.props.message.attachments?.filter(x => x.__typename === 'MessageAttachmentFile') || []).slice(0, MAX_FILES_PER_MESSAGE) as AttachType[];
    }

    render() {
        const { hasTopContent, hasBottomContent, message, maxSize, layout, compensateBubble, theme, onLongPress } = this.props;
        const noOtherContent = !hasTopContent && !hasBottomContent;
        let fileAttachements = this.getFileAttachments();
        const isSingleImage = fileAttachements.length === 1;

        const viewWidth = isSingleImage && noOtherContent
            ? Math.max(layout.width, IMAGE_MIN_SIZE)
            : maxSize;
        const viewHeight = isSingleImage
            ? Math.max(layout.height, IMAGE_MIN_SIZE)
            : Math.max(Math.min(maxSize, 168), IMAGE_MIN_SIZE);

        const useBorder = isSingleImage
            ? noOtherContent && !!compensateBubble && layout.height >= IMAGE_MIN_SIZE && layout.width >= IMAGE_MIN_SIZE
            : true;

        const bubbleBackgroundSecondary = message.isOut ? theme.outgoingBackgroundSecondary : theme.incomingBackgroundSecondary;
        const hasEmptySpace = isSingleImage && (
            layout.height < IMAGE_MIN_SIZE
            || layout.width < IMAGE_MIN_SIZE
            || layout.height === maxSize && layout.width !== maxSize
            || layout.width === maxSize && layout.height !== maxSize
        );
        let content = fileAttachements
            .reduce((acc, file, i) => {
                let state = this.state.uploadStates[file.key!] || this.state.downloadStates[file.fileId];
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
                const width = isSingleImage
                    ? layout.width
                    : viewWidth / row.length - (row.length === 2 ? 1 : 0);
                return (
                    <ASFlex
                        key={column.length + columnIndex}
                        maxWidth={width}
                        width={width}
                        marginLeft={columnIndex === 1 ? 2 : 0}
                        flexDirection="column"
                    >
                        {column.map(({ file, uri }, rowIndex) => {
                            const height = isSingleImage
                                ? layout.height
                                : viewHeight / column.length - (column.length === 2 ? 1 : 0);
                            let position = getPilePosition(fileAttachements.length, rowIndex, columnIndex);
                            let state = this.state.uploadStates[file.key!] || this.state.downloadStates[file.fileId];
                            let hasNoRadius = hasTopContent && position && ['tl', 'tr'].includes(position)
                                || hasBottomContent && position && ['bl', 'br'].includes(position)
                                || hasTopContent && hasBottomContent;
                            let isGif = file.fileMetadata.imageFormat === 'GIF';
                            const loadingOverlay = state && state.progress !== undefined && state.progress < 1 && !state.path ? (
                                <ASFlex
                                    overlay={true}
                                    width={width}
                                    height={height}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <ASFlex
                                        backgroundColor={theme.backgroundPrimary}
                                        borderRadius={20}
                                    >
                                        <ASText color={theme.foregroundPrimary} opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(state.progress * 100)}</ASText>
                                    </ASFlex>
                                </ASFlex>
                            ) : null;
                            let gifOverlay = isGif ? (
                                <ASFlex
                                    overlay={true}
                                    flexGrow={1}
                                    flexDirection="column"
                                    alignItems="stretch"
                                >
                                    <ASFlex
                                        marginTop={8}
                                        marginLeft={8}
                                    >
                                        <ASFlex
                                            backgroundColor={theme.overlayMedium}
                                            borderRadius={10}
                                            height={21}
                                        >
                                            <ASText
                                                marginLeft={8}
                                                marginRight={8}
                                                color={theme.foregroundContrast}
                                                {...TextStylesAsync.Caption}
                                            >
                                                GIF
                                            </ASText>
                                        </ASFlex>
                                    </ASFlex>
                                    <ASFlex
                                        flexGrow={1}
                                        justifyContent="center"
                                        alignItems="center"
                                        marginBottom={28}
                                    >
                                        <ASFlex
                                            width={48}
                                            height={48}
                                            justifyContent="center"
                                            alignItems="center"
                                            backgroundColor={theme.overlayMedium}
                                            borderRadius={24}
                                        >
                                            <ASImage width={24} height={24} source={require('assets/ic-play-glyph-24.png')} tintColor={theme.foregroundContrast} />
                                        </ASFlex>
                                    </ASFlex>
                                </ASFlex>
                            ) : null;

                            return (
                                <ASFlex
                                    key={file.fileId + uri + file.key}
                                    maxWidth={width}
                                    width={width}
                                    height={height}
                                    justifyContent="center"
                                    alignItems="center"
                                    marginTop={rowIndex === 1 ? 2 : 0}
                                >
                                    <ASFlex
                                        maxWidth={width}
                                        width={width}
                                        height={height}
                                    >
                                        <ASImage
                                            key={file.fileId}
                                            source={{ uri }}
                                            isGif={file.fileMetadata.imageFormat === 'GIF'}
                                            maxWidth={width}
                                            width={width}
                                            height={height}
                                        />
                                        {loadingOverlay ? (
                                            <ASFlex
                                                overlay={true}
                                                alignItems="flex-end"
                                                justifyContent="flex-end"
                                            >
                                                {loadingOverlay}
                                            </ASFlex>
                                        ) : isGif ? (
                                            gifOverlay
                                        ) : null}
                                    </ASFlex>
                                    {compensateBubble && !hasEmptySpace && (
                                        <ASFlex
                                            overlay={true}
                                            width={width}
                                            height={height}
                                            alignItems="stretch"
                                        >
                                            <AsyncBubbleMediaView
                                                isOut={message.isOut}
                                                attachTop={message.attachTop}
                                                attachBottom={message.attachBottom}
                                                hasTopContent={hasTopContent}
                                                hasBottomContent={hasBottomContent}
                                                maskColor={theme.backgroundPrimary}
                                                onPress={e => this.handlePress(e, file.fileId, hasNoRadius ? 0 : undefined)}
                                                onLongPress={onLongPress}
                                                borderColor={theme.border}
                                                useBorder={useBorder}
                                                pilePosition={position}
                                            />
                                        </ASFlex>
                                    )}
                                </ASFlex>
                            );
                        })}
                    </ASFlex>
                );
            });

        return (
            <ASFlex
                width={viewWidth}
                height={viewHeight}
                marginTop={compensateBubble ? (hasTopContent ? 0 : -contentInsetsTop) : undefined}
                marginLeft={compensateBubble ? -contentInsetsHorizontal : undefined}
                marginRight={compensateBubble ? -contentInsetsHorizontal : undefined}
                marginBottom={compensateBubble ? (noOtherContent || !hasBottomContent ? -contentInsetsBottom : 8) : undefined}
                backgroundColor={noOtherContent ? theme.backgroundTertiary : bubbleBackgroundSecondary}
                alignItems="center"
                justifyContent="center"
                onLongPress={Platform.OS === 'android' ? onLongPress : undefined}
            >
                <ASFlex
                    width={viewWidth}
                    height={viewHeight}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    {content}
                    {compensateBubble && hasEmptySpace && (
                        <ASFlex
                            overlay={true}
                            width={viewWidth}
                            height={viewHeight}
                            alignItems="stretch"
                        >
                            <AsyncBubbleMediaView
                                isOut={message.isOut}
                                attachTop={message.attachTop}
                                attachBottom={message.attachBottom}
                                hasTopContent={hasTopContent}
                                hasBottomContent={hasBottomContent}
                                maskColor={theme.backgroundPrimary}
                                onPress={e => this.handlePress(e, fileAttachements[0]?.fileId)}
                                onLongPress={onLongPress}
                                borderColor={theme.border}
                                useBorder={useBorder}
                            />
                        </ASFlex>
                    )}
                </ASFlex>
            </ASFlex>
        );
    }
}