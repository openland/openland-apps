import * as React from 'react';
import Glamorous from 'glamorous';
import { findChild } from './utils';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XIcon } from 'openland-x/XIcon';
import { withUserInfo } from './UserInfo';
import { withSearch } from '../api/withSearch';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { TextAppBar } from 'openland-text/TextAppBar';
import { TextGlobal } from 'openland-text/TextGlobal';
import { TextGlobalSearch } from 'openland-text/TextGlobalSearch';
import { XLink } from 'openland-x/XLink';
import { XArea } from 'openland-x-format/XArea';
import { XSearchList, XSearchListItem } from 'openland-x/XSearchList';
import { XTitle } from 'openland-x/XTitle';
import { XPopper } from 'openland-x/XPopper';
import { XAvatar } from 'openland-x/XAvatar';
import { XCounter } from 'openland-x/XCounter';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable } from 'openland-x/Navigable';
import { XMenuItem, XMenuVertical } from 'openland-x/XMenuItem';
import * as Cookie from 'js-cookie';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { withNotificationCounter } from '../api/withNotificationCounter';
import { InvitesToOrganizationModal, InvitesGlobalModal } from '../pages/main/settings/invites';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { TextInvites } from 'openland-text/TextInvites';
import { Query } from 'react-apollo';
import { MyOrganizationsQuery } from 'openland-api';
import AddIcon from './icons/add-2.svg';
import MessagesIcon from './icons/messages-3.svg';
import ChannelIcon from './icons/channel-1.svg';
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

//
// Root
//

const RootContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    minWidth: 800,
    margin: -1
});

// 
// Navigation
//

const NavigationWrapper = Glamorous.div<{ activeSearch: boolean }>((props) => ({
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    flexShrink: 0,
    order: 1,
    position: 'fixed',
    zIndex: props.activeSearch ? 1 : 0
}));

const NavigationContainer = Glamorous.div({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 11,
    paddingBottom: 14,
});

const NavigationScroller = Glamorous(XScrollView)({
    minHeight: '100vh',
    height: '100%',
    width: 64,
    backgroundColor: XThemeDefault.backyardColor,
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
    backgroundImage: 'url(\'/static/X/logo-3.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
});

const NavigationDivider = Glamorous.div<{ top?: number, bottom?: number }>((props) => ({
    width: 38,
    height: 1,
    marginTop: (typeof props.top !== undefined) ? props.top : 3,
    marginBottom: (typeof props.bottom !== undefined) ? props.bottom : 3,
    alignSelf: 'center',
    backgroundColor: XThemeDefault.separatorColor,
    flexShrink: 0,
}));

const NavigatorIcon = Glamorous(XIcon)({
    fontSize: 28,
    textAlign: 'center'
});

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
    color: '#99a2b0',

    '& > svg *': {
        fill: '#99a2b0',
    },

    '.is-active': {
        color: '#99a2b0',
        backgroundColor: 'rgba(42, 70, 97, 0.06)!important',
        '& > svg *': {
            fill: '#99a2b0',
        },
        '& > .reports .hover': {
            display: 'block'
        },
        '& > .reports .no-hover': {
            display: 'none'
        },
    },
    '&:hover': {
        color: '#99a2b0',
        backgroundColor: 'rgba(42, 70, 97, 0.03)',
        '& > svg *': {
            fill: '#99a2b0',
        },
        '& > .reports .hover': {
            display: 'block'
        },
        '& > .reports .no-hover': {
            display: 'none'
        },
    },
    '& > .reports': {
        width: 28,
        height: 28,
        display: 'flex',
        justifyContent: 'center',
        '& .hover': {
            display: 'none'
        },
        '& .no-hover': {
            display: 'block'
        }
    },
    '& > .counter': {
        position: 'absolute',
        right: 14,
        top: 12
    }
});

const BottomNavigation = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 0
});

const ProfileTitle = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 1.25,
    color: '#334562',
    marginLeft: 15,
    maxWidth: 164,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
});

