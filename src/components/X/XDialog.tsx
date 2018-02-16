import * as React from 'react';
import Glamorous from 'glamorous';
import { XCard } from './XCard';

export const XDialogContainer = Glamorous(XCard)({
    minWidth: '600px'
})

export function XDialog(props: { children: any }) {
    return (
        <XDialogContainer shadow="medium">
            {props.children}
        </XDialogContainer>
    )
}