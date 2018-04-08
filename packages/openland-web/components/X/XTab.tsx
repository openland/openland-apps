import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from './XLink';

export const XTabItem = Glamorous(XLink)<{asArrow?: boolean}>((props) => ({
    cursor: 'pointer',
    userSelect: 'none',
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 500,
    color: '#525f7f',
    backgroundColor: '#f6f9fc',
    paddingTop: 16,
    paddingBottom: 12,
    textAlign: 'center',
    boxShadow: '-1px 0 #e6ebf1',
    position: 'relative',
    '&::after, &::before': {
        content: props.asArrow ? `''` : undefined,
        display: 'block',
        position: 'absolute',
        zIndex: 1
    },
    '&.is-active': {
        color: '#6772e5',
        backgroundColor: '#fff',
        '& > .top-shadow': {
            display: 'block',
            width: '100%',
            height: 3,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: '#6A63ED',
            '&::after': {
                content: props.asArrow ? `''` : undefined,
                display: 'block',
                position: 'absolute',
                zIndex: 2,
                right: -4,
                top: -12,
                border: '7px solid transparent',
                borderBottom: '8px solid #6A63ED'
            }
        },
        '&::after': {
            right: -50,
            top: -4,
            border: '28px solid transparent',
            borderLeft: '24px solid #fff',
        },
        '&::before': {
            right: -51,
            top: -4,
            border: '28px solid transparent',
            borderLeft: '24px solid #E8EDF4',
        }
    },
    '& > .top-shadow': {
        display: 'none'
    },
    '&::after': {
        right: -50,
        top: -4,
        border: '28px solid transparent',
        borderLeft: '24px solid #f6f9fc',
    },
    '&::before': {
        right: -51,
        top: -4,
        border: '28px solid transparent',
        borderLeft: '24px solid #E8EDF4',
    }
}));

interface XTabItemDivProps extends XLinkProps {
    asArrow?: boolean;
}

class XTabItemDiv extends React.Component<XTabItemDivProps> {
    render() {
        return (
            <XTabItem {...this.props}>
                <div className="top-shadow"/>
                {this.props.children}
            </XTabItem>
        );
    }
}

const XTabsDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 7px 14px 0 rgba(50, 50, 93, .1), 0 3px 6px 0 rgba(0, 0, 0, .07)',
    borderRadius: 4,
    overflow: 'hidden'
});

export class XTab extends React.Component {

    static Item = XTabItemDiv;

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <XTabsDiv>
                {this.props.children}
            </XTabsDiv>
        );
    }
}