const ProfileSubTitle = Glamorous(XLink)({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.25,
    color: '#334562',
    marginLeft: 15,
    opacity: 0.5,
    letterSpacing: '-0.3px',
});

const ProfileTitleContainer = Glamorous(XHorizontal)({
    padding: '16px 18px 12px',
    ':hover': {
        background: '#f3f9ff',
        '& > div': {
            '& > a': {
                color: '#1790ff',
                opacity: 1,
            }
        }
    }
});

const ProfileNaviTitleContainer = makeNavigable((props) => {
    return (<a href={props.href} onClick={props.onClick}><ProfileTitleContainer separator="none" >{props.children}</ProfileTitleContainer></a>);
});

const OrganizationTitleContainer = makeNavigable((props) => {
    return (<a href={props.href} onClick={props.onClick}><ProfileTitleContainer separator="none" >{props.children}</ProfileTitleContainer></a>);
});

const PopperSeparator = Glamorous.div({
    marginTop: 12,
    background: '#ececec',
    height: 1
});

interface UserPopperProps {
    id?: string;
    name?: string;
    picture: string | null;
    primaryOrganization?: {
        id: string;
        name: string;
        photo: string | null;
    };
    organizations?: {
        id: string;
        name: string;
        photo: string | null;
    }[];
}

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
            Cookie.set('x-openland-user-photo', this.props.picture || '', { path: '/', expires: 3 });
            Cookie.defaults.domain = keepDomain;
            Cookie.defaults.path = keepPath;
        }
    }

    switch = () => {
        this.setState({
            show: !this.state.show
        });
    }

    closer = () => {
        if (!this.inner) {
            this.setState({
                show: false
            });
        }
    }

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    }

    render() {
        let { primaryOrganization, organizations } = this.props;

        return (
            <XPopper
                placement="right"
                contentContainer={<XMenuVertical />}
                onClickOutside={this.closer}
                show={this.state.show}
                padding={25}
                marginLeft={32}
                marginBottom={5}
                content={(
                    <XModalContext.Provider value={{ close: this.closer }}>
                        <XVertical separator="none" minWidth={270}>
                            <ProfileNaviTitleContainer path="/settings/profile" autoClose={true}>
                                <XAvatar path="/settings/profile" cloudImageUuid={this.props.picture || undefined} style="colorus" objectName={this.props.name} objectId={this.props.id} />
                                <XVertical separator={1}>
                                    <ProfileTitle >{this.props.name}</ProfileTitle>
                                    <ProfileSubTitle>{TextGlobal.editProfile}</ProfileSubTitle>
                                </XVertical>
                            </ProfileNaviTitleContainer>
                            <XMenuItem style="primary-sky-blue" path="/settings/profile">{TextGlobal.settings}</XMenuItem>
                            <XMenuItem style="primary-sky-blue" query={{ field: 'invite_global', value: 'true' }}>{TextGlobal.joinOpenland}</XMenuItem>
                            <XMenuItem style="primary-sky-blue" path="/auth/logout">{TextGlobal.signOut}</XMenuItem>

                            {primaryOrganization && (
                                <>
                                    <PopperSeparator />
                                    <OrganizationTitleContainer path={'/directory/o/' + primaryOrganization.id} autoClose={true}>
                                        <XAvatar path={'/directory/o' + primaryOrganization.id} cloudImageUuid={primaryOrganization.photo || undefined} style="organization" objectName={primaryOrganization.name} objectId={primaryOrganization.id} />
                                        <XVertical separator={1}>
                                            <ProfileTitle >{primaryOrganization.name}</ProfileTitle>
                                            <ProfileSubTitle>Primary organization</ProfileSubTitle>
                                        </XVertical>
                                    </OrganizationTitleContainer>

                                    {organizations && (organizations.length > 1) && (
                                        <XPopper
                                            placement="right"
                                            contentContainer={<XMenuVertical />}
                                            showOnHover={true}
                                            padding={25}
                                            marginLeft={8}
                                            marginBottom={5}
                                            arrow={null}
                                            content={(
                                                <XVertical separator="none" minWidth={260} ref={this.onInner}>
                                                    {organizations.map((org, index) => (index >= 1) ? (
                                                        <XMenuItem style="primary-sky-blue" path={'/directory/o/' + org.id} key={'other-' + org.id}>{org.name}</XMenuItem>
                                                    ) : null)}
                                                </XVertical>
                                            )}
                                        >
                                            <XMenuItem style="primary-sky-blue" iconRight="x-right">Other organizations</XMenuItem>
                                        </XPopper>
                                    )}
                                </>
                            )}
                        </XVertical>
                    </XModalContext.Provider>
                )}
            >
                <XAvatar cloudImageUuid={this.props.picture || undefined} onClick={this.switch} style="colorus" objectName={this.props.name} objectId={this.props.id} />
            </XPopper>
        );
    }
}

