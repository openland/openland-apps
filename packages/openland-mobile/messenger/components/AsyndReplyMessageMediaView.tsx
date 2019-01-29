import * as React from 'react';
import { Platform, Dimensions } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadManagerInstance } from '../../files/DownloadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { layoutMedia } from '../../../openland-web/utils/MediaLayout';
import { DownloadState } from '../../files/DownloadManagerInterface';

export interface AsyncMessageMediaViewProps {
    message: DataSourceMessageItem;
    onPress: (document: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
}

export class AsyncReplyMessageMediaView extends React.PureComponent<AsyncMessageMediaViewProps, { downloadState?: DownloadState }> {

    private downloadManagerWatch?: WatchSubscription;

    constructor(props: AsyncMessageMediaViewProps) {
        super(props);
        this.state = {};
    }

    private handlePress = (event: ASPressEvent) => {
        // Ignore clicks for not-downloaded files
        if (!this.state.downloadState || !this.state.downloadState.path) {
            return;
        }
        this.props.onPress(this.props.message, { path: this.state.downloadState.path, ...event });
    }

    componentWillMount() {
        let optimalSize = layoutMedia(this.props.message.file!!.imageSize!!.width, this.props.message.file!!.imageSize!!.height, 1024, 1024);
        this.downloadManagerWatch = DownloadManagerInstance.watch(this.props.message.file!!.fileId!, !this.props.message.file!!.isGif ? optimalSize : null, (state) => {
            this.setState({ downloadState: state });
        });
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    render() {
        let maxSize = 100;
        let layout = layoutMedia(this.props.message.file!!.imageSize!!.width, this.props.message.file!!.imageSize!!.height, maxSize, maxSize);
        return (
            <ASFlex width={layout.width} height={layout.height} marginLeft={10} marginTop={5} marginRight={7}>
                <ASImage
                    onPress={this.handlePress}
                    source={{ uri: (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                    width={layout.width}
                    height={layout.height}
                    isGif={this.props.message.file!!.isGif}
                />

            </ASFlex>
        );
    }
}