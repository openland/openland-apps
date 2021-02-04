import * as React from 'react';
import { DataSourceMessageItem, PendingAttachProps } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { paddedText } from '../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { bubbleMaxWidth } from '../AsyncBubbleView';
import { formatBytes } from 'openland-mobile/utils/formatBytes';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { contentInsetsHorizontal, contentInsetsBottom, contentInsetsTop } from '../AsyncBubbleView';
import { AsyncBubbleMediaView } from '../AsyncBubbleMediaView';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { Platform } from 'react-native';
import { formatDuration } from 'openland-mobile/utils/formatDuration';

const IMAGE_MIN_SIZE = 120;
interface DocumentContentProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & PendingAttachProps;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onLongPress: (event: ASPressEvent) => void;
    compensateBubble?: boolean;
    theme: ThemeGlobal;
}
export class DocumentContent extends React.PureComponent<DocumentContentProps, { downloadState?: DownloadState }> {
    private handlePress = () => {
        this.props.onDocumentPress(this.props.message);
    }

    private downloadManagerWatch?: WatchSubscription;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (this.props.attach.filePreview) {
            return;
        }
        if (this.props.attach && this.props.attach.fileId) {
            this.downloadManagerWatch = DownloadManagerInstance.watch(
                this.props.attach!!.fileId!,
                null,
                (state) => {
                    this.setState({ downloadState: state });
                },
                false);
        }

        if (this.props.attach && this.props.attach.uri && this.props.attach.key) {
            this.downloadManagerWatch = UploadManagerInstance.watch(this.props.attach.key, s => this.setState({ downloadState: { progress: s.progress } }));
        }

    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    render() {
        let { message, onLongPress } = this.props;
        let downloaded = !!(this.state.downloadState && this.state.downloadState.path);

        return (
            <ASFlex
                height={40}
                flexDirection="row"
                onPress={this.handlePress}
                onLongPress={onLongPress}
                marginTop={2}
                marginBottom={1}
                marginLeft={this.props.compensateBubble ? -2 : undefined}
            >
                <ASFlex
                    width={40}
                    height={40}
                    backgroundColor={this.props.theme.overlayLight}
                    opacity={message.isOut ? 0.15 : 0.2}
                    borderRadius={20}
                    marginRight={10}
                    alignItems="center"
                    justifyContent="center"
                >
                    <ASImage
                        source={downloaded ? require('assets/ic-file-white-ios.png') : require('assets/ic-file-download-out.png')}
                        tintColor={this.props.theme.foregroundContrast}
                        width={16}
                        height={20}
                    />
                    {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && <ASFlex
                        width={40}
                        backgroundColor={this.props.theme.backgroundPrimary}
                        borderRadius={20}
                        marginRight={10}
                        overlay={true}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ASText color={this.props.theme.foregroundPrimary} opacity={0.8} textAlign="center">{Math.round(this.state.downloadState.progress * 100)}</ASText>
                    </ASFlex>}
                </ASFlex>

                <ASFlex
                    flexGrow={1}
                    flexDirection="column"
                    marginTop={4}
                    marginRight={14}
                    alignSelf="center"
                >
                    <ASText
                        maxWidth={bubbleMaxWidth - 110}
                        color={message.isOut ? this.props.theme.foregroundContrast : this.props.theme.foregroundPrimary}
                        height={18}
                        fontSize={15}
                        lineHeight={18}
                        numberOfLines={1}
                    >
                        {this.props.attach!!.fileMetadata.name}{paddedText(message.isEdited)}
                    </ASText>
                    <ASText
                        color={message.isOut ? '#ffffff' : '#8a8a8f'}
                        height={15}
                        lineHeight={15}
                        fontSize={13}
                        marginTop={3}
                        numberOfLines={1}
                        opacity={0.7}
                    >
                        {formatBytes(this.props.attach!!.fileMetadata.size)}
                    </ASText>
                </ASFlex>
            </ASFlex>
        );
    }
}

