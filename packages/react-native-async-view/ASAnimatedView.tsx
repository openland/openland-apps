import * as React from 'react';
import { ASAnimatedViewNative, ASAnimatedViewManagerNative } from './platform/ASAnimatiedViewNative';
import { StyleProp, ViewStyle } from 'react-native';

export class ASAnimatedView extends React.PureComponent<{ style?: StyleProp<ViewStyle>, name: string, pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' }> {
    render() {
        return <ASAnimatedViewNative style={this.props.style} animatedKey={this.props.name} pointerEvents={this.props.pointerEvents}>{this.props.children}</ASAnimatedViewNative>;
    }
}

export function animateOpacity(from: number, to: number, name: string) {
    ASAnimatedViewManagerNative.animate(JSON.stringify({
        duration: 0.5,
        animations: [
            {
                type: 'spring',
                prop: 'opacity',
                view: name,
                from: from,
                to: to
            }
        ]
    }));
}

export function animateTranslateX(from: number, to: number, name: string) {
    ASAnimatedViewManagerNative.animate(JSON.stringify({
        duration: 0.3,
        animations: [
            {
                type: 'spring',
                prop: 'translateX',
                view: name,
                from: from,
                to: to
            }
        ]
    }));
}