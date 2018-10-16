import * as React from 'react';
import { Platform, Dimensions } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASImage } from 'react-native-async-view/ASImage';
import { DownloadState } from 'openland-shared/DownloadManagerInterface';
import { DownloadManagerInstance } from '../../files/DownloadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { XPCircularLoader } from 'openland-xp/XPCircularLoader';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';

export interface AsyncMessageMediaViewProps {
    message: DataSourceMessageItem;
    onPress: (document: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
}

export class AsyncMessageMediaView extends React.PureComponent<AsyncMessageMediaViewProps, { downloadState?: DownloadState }> {

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
        let maxSize = Platform.select({
            default: 400,
            ios: Math.min(Dimensions.get('window').width - 120, 400),
            android: Math.min(Dimensions.get('window').width - 120, 400)
        });
        let layout = layoutMedia(this.props.message.file!!.imageSize!!.width, this.props.message.file!!.imageSize!!.height, maxSize, maxSize);
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom} appearance="media">
                <ASImage
                    onPress={this.handlePress}
                    source={{ uri: (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                    width={layout.width}
                    height={layout.height}
                    borderRadius={10}
                    isGif={this.props.message.file!!.isGif}
                />
                {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && <ASFlex
                    overlay={true}
                    width={layout.width}
                    height={layout.height}
                    justifyContent="center"
                    alignItems="center"
                >
                    <ASFlex backgroundColor="#0008" borderRadius={20}>
                        <ASText color="#fff" opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</ASText>
                    </ASFlex>
                </ASFlex>}

            </AsyncBubbleView>
        );
    }
}