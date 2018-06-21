import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';

let XHorizontalDiv = Glamorous.div<XFlexStyles & { separator?: 'large' | 'normal' | 'none', alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' }>([
    (props) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: props.alignItems || 'stretch',
        position: 'relative',
        ...((props.separator !== 'none') ? {
            '> *': {
                marginLeft: props.separator === 'large' ? '16px' : '8px',
                marginRight: props.separator === 'large' ? '16px' : '8px'
            },
            '>:first-child': {
                marginLeft: '0px',
            },
            '>:last-child': {
                marginRight: '0px',
            }
        } : {}),
    }),
    applyFlex
]);

export class XHorizontal extends React.Component<{ separator?: 'large' | 'normal' | 'none', className?: string, alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' } & XFlexStyles> {
    render() {
        return (
            <XHorizontalDiv {...this.props}>
                {this.props.children}
            </XHorizontalDiv>
        );
    }
}