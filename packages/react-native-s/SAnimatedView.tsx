import * as React from 'react';
import { requireNativeComponent, StyleProp, ViewStyle } from 'react-native';

//
// Native View
//

type PointerEvents = 'box-none' | 'none' | 'box-only' | 'auto'; 

interface RNFastAnimatedViewProps {
    style?: StyleProp<ViewStyle>;
    animatedKey: string;
    pointerEvents?: PointerEvents;
}

const RNFastAnimatedView = requireNativeComponent<RNFastAnimatedViewProps>('RNSAnimatedView');

//
// Wrapper
//

export interface SAnimatedViewProps {
    name: string;
    style?: StyleProp<ViewStyle>;
    pointerEvents?: PointerEvents;
}

export class SAnimatedView extends React.PureComponent<SAnimatedViewProps> {
    render() {
        return (
            <RNFastAnimatedView
                style={this.props.style}
                animatedKey={this.props.name}
                pointerEvents={this.props.pointerEvents}
            >
                {this.props.children}
            </RNFastAnimatedView>
        );
    }
}