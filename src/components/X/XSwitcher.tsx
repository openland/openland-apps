import * as React from 'react';
import Glamorous from 'glamorous';
import XStyled from './XStyled';
import { XLink } from './XLink';

interface XSwitcherProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center',
    children: any,
    fieldStyle?: boolean
}

const XSwitcherWrapper = Glamorous.div<XSwitcherProps>((props) => ({
    display: 'flex',
    alignSelf: props.alignSelf,
    paddingTop: props.fieldStyle ? 0 : 3,
    paddingLeft: props.fieldStyle ? 0 : 9,
    paddingRight: props.fieldStyle ? 0 : 9,
    paddingBottom: props.fieldStyle ? 0 : 2,
    borderRadius: 4,
    overflow: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .1), 0 2px 5px 0 rgba(50, 50, 93, .08), 0 1px 1.5px 0 rgba(0, 0, 0, .07), 0 1px 2px 0 rgba(0, 0, 0, .08), 0 0 0 0 transparent',
    '& > a': {
        paddingLeft: 14,
        paddingRight: 14,
        height: props.fieldStyle ? 32 : undefined,
        fontWeight: 'normal !important',
        fontStyle: 'normal !important',
        fontStretch: 'normal !important',
        lineHeight: props.fieldStyle ? '2.29 !important' : undefined,
        letterSpacing: 'normal !important',
        textAlign: 'center !important',
        margin: '0 !important',
        color: props.fieldStyle ? '#182642 !important' : undefined,
        '&:hover': {
            backgroundColor: props.fieldStyle ? '#F5F6F8' : undefined
        },
        '&.is-active': {
            color: props.fieldStyle ? '#fff !important' : undefined,
            backgroundColor: props.fieldStyle ? '#4428e0 !important' : undefined,

            '&:hover': {
                backgroundColor: props.fieldStyle ? '#4428e0 !important' : undefined,
            }
        }
    }
}))

const XSwitcherItem = XStyled(XLink)({
    fontSize: 14,
    lineHeight: 1.6,
    fontWeight: 200,
    color: '#6b7c93',
    cursor: 'pointer',
    marginRight: 8,
    '&:last-child': {
        marginRight: 0
    },
    '&.is-active': {
        color: '#6772e5',
        fontWeight: 600,
    }
})

export class XSwitcher extends React.Component<XSwitcherProps> {

    static Item = XSwitcherItem

    render() {
        return (
            <XSwitcherWrapper alignSelf={this.props.alignSelf} fieldStyle={this.props.fieldStyle}>
                {this.props.children}
            </XSwitcherWrapper>
        )
    }
}