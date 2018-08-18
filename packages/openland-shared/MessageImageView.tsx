import * as React from 'react';
import { XPBubbleView } from 'openland-xp/XPBubbleView';
import { View, Platform, Dimensions, LayoutChangeEvent, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { layoutMedia } from './utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { MessageFullFragment } from 'openland-api/Types';
import { formatTime } from './utils/formatTime';

export class MessageImageView extends React.PureComponent<{ date: string, isSending: boolean, file: string, width: number, height: number, isGif: boolean, isOut: boolean, message: MessageFullFragment, onPress?: (message: MessageFullFragment, view?: View) => void }> {

    ref = React.createRef<View>();

    handleTouch = () => {
        if (this.props.onPress) {
            this.props.onPress(this.props.message, this.ref.current ? this.ref.current : undefined);
        }
    }

    handleLayout = (event: LayoutChangeEvent) => {
        // do nothing
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
                            source={{ uuid: this.props.file }}
                            imageSize={{ width: optimalSize.width, height: optimalSize.height }}
                            borderRadius={18}
                            resize={this.props.isGif ? 'none' : undefined}
                            width={layout.width}
                            height={layout.height}
                        />
                    </TouchableWithoutFeedback>
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