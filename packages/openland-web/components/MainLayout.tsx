import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XScrollView2 } from 'openland-x/XScrollView2';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import { findChild } from './utils';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import BurgerIcon from 'openland-icons/landing/burger.svg';
import { XButton } from 'openland-x/XButton';
import { AdaptiveComponent } from 'openland-web/components/Adaptive';

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

const MenuItemIcon = css`
    padding: 12px 15px 12px 46px !important;
`;

export const MenuItem = ({ path, icon, onClick, title }: MenuItemProps) => (
    <XLink path={path} className={`${MenuItemWrapper} ${icon && MenuItemIcon}`} onClick={onClick}>
        {icon && <div className="icon-wrapper">{icon}</div>}
        <span>{title}</span>
        <RightIcon className="right-icon" />
    </XLink>
);

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

const titleClassName = css`
    font-size: 22px;
    line-height: 28px;
    letter-spacing: 0;
    font-weight: 400;
    color: #000;
    opacity: 0.9;
`;

const Title = ({ children, onClick }: { children: any; onClick?: (event: any) => void }) => {
    return (
        <div onClick={onClick} className={titleClassName}>
            {children}
        </div>
    );
};

const selectIconClassName = css`
    transform: rotate(90deg);
    margin-left: 6px;
`;

const SelectIcon = () => {
    return <RightIcon className={selectIconClassName} />;
};

const myBurgerIconClassName = css`
    display: flex;
    align-items: center;
    & svg {
        & * {
            fill: #2196f3;
        }
    }
`;

export const BurgerButton = () => {
    const { showSidebar, setShowSidebar } = React.useContext(MobileSidebarContext);

    return (
        <div
            className={myBurgerIconClassName}
            style={{ cursor: 'pointer' }}
            onClick={() => {
                setShowSidebar(!showSidebar);
            }}
        >
            <BurgerIcon />
        </div>
    );
};

const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
});

interface MenuProps {
    title?: string;
    route?: string;
    rightContent?: any;
    leftContent?: any;
}

const backgroundClassName = css`
    &::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const ShowMenuItems = ({ children }: { children: any }) => (
    <XView
        position="absolute"
        width="100%"
        zIndex={1}
        flexDirection="column"
        alignItems="stretch"
        backgroundColor="#fff"
        top={53}
        height="auto"
    >
        <div className={backgroundClassName}>{children}</div>
    </XView>
);

const HideMenuItems = ({ children }: { children: any }) => (
    <XView
        position="absolute"
        width="100%"
        zIndex={1}
        flexDirection="column"
        alignItems="stretch"
        backgroundColor="#fff"
        top={53}
        height={0}
        overflow="hidden"
    >
        <div className={backgroundClassName}>{children}</div>
    </XView>
);

export const Menu = React.memo<MenuProps>(props => {
    const { showMenu, setShowMenu, isMobile } = React.useContext(MobileSidebarContext);

    const onClick = () => {
        if (isMobile) {
            setShowMenu(!showMenu);
        }
    };

    const { title, rightContent, children } = props;
    const MenuItems = showMenu ? ShowMenuItems : HideMenuItems;

    return (
        <XView width="100%">
            <XView
                flexDirection="row"
                width="100%"
                height={48}
                paddingLeft={16}
                paddingRight={16}
                marginTop={4}
                marginBottom={3}
                flexShrink={0}
                alignItems="center"
            >
                <AdaptiveComponent
                    fullWidth={true}
                    mobile={
                        <XView flexDirection="row" width="100%" justifyContent="space-between">
                            <BurgerButton />
                            <XView flexDirection="row" cursor="pointer" onClick={onClick}>
                                <Title>{title}</Title>
                                <XView marginLeft={5} flexDirection="row" alignSelf="center">
                                    <SelectIcon />
                                </XView>
                            </XView>
                            <XView />
                        </XView>
                    }
                    desktop={
                        <XView flexDirection="row" width="100%" justifyContent="space-between">
                            <Title>{title}</Title>
                            <XView marginLeft={5} flexDirection="row">
                                {rightContent}
                            </XView>
                        </XView>
                    }
                />
            </XView>

            <AdaptiveComponent
                fullWidth={true}
                mobile={<MenuItems>{children}</MenuItems>}
                desktop={
                    <XView flexDirection="column" alignItems="stretch" backgroundColor="#fff">
                        {children}
                    </XView>
                }
            />
        </XView>
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
