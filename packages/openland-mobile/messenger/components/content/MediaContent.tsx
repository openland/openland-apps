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
interface MediaContentProps {
    single?: boolean;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    layout: { width: number, height: number }
}

export let layoutImage = (message: DataSourceMessageItem) => {
    let maxSize = Platform.select({
        default: 400,
        ios: Math.min(Dimensions.get('window').width - 120, 400),
        android: Math.min(Dimensions.get('window').width - 120, 400)
    });
    return layoutMedia(message.file!!.imageSize!!.width, message.file!!.imageSize!!.height, maxSize, maxSize);

}
export class MediaContent extends React.PureComponent<MediaContentProps, { downloadState?: DownloadState }> {

    constructor(props: MediaContentProps) {
        super(props);
        this.state = {};
    }

    private downloadManagerWatch?: WatchSubscription;
    private handlePress = (event: ASPressEvent) => {
        // Ignore clicks for not-downloaded files
        if (!this.state.downloadState || !this.state.downloadState.path) {
            return;
        }
        this.props.onMediaPress(this.props.message, { path: this.state.downloadState.path, ...event });
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

        return (
            <ASFlex
                flexDirection="column"
                width={this.props.layout.width}
                height={this.props.layout.height}
                marginTop={this.props.single ? -contentInsetsTop : 8}
                marginLeft={-contentInsetsHorizontal}
                marginRight={-contentInsetsHorizontal}
                marginBottom={-contentInsetsBottom}
            >
                <ASImage
                    maxWidth={this.props.layout.width}
                    onPress={this.handlePress}
                    source={{ uri: (this.state.downloadState && this.state.downloadState.path) ? ('file://' + this.state.downloadState.path) : undefined }}
                    isGif={this.props.message.file!!.isGif}
                    borderRadius={15}
                    marginLeft={4}
                    marginRight={4}
                    marginTop={4}
                    marginBottom={4}
                    width={this.props.layout.width - 8}
                    height={this.props.layout.height - 8}

                />

                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={8}
                >
                    {this.state.downloadState && this.state.downloadState.progress !== undefined && this.state.downloadState.progress < 1 && !this.state.downloadState.path && <ASFlex
                        overlay={true}
                        width={this.props.layout.width}
                        height={this.props.layout.height}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ASFlex
                            backgroundColor="#0008"
                            borderRadius={20}
                        >
                            <ASText color="#fff" opacity={0.8} marginLeft={20} marginTop={20} marginRight={20} marginBottom={20} textAlign="center">{'Loading ' + Math.round(this.state.downloadState.progress * 100)}</ASText>
                        </ASFlex>
                    </ASFlex>}
                </ASFlex>
            </ASFlex>
        )
    }
}