interface DocumentContentPreviewProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & PendingAttachProps;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onLongPress: (event: ASPressEvent) => void;
    compensateBubble?: boolean;
    theme: ThemeGlobal;
    hasTopContent?: boolean;
    hasBottomContent?: boolean;
    layout?: { width: number, height: number };
}

export const DocumentContentPreview = React.memo((props: DocumentContentPreviewProps) => {
    let {
        message,
        attach,
        compensateBubble,
        hasTopContent,
        layout,
        hasBottomContent,
        theme,
        onLongPress,
        onDocumentPress
    } = props;

    let viewWidth = layout ? Math.max(layout.width, IMAGE_MIN_SIZE) : undefined;
    let viewHeight = layout ? Math.max(layout.height, IMAGE_MIN_SIZE) : undefined;
    let handlePress = React.useCallback(() => {
        if (!attach.fileId) {
            return;
        }
        onDocumentPress(message);
    }, [attach.fileId]);
    const [path, setPath] = React.useState<string | undefined>();
    let src = path || attach.filePreview;
    let duration = attach.videoMetadata?.duration;

    React.useEffect(() => {
        if (attach && attach.previewFileId) {
            return DownloadManagerInstance.watch(
                attach.previewFileId,
                null,
                (state) => {
                    if (state.path) {
                        setPath('file://' + state.path);
                    }
                });
        }
        return;
    }, [attach.previewFileId]);

    return (
        <ASFlex
            flexDirection="column"
            onPress={handlePress}
            onLongPress={onLongPress}
            width={viewWidth}
            height={viewHeight}
            alignItems="center"
            justifyContent="center"
            marginTop={compensateBubble ? (hasTopContent ? 0 : -contentInsetsTop) : undefined}
            marginLeft={compensateBubble ? -contentInsetsHorizontal : undefined}
            marginRight={compensateBubble ? -contentInsetsHorizontal : undefined}
            marginBottom={compensateBubble ? (!hasBottomContent ? -contentInsetsBottom : 8) : undefined}
        >
            {src && (
                <ASFlex
                    width={viewWidth}
                    height={viewHeight}
                    alignItems="center"
                    justifyContent="center"
                >
                    <ASImage
                        source={{ uri: src }}
                        width={viewWidth}
                        height={viewHeight}
                    />
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
                            {duration ? (
                                <ASFlex
                                    backgroundColor={theme.overlayMedium}
                                    borderRadius={10}
                                    height={21}
                                    flexDirection="column"
                                >
                                    <ASText
                                        marginLeft={8}
                                        marginRight={8}
                                        color={theme.foregroundContrast}
                                        {...TextStylesAsync.Caption}
                                    >
                                        {formatDuration(duration)}
                                    </ASText>
                                </ASFlex>
                            ) : null}
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
                </ASFlex>
            )}
            {compensateBubble && (
                <ASFlex
                    overlay={true}
                    width={viewWidth}
                    height={viewHeight}
                    alignItems="stretch"
                    {...Platform.OS === 'ios' ? {
                        marginTop: compensateBubble ? (hasTopContent ? 0 : -contentInsetsTop) : undefined,
                        marginLeft: compensateBubble ? -contentInsetsHorizontal : undefined,
                        marginRight: compensateBubble ? -contentInsetsHorizontal : undefined,
                        marginBottom: compensateBubble ? (!hasBottomContent ? -contentInsetsBottom : 8) : undefined,
                    } : {}}
                >
                    <AsyncBubbleMediaView
                        isOut={message.isOut}
                        attachTop={message.attachTop}
                        attachBottom={message.attachBottom}
                        hasTopContent={!!hasTopContent}
                        hasBottomContent={!!hasBottomContent}
                        maskColor={theme.backgroundPrimary}
                        onPress={handlePress}
                        onLongPress={onLongPress}
                        borderColor={theme.border}
                        useBorder={true}
                    />
                </ASFlex>
            )}
        </ASFlex>
    );
});