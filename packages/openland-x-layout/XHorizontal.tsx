import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';

let XHorizontalDiv = Glamorous.div<
    XFlexStyles & {
        separator?: 'large' | 'normal' | 'none' | number;
        alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    }
>([
    props => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: props.alignItems || 'stretch',
        position: 'relative',
        ...(props.separator !== 'none'
            ? {
                  '> *': {
                      marginLeft:
                          typeof props.separator === 'number'
                              ? props.separator
                              : props.separator === 'large'
                                  ? '16px'
                                  : '8px',
                      marginRight:
                          typeof props.separator === 'number'
                              ? props.separator
                              : props.separator === 'large'
                                  ? '16px'
                                  : '8px',
                  },
                  '>:first-child': {
                      marginLeft: '0px',
                  },
                  '>:last-child': {
                      marginRight: '0px',
                  },
              }
            : {}),
    }),
    applyFlex,
]);

interface XHorizontalProps extends XFlexStyles {
    separator?: 'large' | 'normal' | 'none' | number;
    className?: string;
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    onClick?: () => void;
    onMouseLeave?: React.MouseEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
}

export class XHorizontal extends React.Component<XHorizontalProps> {
    render() {
        return <XHorizontalDiv {...this.props}>{this.props.children}</XHorizontalDiv>;
    }
}
