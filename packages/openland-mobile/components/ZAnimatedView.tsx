import * as React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { SAnimated, SAnimatedView } from 'react-native-fast-animations';
import uuid from 'uuid/v4';

export const ZAnimatedView = React.memo((props: {
    style?: StyleProp<ViewStyle>,
    pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
    opactiy: number,
    children?: any,
}) => {
    const id = React.useMemo(() => uuid(), []);
    let previous = React.useRef<number>(props.opactiy);
    let initialOpacity = React.useMemo(() => props.opactiy, []);

    React.useEffect(() => {
        if (previous.current !== props.opactiy) {
            SAnimated.beginTransaction();
            SAnimated.timing(id, {
                property: 'opacity',
                from: previous.current,
                to: props.opactiy,
                duration: 0.15
            });
            SAnimated.commitTransaction();
            previous.current = props.opactiy;
        }
    }, [props.opactiy]);

    return (
        <SAnimatedView
            name={id}
            style={[props.style, { opacity: initialOpacity }]}
            pointerEvents={props.pointerEvents}
        >
            {props.children}
        </SAnimatedView>
    );
});