import * as React from 'react';
import { Image, processColor } from 'react-native';
import { ASViewStyle } from './ASViewStyle';
import { ASPressEvent } from './ASPressEvent';
import UUID from 'uuid/v4';
import { ASEventEmitter } from './platform/ASEventEmitter';
import { baseStyleProcessor } from './internals/baseStyleProcessor';

export interface ASImageProps extends ASViewStyle {
    source: any;
    isGif?: boolean;
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
            ...baseStyleProcessor(other),
            touchableKey: this.props.onPress && this.tag,
            source: Image.resolveAssetSource(source).uri,
        } as any;
        return <asyncview asyncViewName="image" {...realProps}>{children}</asyncview>;
    }
}