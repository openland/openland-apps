import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';

const SubHeaderWrapper = Glamorous.div({
    display: 'flex',
    background: '#f9fafb',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    padding: '18px 24px',
    position: 'relative',
});

const SubHeaderTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#5c6a81'
});

const SubHeaderCounter = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#5c6a81',
    opacity: 0.5,
    marginLeft: 3
});

export const XSubHeaderRight = Glamorous.div({
    position: 'absolute',
    top: 12,
    right: 14
});

const SubHeaderLink = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
    opacity: 0.5,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#5c6a81',
    '& svg': {
        marginRight: 4
    },
    '& svg *': {
        fill: '#5c6a81',
    },
    '& i': {
        fontSize: 20,
        marginRight: 4,
        color: '#5c6a81',
    },
    '&:hover': {
        opacity: 1,
        color: '#5c6a81',
        '& svg *': {
            opacity: 0.75,
        },
        '& i': {
            opacity: 0.75,
        },
    },
    '&:active': {
        opacity: 1,
        color: '#1790ff',
        '& svg *': {
            opacity: 0.5,
            fill: '#1790ff',
        },
        '& i': {
            opacity: 0.5,
            color: '#1790ff',
        },
    }
});

export class XSubHeaderLink extends React.Component<XLinkProps> {
    render() {
        return (
            <SubHeaderLink>
                {this.props.children}
            </SubHeaderLink>
        );
    }
}

export class XSubHeader extends React.Component<{ title: string, counter?: string | number }> {
    render() {
        return (
            <SubHeaderWrapper>
                <SubHeaderTitle>{this.props.title}</SubHeaderTitle>
                {this.props.counter && (<SubHeaderCounter>{this.props.counter}</SubHeaderCounter>)}
                {this.props.children}
            </SubHeaderWrapper>
        );
    }
}