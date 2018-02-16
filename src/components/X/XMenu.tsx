import * as React from 'react';
import XStyled from './XStyled';
import { XCard } from './XCard';
import { XLink } from './XLink';

const XMenuDiv = XStyled(XCard)({
    marginTop: 13,
    position: 'relative',
    overflow: 'visible',
    border: 'none',
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    '&::before, &::after': {
        content: `''`,
        display: 'block',
        width: 0,
        height: 0,
        background: 'transparent',
        position: 'absolute',
        left: 'auto',
        bottom: 'auto',
    },
    '&::before': {
        top: -19,
        right: 5,
        border: '8px solid transparent',
        borderBottom: '10px solid #E6E9EC'
    },
    '&::after': {
        top: -16,
        right: 6,
        border: '7px solid transparent',
        borderBottom: '9px solid #fff'
    }
});

const XMenuItem = XStyled(XLink)({
    paddingLeft: '8px',
    paddingRight: '8px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    width: 230,
    height: 28,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#525f7f',
    lineHeight: '28px',
    '&:hover': {
        backgroundColor: '#f6f9fc',
        color: '#525f7f'
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