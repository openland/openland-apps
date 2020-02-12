import * as React from 'react';
import { XView } from 'react-mental';
import { XLink, XLinkProps } from 'openland-x/XLink';

type XMenuItemStyle = 'default' | 'danger';

interface XMenuItemProps extends XLinkProps {
    style?: XMenuItemStyle;
    icon?: string | any;
    iconRight?: string | any;
    customContent?: boolean;
}

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
            <XLink {...this.props}>
                <XView flexDirection="row">
                    {icon && <IconWrapper>{icon}</IconWrapper>}
                    {customContent ? children : <XView>{children}</XView>}
                    {iconRight && <IconWrapper>{iconRight}</IconWrapper>}
                </XView>
            </XLink>
        );
    }
}
