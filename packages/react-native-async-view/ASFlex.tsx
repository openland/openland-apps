import * as React from 'react';
import { processColor } from 'react-native';
import { ASViewStyle } from './ASViewStyle';
import { ASEventEmitter } from './platform/ASEventEmitter';
import { ASPressEvent } from './ASPressEvent';
import { baseStyleProcessor } from './internals/baseStyleProcessor';
import { randomTag } from './internals/randomTag';
import { Alert } from 'openland-mobile/components/AlertBlanket';

export interface ASFlexProps extends ASViewStyle {
    flexDirection?: 'row' | 'column';
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
    justifyContent?: 'flex-start' | 'flex-end' | 'center';
    onPress?: (event: ASPressEvent) => void;
    onLongPress?: (event: ASPressEvent) => void;
    highlightColor?: string;
    overlay?: boolean;
    rendeModes?: { [key: string]: { props: ASFlexProps } };
    applyModes?: string[];
}

export class ASFlex extends React.Component<ASFlexProps> {

    private tag = randomTag();

    componentWillMount() {
        if (this.props.onPress) {
            ASEventEmitter.registerOnPress(this.tag, this.handleOnPress);
        }
        if (this.props.onLongPress) {
            ASEventEmitter.registerOnLongPress(this.tag, this.handleOnLongPress);
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

    processProps = (props: ASFlexProps & { children?: any }) => {
        let { children, highlightColor, onPress, backgroundPatchTintColor, rendeModes, ...other } = props;
        let realProps = other;
        realProps = {
            ...baseStyleProcessor(other),
            backgroundPatchTintColor: backgroundPatchTintColor ? (processColor(backgroundPatchTintColor)) : undefined,
            touchableKey: (this.props.onPress || this.props.onLongPress) && this.tag,
            highlightColor: (this.props.onPress || this.props.onLongPress) && (highlightColor ? processColor(highlightColor) : undefined),
        }
        return [realProps, children];
    }

    render() {
        let [realProps, children] = this.processProps(this.props);
        return <asyncview asyncViewName="flex" {...realProps}>{children}</asyncview>;
    }
}