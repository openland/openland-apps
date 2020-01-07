import { View } from 'react-native';
import * as React from 'react';

export interface PViewProps {
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    width?: number | string;
    height?: number | string;

    backgroundColor?: string;
    flexDirection?: 'column' | 'row';
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

                backgroundColor: props.backgroundColor
            }}
        >
            {props.children}
        </View>
    );
});