import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';

interface XSwitcherProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    children: any;
    fieldStyle?: boolean;
    flatStyle?: boolean;
}

const XSwitcherWrapper = Glamorous.div<XSwitcherProps>((props) => ({
    display: 'flex',
    alignSelf: props.alignSelf,
    paddingTop: props.fieldStyle ? 0 : 3,
    paddingLeft: props.flatStyle ? 0 : props.fieldStyle ? 0 : 9,
    paddingRight: props.flatStyle ? 0 : props.fieldStyle ? 0 : 9,
    paddingBottom: props.fieldStyle ? 0 : 2,
    borderRadius: 4,
    overflow: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    boxShadow: props.flatStyle ? undefined : '0 0 0 1px rgba(50, 50, 93, .1), 0 2px 5px 0 rgba(50, 50, 93, .08), 0 1px 1.5px 0 rgba(0, 0, 0, .07), 0 1px 2px 0 rgba(0, 0, 0, .08), 0 0 0 0 transparent',
    '& > a': {
        paddingLeft: props.flatStyle ? undefined : 14,
        paddingRight: props.flatStyle ? undefined : 14,
        height: props.fieldStyle ? 32 : undefined,
        fontWeight: 'normal !important',
        fontStyle: 'normal !important',
        fontStretch: 'normal !important',
        lineHeight: props.fieldStyle ? '2.29 !important' : 1.6,
        letterSpacing: 'normal !important',
        textAlign: 'center !important',
        margin: '0 !important',
        marginRight: props.flatStyle ? '20px !important' : undefined,
        color: props.fieldStyle ? '#182642 !important' : '#6b7c93',
        '&:hover': {
            backgroundColor: props.fieldStyle ? '#F5F6F8' : undefined
        },
        '&.is-active': {
            color: props.fieldStyle ? '#fff !important' : '#6772e5',
            backgroundColor: props.fieldStyle ? '#4428e0 !important' : undefined,
            borderBottom: props.flatStyle ? '2px solid #6772e5' : undefined,

            '&:hover': {
                backgroundColor: props.fieldStyle ? '#4428e0 !important' : undefined,
            }
        }
    }
}));

const XSwitcherItemStyle = Glamorous(XLink)<{ alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' }>((props) => ({
    fontSize: 14,
    fontWeight: 200,
    cursor: 'pointer',
    marginRight: 8,
    alignSelf: props.alignSelf,
    '&:last-child': {
        marginRight: 0
    },
    '&.is-active': {
        fontWeight: 600,
    }
}));

interface XSwitcherItemProps extends XLinkProps {
    children: any;
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    count?: string | number;
}

function XSwitcherItem(props: XSwitcherItemProps) {
    const { alignSelf, children, count, ...other } = props;
    return (
        <XSwitcherItemStyle alignSelf={props.alignSelf} {...other}>
            {children}
            {count !== undefined && <span>{` (${count})`}</span>}
        </XSwitcherItemStyle>
    );
}

export class XSwitcher extends React.Component<XSwitcherProps> {

    static Item = XSwitcherItem;

    render() {
        const {children, ...other} = this.props;
        return (
            <XSwitcherWrapper {...other}>
                {children}
            </XSwitcherWrapper>
        );
    }
}