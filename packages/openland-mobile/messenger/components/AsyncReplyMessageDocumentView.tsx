import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASText } from 'react-native-async-view/ASText';
import { formatBytes } from '../../utils/formatBytes';
import { Platform } from 'react-native';
import { DownloadManagerInstance } from '../../../openland-mobile/files/DownloadManager';
import { WatchSubscription } from '../../../openland-y-utils/Watcher';
import { UploadManagerInstance } from '../../files/UploadManager';
import { DownloadState } from '../../files/DownloadManagerInterface';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';

const paddedText = '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }));
const paddedTextOut = '\u00A0'.repeat(Platform.select({ default: 16, ios: 13 }));

interface AsyncReplyMessageDocumentViewProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & { uri?: string };
    parent: DataSourceMessageItem;
    onPress: (document: DataSourceMessageItem) => void;

}

export class AsyncReplyMessageDocumentView extends React.PureComponent<AsyncReplyMessageDocumentViewProps, { downloadState?: DownloadState }> {
    private handlePress = () => {
        this.props.onPress(this.props.message);
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
        return (
            <ASFlex height={40} marginTop={5} flexDirection="row" onPress={this.handlePress}>
                <ASFlex
                    width={40}
                    height={40}
                    backgroundColor={this.props.message.isOut ? 'rgba(0,0,0,0.15)' : 'rgba(185,192,202,0.20)'}
                    opacity={this.props.message.isOut ? 0.15 : 0.2}
                    borderRadius={20}
                    marginLeft={10}
                    marginRight={10}
                    alignItems="center"
                    justifyContent="center"
                >
                    <ASImage
                        source={downloaded ? (this.props.message.isOut ? require('assets/ic-file-white-ios.png') : require('assets/img-file.png')) : (this.props.message.isOut ? require('assets/ic-file-download-out.png') : require('assets/ic-file-download.png'))}
                        width={16}
                        height={20}
                    />
                    {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && <ASFlex
                        backgroundColor="#0008"
                        borderRadius={20}
                        marginTop={10}
                        marginBottom={10}
                        marginLeft={10}
                        marginRight={10}
                        overlay={true}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ASText color="#fff" opacity={0.8} textAlign="center">{Math.round(this.state.downloadState.progress * 100)}</ASText>
                    </ASFlex>}
                </ASFlex>

                <ASFlex
                    flexGrow={1}
                    flexDirection="column"
                    marginBottom={12}
                    marginRight={14}
                >
                    <ASText
                        color={this.props.parent.isOut ? '#ffffff' : '#000000'}
                        height={18}
                        fontSize={15}
                        lineHeight={18}
                        numberOfLines={1}
                    >
                        {this.props.attach!!.fileMetadata.name}{this.props.message.isOut ? paddedTextOut : paddedText}
                    </ASText>
                    <ASText
                        color={this.props.parent.isOut ? '#ffffff' : '#8a8a8f'}
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