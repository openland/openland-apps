import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';

let VerticalDiv = Glamorous.div<XFlexStyles & { separator?: 'large' | 'normal' | 'none' | number, alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' }>([
    (props) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: props.alignItems || 'stretch',
        position: 'relative',
        ...((props.separator !== 'none') ? {
            '> *': {
                marginTop: (typeof props.separator === 'number') ? props.separator : props.separator === 'large' ? '16px' : '8px',
                marginBottom: (typeof props.separator === 'number') ? props.separator : props.separator === 'large' ? '16px' : '8px'
            },
            '>:first-child': {
                marginTop: '0px',
            },
            '>:last-child': {
                marginBottom: '0px',
            }
        } : {}),
    }),
    applyFlex
]);

export class XVertical extends React.Component<{ separator?: 'large' | 'normal' | 'none' | number, alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center', className?: string } & XFlexStyles> {
    render() {
        return (
            <VerticalDiv {...this.props}>
                {this.props.children}
            </VerticalDiv>
        );
    }
}