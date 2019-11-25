import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XPopperContentDEPRECATED } from 'openland-x/popper/XPopperContent';

type XMenuItemStyle = 'default' | 'danger';

interface XMenuItemProps extends XLinkProps {
    style?: XMenuItemStyle;
    icon?: string | any;
    iconRight?: string | any;
    customContent?: boolean;
}

let XMenuItemColorStyles = styleResolver({
    default: {
        color: '#171B1F',
        ':hover': {
            color: '#171B1F',
            backgroundColor: '#F0F2F5',
        },
    },
    danger: {
        color: '#d75454',
        ':hover': {
            color: '#d75454',
            backgroundColor: '#fdf6f6',
        },
    },
});

const XMenuItemStyled = Glamorous(XLink)<{ colorTheme?: XMenuItemStyle }>([
    {
        // height: 40,
        flexShrink: 0,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    props => XMenuItemColorStyles(props.colorTheme),
]);

const XMenuItemText = Glamorous.div({
    flexGrow: 1,
    fontSize: 15,
    lineHeight: '24px',
    padding: '7px 0 9px',
    fontWeight: 400,
    letterSpacing: 0.35,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
});

const IconWrapper = (props: { children: any }) => (
    <XView
        minWidth={22}
        minHeight={22}
        marginRight={18}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
    >
        {props.children}
    </XView>
);

export class XMenuItem extends React.Component<XMenuItemProps> {
    render() {
        const { children, icon, iconRight, customContent } = this.props;
        return (
            <XMenuItemStyled {...this.props} colorTheme={this.props.style}>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                {customContent ? children : <XMenuItemText>{children}</XMenuItemText>}
                {iconRight && <IconWrapper>{iconRight}</IconWrapper>}
            </XMenuItemStyled>
        );
    }
}

export const XMenuVertical = Glamorous<{ paddingTop?: number; paddingBottom?: number }>(
    XPopperContentDEPRECATED,
)(props => ({
    paddingTop: props.paddingTop || 8,
    paddingBottom: props.paddingBottom || 8,
    paddingLeft: 0,
    paddingRight: 0,
}));
