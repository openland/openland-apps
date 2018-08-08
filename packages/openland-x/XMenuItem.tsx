import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { XPopperContent } from 'openland-x/popper/XPopperContent';

type XMenuItemStyle = 'danger' | 'primary-sky-blue' | 'default';

interface XMenuItemProps extends XLinkProps {
    style?: XMenuItemStyle;
    icon?: string | any;
    iconRight?: string | any;
}

let XMenuItemColorStyles = styleResolver({
    'default': {
        color: '#334562',
        '& i': {
            color: '#bcc3cc'
        },
        ':hover': {
            color: '#6b50ff',
            backgroundColor: '#f8f8fb',
            '& i': {
                color: 'rgba(107, 80, 255, 0.5)'
            }
        }
    },
    'primary-sky-blue': {
        color: '#334562',
        '& i': {
            color: '#bcc3cc'
        },
        ':hover': {
            color: '#1790ff',
            backgroundColor: '#f3f9ff',
            '& i': {
                color: 'rgba(23, 144, 255, 0.5)'
            }
        }
    },
    'danger': {
        color: '#d75454',
        '& i': {
            color: '#d75454'
        },
        ':hover': {
            color: '#d75454',
            backgroundColor: '#fdf6f6',
            '& i': {
                color: '#d75454'
            }
        }
    }
});

const XMenuItemStyled = Glamorous(XLink)<{ colorTheme?: XMenuItemStyle }>([
    (props) => ({
        height: 40,
        flexShrink: 0,
        padding: '0 16px',
        display: 'flex',
    }),
    (props) => XMenuItemColorStyles(props.colorTheme)
]);

const XMenuItemIcon = Glamorous(XIcon)({
    fontSize: 24,
    lineHeight: '40px',
    '&.icon-left': {
        marginLeft: -3,
        marginRight: 10
    },
    '&.icon-right': {
        marginRight: -8,
        marginLeft: 10
    }
});

const XMenuItemText = Glamorous.div({
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '24px',
    padding: '7px 0 9px',
    fontWeight: 500,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
});

export class XMenuItem extends React.Component<XMenuItemProps> {
    render() {
        return (
            <XMenuItemStyled
                {...this.props}
                colorTheme={this.props.style}
            >
                {this.props.icon && (
                    typeof(this.props.icon) === 'string'
                    ? <XMenuItemIcon icon={this.props.icon} className="icon icon-left" />
                    : this.props.icon
                )}
                <XMenuItemText>
                    {this.props.children}
                </XMenuItemText>
                {this.props.iconRight && (
                    typeof(this.props.iconRight) === 'string'
                    ? <XMenuItemIcon icon={this.props.iconRight} className="icon icon-right" />
                    : this.props.iconRight
                )}
            </XMenuItemStyled>
        );
    }
}

export const XMenuItemWrapper = Glamorous.div({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    paddingLeft: '16px',
    paddingRight: '16px',
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',

    '& > *': {
        width: '100%',
        minHeight: '100%'
    },

    '&:hover': {
        backgroundColor: '#f3f9ff',
        '& span': {
            color: '#1790ff!important',
        }
    }
});

export const XMenuItemSeporator = Glamorous.div({
    height: 1,
    background: '#f1f2f5',
    margin: '4px 0',
});

export const XMenuVertical = Glamorous(XPopperContent)({
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
});