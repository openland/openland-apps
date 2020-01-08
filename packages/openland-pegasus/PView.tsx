import { View } from 'react-native';
import * as React from 'react';

export interface PViewProps {
    width?: number | string;
    height?: number | string;

    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    flexDirection?: 'column' | 'row';

    position?: 'relative' | 'absolute';
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;

    backgroundColor?: string;
    children?: any;
}

export const PView = React.memo((props: PViewProps) => {
    return (
        <View
            style={{

                width: props.width,
                height: props.height,

                flexGrow: props.flexGrow,
                flexShrink: props.flexShrink,
                flexBasis: props.flexBasis,
                flexDirection: props.flexDirection,

                position: props.position, 
                top: props.top,
                bottom: props.bottom,
                right: props.right,
                left: props.left,

                backgroundColor: props.backgroundColor
            }}
        >
            {props.children}
        </View>
    );
});