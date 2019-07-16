import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { Platform, Dimensions } from 'react-native';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from '../../../files/DownloadManagerInterface';
import { layoutMedia } from '../../../../openland-web/utils/MediaLayout';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from '../../../files/DownloadManager';
import { contentInsetsHorizontal, contentInsetsBottom, contentInsetsTop } from '../AsyncBubbleView';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { AsyncBubbleMediaView } from '../AsyncBubbleMediaView';

interface MediaContentProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    layout: { width: number, height: number };
    compensateBubble?: boolean;
    theme: ThemeGlobal;
    hasTopContent: boolean;
    hasBottomContent: boolean;
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
};
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

            this.props.onMediaPress({ imageHeight: h, imageWidth: w }, { path, ...event }, undefined, this.props.message.senderName, this.props.message.date);
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
                    this.setState({ downloadState: { progress: s.progress } });
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
        const { hasTopContent, hasBottomContent, message, attach, onUserPress, onGroupPress, onMediaPress, onDocumentPress, layout, compensateBubble, theme } = this.props;
        const { downloadState } = this.state;
        const isSingle = !hasTopContent && !hasBottomContent;

        return (
            <ASFlex
                flexDirection="column"
                width={isSingle ? layout.width : undefined}
                height={layout.height}
                marginTop={compensateBubble ? (hasTopContent ? 0 : -contentInsetsTop) : undefined}
                marginLeft={compensateBubble ? -contentInsetsHorizontal : undefined}
                marginRight={compensateBubble ? -contentInsetsHorizontal : undefined}
                marginBottom={compensateBubble ? (isSingle || !hasBottomContent ? -contentInsetsBottom : 8) : undefined}
                backgroundColor={theme.backgroundTertiary}
                alignItems="center"
            >
                <ASFlex>
                    <ASImage
                        key={'media-' + attach.id}
                        maxWidth={layout.width}
                        source={{ uri: (attach && attach.uri) ? attach.uri : (downloadState && downloadState.path) ? ('file://' + downloadState.path) : undefined }}
                        isGif={attach!!.fileMetadata.imageFormat === 'GIF'}
                        width={layout.width}
                        height={layout.height}
                        onPress={this.handlePress}
                    />

                    <ASFlex
                        overlay={true}
                        alignItems="flex-end"
                        justifyContent="flex-end"
                        marginRight={8}
                    >
                        {downloadState && downloadState.progress !== undefined && downloadState.progress < 1 && !downloadState.path && <ASFlex
                            overlay={true}
                            width={layout.width}
                            height={layout.height}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <ASFlex
                                backgroundColor={theme.backgroundPrimary}
                                borderRadius={20}
                            >
                                <ASText color={theme.foregroundPrimary} opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(downloadState.progress * 100)}</ASText>
                            </ASFlex>
                        </ASFlex>}
                    </ASFlex>
                </ASFlex>

                {compensateBubble && (
                    <ASFlex
                        overlay={true}
                        width={isSingle ? layout.width : undefined}
                        height={layout.height}
                        marginTop={Platform.OS === 'ios' ? (hasTopContent ? 0 : -contentInsetsTop) : undefined}
                        marginLeft={Platform.OS === 'ios' ? -contentInsetsHorizontal : undefined}
                        marginRight={Platform.OS === 'ios' ? -contentInsetsHorizontal : undefined}
                        marginBottom={Platform.OS === 'ios' ? (isSingle || !hasBottomContent ? -contentInsetsBottom : 8) : undefined}
                        alignItems="stretch"
                    >
                        <AsyncBubbleMediaView
                            isOut={message.isOut}
                            attachTop={message.attachTop}
                            attachBottom={message.attachBottom}
                            hasTopContent={hasTopContent}
                            hasBottomContent={hasBottomContent}
                            maskColor={theme.backgroundPrimary}
                            borderColor={theme.overlayInverted}
                            onPress={Platform.OS === 'ios' ? this.handlePress : undefined}
                        />
                    </ASFlex>
                )}
            </ASFlex>
        );
    }
}