let UserProfile = withUserInfo<{ onClick?: any }>((props) => (
    <XVertical>
        <Query query={MyOrganizationsQuery.document}>
            {(data) =>
                <UserPopper
                    picture={props.user!!.picture}
                    name={props.user!!.name}
                    id={props.user!!.id}
                    primaryOrganization={props.organization || undefined}
                    organizations={(data.data && data.data.myOrganizations) ? data.data.myOrganizations : undefined}
                />
            }
        </Query>
        <InvitesToOrganizationModal targetQuery="invite" target={null} />
        <InvitesGlobalModal targetQuery="invite_global" target={null} />
    </XVertical>
));

//
// Content
//

const ContentView = Glamorous.div<{ marginLeft: number }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 1px)',
    // overflow: 'hidden',
    // borderTopLeftRadius: 8,
    // borderBottomLeftRadius: 8,
    // marginRight: -1,
    // marginBottom: -1,
    marginTop: 1,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: XThemeDefault.separatorColor,
    backgroundColor: XThemeDefault.backgroundColor,
    flex: 1,
    order: 2,
    minWidth: 0,
    maxWidth: '100%',
    position: 'relative',
    zIndex: 0,
    marginLeft: props.marginLeft - 1
}));

const SearchWrapper = Glamorous.div<{ visible: boolean }>((props) => ({
    visibility: props.visible ? 'visible' : 'hidden',
    zIndex: 500,
    opacity: props.visible ? 1 : 0,
    transition: 'all 220ms',
}));

const SearchWrapperSticky = Glamorous.div({
    // position: 'sticky',
    // top: 0
});

const SearchContainer = Glamorous.div({
    position: 'fixed',
    left: 64,
    top: 0,
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    backgroundColor: 'rgba(9, 30, 66, 0.54)',
    zIndex: 1
});

const SearchContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1,
    left: 64,
    top: 0,
    width: '300px',
    minHeight: '100vh',
    height: '100%',
    backgroundColor: '#FFFFFF',
});

const SearchInput = Glamorous.input({
    border: 'none',
    marginTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
    height: 48,
    flexShrink: 0,
    width: '100%',
    fontWeight: 600,
    fontSize: 20,
    backgroundColor: 'transparent',
    '::placeholder': {
        color: 'rgb(24, 39, 66, 0.6)'
    },
    '&:focus': {
        '::placeholder': { color: 'rgba(24, 39, 66, 0.3)' }
    }
});

const ResultsContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: '16px',
    width: '100%',
});

let HighlightedWrapper = Glamorous.span({
    '> em': {
        color: '#3297d3',
        fontWeight: 600,
        fontStyle: 'normal'
    }
});

const Highlighted = (props: { text?: string, field: string, highlight: { key: string, match: string }[] }) => {
    let existing = props.highlight.find((k) => k.key === props.field);
    if (existing) {
        return <HighlightedWrapper dangerouslySetInnerHTML={{ __html: existing.match }} />;
    } else {
        if (props.text) {
            return <>{props.text}</>;
        } else {
            return null;
        }
    }
};

// const ResultHeader = Glamorous.div({
//     display: 'flex',
//     flexDirection: 'row',
//     color: '#3297d3',
//     fontSize: 12,
//     fontWeight: 700
// })

const ResultTilte = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
});

const ResultTilteMain = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    fontSize: 13,
    flexGrow: 1
});

