import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from './XLink';

const XMenuItem = Glamorous(XLink)({
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    width: '100%',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#525f7f',
    lineHeight: '28px',
    // '&:hover': {
    //     backgroundColor: '#f6f9fc',
    //     color: '#525f7f'
    // }
});

export class XMenu extends React.Component {

    static Item = XMenuItem;

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}