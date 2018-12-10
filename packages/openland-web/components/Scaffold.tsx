import * as React from 'react';
import Glamorous from 'glamorous';
import { findChild } from './utils';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { withUserInfo } from './UserInfo';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { TextAppBar } from 'openland-text/TextAppBar';
import { TextGlobal } from 'openland-text/TextGlobal';
import { XLink } from 'openland-x/XLink';
import { XPopper } from 'openland-x/XPopper';
import { XAvatar } from 'openland-x/XAvatar';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable } from 'openland-x/Navigable';
import {
    XMenuItem,
    XMenuVertical,
    XMenuItemSeparator,
} from 'openland-x/XMenuItem';
import * as Cookie from 'js-cookie';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { withNotificationCounter } from '../api/withNotificationCounter';
import {
    InvitesToOrganizationModal,
    InvitesGlobalModal,
} from '../pages/main/settings/invites';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { Query } from 'react-apollo';
import { MyOrganizationsQuery } from 'openland-api';
import AddIcon from './icons/add-2.svg';
import MessagesIcon from './icons/messages-3.svg';
import RoomIcon from './icons/channel-1.svg';
import DevToolsIcon from './icons/devtools-2.svg';
import DirecoryIcon from './icons/directory-2.svg';
import { XInput } from 'openland-x/XInput';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { switchOrganization } from '../utils/switchOrganization';
import { withCreateOrganization } from '../api/withCreateOrganization';
import { delayForewer, delay } from 'openland-y-utils/timer';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { InitTexts } from '../pages/init/_text';
import { withCreateChannel } from '../api/withCreateChannel';
import { XTextArea } from 'openland-x/XTextArea';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XThemeDefault } from 'openland-x/XTheme';
import { XView } from 'react-mental';
import {
    SharedRoomKind,
    MyOrganizations_myOrganizations,
    UserShort_primaryOrganization,
} from 'openland-api/Types';

const NavigationContainer = Glamorous.div({
    minHeight: '100%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 11,
    paddingBottom: 14,
});

const NavigationScroller = Glamorous(XScrollView)({
    minHeight: '100%',
    height: '100%',
    width: 64,
    backgroundColor: '#f6f6f6',
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: XThemeDefault.separatorColor,
    flexShrink: 0,
});

const Logo = Glamorous.div({
    height: 38,
    width: 38,
    marginTop: 0,
    marginBottom: 11,
    alignSelf: 'center',
    flexShrink: 0,
    backgroundImage: "url('/static/X/logo-4.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
});

const NavigationDivider = Glamorous.div<{ top?: number; bottom?: number }>(
    props => ({
        width: 38,
        height: 1,
        marginTop: typeof props.top !== undefined ? props.top : 3,
        marginBottom: typeof props.bottom !== undefined ? props.bottom : 3,
        alignSelf: 'center',
        backgroundColor: 'rgba(220, 222, 228, 0.6)',
        flexShrink: 0,
    }),
);

const NavigatorItem = Glamorous(XLink)({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    flexShrink: 0,
    cursor: 'pointer',
    color: '#b4b8bd',

    '& > svg *': {
        fill: '#b4b8bd',
    },

    '.is-active': {
        color: '#b4b8bd',
        backgroundColor: 'rgba(0, 0, 0, 0.04)!important',
        '& > .reports .hover': {
            display: 'block',
        },
        '& > .reports .no-hover': {
            display: 'none',
        },
    },
    '&:hover': {
        color: '#b4b8bd',
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        '& > .reports .hover': {
            display: 'block',
        },
        '& > .reports .no-hover': {
            display: 'none',
        },
    },
    '& > .reports': {
        width: 28,
        height: 28,
        display: 'flex',
        justifyContent: 'center',
        '& .hover': {
            display: 'none',
        },
        '& .no-hover': {
            display: 'block',
        },
    },
    '& > .counter': {
        position: 'absolute',
        right: 14,
        top: 12,
    },
    '&:not(.is-active) > .counter': {
        borderColor: '#f6f6f6',
    },
    '&:hover > .counter': {
        borderColor: '#ececec',
    },
});

const BottomNavigation = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 0,
});

const ProfileTitleContainer = Glamorous(XHorizontal)({
    padding: '8px 18px 7px',
    ':hover': {
        background: 'rgba(23, 144, 255, 0.05)',
        '& > div': {
            '& > a': {
                color: '#1790ff',
                opacity: 1,
            },
        },
    },
});

const ProfileTitle = Glamorous.div({
    fontSize: 15,
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: 0,
    color: '#000000',
    marginLeft: 14,
    maxWidth: 164,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
});