const ResultTilteHint = Glamorous.div({
    fontSize: 13,
    opacity: 0.7
});

const ResultBody = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    fontSize: 13
});

const ResultBodyMain = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    opacity: 0.7,
    marginRight: 8,
    width: 100
});

const Tilte = Glamorous(XTitle)({
    paddingLeft: 16
});

let SearchResults = withSearch((props) => {
    if (props.data && props.data.search && (props.data.search.parcels.edges.length > 0 || props.data.search.folders.edges.length > 0)) {
        return (
            <ResultsContainer>
                <XSearchList>
                    {props.data.search.folders.edges.length > 0 && <Tilte>Folders</Tilte>}
                    {props.data.search.folders.edges.map((v) => (
                        <XSearchListItem key={v.node.id} path={'/folders/' + v.node.id}>
                            <ResultTilte>
                                <ResultTilteMain>{v.node.name}</ResultTilteMain>
                            </ResultTilte>
                        </XSearchListItem>
                    ))}
                    {props.data.search.folders.edges.length > 0 && <Tilte>Parcels</Tilte>}
                    {props.data.search.parcels.edges.map((v) => (
                        <XSearchListItem key={v.node.id} path={'/parcels/' + v.node.id}>
                            <ResultTilte>
                                <ResultTilteMain>{TextGlobalSearch.parcelIdPrefix}<Highlighted text={v.node.title} field={'title'} highlight={v.highlight} /></ResultTilteMain>
                                <ResultTilteHint>{v.node.extrasArea && <XArea value={v.node.extrasArea} />}</ResultTilteHint>
                            </ResultTilte>
                            {!v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>{TextGlobalSearch.neighborhood}</ResultBodyMain>
                                    {v.node.extrasNeighborhood}
                                </ResultBody>
                            )}
                            {v.highlight.find((k) => k.key === 'address') && (
                                <ResultBody>
                                    <ResultBodyMain>{TextGlobalSearch.address}</ResultBodyMain>
                                    <Highlighted field={'address'} highlight={v.highlight} />
                                </ResultBody>
                            )}
                        </XSearchListItem>
                    ))}
                </XSearchList>
            </ResultsContainer>
        );
    } else {
        return null;
    }
});

//
// Menu
//

const MenuView = Glamorous(XScrollView)({
    width: 278,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    // backgroundColor: 'transparent',
    // position: 'sticky',
    // top: 0,
    // left: 64,
    height: '100vh',

    '& > .simplebar-scroll-content': {
        '& > .simplebar-content': {
            overflowX: 'hidden'
        }
    },
    borderRight: '1px solid rgba(216, 218, 229, 0.7)'

});

//
// Implementation
//

class ScaffoldMenu extends React.Component {
    static defaultProps = {
        _isSidebarMenu: true
    };
    render() {
        if (React.Children.count(this.props.children) === 0) {
            return null;
        }
        return (
            <MenuView>
                {this.props.children}
            </MenuView>
        );
    }
}

const PageDiv = Glamorous.div({
    display: 'flex',
    flexShrink: 0,
    flexGrow: 0,
    width: '64px',
    height: '64px'
});

