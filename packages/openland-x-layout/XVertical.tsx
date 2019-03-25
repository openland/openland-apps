import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';

let VerticalDiv = Glamorous.div<
    XFlexStyles & {
        separator?: 'large' | 'normal' | 'none' | number;
        alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    }
>([
    props => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: props.alignItems || 'stretch',
        position: 'relative',
        ...(props.separator !== 'none'
            ? {
                  '> *': {
                      marginTop:
                          typeof props.separator === 'number'
                              ? props.separator
                              : props.separator === 'large'
                                  ? '16px'
                                  : '8px',
                      marginBottom:
                          typeof props.separator === 'number'
                              ? props.separator
                              : props.separator === 'large'
                                  ? '16px'
                                  : '8px',
                  },
                  '>:first-child': {
                      marginTop: '0px',
                  },
                  '>:last-child': {
                      marginBottom: '0px',
                  },
              }
            : {}),
    }),
    applyFlex,
]);

interface XVerticalProps extends XFlexStyles {
    separator?: 'large' | 'normal' | 'none' | number;
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    onClick?: () => void;
    className?: string;
    onMouseLeave?: React.MouseEventHandler<any>;
    onMouseEnter?: React.MouseEventHandler<any>;
}

export class XVertical extends React.Component<XVerticalProps> {
    render() {
        return <VerticalDiv {...this.props}>{this.props.children}</VerticalDiv>;
    }
}
