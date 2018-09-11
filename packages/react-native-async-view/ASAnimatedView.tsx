import * as React from 'react';
import { ASAnimatedViewNative, ASAnimatedViewManagerNative } from './platform/ASAnimatiedViewNative';
import { StyleProp, ViewStyle } from 'react-native';

export class ASAnimatedView extends React.PureComponent<{ style?: StyleProp<ViewStyle>, name: string, pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' }> {
    render() {
        return <ASAnimatedViewNative style={this.props.style} animatedKey={this.props.name} pointerEvents={this.props.pointerEvents}>{this.props.children}</ASAnimatedViewNative>;
    }
}

var isInTransation = false;
var pending: any[] = [];

export function beginAnimationTransaction() {
    if (isInTransation) {
        return;
    }
    isInTransation = true;
}

export function commitAnimationTransaction() {
    if (pending.length > 0) {
        ASAnimatedViewManagerNative.animate(JSON.stringify({
            duration: 0.25,
            animations: pending
        }));
        pending = [];
    }
    isInTransation = false;
}

function animate(src: any) {
    if (isInTransation) {
        pending.push(src);
    } else {
        ASAnimatedViewManagerNative.animate(JSON.stringify({
            duration: 0.25,
            animations: [src]
        }));
    }
}

export function animateOpacity(from: number, to: number, name: string, optinal?: boolean) {
    animate({
        type: 'timing',
        prop: 'opacity',
        view: name,
        from: from,
        to: to,
        optional: optinal
    });
}

export function animateTranslateX(from: number, to: number, name: string, optinal?: boolean) {
    animate({
        type: 'spring',
        prop: 'translateX',
        view: name,
        from: from,
        to: to,
        optional: optinal
    });
}