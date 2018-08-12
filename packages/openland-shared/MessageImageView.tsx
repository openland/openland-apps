import * as React from 'react';
import { XPBubbleView, resolveCorners } from 'openland-xp/XPBubbleView';
import { TouchableOpacity, View, Platform, Dimensions, TouchableHighlight } from 'react-native';
import { layoutMedia } from './utils/layoutMedia';
import { XPImage } from 'openland-xp/XPImage';
import { MessageFullFragment } from 'openland-api/Types';

export class MessageImageView extends React.PureComponent<{ file: string, width: number, height: number, isGif: boolean, isOut: boolean, attach?: 'bottom' | 'top' | 'both', message: MessageFullFragment, onPress?: (message: MessageFullFragment) => void }> {

    handleTouch = () => {
        if (this.props.onPress) {
            this.props.onPress(this.props.message);
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
        let corners = resolveCorners(this.props.isOut, this.props.attach);
        return (
            <XPBubbleView isOut={this.props.isOut} attach={this.props.attach} appearance="media">

                <View
                    width={layout.width}
                    height={layout.height}
                >
                    <TouchableHighlight
                        onPress={this.handleTouch}
                        disabled={!this.props.onPress}
                        underlayColor="#000"
                        activeOpacity={0.8}
                        style={{
                            borderRadius: 18, // Hack for MAC OS
                            borderTopLeftRadius: corners.topLeft,
                            borderTopRightRadius: corners.topRight,
                            borderBottomLeftRadius: corners.bottomLeft,
                            borderBottomRightRadius: corners.bottomRight,
                        }}
                    >
                        <XPImage
                            source={{ uuid: this.props.file }}
                            imageSize={{ width: optimalSize.width, height: optimalSize.height }}
                            borderRadius={18} // Hack for MAC OS
                            borderTopLeftRadius={corners.topLeft}
                            borderTopRightRadius={corners.topRight}
                            borderBottomLeftRadius={corners.bottomLeft}
                            borderBottomRightRadius={corners.bottomRight}
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