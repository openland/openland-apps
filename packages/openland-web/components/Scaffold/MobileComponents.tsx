import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import ToProfileIcon from 'openland-icons/ic-toprofile.svg';
import AppstoreIcon from 'openland-icons/ic-appstore.svg';
import GoogleplayIcon from 'openland-icons/ic-googleplay.svg';
import { XThemeDefault } from 'openland-x/XTheme';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { withUserInfo } from '../UserInfo';
import { MobileSidebarContext } from './MobileSidebarContext';

export const MobileScafoldMenuItem = ({
    name,
    path,
    icon,
}: {
    name: string;
    path: string;
    icon: any;
}) => {
    const { setShowSidebar } = React.useContext(MobileSidebarContext);
    return (
        <XView
            as="a"
            position="relative"
            flexDirection="column"
            alignSelf="stretch"
            alignItems="center"
            justifyContent="center"
            height={50}
            width="100%"
            flexShrink={0}
            cursor="pointer"
            selectedBackgroundColor="#f9f9f9"
            hoverBackgroundColor="#f9f9f9"
            linkSelectable={!!path}
            linkStrict={!!path}
            path={path}
            hoverTextDecoration="none"
            fontSize={15}
            fontWeight="600"
            lineHeight={1.07}
            onClick={() => {
                setShowSidebar(false);
            }}
            color="#000"
            hoverColor="#000"
        >
            <XView flexDirection="row">
                <XView
                    flexDirection="column"
                    justifyContent="center"
                    height={49}
                    width={76}
                    alignItems="center"
                >
                    {icon}
                </XView>
                <XView flexDirection="column" justifyContent="center" height={49} width={224}>
                    {name}
                </XView>
            </XView>
            <XView height={1} backgroundColor="#ececec" width="100%" />
        </XView>
    );
};

const MobileUserProfile = withUserInfo(({ user }) => {
    if (user) {
        return (
            <XView
                as="a"
                path={`/mail/u/${user.id}`}
                height={70}
                width="100%"
                backgroundColor="#f9f9f9"
                flexShrink={0}
                flexDirection="column"
                hoverTextDecoration="none"
                color="#000"
            >
                <XView
                    paddingHorizontal={20}
                    paddingTop={16}
                    paddingBottom={13}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height={69}
                >
                    <XView flexDirection="row" height="100%">
                        <XAvatar2 size={40} src={user.photo} title={user.name} id={user.id} />
                        <XView marginLeft={16}>
                            <XView
                                fontSize={15}
                                fontWeight="600"
                                lineHeight={1.33}
                                color="#000"
                                marginBottom={1}
                            >
                                {user.name}
                            </XView>
                            <XView
                                fontSize={14}
                                lineHeight={1.43}
                                color="rgba(0, 0, 0, 0.5)"
                                marginBottom={1}
                            >
                                View profile
                            </XView>
                        </XView>
                    </XView>
                    <ToProfileIcon />
                </XView>
                <XView height={1} backgroundColor="#ececec" width="100%" />
            </XView>
        );
    } else {
        return null;
    }
});

const sideBarClassName = css`
    display: flex;
    box-shadow: 0 0 44px 0 rgba(0, 0, 0, 0.15);
    flex-direction: row;
    height: 100%;
    position: fixed;
    width: 300px;
    background-color: white;
    z-index: 100;
`;

const sideBarBackgroundClassName = css`
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99;
`;

const MobileNavigationContainer = (props: { children?: any }) => (
    <XView
        minHeight="100%"
        width="100%"
        flexGrow={1}
        alignItems="center"
        flexDirection="column"
        paddingTop={0}
        paddingBottom={14}
    >
        {props.children}
    </XView>
);

const MobileSidebar = ({ topItems, menu }: { topItems: any; menu: any }) => {
    const { showSidebar, setShowSidebar } = React.useContext(MobileSidebarContext);
    return (
        <div>
            {showSidebar && (
                <div
                    onClick={() => setShowSidebar(!showSidebar)}
                    className={sideBarBackgroundClassName}
                />
            )}
            <div className={sideBarClassName} style={{ left: showSidebar ? 0 : -350 }}>
                <XView width="100%">
                    <MobileNavigationContainer>
                        <MobileUserProfile />
                        {topItems}
                        <XView
                            alignSelf="flex-end"
                            width="100%"
                            flexDirection="column"
                            justifyContent="flex-end"
                            flexGrow={1}
                        >
                            <XView paddingLeft={24} alignSelf="flex-start" flexDirection="column">
                                <XView
                                    as="a"
                                    target="_blank"
                                    href="https://oplnd.com/ios"
                                    marginBottom={12}
                                    alignSelf="flex-start"
                                >
                                    <AppstoreIcon />
                                </XView>
                                <XView
                                    as="a"
                                    target="_blank"
                                    href="https://oplnd.com/android"
                                    alignSelf="flex-start"
                                >
                                    <GoogleplayIcon />
                                </XView>
                            </XView>
                        </XView>
                    </MobileNavigationContainer>
                </XView>
                {menu}
            </div>
        </div>
    );
};

export const MobileScaffold = ({
    menu,
    content,
    topItems,
}: {
    menu: any;
    content: any;
    topItems: any;
}) => {
    return (
        <XView flexDirection="row" flexGrow={1} flexBasis={0} height="100%">
            <XView
                flexDirection="column"
                backgroundColor={XThemeDefault.backgroundColor}
                flexGrow={1}
                flexBasis={0}
                flexShrink={1}
                minWidth={0}
            >
                {content}
            </XView>
            <MobileSidebar topItems={topItems} menu={menu} />
        </XView>
    );
};
