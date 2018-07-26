import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import XStyles from 'openland-x/XStyles';

interface SidebarContainerProps {
    width?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
}

const SidebarContainer = Glamorous.div<SidebarContainerProps>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    width: props.width ? props.width : '100%',
    paddingRight: props.paddingRight ? props.paddingRight : 8,
    paddingLeft: props.paddingLeft ? props.paddingLeft : 8,
    paddingTop: props.paddingTop ? props.paddingTop : undefined,
}));

const SidebarHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    paddingTop: XStyles.paddings.large,
    paddingBottom: XStyles.paddings.large,
    flexShrink: 0,

    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.11,
    letterSpacing: -0.2,
    color: '#334562'
    // ...XStyles.text.h600
});

export const SidebarItem = Glamorous(XLink)({
    ...XStyles.text.m500,
    lineHeight: '40px',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    '&.is-active': {
        color: XStyles.color.accent
    }
});

export const SidebarSubItem = Glamorous(XLink)({
    ...XStyles.text.m500,
    lineHeight: '40px',
    paddingLeft: 40,
    paddingRight: XStyles.paddings.large,
    '&.is-active': {
        color: XStyles.color.accent
    }
});

interface SidebarProps {
    title: string;
    width?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
}

export class Sidebar extends React.Component<SidebarProps> {
    static Item = SidebarItem;
    static Subitem = SidebarSubItem;

    render() {
        const { title, children, ...other } = this.props;

        return (
            <SidebarContainer {...other}>
                <SidebarHeader>{title}</SidebarHeader>
                {children}
            </SidebarContainer>
        );
    }
}