const ProfileSubTitle = Glamorous(XLink)({
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.5)',
    marginLeft: 14,
    marginTop: 1,
});

const TitleContainer = makeNavigable(props => {
    return (
        <a
            href={props.href}
            onClick={props.onClick}
            style={{ marginBottom: 4 }}
        >
            <ProfileTitleContainer separator="none">
                {props.children}
            </ProfileTitleContainer>
        </a>
    );
});

interface UserPopperProps {
    id?: string;
    name?: string;
    picture: string | null;
    primaryOrganization?: UserShort_primaryOrganization;
    organizations?: MyOrganizations_myOrganizations[];
}

const OutherOrgWrapepr = Glamorous(XVertical)({
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
                                path="/settings/profile"
                                autoClose={true}
                            >
                                <XAvatar
                                    cloudImageUuid={
                                        this.props.picture || undefined
                                    }
                                    style="colorus"
                                    objectName={this.props.name}
                                    objectId={this.props.id}
                                />
                                <XVertical separator="none">
                                    <ProfileTitle>
                                        {this.props.name}
                                    </ProfileTitle>
                                    <ProfileSubTitle>
                                        {TextGlobal.editProfile}
                                    </ProfileSubTitle>
                                </XVertical>
                            </TitleContainer>
                            <XMenuItem path="/settings/profile">
                                {TextGlobal.settings}
                            </XMenuItem>
                            <XMenuItem
                                query={{
                                    field: 'invite_global',
                                    value: 'true',
                                }}
                            >
                                {TextGlobal.joinOpenland}
                            </XMenuItem>
                            <XMenuItem path="/auth/logout">
                                {TextGlobal.signOut}
                            </XMenuItem>

                            {primaryOrganization && (
                                <>
                                    <XMenuItemSeparator
                                        marginTop={12}
                                        marginBottom={8}
                                    />
                                    <TitleContainer
                                        path={
                                            '/directory/o/' +
                                            primaryOrganization.id
                                        }
                                        autoClose={true}
                                    >
                                        <XAvatar
                                            cloudImageUuid={
                                                primaryOrganization.photo ||
                                                undefined
                                            }
                                            style="organization"
                                            objectName={
                                                primaryOrganization.name
                                            }
                                            objectId={primaryOrganization.id}
                                        />
                                        <XVertical separator="none">
                                            <ProfileTitle>
                                                {primaryOrganization.name}
                                            </ProfileTitle>
                                            <ProfileSubTitle>
                                                Primary organization
                                            </ProfileSubTitle>
                                        </XVertical>
                                    </TitleContainer>

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
                                                <OutherOrgWrapepr
                                                    separator="none"
                                                    ref={this.onInner}
                                                    maxHeight="90vh"
                                                >
                                                    {organizations
                                                        .sort((a, b) =>
                                                            a.name.localeCompare(
                                                                b.name,
                                                            ),
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
                                                                    key={
                                                                        'other-' +
                                                                        org.id
                                                                    }
                                                                >
                                                                    {org.name}
                                                                </XMenuItem>
                                                            ) : null,
                                                        )}
                                                </OutherOrgWrapepr>
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
                <XAvatar
                    cloudImageUuid={this.props.picture || undefined}
                    onClick={this.switch}
                    style="colorus"
                    objectName={this.props.name}
                    objectId={this.props.id}
                />
            </XPopper>
        );
    }
}

let UserProfile = withUserInfo<{ onClick?: any }>(props => (
    <XVertical>
        <Query query={MyOrganizationsQuery.document}>
            {data => (
                <UserPopper
                    picture={props.user!!.photo}
                    name={props.user!!.name}
                    id={props.user!!.id}
                    primaryOrganization={props.organization || undefined}
                    organizations={
                        data.data && data.data.myOrganizations
                            ? data.data.myOrganizations
                            : undefined
                    }
                />
            )}
        </Query>
        <InvitesToOrganizationModal targetQuery="invite" target={null} />
        <InvitesGlobalModal targetQuery="invite_global" target={null} />
    </XVertical>
));

//
// Menu
//

const MenuView = Glamorous(XScrollView)({
    width: 278,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',

    '& > .simplebar-scroll-content': {
        '& > .simplebar-content': {
            overflowX: 'hidden',
        },
    },
    borderRight: '1px solid rgba(216, 218, 229, 0.7)',
});

//
// Implementation
//

class ScaffoldMenu extends React.Component {
    static defaultProps = {
        _isSidebarMenu: true,
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        return <MenuView>{this.props.children}</MenuView>;
    }
}

