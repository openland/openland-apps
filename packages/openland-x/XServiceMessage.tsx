import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from 'openland-x/XIcon';
import { XFlexStyles, applyFlex, extractFlexProps } from './basics/Flex';

let ItemIcon = Glamorous(XIcon)({
    marginRight: '10px',
    width: '16px',
    fontSize: '16px',
    color: '#E8695F'
});

export const XWarningTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#525f7f'
});

let XWarningDiv = Glamorous.div<XFlexStyles>([
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fdfaf6',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    applyFlex
]);

export function XServiceMessage(props: { children?: any, title?: string } & XFlexStyles) {
    return (
        <XWarningDiv {...extractFlexProps(props)}>
            <XWarningTitle>
                <ItemIcon icon="warning" />
                {props.title}
            </XWarningTitle>
            {props.children}
        </XWarningDiv>
    );
}