import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from './XVertical';
import { XFixedWidthContainer, XFixedWidthContainerThin } from './Scaffold/XFixedWidthContainer';

export let XPageContentDiv = Glamorous(XFixedWidthContainer)({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 80,

    position: 'relative'
});

export let XPageContentDivThin = Glamorous(XFixedWidthContainerThin)({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 80,

    position: 'relative'
});

export function XPageContent(props: { children?: any, mode?: 'normal' | 'thin' }) {
    let Wrapper = props.mode === 'thin' ? XPageContentDivThin : XPageContentDiv;
    return (
        <Wrapper>
            <XVertical>
                {props.children}
            </XVertical>
        </Wrapper>
    )
}