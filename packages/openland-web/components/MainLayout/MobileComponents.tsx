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
    display: block;
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
`;

const ShowMenuItems = ({
    children,
    onBackgroundClick,
}: {
    children: any;
    onBackgroundClick: (event: React.MouseEvent<any>) => void;
}) => (
    <XView
        position="absolute"
        width="100%"
        zIndex={4}
        flexDirection="column"
        alignItems="stretch"
        backgroundColor="#fff"
        top={53}
        height="auto"
    >
        <div className={backgroundClassName} onClick={onBackgroundClick} />
        <div>{children}</div>
    </XView>
);

const HideMenuItems = ({
    children,
    onBackgroundClick,
}: {
    children: any;
    onBackgroundClick: (event: React.MouseEvent<any>) => void;
}) => (
    <XView
        position="absolute"
        width="100%"
        zIndex={4}
        flexDirection="column"
        alignItems="stretch"
        backgroundColor="#fff"
        top={53}
        height={0}
        overflow="hidden"
    >
        <div className={backgroundClassName} onClick={onBackgroundClick} />
        <div>{children}</div>
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
    const { showMenu, setShowMenu } = React.useContext(MobileSidebarContext);

    const toggle = () => {
        setShowMenu(!showMenu);
    };

    const close = () => {
        setShowMenu(false);
    };

    const MenuItems = showMenu ? ShowMenuItems : HideMenuItems;

    // if children is fragment get it's children
    // this is hack make it better later
    const finalChildren = children && children.props ? children.props.children : children;
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
                        cursor={finalChildren ? 'pointer' : undefined}
                        onClick={toggle}
                    >
                        <Title>{title}</Title>
                        {finalChildren && (
                            <XView marginLeft={5} flexDirection="row" alignSelf="center">
                                <SelectIcon />
                            </XView>
                        )}
                    </XView>
                    <XView />
                </XView>
            </XView>

            {finalChildren && (
                <MenuItems onBackgroundClick={close}>
                    {finalChildren.map((item: any, key: any) => {
                        return (
                            <div onClick={close} key={key}>
                                {item}
                            </div>
                        );
                    })}
                </MenuItems>
            )}
        </XView>
    );
};
