import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { XPopperContent } from 'openland-x/popper/XPopperContent';
import RightIcon from 'openland-icons/ic-right-1.svg';
import DropdownChatIcon from 'openland-icons/ic-dropdown-message.svg';
import DropdownRoomIcon from 'openland-icons/ic-dropdown-channel.svg';
import DropdownCommunityIcon from 'openland-icons/ic-dropdown-community.svg';
import DropdownOrganizationIcon from 'openland-icons/ic-dropdown-organization.svg';

type XMenuItemStyle = 'default' | 'danger' | 'gray';

interface XMenuItemProps extends XLinkProps {
    style?: XMenuItemStyle;
    icon?: string | any;
    iconRight?: string | any;
}

let XMenuItemColorStyles = styleResolver({
    default: {
        color: '#000000',
        '& i': {
            color: 'rgba(0, 0, 0, 0.25)',
        },
        '& svg *': {
            fill: 'rgba(0, 0, 0, 0.25)',
        },
        ':hover': {
            color: '#1790ff',
            backgroundColor: 'rgba(23, 144, 255, 0.05)',
            '& i': {
                color: 'rgba(23, 144, 255, 0.5)',
            },
            '& svg *': {
                fill: 'rgba(23, 144, 255, 0.5)',
            },
        },
    },
    danger: {
        color: '#d75454',
        '& i': {
            color: '#d75454',
        },
        '& svg *': {
            fill: '#d75454',
        },
        ':hover': {
            color: '#d75454',
            backgroundColor: '#fdf6f6',
            '& i': {
                color: '#d75454',
            },
            '& svg *': {
                fill: '#d75454',
            },
        },
    },
    gray: {
        color: 'rgba(0, 0, 0, 0.8)',
        '&:hover': {
            color: 'rgba(0, 0, 0, 0.8)',
            backgroundColor: '#f6f6f6',
        },
    },
});

const XMenuItemStyled = Glamorous(XLink)<{ colorTheme?: XMenuItemStyle }>([
    {
        height: 40,
        flexShrink: 0,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            textDecoration: 'none',
        },
        '& .svg-icon-left': {
            marginRight: 10,
        },
    },
    props => XMenuItemColorStyles(props.colorTheme),
]);

const XMenuItemIcon = Glamorous(XIcon)({
    fontSize: 24,
    lineHeight: '40px',
    '&.icon-left': {
        marginLeft: -3,
        marginRight: 10,
    },
    '&.icon-right': {
        marginRight: -8,
        marginLeft: 10,
    },
});

const XMenuItemText = Glamorous.div({
    flexGrow: 1,
    fontSize: 14,
    lineHeight: '24px',
    padding: '7px 0 9px',
    fontWeight: 400,
    letterSpacing: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
});

export class XMenuItem extends React.Component<XMenuItemProps> {
    CustomIcons = [
        'x-right',
        'x-dropdown-chat',
        'x-dropdown-room',
        'x-dropdown-community',
        'x-dropdown-organization',
    ];

    getCustomIcon(i: string, position?: string) {
        switch (i) {
            case this.CustomIcons[0]:
                return <RightIcon className={position ? 'svg-icon-' + position : undefined} />;
            case this.CustomIcons[1]:
                return (
                    <DropdownChatIcon className={position ? 'svg-icon-' + position : undefined} />
                );
            case this.CustomIcons[2]:
                return (
                    <DropdownRoomIcon className={position ? 'svg-icon-' + position : undefined} />
                );
            case this.CustomIcons[3]:
                return (
                    <DropdownCommunityIcon
                        className={position ? 'svg-icon-' + position : undefined}
                    />
                );
            case this.CustomIcons[4]:
                return (
                    <DropdownOrganizationIcon
                        className={position ? 'svg-icon-' + position : undefined}
                    />
                );
            default:
                return undefined;
        }
    }

    isCustomIcon(i: string) {
        return this.CustomIcons.indexOf(i) > -1;
    }

    render() {
        const { children, icon, iconRight } = this.props;
        return (
            <XMenuItemStyled {...this.props} colorTheme={this.props.style}>
                {icon && this.isCustomIcon(icon) && this.getCustomIcon(icon, 'left')}
                {icon && typeof icon === 'string' && !this.isCustomIcon(icon) && (
                    <XMenuItemIcon icon={icon} className="icon icon-left" />
                )}
                {icon && typeof icon !== 'string' && !this.isCustomIcon(icon) && icon}

                <XMenuItemText>{children}</XMenuItemText>

                {iconRight && this.isCustomIcon(iconRight) && this.getCustomIcon(iconRight)}
                {iconRight && typeof iconRight === 'string' && !this.isCustomIcon(iconRight) && (
                    <XMenuItemIcon icon={iconRight} className="icon icon-right" />
                )}
                {iconRight &&
                    typeof iconRight !== 'string' &&
                    !this.isCustomIcon(iconRight) &&
                    iconRight}
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
        minHeight: '100%',
    },

    '& label': {
        minHeight: 40,
    },

    '&:hover': {
        backgroundColor: '#f3f9ff',
        '& span': {
            color: '#1790ff!important',
        },
    },
});

export const XMenuTitle = Glamorous.div({
    height: 40,
    color: '#99a2b0',
    padding: '10px 16px',
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: 0,
    fontWeight: 700,
});

export const XMenuItemSeparator = Glamorous.div<{ marginTop?: number; marginBottom?: number }>(
    props => ({
        height: 1,
        background: '#ececec',
        marginTop: props.marginTop || 4,
        marginBottom: props.marginBottom || 4,
        marginLeft: 0,
        marginRight: 0,
    }),
);

export const XMenuVertical = Glamorous<{ paddingTop?: number; paddingBottom?: number }>(
    XPopperContent,
)(props => ({
    paddingTop: props.paddingTop || 8,
    paddingBottom: props.paddingBottom || 8,
    paddingLeft: 0,
    paddingRight: 0,
}));
