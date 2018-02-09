import * as React from 'react';
import Glamorous from 'glamorous';

interface XPageFullScreenProps {
    children: any,
    behindHeader?: boolean
}

export const XPageFullScreenContainer = Glamorous.div<XPageFullScreenProps>((props) => {
    return {
        height: '100vh',
        width: '100%',
        position: 'relative',
        marginTop: props.behindHeader ? '-54px' : undefined
    }
})

export function XPageFullScreen (props: XPageFullScreenProps) {
    return (
        <XPageFullScreenContainer behindHeader={props.behindHeader}>
            {props.children}
        </XPageFullScreenContainer>
    )
}