import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './XCard';

export const XDialogContainer = Glamorous(XCard)({
    minWidth: '600px',
    marginLeft: 64,
    marginRight: 64,
    marginTop: 64,
    marginBottom: 64
});

export const XDialogFullScreenContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    height: '100vh',
    backgroundColor: '#ffffff'
});

export function XDialog(props: { style?: 'full-screen' | 'normal', children: any }) {
    if (props.style === 'full-screen') {
        return (
            <XDialogFullScreenContainer>
                {props.children}
            </XDialogFullScreenContainer>
        )
    } else {
        return (
            <XDialogContainer shadow="medium">
                {props.children}
            </XDialogContainer>
        );
    }
}