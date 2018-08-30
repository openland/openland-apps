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
    paddingRight: props.paddingRight ? props.paddingRight : 0,
    paddingLeft: props.paddingLeft ? props.paddingLeft : 0,
    paddingTop: props.paddingTop ? props.paddingTop : undefined,
}));

const SidebarHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: XStyles.paddings.large,
    paddingRight: XStyles.paddings.large,
    paddingTop: XStyles.paddings.large,
    paddingBottom: XStyles.paddings.xlarge,
    flexShrink: 0,

    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.3,
    color: '#334562'
    // ...XStyles.text.h600
});

export const SidebarItem = Glamorous(XLink)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.14,
    letterSpacing: -0.2,
    color: '#334562',
    paddingLeft: 16,
    paddingRight: 16,
    '&:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)'
    },
    '&.is-active': {
        color: '#1790ff',
        backgroundColor: 'rgba(23, 144, 255, 0.05)'
    }
});

export const SidebarSubItem = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.14,
    letterSpacing: -0.2,
    color: '#5c6a81',
    paddingLeft: 36,
    paddingRight: 16,
    '&:hover': {
        backgroundColor: 'rgba(23, 144, 255, 0.05)'
    },
    '&.is-active': {
        color: '#1790ff',
        backgroundColor: 'rgba(23, 144, 255, 0.05)'
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