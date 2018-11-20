import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASText } from 'react-native-async-view/ASText';
import { formatBytes } from '../../utils/formatBytes';
import { formatTime } from '../../utils/formatTime';
import { Platform } from 'react-native';
import { DownloadManagerInstance } from '../../../openland-mobile/files/DownloadManager';
import { WatchSubscription } from '../../../openland-y-utils/Watcher';
import { UploadManagerInstance } from '../../files/UploadManager';
import { DownloadState } from 'openland-mobile/utils/DownloadManagerInterface';

const paddedText = '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }));
const paddedTextOut = '\u00A0'.repeat(Platform.select({ default: 16, ios: 13 }));

export class AsyncMessageDocumentView extends React.PureComponent<{ message: DataSourceMessageItem, onPress: (document: DataSourceMessageItem) => void }, { downloadState?: DownloadState }> {
    private handlePress = () => {
        this.props.onPress(this.props.message);
    }

    private downloadManagerWatch?: WatchSubscription;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (this.props.message.file && this.props.message.file.fileId) {
            this.downloadManagerWatch = DownloadManagerInstance.watch(
                this.props.message.file!!.fileId!,
                null,
                (state) => {
                    this.setState({ downloadState: state });
                },
                false);
        }

        if (this.props.message.file && this.props.message.file.uri) {
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
            <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom}>
                <ASFlex height={60} flexDirection="row" onPress={this.handlePress}>
                    <ASFlex
                        width={40}
                        height={40}
                        backgroundColor={this.props.message.isOut ? '#5555ea' : 'rgba(224, 227, 231, 0.5)'}
                        borderRadius={20}
                        marginLeft={10}
                        marginTop={10}
                        marginBottom={10}
                        marginRight={10}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ASImage
                            source={downloaded ? require('assets/img-file.png') : this.props.message.isOut ? require('assets/ic-file-download-out.png') : require('assets/ic-file-download.png')}
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
                        marginTop={12}
                        marginBottom={12}
                        marginRight={14}
                        alignSelf="center"
                    >
                        <ASText
                            color={this.props.message.isOut ? '#ffffff' : '#000000'}
                            height={18}
                            fontSize={15}
                            lineHeight={18}
                            numberOfLines={1}
                        >
                            {this.props.message.file!!.fileName}{this.props.message.isOut ? paddedTextOut : paddedText}
                        </ASText>
                        <ASText
                            color={this.props.message.isOut ? '#ffffff' : '#8a8a8f'}
                            height={15}
                            lineHeight={15}
                            fontSize={13}
                            marginTop={3}
                            numberOfLines={1}
                            opacity={0.7}
                        >
                            {formatBytes(this.props.message.file!!.fileSize)}
                        </ASText>
                    </ASFlex>
                </ASFlex>
                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={this.props.message.isOut ? 10 : 12}
                    marginBottom={10}
                >
                    <ASFlex
                        flexDirection="row"
                        height={14}
                    >
                        <ASText
                            fontSize={11}
                            lineHeight={13}
                            color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                            opacity={this.props.message.isOut ? 0.7 : 0.6}
                        >
                            {formatTime(this.props.message.date)}
                        </ASText>
                        {this.props.message.isOut && (
                            <ASFlex width={18} height={13} marginLeft={2} marginTop={1} justifyContent="flex-start" alignItems="center">
                                {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </AsyncBubbleView>
        );
    }
}