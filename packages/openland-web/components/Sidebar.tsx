import * as React from 'react';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import { XView } from 'react-mental';
import { css } from 'linaria';

const ArrowIconClass = css`
    path:last-child {
        opacity: 0.2;
        fill: #000000;
    }
`;

interface SidebarItemProps {
    path?: string;
    arrow?: boolean;
    children?: any;
}

export const SidebarItem = (props: SidebarItemProps) => (
    <XView
        as="a"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height={44}
        fontSize={14}
        lineHeight="20px"
        color="#000000"
        paddingLeft={16}
        paddingRight={15}
        hoverColor="#000000"
        hoverBackgroundColor="#f9f9f9"
        selectedColor="#000000"
        selectedBackgroundColor="#f9f9f9"
        path={props.path}
        linkSelectable={true}
        hoverTextDecoration="none"
    >
        <XView flexGrow={1}>{props.children}</XView>
        {props.arrow && <RightIcon className={ArrowIconClass} />}
    </XView>
);

interface SidebarSubItemProps {
    path?: string;
    children?: any;
}

export const SidebarSubItem = (props: SidebarSubItemProps) => (
    <XView
        as="a"
        alignItems="flex-start"
        justifyContent="center"
        height={40}
        fontSize={14}
        lineHeight="20px"
        color="#000000"
        paddingLeft={36}
        paddingRight={24}
        hoverColor="#000000"
        hoverBackgroundColor="#f9f9f9"
        selectedColor="#000000"
        selectedBackgroundColor="#f9f9f9"
        path={props.path}
        linkSelectable={true}
        hoverTextDecoration="none"
    >
        {props.children}
    </XView>
);

interface SidebarProps {
    title: string;
}

export class Sidebar extends React.Component<SidebarProps> {
    static Item = SidebarItem;
    static Subitem = SidebarSubItem;

    render() {
        return (
            <XView flexDirection="column" width="100%">
                <XView
                    flexDirection="row"
                    flexShrink={0}
                    paddingTop={16}
                    paddingLeft={16}
                    paddingBottom={21}
                    paddingRight={16}
                    fontSize={22}
                    lineHeight="24px"
                    color="rgba(0, 0, 0, 0.9)"
                >
                    {this.props.title}
                </XView>
                {this.props.children}
            </XView>
        );
    }
}
