import * as React from 'react';
import { XPBubbleView } from 'openland-xp/XPBubbleView';
import { View, Platform, Dimensions, LayoutChangeEvent, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { layoutMedia } from './utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { MessageFullFragment } from 'openland-api/Types';
import { formatTime } from './utils/formatTime';
import { DownloadManagerInterface, DownloadState } from './DownloadManagerInterface';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { XPCircularLoader } from 'openland-xp/XPCircularLoader';

export interface MessageImageViewProps {
    downloadManager?: DownloadManagerInterface;
    date: string;
    isSending: boolean;
    file: string;
    width: number;
    height: number;
    isGif: boolean;
    isOut: boolean;
    message: MessageFullFragment;
    onPress?: (message: MessageFullFragment, view?: View) => void;
}

export class MessageImageView extends React.PureComponent<MessageImageViewProps, { downloadState?: DownloadState }> {

    ref = React.createRef<View>();
    downloadManagerWatch?: WatchSubscription;

    constructor(props: MessageImageViewProps) {
        super(props);
        this.state = {};
    }

    handleTouch = () => {
        if (this.props.onPress) {
            this.props.onPress(this.props.message, this.ref.current ? this.ref.current : undefined);
        }
    }

    handleLayout = (event: LayoutChangeEvent) => {
        // do nothing
    }

    componentWillMount() {
        if (this.props.downloadManager) {
            let optimalSize = layoutMedia(this.props.width, this.props.height, 1024, 1024);
            this.downloadManagerWatch = this.props.downloadManager.watch(this.props.file, !this.props.isGif ? optimalSize : null, (state) => {
                this.setState({ downloadState: state });
            });
        }
    }

    componentWillUnmount() {
        if (this.downloadManagerWatch) {
            this.downloadManagerWatch();
        }
    }

    render() {
        let maxSize = Platform.select({
            default: 400,
            ios: Math.min(Dimensions.get('window').width - 70, 400),
            android: Math.min(Dimensions.get('window').width - 70, 400)
        });
        let layout = layoutMedia(this.props.width, this.props.height, maxSize, maxSize);
        let optimalSize = layoutMedia(this.props.width, this.props.height, 1024, 1024);
        return (
            <XPBubbleView isOut={this.props.isOut} appearance="media">

                <View
                    width={layout.width}
                    height={layout.height}
                    ref={this.ref}
                    onLayout={this.handleLayout}
                >
                    <TouchableWithoutFeedback
                        onPress={this.handleTouch}
                        disabled={!this.props.onPress}
                        delayPressIn={0}
                        style={{
                            borderRadius: 18
                        }}
                    >
                        <XPImage
                            source={this.props.downloadManager ? (this.state.downloadState && this.state.downloadState.path) : { uuid: this.props.file }}
                            imageSize={{ width: optimalSize.width, height: optimalSize.height }}
                            borderRadius={18}
                            resize={this.props.isGif ? 'none' : undefined}
                            width={layout.width}
                            height={layout.height}
                        />
                    </TouchableWithoutFeedback>
                    {this.props.downloadManager && (
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} pointerEvents="none">
                            <XPCircularLoader visible={!!this.state.downloadState && !this.state.downloadState.path} progress={this.state.downloadState && this.state.downloadState.progress || 0} />
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 4, right: 3, borderRadius: 8, height: 16, paddingHorizontal: 5, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                        <Text style={{ color: '#fff', fontSize: 11, lineHeight: 16 }}>{formatTime(parseInt(this.props.date, 10))}</Text>
                        {this.props.isOut && (
                            <View style={{ width: 18, height: 13, justifyContent: 'center', alignItems: 'center' }}>
                                {this.props.isSending && <Image source={require('assets/ic-sending.png')} style={{ width: 13, height: 13 }} />}
                                {!this.props.isSending && <Image source={require('assets/ic-sent.png')} style={{ width: 9, height: 8 }} />}
                            </View>
                        )}
                    </View>
                </View>
            </XPBubbleView>
        );
    }
}