import * as React from 'react';
import Glamorous from 'glamorous';
import XStyled from './XStyled';
import { XLink } from './XLink';

interface XSwitcherProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center',
    children: any
}

const XSwitcherWrapper = Glamorous.div<{ alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' }>((props) => ({
    display: 'flex',
    alignSelf: props.alignSelf,
    paddingTop: 3,
    paddingLeft: 9,
    paddingRight: 9,
    paddingBottom: 2,
    borderRadius: 4,
    boxSizing: 'border-box',
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .1), 0 2px 5px 0 rgba(50, 50, 93, .08), 0 1px 1.5px 0 rgba(0, 0, 0, .07), 0 1px 2px 0 rgba(0, 0, 0, .08), 0 0 0 0 transparent'
}))

const XSwitcherItem = XStyled(XLink)({
    fontSize: 14,
    lineHeight: 1.6,
    fontWeight: 500,
    color: '#6b7c93',
    cursor: 'pointer',
    marginRight: 8,
    '&:last-child': {
        marginRight: 0
    },
    '&.is-active': {
        color: '#6772e5'
    }
})

export class XSwitcher extends React.Component<XSwitcherProps> {

    static Item = XSwitcherItem

    render() {
        return (
            <XSwitcherWrapper alignSelf={this.props.alignSelf}>
                {this.props.children}
            </XSwitcherWrapper>
        )
    }
}