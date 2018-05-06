import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';

export const XTabItem = Glamorous(XLink)<{ asArrow?: boolean }>((props) => ({
    cursor: 'pointer',
    userSelect: 'none',
    flexGrow: 1,
    fontSize: 14,
    fontWeight: 600,
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
                right: -3,
                top: -11,
                border: '5px solid transparent',
                borderBottom: '9px solid #6A63ED'
            }
        },
        '&::after': {
            right: -42,
            top: -4,
            border: '28px solid transparent',
            borderLeft: '15px solid #fff',
        },
        '&::before': {
            right: -43,
            top: -4,
            border: '28px solid transparent',
            borderLeft: '15px solid #E5EBF2',
        }
    },
    '& > .top-shadow': {
        display: 'none'
    },
    '&::after': {
        right: -42,
        top: -4,
        border: '28px solid transparent',
        borderLeft: '15px solid #f6f9fc',
    },
    '&::before': {
        right: -43,
        top: -4,
        border: '28px solid transparent',
        borderLeft: '15px solid #E5EBF2',
    }
}));

interface XTabItemDivProps extends XLinkProps {
    asArrow?: boolean;
}

class XTabItemDiv extends React.Component<XTabItemDivProps> {
    render() {
        return (
            <XTabItem {...this.props}>
                <div className="top-shadow" />
                {this.props.children}
            </XTabItem>
        );
    }
}

const XTabsDiv = Glamorous.div<{ inline?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    boxShadow: props.inline !== true ? '0 7px 14px 0 rgba(50, 50, 93, .1), 0 3px 6px 0 rgba(0, 0, 0, .07)' : undefined,
    borderRadius: props.inline !== true ? 4 : 0,
    borderBottomColor: props.inline ? '#E5EBF2' : undefined,
    borderBottomStyle: props.inline ? 'solid' : undefined,
    borderBottomWidth: props.inline ? '1px' : undefined,
    borderTopColor: props.inline ? '#E5EBF2' : undefined,
    borderTopStyle: props.inline ? 'solid' : undefined,
    borderTopWidth: props.inline ? '1px' : undefined,
    overflow: 'hidden',
    zIndex: 0
}));

export class XTab extends React.Component<{ inline?: boolean }> {

    static Item = XTabItemDiv;

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <XTabsDiv inline={this.props.inline}>
                {this.props.children}
            </XTabsDiv>
        );
    }
}