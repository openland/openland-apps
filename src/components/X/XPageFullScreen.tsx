import * as React from 'react';
import Glamorous from 'glamorous';

interface XPageFullScreenProps {
    children: any;
    headerPadding?: boolean;
}

export const XPageFullScreenContainer = Glamorous.div<XPageFullScreenProps>((props) => {
    return {
        height: props.headerPadding === false ? '100vh' : 'calc(100vh - 54px)',
        width: '100%',
        position: 'relative',
        marginTop: props.headerPadding === false ? '-54px' : undefined
    };
});

export function XPageFullScreen(props: XPageFullScreenProps) {
    return (
        <XPageFullScreenContainer headerPadding={props.headerPadding}>
            {props.children}
        </XPageFullScreenContainer>
    );
}