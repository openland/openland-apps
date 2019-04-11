
import * as React from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage } from 'openland-api/Types';

interface DocumentContentProps {
    message: FullMessage_GeneralMessage;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;

    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export class DocumentContent extends React.PureComponent<DocumentContentProps, { downloadState?: DownloadState }> {
    private downloadManagerWatch?: WatchSubscription;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (this.props.attach && this.props.attach.fileId) {
            this.downloadManagerWatch = DownloadManagerInstance.watch(this.props.attach!!.fileId!, null, (state) => { this.setState({ downloadState: state }); }, false);
        }
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    handlePress = () => {
        this.props.onDocumentPress(this.props.attach);
    }

    render() {
        let downloaded = !!(this.state.downloadState && this.state.downloadState.path);

        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View height={40} flexDirection="row" marginTop={2} marginBottom={1}>
                    <View
                        width={40}
                        height={40}
                        backgroundColor="rgba(185,192,202,0.20)"
                        opacity={0.2}
                        borderRadius={20}
                        marginRight={10}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            source={downloaded ? require('assets/img-file.png') : require('assets/ic-file-download.png')}
                            style={{ width: 16, height: 20 }}
                        />
                        {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && (
                            <View
                                width={40}
                                backgroundColor="#0008"
                                borderRadius={20}
                                marginRight={10}
                                justifyContent="center"
                                alignItems="center"
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                            >
                                <Text style={{ color: '#fff', opacity: 0.8, textAlign: 'center' }}>{Math.round(this.state.downloadState.progress * 100)}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}