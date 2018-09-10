import * as React from 'react';
import { ASAnimatedViewNative, ASAnimatedViewManagerNative } from './platform/ASAnimatiedViewNative';
import { StyleProp, ViewStyle } from 'react-native';

export class ASAnimatedView extends React.PureComponent<{ style?: StyleProp<ViewStyle>, name: string }> {
    render() {
        return <ASAnimatedViewNative style={this.props.style} animatedKey={this.props.name}>{this.props.children}</ASAnimatedViewNative>;
    }
}

export function animateOpacity(from: number, to: number, name: string) {
    ASAnimatedViewManagerNative.animate(JSON.stringify({
        duration: 1.5,
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