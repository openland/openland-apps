import * as React from 'react';
import { XPImage } from 'openland-xp/XPImage';
import { FastImageViewer } from 'react-native-fast-image-viewer';

export interface ZImagePreviewProps {
    src: string;
    srcWidth: number;
    srcHeight: number;
    width: number;
    height: number;
    onTap?: () => void;
    onLoaded?: () => void;
}

export class ZImagePreview extends React.PureComponent<ZImagePreviewProps> {
    render() {
        return (
            <FastImageViewer width={this.props.width} height={this.props.height} srcWidth={this.props.srcWidth} srcHeight={this.props.srcHeight} onTap={this.props.onTap} background={true}>
                <XPImage
                    source={{ uuid: this.props.src }}
                    width={this.props.srcWidth}
                    height={this.props.srcHeight}
                    imageSize={{ width: this.props.srcWidth, height: this.props.srcHeight }}
                    onLoaded={this.props.onLoaded}
                />
            </FastImageViewer>
        );
    }
}