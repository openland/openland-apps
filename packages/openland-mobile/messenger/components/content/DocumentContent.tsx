
import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { bubbleMaxWidth } from '../AsyncBubbleView';
import { formatBytes } from 'openland-mobile/utils/formatBytes';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { AppTheme } from 'openland-mobile/themes/themes';
interface DocumentContentProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    compensateBubble?: boolean;
    theme: AppTheme;
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
        if (this.props.attach && this.props.attach.fileId) {
            this.downloadManagerWatch = DownloadManagerInstance.watch(
                this.props.attach!!.fileId!,
                null,
                (state) => {
                    this.setState({ downloadState: state });
                },
                false);
        }

        if (this.props.attach && this.props.attach.uri) {
            this.downloadManagerWatch = UploadManagerInstance.watch(this.props.message.key, s => this.setState({ downloadState: { progress: s.progress } }));
        }

    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }
    render() {
        let { message } = this.props;
        let downloaded = !!(this.state.downloadState && this.state.downloadState.path);

        return (
            <ASFlex
                height={40}
                flexDirection="row"
                onPress={this.handlePress}
                marginTop={2}
                marginBottom={1}
                marginLeft={this.props.compensateBubble ? -2 : undefined}
            >

                <ASFlex
                    width={40}
                    height={40}
                    backgroundColor={message.isOut ? 'rgba(0,0,0,0.15)' : 'rgba(185,192,202,0.20)'}
                    opacity={message.isOut ? 0.15 : 0.2}
                    borderRadius={20}

                    marginRight={10}
                    alignItems="center"
                    justifyContent="center"
                >
                    <ASImage
                        source={downloaded ? (message.isOut ? require('assets/ic-file-white-ios.png') : require('assets/img-file.png')) : (message.isOut ? require('assets/ic-file-download-out.png') : require('assets/ic-file-download.png'))}
                        width={16}
                        height={20}
                    />
                    {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && <ASFlex
                        width={40}
                        backgroundColor={this.props.theme.backgroundColor}
                        borderRadius={20}
                        marginRight={10}
                        overlay={true}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ASText color={this.props.theme.textColor} opacity={0.8} textAlign="center">{Math.round(this.state.downloadState.progress * 100)}</ASText>
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
                        color={message.isOut ? this.props.theme.textColorOut : this.props.theme.textColor}
                        height={18}
                        fontSize={15}
                        lineHeight={18}
                        numberOfLines={1}
                    >
                        {this.props.attach!!.fileMetadata.name}{message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited)}
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
        )
    }
}