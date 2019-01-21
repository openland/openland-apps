import * as React from 'react';
import { css } from 'linaria';
import { XLink } from 'openland-x/XLink';
import { XScrollView2 } from 'openland-x/XScrollView2';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import { findChild } from '../utils';
import { AdaptiveComponent } from 'openland-web/components/Adaptive';
import { DesktopMenu } from './DesktopComponents';
import { MobileMenu } from './MobileComponents';

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

const titleClassName = css`
    font-size: 22px;
    line-height: 28px;
    letter-spacing: 0;
    font-weight: 400;
    color: #000;
    opacity: 0.9;
`;

export const Title = ({ children, onClick }: { children: any; onClick?: (event: any) => void }) => {
    return (
        <div onClick={onClick} className={titleClassName}>
            {children}
        </div>
    );
};

export type MenuPropsT = {
    title: string;
    rightContent?: any;
    children?: any;
    leftContent?: any;
};

export const Menu = React.memo<MenuPropsT>(props => {
    return (
        <AdaptiveComponent
            fullWidth={true}
            mobile={<MobileMenu {...props} />}
            desktop={<DesktopMenu {...props} />}
        />
    );
});

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
