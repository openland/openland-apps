import * as React from 'react';
import { css, cx } from 'linaria';
import Glamorous from 'glamorous';
import { XView, XImage } from 'react-mental';
import * as Cookie from 'js-cookie';
import { counterBorderHoverClassname } from 'openland-x/XCounter';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { TextAppBar } from 'openland-text/TextAppBar';
import { TextGlobal } from 'openland-text/TextGlobal';
import { XPopper } from 'openland-x/XPopper';
import { XScrollView } from 'openland-x/XScrollView';
import { XMenuItem, XMenuVertical, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XModalContext } from 'openland-x-modal/XModalContext';
import AddIcon from 'openland-icons/add-3.svg';
import DevToolsIcon from 'openland-icons/devtools-3.svg';
import { XThemeDefault } from 'openland-x/XTheme';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { MyOrganizations_myOrganizations, UserShort_primaryOrganization } from 'openland-api/Types';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { withUserInfo } from '../UserInfo';
import { XMemo } from 'openland-y-utils/XMemo';
import { PromoBanner } from './PromoBanner';
import { useClient } from 'openland-web/utils/useClient';
import { showAppInviteModal } from 'openland-web/fragments/showAppInviteModal';
import { showCreateOrganization } from 'openland-web/fragments/showCreateOrganization';

interface NavigatorItemProps {
    path?: string;
    onClick?: React.MouseEventHandler<any>;
    children?: any;
}

const desktopNavigatorItemClassname = css`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
`;

class DesktopNavigatorItem extends React.Component<NavigatorItemProps> {
    render() {
        const { path, onClick, children } = this.props;
        return (
            <XView
                as="a"
                position="relative"
                height={55}
                flexShrink={0}
                cursor="pointer"
                color="#b4b8bd"
                selectedBackgroundColor="rgba(0, 0, 0, 0.04)"
                hoverBackgroundColor="rgba(0, 0, 0, 0.04)"
                linkSelectable={path ? true : undefined}
                linkStrict={path ? true : undefined}
                path={path}
                onClick={onClick}
                hoverTextDecoration="none"
            >
                <div className={cx(desktopNavigatorItemClassname, counterBorderHoverClassname)}>
                    {children}
                </div>
            </XView>
        );
    }
}

const MenuItemWithPopper = ({
    menuItems,
    targetElement,
}: {
    menuItems: any;
    targetElement: any;
}) => {
    let [show, setShow] = React.useState<boolean>(false);

    const onClick = () => {
        setShow(!show);
    };

    const onClickOutside = () => {
        setShow(false);
    };
    let AddListingContent = withUserInfo(() => {
        return <>{menuItems}</>;
    });

    return (
        <XPopper
            contentContainer={<XMenuVertical />}
            placement="right-end"
            show={show}
            marginTop={5}
            marginLeft={11}
            content={<AddListingContent />}
            onClickOutside={onClickOutside}
        >
            <DesktopNavigatorItem onClick={onClick}>{targetElement}</DesktopNavigatorItem>
        </XPopper>
    );
};

const DesktopNavigationContainer = (props: { children?: any }) => (
    <XView
        minHeight="100%"
        width="100%"
        flexGrow={1}
        alignItems="center"
        flexDirection="column"
        paddingTop={11}
        paddingBottom={14}
    >
        {props.children}
    </XView>
);

export const DesktopScafoldMenuItem = ({
    name,
    path,
    icon,
}: {
    name: string;
    path: string;
    icon: any;
}) => {
    return (
        <XPopper
            placement="right"
            showOnHoverContent={false}
            showOnHover={true}
            style="dark"
            padding={-2}
            groupId="scaffold_tooltip"
            content={<strong>{name}</strong>}
        >
            <DesktopNavigatorItem path={path}>{icon}</DesktopNavigatorItem>
        </XPopper>
    );
};

