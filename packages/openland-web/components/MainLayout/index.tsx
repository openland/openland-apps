import * as React from 'react';
import { css } from 'linaria';
import { XLink } from 'openland-x/XLink';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
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