const PageDiv = Glamorous.div({
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    width: '64px',
    height: '64px',
});

class ScaffoldContent extends React.Component<{
    padding?: boolean;
    bottomOffset?: boolean;
}> {
    static defaultProps = {
        _isSidebarContent: true,
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        if (this.props.padding === false) {
            return (
                <>
                    {this.props.children}
                    {this.props.bottomOffset !== false && <PageDiv />}
                </>
            );
        }
        return (
            <XVertical flexGrow={1}>
                {this.props.children}
                {this.props.bottomOffset !== false && <PageDiv />}
            </XVertical>
        );
    }
}

class AddMenu extends React.Component<{}, { show?: boolean }> {
    inner = 0;
    constructor(props: any) {
        super(props);
        this.state = { show: false };
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
        let AddListingContent = withUserInfo(props => {
            return (
                <>
                    <XMenuItem
                        query={{ field: 'createOrganization', value: 'true' }}
                    >
                        {TextGlobal.addOrganization}
                    </XMenuItem>
                    <XMenuItem
                        query={{
                            field: 'createOrganization',
                            value: 'community',
                        }}
                    >
                        {TextGlobal.addCommunity}
                    </XMenuItem>
                    <XMenuItem query={{ field: 'createRoom', value: 'true' }}>
                        {TextGlobal.addRoom}
                    </XMenuItem>
                </>
            );
        });

        return (
            <XPopper
                contentContainer={<XMenuVertical />}
                placement="right-end"
                show={this.state.show}
                marginTop={5}
                marginLeft={11}
                content={<AddListingContent />}
                onClickOutside={this.closer}
            >
                <NavigatorItem onClick={this.switch}>
                    <AddIcon />
                </NavigatorItem>
            </XPopper>
        );
    }
}

class AdminMenu extends React.Component<{}, { show?: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { show: false };
    }
    switch = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    closer = () => {
        this.setState({
            show: false,
        });
    };

    render() {
        let AddListingContent = withUserInfo(props => {
            return (
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
            );
        });

        return (
            <XPopper
                contentContainer={<XMenuVertical />}
                placement="right-end"
                show={this.state.show}
                padding={0}
                marginLeft={11}
                marginBottom={5}
                content={<AddListingContent />}
                onClickOutside={this.closer}
            >
                <NavigatorItem onClick={this.switch}>
                    <DevToolsIcon />
                </NavigatorItem>
            </XPopper>
        );
    }
}

export const RoomButton = withNotificationCounter(props => {
    return (
        <XPopper
            placement="right"
            showOnHoverContent={false}
            showOnHover={true}
            groupId="scaffold_tooltip"
            style="dark"
            padding={-2}
            content={<strong>{TextAppBar.items.room}</strong>}
        >
            <NavigatorItem path="/channel" activateForSubpaths={true}>
                <RoomIcon />
                {props.data.counter && props.data.counter.unreadCount > 0 && (
                    <XCounter
                        borderColor="#f5f7f9"
                        count={props.data.counter.unreadCount}
                    />
                )}
            </NavigatorItem>
        </XPopper>
    );
});

export const MessengerButton = withNotificationCounter(props => {
    return (
        <XPopper
            placement="right"
            showOnHoverContent={false}
            showOnHover={true}
            style="dark"
            padding={-2}
            groupId="scaffold_tooltip"
            content={<strong>{TextAppBar.items.mail}</strong>}
        >
            <NavigatorItem path="/mail" activateForSubpaths={true}>
                <MessagesIcon />
                {props.data.counter && props.data.counter.unreadCount > 0 && (
                    <XCounter
                        borderColor="#ececec"
                        count={props.data.counter.unreadCount}
                    />
                )}
            </NavigatorItem>
        </XPopper>
    );
});