const NavigationScrollerDiv = Glamorous(XScrollView)<{ mobile?: boolean }>(({ mobile }) => {
    return {
        minHeight: '100%',
        height: '100%',
        width: mobile ? '100%' : 64,
        backgroundColor: '#f6f6f6',
        borderRightWidth: '1px',
        borderRightStyle: 'solid',
        borderRightColor: XThemeDefault.separatorColor,
        flexShrink: 0,
    };
});
const NavigationScroller = XMemo<{ children: any }>(props => {
    let theme = React.useContext(ThemeContext);
    return (
        <NavigationScrollerDiv
            css={{
                backgroundColor: theme.appBarBackgroundColor,
                borderRightWidth: theme.appBarSeparatorColor !== undefined ? '1px' : '0px',
                borderRightColor: theme.appBarSeparatorColor,
            }}
        >
            {props.children}
        </NavigationScrollerDiv>
    );
});

const Logo = () => (
    <XView
        as="a"
        path="/"
        marginTop={0}
        marginBottom={11}
        alignSelf="center"
        flexShrink={0}
        width={38}
        height={38}
        overflow="hidden"
        hoverTextDecoration="none"
    >
        <XImage
            width={38}
            height={38}
            src="/static/X/logo-5.png"
            srcSet="/static/X/logo-5@2x.png 2x"
        />
    </XView>
);

const NavigationDivider = (props: { position: 'top' | 'bottom' }) => {
    let theme = React.useContext(ThemeContext);
    if (props.position === 'top') {
        return (
            <XView
                width={38}
                height={1}
                marginTop={0}
                marginBottom={16}
                alignSelf="center"
                backgroundColor={theme.appBarSeparatorInnerColor}
                flexShrink={0}
            />
        );
    } else {
        return (
            <XView
                width={38}
                height={1}
                marginTop={10}
                marginBottom={10}
                alignSelf="center"
                backgroundColor={theme.appBarSeparatorInnerColor}
                flexShrink={0}
            />
        );
    }
};

const BottomNavigation = (props: { children?: any }) => (
    <XView
        flexDirection="column"
        justifyContent="flex-end"
        alignSelf="stretch"
        flexGrow={1}
        flexShrink={0}
    >
        {props.children}
    </XView>
);
const TitleContainer = (props: TitleContainerProps) => (
    <XView
        as="a"
        marginBottom={4}
        paddingTop={8}
        paddingRight={18}
        paddingBottom={7}
        paddingLeft={18}
        color="rgba(0, 0, 0, 0.5)"
        flexDirection="row"
        hoverBackgroundColor="rgba(23, 144, 255, 0.05)"
        hoverColor="#1790ff"
        path={props.path}
        hoverTextDecoration="none"
    >
        <XAvatar2 title={props.title} id={props.id} src={props.src} />
        <XView paddingLeft={14}>
            <XView
                fontSize={15}
                fontWeight="600"
                lineHeight="20px"
                color="#000000"
                maxWidth={164}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
            >
                {props.title}
            </XView>
            <XView fontSize={14} lineHeight="20px" marginTop={1}>
                {props.subtitle}
            </XView>
        </XView>
    </XView>
);

const OtherOrgWrapper = Glamorous(XVertical)({
    overflow: 'scroll',
});

class UserPopper extends React.Component<UserPopperProps, { show: boolean }> {
    inner = 0;
    constructor(props: UserPopperProps) {
        super(props);
        this.state = { show: false };
    }

    componentDidUpdate() {
        if (canUseDOM) {
            let keepDomain = Cookie.defaults.domain;
            let keepPath = Cookie.defaults.path;
            let host = window.location.hostname.split('.').reverse();
            Cookie.defaults.domain = (host[1] ? host[1] + '.' : '') + host[0];
            Cookie.defaults.path = '/';
            Cookie.set('x-openland-user-photo', this.props.picture || '', {
                path: '/',
                expires: 3,
            });
            Cookie.defaults.domain = keepDomain;
            Cookie.defaults.path = keepPath;
        }
    }