class ScaffoldContent extends React.Component<{ padding?: boolean, bottomOffset?: boolean }> {
    static defaultProps = {
        _isSidebarContent: true
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
            show: !this.state.show
        });
    }

    closer = () => {
        if (!this.inner) {
            this.setState({
                show: false
            });
        }
    }

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    }

    render() {
        let AddListingContent = withUserInfo((props) => {
            return (
                <>
                    <XMenuItem style="primary-sky-blue" query={{ field: 'createOrganization', value: 'true' }}>{TextGlobal.addOrganization}</XMenuItem>
                    <XMenuItem style="primary-sky-blue" query={{ field: 'createOrganization', value: 'community' }}>{TextGlobal.addCommunity}</XMenuItem>
                    <XMenuItem style="primary-sky-blue" query={{ field: 'createChannel', value: 'true' }}>{TextGlobal.addChannel}</XMenuItem>
                </>
            );
        });

        return (
            <XPopper
                contentContainer={<XMenuVertical />}
                placement="right-end"
                show={this.state.show}
                marginTop={5}
                marginLeft={16}
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
            show: !this.state.show
        });
    }

    closer = () => {
        this.setState({
            show: false
        });
    }

    render() {
        let AddListingContent = withUserInfo((props) => {
            return (
                <>
                    <XMenuItem style="primary-sky-blue" path="/super/stats">{TextAppBar.items.stats}</XMenuItem>
                    <XMenuItem style="primary-sky-blue" path="/super">{TextAppBar.items.adminMenu}</XMenuItem>
                    <XMenuItem style="primary-sky-blue" path="/ui">{TextAppBar.items.xFramework}</XMenuItem>
                </>
            );
        });

        return (
            <XPopper
                contentContainer={<XMenuVertical />}
                placement="right-end"
                show={this.state.show}
                padding={0}
                marginLeft={16}
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

export const ChannelButton = withNotificationCounter((props) => {
    return (
        <XPopper
            placement="right"
            showOnHoverContent={false}
            showOnHover={true}
            groupId="scaffold_tooltip"
            style="dark"
            padding={-2}
            content={(
                <strong>{TextAppBar.items.channel}</strong>
            )}
        >
            <NavigatorItem path="/channel" activateForSubpaths={true}>
                <ChannelIcon />
                {props.data.counter && props.data.counter.unreadCount > 0 && <XCounter borderColor="#f5f7f9" count={props.data.counter.unreadCount} />}
            </NavigatorItem>
        </XPopper>
    );
});

export const MessengerButton = withNotificationCounter((props) => {
    return (
        <XPopper
            placement="right"
            showOnHoverContent={false}
            showOnHover={true}
            style="dark"
            padding={-2}
            groupId="scaffold_tooltip"
            content={(
                <strong>{TextAppBar.items.mail}</strong>
            )}
        >
            <NavigatorItem path="/mail" activateForSubpaths={true}>
                <MessagesIcon />
                {props.data.counter && props.data.counter.unreadCount > 0 && <XCounter borderColor="#f5f7f9" count={props.data.counter.unreadCount} />}
            </NavigatorItem>
        </XPopper>
    );
});

export const CreateOrganization = withCreateOrganization((props) => {
    let community = props.router.query.createOrganization === 'community';
    let texts = community ? InitTexts.create_community_popper : InitTexts.create_organization_popper;
    return (
        <XModalForm
            targetQuery="createOrganization"
            useTopCloser={true}
            title={texts.title}
            submitBtnText={texts.submit}
            defaultAction={async (data) => {
                let res = await props.createOrganization({
                    variables:
                    {
                        input: {
                            personal: false,
                            name: data.input.name,
                            about: data.input.about,
                            isCommunity: community,
                            photoRef: data.input.photoRef
                        }
                    }
                });
                switchOrganization(res.data.createOrganization.id);
                await delayForewer();
            }}
            defaultData={{
                input: {
                    name: '',
                    website: '',
                    photoRef: null
                }
            }}
        >

            <XVertical separator="large">
                <XFormLoadingContent>
                    <XHorizontal>
                        <XVertical
                            separator={8}
                            flexGrow={1}
                        >
                            <XInput
                                flexGrow={1}
                                field="input.name"
                                size="large"
                                placeholder={texts.namePlaceholder}
                            />
                            <XTextArea
                                placeholder={texts.descriptionPlaceholder}
                                resize={false}
                                valueStoreKey="fields.input.about"
                            />
                        </XVertical>
                        <XAvatarUpload field="input.photoRef" placeholder={{ add: texts.addPhoto, change: texts.changePhoto }} />
                    </XHorizontal>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
    );
});

export const CreateChannel = withCreateChannel((props) => {
    return (
        <XModalForm
            {...props}
            useTopCloser={true}
            title="Create channel"
            targetQuery="createChannel"
            defaultAction={async (data) => {
                let oid = props.router.query.createChannel;
                let channel = await props.createChannel({ variables: { title: data.input.name, description: data.input.description, oid: oid !== 'true' ? oid : undefined } });
                delay(0).then(() => {
                    props.router.push('/mail/' + channel.data.channel.id);
                });

            }}
            defaultData={{
                input: {
                    name: ''
                }
            }}
            submitBtnText="Create channel"
        >
            <XVertical separator={8}>
                <XInput
                    flexGrow={1}
                    size="large"
                    placeholder="Channel title"
                    field="input.name"
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

export class Scaffold extends React.Component<{}, { search: boolean, searchText: string }> {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    contentRef: any | null = null;

    searchRef: any | null = null;

    constructor(props: {}) {
        super(props);
        this.state = { search: false, searchText: '' };
    }

    handleSearch = () => {
        if (this.state.search) {
            this.setState({ search: false });
            this.enableScroll(this.contentRef);
        } else {
            this.setState({ search: true, searchText: '' });
            this.disableScroll(this.contentRef);
            if (this.searchRef) {
                this.searchRef.focus();
            }
        }
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (this.state.search) {
            this.setState({ searchText: (e.target as any).value as string });
        }
    }

    handleSearchRef = (ref: any | null) => {
        this.searchRef = ref;
    }

    handleContentRef = (ref: any | null) => {
        this.contentRef = ref;
    }

    preventDefault = (e: any) => {
        e = e || window.event;

        if (e.target.closest('.simplebar-content')) {
            return;
        } else if (e.target.closest('.search-container')) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }
    }

    preventDefaultForScrollKeys = (e: any) => {
        if (this.keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        } else {
            return undefined;
        }
    }

    disableScroll = (el: any) => {
        if (el.addEventListener) {
            el.addEventListener('DOMMouseScroll', this.preventDefault, false);
        }

        el.onwheel = this.preventDefault;
        el.onmousewheel = (document as any).onmousewheel = this.preventDefault;
        el.ontouchmove = this.preventDefault;
        document.onkeydown = this.preventDefaultForScrollKeys;
    }

    enableScroll = (el: any) => {
        if (el.removeEventListener) {
            el.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        }
        el.onmousewheel = (document as any).onmousewheel = null;
        el.onwheel = null;
        el.ontouchmove = null;
        document.onkeydown = null;
    }

    render() {
        let menu = findChild(this.props.children, '_isSidebarMenu');
        let content = findChild(this.props.children, '_isSidebarContent');

        return (
            <RootContainer>
                <NavigationWrapper activeSearch={this.state.search}>
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
                                content={(
                                    <strong>{TextAppBar.items.directory}</strong>

                                )}
                            >
                                <NavigatorItem path="/directory" activateForSubpaths={true}>
                                    <DirecoryIcon />
                                </NavigatorItem>
                            </XPopper>
                            <BottomNavigation>
                                <AddMenu />
                                <XWithRole role={['super-admin', 'software-developer']}>
                                    <AdminMenu />
                                </XWithRole>
                                <NavigationDivider top={10} bottom={10} />
                                <NavigatorItem>
                                    <UserProfile />
                                </NavigatorItem>
                            </BottomNavigation>
                        </NavigationContainer>
                    </NavigationScroller>
                    <SearchWrapper visible={this.state.search} className="search-container">
                        <SearchWrapperSticky>
                            <SearchContainer onClick={this.handleSearch} />
                            <SearchContent>
                                <SearchInput
                                    placeholder={TextGlobalSearch.placeholder}
                                    onChange={this.handleSearchChange}
                                    innerRef={this.handleSearchRef}
                                    value={this.state.searchText}
                                />
                                {this.state.searchText.trim().length > 0 && this.state.search && (<SearchResults variables={{ query: this.state.searchText }} />)}
                            </SearchContent>
                        </SearchWrapperSticky>
                    </SearchWrapper>
                    {menu}
                </NavigationWrapper>
                <ContentView
                    marginLeft={menu !== undefined ? 342 : 64}
                    innerRef={this.handleContentRef}
                >
                    {content}
                </ContentView>

                <CreateOrganization />
                <CreateChannel />
            </RootContainer>
        );
    }
}