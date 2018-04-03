import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from './XIcon';

export const XCardEmptyDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 564,
});

export const XCardEmptyIcon = Glamorous(XIcon)({
    width: 128,
    height: 128,
    fontSize: 128,
    color: '#919FAC',
    marginBottom: 16
});

export const XCardEmptyContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    color: '#6b7c93',
    fontSize: 14,
    lineHeight: '1.6',
    whiteSpace: 'pre',
    '& *::before': {
        content: ' '
    }
});

interface XCardEmptyProps {
    children?: any;
    icon: string;
    text: string;
}

export function XCardEmpty(props: XCardEmptyProps) {
    return (
        <XCardEmptyDiv>
            <XCardEmptyIcon icon={props.icon} />
            <XCardEmptyContent>
                {props.text}
                {props.children}
            </XCardEmptyContent>
        </XCardEmptyDiv>
    );
}