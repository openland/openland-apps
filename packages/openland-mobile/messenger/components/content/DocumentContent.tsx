
import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { preprocessSpans } from 'openland-y-utils/SpansProcessor';
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

        let preprocessed = preprocessSpans(this.props.message.text || '', []);
        let big = false;
        if (message.text) {
            big = message.text.length <= 3 && message.text.search(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) !== -1;
            big = big || (message.text.length <= 302 && message.text.startsWith(':') && message.text.endsWith(':'));
        }

        let parts = preprocessed.map((p, i) => renderPreprocessedText(p, i, message, this.props.theme, this.props.onUserPress, this.props.onGroupPress));
        if (message.title) {
            parts.unshift(<ASText key={'br-title'} >{'\n'}</ASText>);
            parts.unshift(<ASText key={'text-title'} fontWeight={Platform.select({ ios: '600', android: '500' })}>{message.title}</ASText>);
        }

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
                        color={this.props.theme.textSecondaryColor}
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