export const CreateOrganization = withCreateOrganization(props => {
    let community = props.router.query.createOrganization === 'community';
    let texts = community
        ? InitTexts.create_community_popper
        : InitTexts.create_organization_popper;
    return (
        <XModalForm
            targetQuery="createOrganization"
            useTopCloser={true}
            title={texts.title}
            submitBtnText={texts.submit}
            defaultAction={async data => {
                let res = await props.createOrganization({
                    variables: {
                        input: {
                            personal: false,
                            name: data.input.name,
                            about: data.input.about,
                            isCommunity: community,
                            photoRef: data.input.photoRef,
                        },
                    },
                });
                let redirect =
                    (community ? '/directory/c/' : '/directory/o/') +
                    res.data.createOrganization.id;
                switchOrganization(res.data.createOrganization.id, redirect);
                await delayForewer();
            }}
            defaultData={{
                input: {
                    name: '',
                    website: '',
                    photoRef: null,
                },
            }}
        >
            <XVertical separator="large">
                <XFormLoadingContent>
                    <XHorizontal>
                        <XVertical separator={8} flexGrow={1}>
                            <XInput
                                flexGrow={1}
                                field="input.name"
                                size="large"
                                placeholder={texts.namePlaceholder}
                                autofocus={true}
                            />
                            <XTextArea
                                placeholder={texts.descriptionPlaceholder}
                                resize={false}
                                valueStoreKey="fields.input.about"
                            />
                        </XVertical>
                        <XAvatarUpload
                            field="input.photoRef"
                            placeholder={{
                                add: texts.addPhoto,
                                change: texts.changePhoto,
                            }}
                        />
                    </XHorizontal>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
    );
});

export const CreateRoom = withCreateChannel(props => {
    return (
        <XModalForm
            {...props}
            useTopCloser={true}
            title="Create room"
            targetQuery="createRoom"
            defaultAction={async data => {
                let oid = props.router.query.createRoom;
                let room = await props.createChannel({
                    variables: {
                        title: data.input.name,
                        description: data.input.description,
                        organizationId: oid !== 'true' ? oid : undefined,
                        members: [],
                        kind: SharedRoomKind.PUBLIC,
                    },
                });
                delay(0).then(() => {
                    props.router.push('/mail/' + room.data.room.id);
                });
            }}
            defaultData={{
                input: {
                    name: '',
                },
            }}
            submitBtnText="Create room"
        >
            <XVertical separator={8}>
                <XInput
                    flexGrow={1}
                    size="large"
                    placeholder="Room title"
                    field="input.name"
                    autofocus={true}
                />
                <XTextArea
                    placeholder="Description"
                    resize={false}
                    valueStoreKey="fields.input.description"
                />
            </XVertical>
        </XModalForm>
    );
});

export class Scaffold extends React.PureComponent {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    render() {
        let menu = findChild(this.props.children, '_isSidebarMenu');
        let content = findChild(this.props.children, '_isSidebarContent');

        let contentView = (
            <XView
                flexDirection="column"
                backgroundColor={XThemeDefault.backgroundColor}
                flexGrow={1}
                flexBasis={0}
                flexShrink={1}
                minWidth={0}
                marginLeft={menu !== undefined ? 342 : 64}
            >
                {content}
            </XView>
        );
        let menuView = (
            <XView flexDirection="row" height="100%" position="fixed">
                <NavigationScroller>
                    <NavigationContainer>
                        <XLink path="/">
                            <Logo />
                        </XLink>

                        <NavigationDivider top={0} bottom={16} />

                        <MessengerButton />

                        <XPopper
                            placement="right"
                            showOnHoverContent={false}
                            showOnHover={true}
                            style="dark"
                            padding={-2}
                            groupId="scaffold_tooltip"
                            content={
                                <strong>{TextAppBar.items.directory}</strong>
                            }
                        >
                            <NavigatorItem
                                path="/directory"
                                activateForSubpaths={true}
                            >
                                <DirecoryIcon />
                            </NavigatorItem>
                        </XPopper>

                        <XWithRole role="feature-non-production">
                            <XPopper
                                placement="right"
                                showOnHoverContent={false}
                                showOnHover={true}
                                style="dark"
                                padding={-2}
                                groupId="scaffold_tooltip"
                                content={
                                    <strong>{TextAppBar.items.feed}</strong>
                                }
                            >
                                <NavigatorItem
                                    path="/feed"
                                    activateForSubpaths={true}
                                >
                                    <RoomIcon />
                                </NavigatorItem>
                            </XPopper>
                        </XWithRole>

                        <BottomNavigation>
                            <AddMenu />
                            <XWithRole
                                role={['super-admin', 'software-developer']}
                            >
                                <AdminMenu />
                            </XWithRole>
                            <NavigationDivider top={10} bottom={10} />
                            <NavigatorItem>
                                <UserProfile />
                            </NavigatorItem>
                        </BottomNavigation>
                    </NavigationContainer>
                </NavigationScroller>
                {menu}
            </XView>
        );

        return (
            <XView
                flexDirection="row"
                minWidth={800}
                flexGrow={1}
                flexBasis={0}
            >
                {contentView}
                {menuView}

                <CreateOrganization />
                <CreateRoom />
            </XView>
        );
    }
}