    switch = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    closer = () => {
        if (!this.inner) {
            this.setState({
                show: false,
            });
        }
    };

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    };

    render() {
        let { primaryOrganization, organizations } = this.props;

        return (
            <XPopper
                placement="right"
                contentContainer={<XMenuVertical paddingTop={11} />}
                onClickOutside={this.closer}
                show={this.state.show}
                padding={25}
                marginLeft={23}
                marginBottom={5}
                content={
                    <XModalContext.Provider value={{ close: this.closer }}>
                        <XVertical separator="none">
                            <TitleContainer
                                id={this.props.id}
                                src={this.props.picture}
                                title={this.props.name}
                                subtitle={TextGlobal.viewProfile}
                                path={`/mail/u/${this.props.id}`}
                            />
                            <XMenuItem path="/settings/profile">{TextGlobal.settings}</XMenuItem>
                            <XMenuItem
                                onClick={() => showAppInviteModal()}
                            >
                                {TextGlobal.joinOpenland}
                            </XMenuItem>
                            <XMenuItem path="/auth/logout">{TextGlobal.signOut}</XMenuItem>

                            {primaryOrganization && (
                                <>
                                    <XMenuItemSeparator marginTop={12} marginBottom={8} />
                                    <TitleContainer
                                        id={primaryOrganization.id}
                                        src={primaryOrganization.photo}
                                        title={primaryOrganization.name}
                                        subtitle="Primary organization"
                                        path={'/directory/o/' + primaryOrganization.id}
                                    />

                                    {organizations && organizations.length > 1 && (
                                        <XPopper
                                            placement="right"
                                            contentContainer={<XMenuVertical />}
                                            showOnHover={true}
                                            padding={25}
                                            marginLeft={8}
                                            marginBottom={5}
                                            arrow={null}
                                            content={
                                                <OtherOrgWrapper
                                                    separator="none"
                                                    ref={this.onInner}
                                                    maxHeight="90vh"
                                                >
                                                    {organizations
                                                        .sort((a, b) =>
                                                            a.name.localeCompare(b.name),
                                                        )
                                                        .map((org, index) =>
                                                            index >= 0 ? (
                                                                <XMenuItem
                                                                    path={
                                                                        (org.isCommunity
                                                                            ? '/directory/c/'
                                                                            : '/directory/o/') +
                                                                        org.id
                                                                    }
                                                                    key={'other-' + org.id}
                                                                >
                                                                    {org.name}
                                                                </XMenuItem>
                                                            ) : null,
                                                        )}
                                                </OtherOrgWrapper>
                                            }
                                        >
                                            <XMenuItem iconRight="x-right">
                                                Other organizations
                                            </XMenuItem>
                                        </XPopper>
                                    )}
                                </>
                            )}
                        </XVertical>
                    </XModalContext.Provider>
                }
            >
                <div onClick={this.switch}>
                    <XAvatar2 src={this.props.picture} title={this.props.name} id={this.props.id} />
                </div>
            </XPopper>
        );
    }
}

const DesktopUserProfile = withUserInfo<{ onClick?: any }>(({ user, organization }) => {
    const client = useClient();
    const myorgs = client.useWithoutLoaderMyOrganizations();
    return (
        <XVertical>
            <UserPopper
                picture={user!!.photo}
                name={user!!.name}
                id={user!!.id}
                primaryOrganization={organization || undefined}
                organizations={
                    myorgs && myorgs.myOrganizations
                        ? myorgs.myOrganizations
                        : undefined
                }
            />
        </XVertical>
    )
});

