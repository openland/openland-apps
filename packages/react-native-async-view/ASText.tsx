import * as React from 'react';
import { ASViewStyle } from './ASViewStyle';
import UUID from 'uuid/v4';
import { ASEventEmitter } from './platform/ASEventEmitter';
import { ASPressEvent } from './ASPressEvent';
import { baseStyleProcessor } from './internals/baseStyleProcessor';
import { processColor } from 'react-native';

export interface ASTextProps extends ASViewStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    lineHeight?: number;
    letterSpacing?: number;
    numberOfLines?: number;
    textDecorationLine?: 'none' | 'underline';
    textAlign?: 'center' | 'right' | 'left';
    onPress?: (event: ASPressEvent) => void;
}

export class ASText extends React.PureComponent<ASTextProps> {
    private tag = UUID();

    componentWillMount() {
        if (this.props.onPress) {
            ASEventEmitter.registerOnPress(this.tag, this.handleOnPress);
        }
    }

    componentWillReceiveProps(nextProps: ASTextProps) {
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
        let { children, onPress, color, ...other } = this.props;
        let realProps = other;
        realProps = {
            ...baseStyleProcessor(other),
            color: color ? processColor(color) : undefined,
            touchableKey: this.props.onPress && this.tag
        } as any;
        return <asynctext {...realProps}>{children}</asynctext>;
    }
}