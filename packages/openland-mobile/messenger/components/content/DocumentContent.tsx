
import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { Platform, Text, TextStyle } from 'react-native';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { renderPreprocessedText } from '../AsyncMessageContentView';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { UploadManagerInstance } from 'openland-mobile/files/UploadManager';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { DocumentContentAsyncRender } from './renders/DocumentContentAsyncRender';
import { DocumentContentRender } from './renders/DocumentContentRender';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface DocumentContentProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    compensateBubble?: boolean;
    useAsync: boolean;
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
        let downloaded = !!(this.state.downloadState && this.state.downloadState.path);

        let preprocessed = preprocessText(this.props.message.text || '', []);
        let big = false;
        if (this.props.message.text) {
            big = this.props.message.text.length <= 3 && this.props.message.text.search(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) !== -1;
            big = big || (this.props.message.text.length <= 302 && this.props.message.text.startsWith(':') && this.props.message.text.endsWith(':'));
        }

        let parts = preprocessed.map((p, i) => renderPreprocessedText(p, i, this.props.message, this.props.onUserPress, this.props.useAsync));
        if (this.props.message.title) {
            if (this.props.useAsync) {
                parts.unshift(<ASText key={'br-title'} >{'\n'}</ASText>);
                parts.unshift(<ASText key={'text-title'} fontWeight={Platform.select({ ios: '600', android: '500' })}>{this.props.message.title}</ASText>);
            } else {
                parts.unshift(<Text key={'br-title'} >{'\n'}</Text>);
                parts.unshift(<Text key={'text-title'} style={{ fontWeight: TextStyles.weight.medium } as TextStyle}>{this.props.message.title}</Text>);
            }
        }

        let isOut = this.props.message.isOut;

        return this.props.useAsync ? (
            <DocumentContentAsyncRender
                handlePress={this.handlePress}
                compensateBubble={this.props.compensateBubble}
                isOut={isOut}
                imageSource={downloaded ? (isOut ? require('assets/ic-file-white-ios.png') : require('assets/img-file.png')) : (isOut ? require('assets/ic-file-download-out.png') : require('assets/ic-file-download.png'))}
                downloadProgress={(this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path) ? this.state.downloadState.progress : undefined}
                fileMetadata={this.props.attach!!.fileMetadata}
            />
        ) : (
            <DocumentContentRender
                handlePress={this.handlePress}
                compensateBubble={this.props.compensateBubble}
                isOut={isOut}
                imageSource={downloaded ? (isOut ? require('assets/ic-file-white-ios.png') : require('assets/img-file.png')) : (isOut ? require('assets/ic-file-download-out.png') : require('assets/ic-file-download.png'))}
                downloadProgress={(this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path) ? this.state.downloadState.progress : undefined}
                fileMetadata={this.props.attach!!.fileMetadata}
            />
        );
    }
}