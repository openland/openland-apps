import * as React from 'react';
import { css } from 'linaria';
import { XLink } from 'openland-x/XLink';
import { XScrollView2 } from 'openland-x/XScrollView2';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { findChild } from './utils';
import { XView } from 'react-mental';
import { MobileSidebarContext } from 'openland-web/components/Scaffold';

const MenuItemIcon = css`
    padding: 12px 15px 12px 46px !important;
`;

const MenuItemWrapper = css`
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

interface MenuItemProps {
    title: string;
    path: string;
    icon?: any;
    onClick?: () => void;
}

export const MenuItem = ({ path, icon, onClick, title }: MenuItemProps) => (
    <XLink path={path} className={`${MenuItemWrapper} ${icon && MenuItemIcon}`} onClick={onClick}>
        {icon && <div className="icon-wrapper">{icon}</div>}
        <span>{title}</span>
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

const menuWrapperClassName = css`
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

const MenuHeader = css`
    display: flex;
    padding: 14px 15px 19px 17px;

    @media (max-width: 700px) {
        width: 100%;
        justify-content: space-between;
        padding: 10px 15px 19px 17px;
    }
`;

interface MenuProps {
    isMain?: boolean;
    title?: string;
    route?: string;
    rightContent?: any;
    leftContent?: any;
}

const titleClassName = css`
    flex: 1;
    font-size: 22px;
    line-height: 28px;
    letter-spacing: 0;
    font-weight: 400;
    color: #000;
    opacity: 0.9;
`;

const Title = ({ children, onClick }: { children: string; onClick: (event: any) => void }) => {
    return (
        <span onClick={onClick} className={titleClassName}>
            {children}
        </span>
    );
};

export const Menu = React.memo<MenuProps>(props => {
    if (!canUseDOM) {
        return null;
    }

    const { showSidebar, setShowSidebar, showMenu, setShowMenu, isMobile } = React.useContext(
        MobileSidebarContext,
    );

    const onClick = () => {
        if (isMobile) {
            setShowMenu(!showMenu);
        }
    };

    const { title, rightContent, children, isMain } = props;

    if (isMain) {
        return (
            <XView position="fixed" zIndex={100} left={showSidebar ? 0 : -300}>
                {children}
            </XView>
        );
    }

    return (
        <>
            <div className={isMobile ? MobileMenuButton : MenuHeader}>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setShowSidebar(!showSidebar);
                    }}
                >
                    burger
                </div>
                {title && <Title onClick={onClick}>{title}</Title>}
                {rightContent && <RightIcon className="select-icon" />}
            </div>

            <div className={`${LinksWrapper} ${showMenu && 'show'}`}>{children}</div>
        </>
    );
});

class MenuWrapper extends React.PureComponent {
    static defaultProps = {
        _isMenu: true,
    };

    render() {
        return <div className={menuWrapperClassName}>{this.props.children}</div>;
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
        const { children } = this.props;
        return (
            <div className={ContainerStyle}>
                <XScrollView2 height="100%">{children}</XScrollView2>
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
    static Menu = MenuWrapper;
    static Content = Container;
    render() {
        const { children } = this.props;
        const menu = findChild(children, '_isMenu');
        const content = findChild(children, '_isContainer');

        return (
            <div className={RootWrapperStyle}>
                {menu}
                {content}
            </div>
        );
    }
}
