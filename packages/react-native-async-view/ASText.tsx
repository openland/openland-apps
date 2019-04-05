import * as React from 'react';
import { ASViewStyle } from './ASViewStyle';
import { ASEventEmitter } from './platform/ASEventEmitter';
import { ASPressEvent } from './ASPressEvent';
import { baseStyleProcessor } from './internals/baseStyleProcessor';
import { processColor } from 'react-native';
import { randomTag } from './internals/randomTag';

export interface ASTextProps extends ASViewStyle {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    fontStyle?: 'italic' | 'normal';
    lineHeight?: number;
    letterSpacing?: number;
    numberOfLines?: number;
    textDecorationLine?: 'none' | 'underline';
    textAlign?: 'center' | 'right' | 'left';
    onPress?: (event: ASPressEvent) => void;
    onLongPress?: (event: ASPressEvent) => void;
}

export class ASText extends React.PureComponent<ASTextProps> {
    private tag = randomTag();

    componentWillMount() {
        if (this.props.onPress) {
            ASEventEmitter.registerOnPress(this.tag, this.handleOnPress);
        }
        if (this.props.onLongPress) {
            ASEventEmitter.registerOnLongPress(this.tag, this.handleOnLongPress);
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
        if (!!nextProps.onLongPress !== !!this.props.onLongPress) {
            if (this.props.onLongPress) {
                ASEventEmitter.unregisterOnLongPress(this.tag);
            } else {
                ASEventEmitter.registerOnLongPress(this.tag, this.handleOnLongPress);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.onPress) {
            ASEventEmitter.unregisterOnPress(this.tag);
        }

        if (this.props.onLongPress) {
            ASEventEmitter.unregisterOnLongPress(this.tag);
        }
    }

    private handleOnPress = (event: ASPressEvent) => {
        if (this.props.onPress) {
            this.props.onPress(event);
        }
    }

    private handleOnLongPress = (event: ASPressEvent) => {
        if (this.props.onLongPress) {
            this.props.onLongPress(event);
        }
    }

    render() {
        let { children, onPress, color, ...other } = this.props;
        let realProps = other;
        realProps = {
            ...baseStyleProcessor(other),
            color: color ? processColor(color) : undefined,
            touchableKey: (this.props.onPress || this.props.onLongPress) && this.tag,
        } as any;
        return <asynctext {...realProps}>{children}</asynctext>;
    }
}