import * as React from 'react';
import { css } from 'linaria';
import { XLink } from 'openland-x/XLink';
import { XScrollView2 } from 'openland-x/XScrollView2';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { findChild } from './utils';

const SidebarItemIcon = css`
    padding: 12px 15px 12px 46px !important;
`;

const SidebarItemWrapper = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000 !important;
    padding: 12px 15px 12px 16px;
    position: relative;
    background: #fff;

    &.is-active {
        background: #f9f9f9;
        cursor: default !important;

        &:hover {
            cursor: default !important;
        }
    }

    & .icon-wrapper {
        position: absolute;
        top: 0;
        left: 16px;
        bottom: 0px;
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        & svg * {
            opacity: 0.25;
            fill: #000;
        }
    }

    & span {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;
        padding-right: 10px;
    }

    & .right-icon path:last-child {
        opacity: 0.2;
        fill: #000;
    }

    &:hover {
        background: #f9f9f9;
        cursor: pointer !important;
    }
`;

interface SidebarItemProps {
    title: string;
    path: string;
    icon?: any;
    onClick?: () => void;
}

export const SidebarItem = (props: SidebarItemProps) => (
    <XLink
        path={props.path}
        className={`${SidebarItemWrapper} ${props.icon !== undefined && SidebarItemIcon}`}
        onClick={props.onClick}
    >
        {props.icon !== undefined && <div className="icon-wrapper">{props.icon}</div>}
        <span>{props.title}</span>
        <RightIcon className="right-icon" />
    </XLink>
);

const MobileMenuButton = css`
    display: flex;
    width: 140px;
    height: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
    font-size: 18px;
    font-weight: 600;
    color: #000000;
    position: absolute;
    left: calc(50% - 70px);
    top: calc(50% - 10px);
    & > .select-icon {
        transform: rotate(90deg);
        margin-left: 6px;
    }
`;

const LinksWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #fff;
    @media (max-width: 700px) {
        position: absolute;
        z-index: 1;
        overflow: hidden;
        height: 0;
        top: 53px;
        width: 100%;

        &.show {
            height: auto;
            overflow: visible;

            &::before {
                content: '';
                display: block;
                position: absolute;
                width: 100%;
                height: calc(100vh - 53px);
                background-color: rgba(0, 0, 0, 0.2);
            }
        }
    }
`;

const MenuWrapper = css`
    width: 344px;
    height: 100%;
    border-right: 1px solid #ececec;
    background-color: #ffffff;
    flex-shrink: 0;
    position: relative;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
    @media (max-width: 700px) {
        width: 100%;
        display: flex;
        height: 53px;
        border-right: none;
        border-bottom: 1px solid #ececec;
    }
`;

const SidebarHeader = css`
    display: flex;
    padding: 14px 15px 19px 17px;

    & > span {
        flex: 1;
        font-size: 22px;
        line-height: 28px;
        letter-spacing: 0;
        font-weight: 400;
        color: #000;
        opacity: 0.9;
    }
    @media (max-width: 700px) {
        width: 100%;
        justify-content: space-between;
        padding: 10px 15px 19px 17px;
    }
`;

interface SidebarProps {
    route: string;
    title: string;
    rightContent?: any;
}

export const Sidebar = React.memo<SidebarProps>(props => {
    if (!canUseDOM) {
        return null;
    }

    const [showMenu, handler] = React.useState(false);

    const menuHandler = () => {
        handler(!showMenu);
    };

    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    const switcher = (
        <div className={MobileMenuButton} onClick={menuHandler}>
            <span>{props.route}</span>
            <RightIcon className="select-icon" />
        </div>
    );

    return (
        <>
            <div className={SidebarHeader}>
                <span>{props.title}</span>
                {props.rightContent !== undefined && props.rightContent}
            </div>
            {width <= 700 && switcher}
            <div className={`${LinksWrapper} ${showMenu && 'show'}`}>{props.children}</div>
        </>
    );
});

class Menu extends React.PureComponent {
    static defaultProps = {
        _isSidebar: true,
    };

    render() {
        return <div className={MenuWrapper}>{this.props.children}</div>;
    }
}

const ContainerStyle = css`
    width: calc(100% - 344px);
    height: 100%;
    position: relative;
    @media (max-width: 1100px) {
        width: calc(100% - 300px);
    }
    @media (max-width: 950px) {
        width: calc(100% - 230px);
    }
    @media (max-width: 700px) {
        width: 100%;
        height: calc(100% - 53px);
    }
`;

class Container extends React.PureComponent {
    static defaultProps = {
        _isContainer: true,
    };

    render() {
        const { props } = this;
        return (
            <div className={ContainerStyle}>
                <XScrollView2 height="100%">{props.children}</XScrollView2>
            </div>
        );
    }
}

const RootWrapperStyle = css`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

export class MainLayout extends React.PureComponent {
    static Menu = Menu;
    static Content = Container;
    render() {
        const { props } = this;
        const menu = findChild(props.children, '_isSidebar');
        const content = findChild(props.children, '_isContainer');

        return (
            <div className={RootWrapperStyle}>
                {menu}
                {content}
            </div>
        );
    }
}