export const DesktopScaffold = ({
    menu,
    content,
    topItems,
}: {
    menu: any;
    content: any;
    topItems: any;
}) => {
    const [banner, bannerHandler] = React.useState(true);
    const handleHideBanner = () => {
        bannerHandler(false);
        localStorage.setItem('promo-banner-be-show', 'hidden');
    };

    let bannerComponent: any = <PromoBanner onClise={handleHideBanner} />;

    if (!canUseDOM) {
        bannerComponent = null;
    }
    if (localStorage.getItem('promo-banner-be-show')) {
        bannerComponent = null;
    }
    if (!banner) {
        bannerComponent = null;
    }

    let contentView = (
        <XView
            flexDirection="column"
            backgroundColor={XThemeDefault.backgroundColor}
            flexGrow={1}
            flexBasis={0}
            flexShrink={1}
            minWidth={0}
            marginLeft={menu ? 408 : 64}
        >
            {content}
        </XView>
    );
    let menuView = (
        <XView
            flexDirection="row"
            height={bannerComponent ? 'calc(100% - 50px)' : '100%'}
            position="fixed"
            backgroundColor="#ffffff"
        >
            <NavigationScroller>
                <DesktopNavigationContainer>
                    <Logo />
                    <NavigationDivider position="top" />

                    {topItems}
                    <BottomNavigation>
                        <MenuItemWithPopper
                            targetElement={<AddIcon />}
                            menuItems={
                                <>
                                    <XMenuItem
                                        onClick={() => showCreateOrganization('organization')}
                                    >
                                        {TextGlobal.addOrganization}
                                    </XMenuItem>
                                    <XMenuItem
                                        onClick={() => showCreateOrganization('community')}
                                    >
                                        {TextGlobal.addCommunity}
                                    </XMenuItem>
                                </>
                            }
                        />
                        <XWithRole role={['super-admin', 'software-developer']}>
                            <MenuItemWithPopper
                                targetElement={<DevToolsIcon />}
                                menuItems={
                                    <>
                                        <XMenuItem href="https://logs.openland.io/app/kibana#/dashboard/3ca91120-f946-11e8-aa74-4b89079261c0?_g=(filters%3A!(('%24state'%3A(store%3AglobalState)%2Cmeta%3A(alias%3A'test%20acccs%20(hl)'%2Cdisabled%3A!f%2Cindex%3Ab3bf80a0-db87-11e8-9410-7338f67f9eca%2Ckey%3Abody.uid%2Cnegate%3A!t%2Cparams%3A!('4'%2C'101'%2C'21'%2C'1002'%2C'31'%2C'40')%2Ctype%3Aphrases%2Cvalue%3A'4%2C%20101%2C%2021%2C%201%2C002%2C%2031%2C%2040')%2Cquery%3A(bool%3A(minimum_should_match%3A1%2Cshould%3A!((match_phrase%3A(body.uid%3A'4'))%2C(match_phrase%3A(body.uid%3A'101'))%2C(match_phrase%3A(body.uid%3A'21'))%2C(match_phrase%3A(body.uid%3A'1002'))%2C(match_phrase%3A(body.uid%3A'31'))%2C(match_phrase%3A(body.uid%3A'40'))))))%2C('%24state'%3A(store%3AglobalState)%2Cmeta%3A(alias%3A'test%20accs%20(msgs)'%2Cdisabled%3A!f%2Cindex%3Ac91953d0-f6f9-11e8-aa74-4b89079261c0%2Ckey%3Auid%2Cnegate%3A!t%2Cparams%3A!('5'%2C'101'%2C'21'%2C'1002'%2C'31'%2C'40')%2Ctype%3Aphrases%2Cvalue%3A'5%2C%20101%2C%2021%2C%201%2C002%2C%2031%2C%2040')%2Cquery%3A(bool%3A(minimum_should_match%3A1%2Cshould%3A!((match_phrase%3A(uid%3A'5'))%2C(match_phrase%3A(uid%3A'101'))%2C(match_phrase%3A(uid%3A'21'))%2C(match_phrase%3A(uid%3A'1002'))%2C(match_phrase%3A(uid%3A'31'))%2C(match_phrase%3A(uid%3A'40')))))))%2CrefreshInterval%3A(display%3AOff%2Cpause%3A!f%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cmode%3Aquick%2Cto%3Anow))">
                                            {TextAppBar.items.stats}
                                        </XMenuItem>
                                        <XMenuItem path="/super">
                                            {TextAppBar.items.adminMenu}
                                        </XMenuItem>
                                        <XMenuItem path="/ui">
                                            {TextAppBar.items.xFramework}
                                        </XMenuItem>
                                    </>
                                }
                            />
                        </XWithRole>
                        <NavigationDivider position="bottom" />
                        <DesktopNavigatorItem>
                            <DesktopUserProfile />
                        </DesktopNavigatorItem>
                    </BottomNavigation>
                </DesktopNavigationContainer>
            </NavigationScroller>
            {menu}
        </XView>
    );

    return (
        <XView
            flexDirection="column"
            flexGrow={1}
            flexBasis={0}
            flexShrink={0}
            width="100%"
            height="100%"
        >
            {bannerComponent}
            <XView flexDirection="row" flexGrow={1} flexBasis={0} flexShrink={0}>
                {contentView}
                {menuView}
            </XView>
        </XView>
    );
};

interface TitleContainerProps {
    id: string;
    src: string | null;
    title: string;
    subtitle: string;
    path: string;
}

interface UserPopperProps {
    id: string;
    name: string;
    picture: string | null;
    primaryOrganization?: UserShort_primaryOrganization;
    organizations?: MyOrganizations_myOrganizations[];
}
