import * as React from 'react';
import { XPBubbleView, resolveCorners } from 'openland-xp/XPBubbleView';
import { View, Platform, Dimensions, TouchableHighlight, LayoutChangeEvent } from 'react-native';
import { layoutMedia } from './utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { MessageFullFragment } from 'openland-api/Types';

export class MessageImageView extends React.PureComponent<{ file: string, width: number, height: number, isGif: boolean, isOut: boolean, message: MessageFullFragment, onPress?: (message: MessageFullFragment, view?: View) => void }> {

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
                    <TouchableHighlight
                        onPress={this.handleTouch}
                        disabled={!this.props.onPress}
                        underlayColor="#000"
                        activeOpacity={0.8}
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
                    </TouchableHighlight>
                </View>
            </XPBubbleView>
        );
    }
}