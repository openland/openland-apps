import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import RightIcon from 'openland-icons/ic-arrow-rignt.svg';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import BurgerIcon from 'openland-icons/landing/burger.svg';
import { MenuPropsT, Title } from './';

const selectIconClassName = css`
    transform: rotate(90deg);
    margin-left: 6px;
`;

const SelectIcon = () => {
    return <RightIcon className={selectIconClassName} />;
};

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

const myBurgerIconClassName = css`
    display: flex;
    align-items: center;
    & svg {
        & * {
            fill: #2196f3;
        }
    }
`;

const BurgerButton = () => {
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

export const MobileMenu = ({ title, rightContent, children }: MenuPropsT) => {
    const { showMenu, setShowMenu, isMobile } = React.useContext(MobileSidebarContext);

    const onClick = () => {
        if (isMobile) {
            setShowMenu(!showMenu);
        }
    };

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
                <XView flexDirection="row" width="100%" justifyContent="space-between">
                    <BurgerButton />
                    <XView
                        flexDirection="row"
                        cursor={children ? 'pointer' : undefined}
                        onClick={onClick}
                    >
                        <Title>{title}</Title>
                        {children && (
                            <XView marginLeft={5} flexDirection="row" alignSelf="center">
                                <SelectIcon />
                            </XView>
                        )}
                    </XView>
                    <XView />
                </XView>
            </XView>

            {children && <MenuItems>{children}</MenuItems>}
        </XView>
    );
};
