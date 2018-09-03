import * as React from 'react';
import { View, processColor } from 'react-native';
import { ASViewStyle } from './ASViewStyle';
import UUID from 'uuid/v4';
import { ASEventEmitter } from './platform/ASEventEmitter';
import { ASPressEvent } from './ASPressEvent';

export interface ASFlexProps extends ASViewStyle {
    flexDirection?: 'row' | 'column';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    justifyContent?: 'flex-start' | 'flex-end' | 'center';
    onPress?: (event: ASPressEvent) => void;
    highlightColor?: string;
    overlay?: boolean;
}

export class ASFlex extends React.Component<ASFlexProps> {

    private tag = UUID();

    componentWillMount() {
        if (this.props.onPress) {
            ASEventEmitter.registerOnPress(this.tag, this.handleOnPress);
        }
    }

    componentWillReceiveProps(nextProps: ASFlexProps) {
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
        let { children, highlightColor, onPress, ...other } = this.props;
        let realProps = other;
        realProps = {
            ...realProps,
            touchableKey: this.props.onPress && this.tag,
            highlightColor: this.props.onPress && (highlightColor ? processColor(highlightColor) : undefined),
            backgroundColor: realProps.backgroundColor ? processColor(realProps.backgroundColor) : undefined,
            backgroundGradient: realProps.backgroundGradient ? {
                start: processColor(realProps.backgroundGradient.start),
                end: processColor(realProps.backgroundGradient.end)
            } : undefined
        } as any;
        return <asyncview asyncViewName="flex" {...realProps}>{children}</asyncview>;
    }
}