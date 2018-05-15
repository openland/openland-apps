import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from 'openland-x/XIcon';
import { XFlexStyles, applyFlex } from './Flex';

export const XCardEmptyDiv = Glamorous.div<XFlexStyles>([{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 564,
}, applyFlex]);

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

interface XEmptyProps extends XFlexStyles {
    children?: any;
    icon: string;
    text: string;
}

export function XEmpty(props: XEmptyProps) {
    return (
        <XCardEmptyDiv flexBasis={props.flexBasis} flexGrow={props.flexGrow} flexShrink={props.flexShrink} alignSelf={props.alignSelf}>
            <XCardEmptyIcon icon={props.icon} />
            <XCardEmptyContent>
                {props.text}
                {props.children}
            </XCardEmptyContent>
        </XCardEmptyDiv>
    );
}