import * as React from 'react';
import { Image, processColor } from 'react-native';
import { ASViewStyle } from './ASViewStyle';
import { ASPressEvent } from './ASPressEvent';
import UUID from 'uuid/v4';
import { ASEventEmitter } from './platform/ASEventEmitter';

export interface ASImageProps extends ASViewStyle {
    source: any;
    onPress?: (event: ASPressEvent) => void;
}

export class ASImage extends React.PureComponent<ASImageProps> {
    private tag = UUID();

    componentWillMount() {
        if (this.props.onPress) {
            ASEventEmitter.registerOnPress(this.tag, this.handleOnPress);
        }
    }

    componentWillReceiveProps(nextProps: ASImageProps) {
        if (!!nextProps.onPress !== !!this.props.onPress) {
            if (this.props.onPress) {
                ASEventEmitter.unregisterOnPress(this.tag);
            } else {
                ASEventEmitter.registerOnPress(this.tag, this.handleOnPress);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.onPress) {
            ASEventEmitter.unregisterOnPress(this.tag);
        }
    }

    private handleOnPress = (event: ASPressEvent) => {
        if (this.props.onPress) {
            this.props.onPress(event);
        }
    }

    render() {
        let { children, onPress, source, ...other } = this.props;
        let realProps = other;
        realProps = {
            ...realProps,
            touchableKey: this.props.onPress && this.tag,
            source: Image.resolveAssetSource(source).uri,
            backgroundColor: realProps.backgroundColor ? processColor(realProps.backgroundColor) : undefined,
            backgroundGradient: realProps.backgroundGradient ? {
                start: processColor(realProps.backgroundGradient.start),
                end: processColor(realProps.backgroundGradient.end)
            } : undefined
        } as any;
        return <asyncview asyncViewName="image" {...realProps}>{children}</asyncview>;
    }
}

// export const ASImage = declareView('image', ASImageFallback, (src) => {
//     return { ...src, source: Image.resolveAssetSource(src.source).uri };
// });