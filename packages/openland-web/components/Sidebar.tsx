import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from 'openland-x/XLink';
import RightIcon from './icons/ic-arrow-rignt.svg';

interface SidebarContainerProps {
    width?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
}

const SidebarContainer = Glamorous.div<SidebarContainerProps>(props => ({
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
    flexShrink: 0,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 21,
    paddingRight: 16,

    fontSize: 22,
    fontWeight: 400,
    lineHeight: '24px',
    color: 'rgba(0, 0, 0, 0.9)',
});

interface SidebarItemProps extends XLinkProps {
    arrow?: boolean;
    children?: any;
}

const SidebarItemWrapper = Glamorous(XLink)<SidebarItemProps>(props => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    fontSize: 14,
    lineHeight: '20px',
    color: '#000000',
    paddingLeft: 16,
    paddingRight: props.arrow ? 15 : 16,
    '&:hover': {
        color: '#000000',
        backgroundColor: '#f9f9f9',
    },
    '&.is-active': {
        color: '#000000',
        backgroundColor: '#f9f9f9',
        cursor: 'default',
    },
    '& .arrow path:last-child': {
        opacity: 0.2,
        fill: '#000000',
    },
}));

export const SidebarItem = (props: SidebarItemProps) => {
    let { children, ...others } = props;

    return (
        <SidebarItemWrapper {...others}>
            {children}
            {props.arrow && <RightIcon className="arrow" />}
        </SidebarItemWrapper>
    );
};

export const SidebarSubItem = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    fontSize: 14,
    lineHeight: '20px',
    color: '#000000',
    paddingLeft: 36,
    paddingRight: 24,
    '&:hover': {
        color: '#000000',
        backgroundColor: '#f9f9f9',
    },
    '&.is-active': {
        color: '#000000',
        backgroundColor: '#f9f9f9',
        cursor: 'default',
    },
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
