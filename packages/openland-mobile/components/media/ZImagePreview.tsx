import * as React from 'react';
import { View, Animated, Platform } from 'react-native';
import { XPImage } from 'openland-xp/XPImage';
import {
    PanGestureHandler,
    PinchGestureHandler,
    State,
    PanGestureHandlerStateChangeEvent,
    PinchGestureHandlerStateChangeEvent,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { FastImageViewer } from 'react-native-fast-image-viewer';
export interface ZImagePreviewProps {
    src: string;
    srcWidth: number;
    srcHeight: number;
    width: number;
    height: number;
    onTap?: () => void;
}

export class ZImagePreview extends React.PureComponent<ZImagePreviewProps> {
    render() {
        return (
            <FastImageViewer width={this.props.width} height={this.props.height} srcWidth={this.props.srcWidth} srcHeight={this.props.srcHeight} onTap={this.props.onTap}>
                <XPImage
                    source={{ uuid: this.props.src }}
                    width={this.props.srcWidth}
                    height={this.props.srcHeight}
                    imageSize={{ width: this.props.srcWidth, height: this.props.srcHeight }}
                />
            </FastImageViewer>
        );
    }
}