import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from './XIcon';
import { XFlexStyles, applyFlex } from './basics/Flex';

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

export const XCardEmptyContent = Glamorous.div<{text?: string}>((props) => ({
    display: 'flex',
    alignItems: 'center',
    color: '#6b7c93',
    fontSize: 14,
    lineHeight: '1.6',
    whiteSpace: 'pre',
    '& *::before': {
        content: props.text ? ' ' : undefined
    }
}));

interface XEmptyProps extends XFlexStyles {
    children?: any;
    icon: string;
    text?: string;
}

export function XEmpty(props: XEmptyProps) {
    return (
        <XCardEmptyDiv flexBasis={props.flexBasis} flexGrow={props.flexGrow} flexShrink={props.flexShrink} alignSelf={props.alignSelf} className={(props as any).className}>
            <XCardEmptyIcon icon={props.icon} />
            <XCardEmptyContent>
                {props.text}
                {props.children}
            </XCardEmptyContent>
        </XCardEmptyDiv>
    );
}