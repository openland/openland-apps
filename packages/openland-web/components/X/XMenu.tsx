import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { XCard } from './XCard';
import { XLink } from './XLink';

const menuShifting = glamor.keyframes({
    '0%': { 
        opacity: 0,
        transformOrigin: '100% 0%',
        transform: 'scale(0, 0)'
    },
    '100%': {
        opacity: 1, 
        transformOrigin: '100% 0%',
        transform: 'scale(1, 1)' 
    }
});

const XMenuDiv = Glamorous(XCard)({
    marginTop: 13,
    marginLeft: 15,
    position: 'relative',
    overflow: 'visible',
    border: 'none',
    animationDuration: '.3s',
    animationName: menuShifting,
    animationFillMode: 'both',
    animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    '&::before, &::after': {
        content: `''`,
        display: 'block',
        width: 0,
        height: 0,
        background: 'transparent',
        position: 'absolute',
        right: 'auto',
        bottom: 'auto',
    },
    '&::before': {
        top: -18,
        left: 5,
        border: '8px solid transparent',
        borderBottom: '10px solid #E6E9EC'
    },
    '&::after': {
        top: -15,
        left: 6,
        border: '7px solid transparent',
        borderBottom: '9px solid #fff'
    }
});

const XMenuItem = Glamorous(XLink)({
    paddingLeft: 8,
    paddingRight: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderRadius: 4,
    width: 100,
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
        );
    }
}