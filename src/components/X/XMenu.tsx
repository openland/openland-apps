import * as React from 'react';
import XStyled from './XStyled';
import { XCard } from './XCard';
import { XLink } from './XLink';

const XMenuDiv = XStyled(XCard)({
    marginTop: '8px'
});

const XMenuItem = XStyled(XLink)({
    height: '32px',
    paddingLeft: '8px',
    paddingRight: '8px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    lineHeight: '32px',
    '&:hover': {
        backgroundColor: '#f6f9fc'
    }
});

export class XMenu extends React.Component {

    static Item = XMenuItem;

    render() {
        return (
            <XMenuDiv>
                {this.props.children}
            </XMenuDiv>
        )
    }
}