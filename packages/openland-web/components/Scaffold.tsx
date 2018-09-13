import * as React from 'react';
import Glamorous from 'glamorous';
import { findChild } from './utils';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XPicture } from 'openland-x/XPicture';
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
import { XModal } from 'openland-x-modal/XModal';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable } from 'openland-x/Navigable';
import { XMenuItem, XMenuVertical } from 'openland-x/XMenuItem';
import { OrganizationPicker } from './OrganizationPicker';
import * as Cookie from 'js-cookie';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { withNotificationCounter } from '../api/withNotificationCounter';
import { InvitesToOrganizationModal, InvitesGlobalModal } from '../pages/main/settings/invites';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { TextInvites } from 'openland-text/TextInvites';
import DirecoryIcon from '../pages/main/directory/icons/directory.2.svg';
import { Query } from 'react-apollo';
import { MyOrganizationsQuery } from 'openland-api';
import AddIcon from './icons/add-1.svg';
import HomeIcon from './icons/home-1.svg';
import MessagesIcon from './icons/messages-1.svg';
import ChannelIcon from './icons/channel-1.svg';
import DevToolsIcon from './icons/devtools_1.svg';
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

//
// Root
//

const RootContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    minWidth: 800,
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
    paddingTop: 8,
});

const NavigationScroller = Glamorous(XScrollView)<{ sidebarBorderColor?: string }>((props) => ({
    minHeight: '100vh',
    height: '100%',
    width: 72,
    backgroundColor: '#FAFAFC',
    // backgroundColor: 'transparent',
    flexShrink: 0,
    borderRightColor: props.sidebarBorderColor ? props.sidebarBorderColor : 'rgba(0,0,0, 0.05)',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    // position: 'sticky',
    // top: 0,
}));

const Logo = Glamorous(XPicture)({
    height: 48,
    width: 48,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: 'center',
    flexShrink: 0
});

const NavigationDivider = Glamorous.div({
    width: 36,
    height: 1,
    marginTop: 4,
    marginBottom: 4,
    alignSelf: 'center',
    backgroundColor: '#000000',
    opacity: 0.05,
    flexShrink: 0,

    '@media (min-height: 768px)': {
        marginTop: 5,
        marginBottom: 5,
    },
});

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
    paddingTop: 16,
    paddingBottom: 16,
    flexShrink: 0,
    color: '#939ca8',
    cursor: 'pointer',

    '@media (min-height: 768px)': {
        paddingTop: 22,
        paddingBottom: 22,
    },

    '& > svg *': {
        fill: '#939ca8',
    },

    '.is-active': {
        color: '#1790ff',
        '& > svg *': {
            fill: '#1790ff',
        },
        '& > .reports .hover': {
            display: 'block'
        },
        '& > .reports .no-hover': {
            display: 'none'
        },
    },
    '&:hover': {
        color: '#1790ff',
        '& > svg *': {
            fill: '#1790ff',
            fillRule: 'nonzero'
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
        right: 13,
        top: 11
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

class UserPopper extends React.Component<{ picture: string | null, name?: string, id?: string, logo?: string | null, organizationName?: string, organizationId?: string, hasMultipleOrganizations: boolean }, { show: boolean }> {
    constructor(props: { picture: string | null, name?: string, hasMultipleOrganizations: boolean }) {
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
            Cookie.set('x-openland-user-photo', this.props.picture || '', { path: '/' });
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
        this.setState({
            show: false
        });
    }

    render() {

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
                        <XVertical separator="none">
                            {this.props.organizationId && (
                                <>
                                    <OrganizationTitleContainer path={'/directory/o/' + this.props.organizationId} autoClose={true}>
                                        <XAvatar path={'/directory/o/' + this.props.organizationId} cloudImageUuid={this.props.logo || undefined} style="organization" />
                                        <XVertical separator={1}>
                                            <ProfileTitle >{this.props.organizationName}</ProfileTitle>
                                            <ProfileSubTitle>{TextGlobal.viewProfile}</ProfileSubTitle>
                                        </XVertical>
                                    </OrganizationTitleContainer>
                                    <XMenuItem style="primary-sky-blue" path="/settings/organization" autoClose={true}>{TextGlobal.editProfile}</XMenuItem>
                                    <XWithRole role={['super-admin', 'software-developer']}>
                                        <XMenuItem style="primary-sky-blue" query={{ field: 'invite', value: 'true' }} autoClose={true}>{TextInvites.inviteButton}</XMenuItem>
                                    </XWithRole>

                                    <div style={{ borderTop: '1px solid rgba(220, 222, 228, 0.6)', marginTop: 12 }} />
                                </>
                            )}

                            <ProfileNaviTitleContainer path="/settings/profile" autoClose={true}>
                                <XAvatar path="/settings/profile" cloudImageUuid={this.props.picture || undefined} style="colorus" userName={this.props.name} userId={this.props.id}/>
                                <XVertical separator={1}>
                                    <ProfileTitle >{this.props.name}</ProfileTitle>
                                    <ProfileSubTitle>{TextGlobal.settings}</ProfileSubTitle>
                                </XVertical>
                            </ProfileNaviTitleContainer>
                            <XMenuItem style="primary-sky-blue" path="/auth/logout">{TextGlobal.signOut}</XMenuItem>
                        </XVertical>
                    </XModalContext.Provider>
                )}
            >
                <XAvatar cloudImageUuid={this.props.picture || undefined} onClick={this.switch} style="colorus" userName={this.props.name} userId={this.props.id}/>
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
                    logo={props.organization ? props.organization.photo : undefined}
                    organizationName={props.organization ? props.organization.name : undefined}
                    organizationId={props.organization ? props.organization.id : undefined}
                    hasMultipleOrganizations={data.data && data.data.myOrganizations.length > 1}
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
    minHeight: '100vh',
    // overflow: 'hidden',
    // borderTopLeftRadius: 8,
    // borderBottomLeftRadius: 8,
    backgroundColor: '#ffffff',
    flex: 1,
    order: 2,
    minWidth: 0,
    maxWidth: '100%',
    position: 'relative',
    zIndex: 0,
    marginLeft: props.marginLeft
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
    left: 72,
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
    left: 72,
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
    backgroundColor: '#FAFAFC',
    // backgroundColor: 'transparent',
    // position: 'sticky',
    // top: 0,
    // left: 72,
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

interface ScaffoldProps {
    sidebarBorderColor?: string;
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
                    <XMenuItem style="primary-sky-blue" path="/mail/new">{TextGlobal.startChat}</XMenuItem>
                    <XWithRole role={['super-admin', 'software-developer']}>
                        <XPopper
                            contentContainer={<XMenuVertical />}
                            placement="right-start"
                            showOnHover={true}
                            padding={0}
                            marginTop={-8}
                            content={(
                                <div ref={this.onInner}>
                                    <XMenuItem style="primary-sky-blue" query={{ field: 'invite', value: 'true' }}>{TextGlobal.joinYourOrganization}</XMenuItem>
                                    <XMenuItem style="primary-sky-blue" query={{ field: 'invite_global', value: 'true' }}>{TextGlobal.joinOpenland}</XMenuItem>
                                </div>
                            )}
                        >
                            <XMenuItem style="primary-sky-blue" iconRight="x-right">{TextGlobal.sendInvites}</XMenuItem>
                        </XPopper>
                    </XWithRole>
                    <XMenuItem style="primary-sky-blue" query={{ field: 'createOrganization', value: 'true' }}>{TextGlobal.addOrganization}</XMenuItem>
                    <XMenuItem style="primary-sky-blue" query={{ field: 'createOrganization', value: 'community' }}>{TextGlobal.addCommunity}</XMenuItem>
                    <XMenuItem style="primary-sky-blue" query={{ field: 'createChannel', value: 'true' }}>{TextGlobal.addChannel}</XMenuItem>
                </>
            );
        });

        return (
            <XPopper
                contentContainer={<XMenuVertical />}
                placement="right-start"
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
                {props.data.counter && props.data.counter.unreadCount > 0 && <XCounter count={props.data.counter.unreadCount} />}
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
                {props.data.counter && props.data.counter.unreadCount > 0 && <XCounter count={props.data.counter.unreadCount} />}
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
                                color="primary-sky-blue"
                                flexGrow={1}
                                field="input.name"
                                size="r-default"
                                placeholder={texts.namePlaceholder}
                            />
                            <XTextArea
                                placeholder={texts.descriptionPlaceholder}
                                resize={false}
                                size="small"
                                valueStoreKey="fields.input.about"
                            />
                        </XVertical>
                        <XAvatarUpload field="input.photoRef" placeholder={{add: texts.addPhoto, change: texts.changePhoto}}/>
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
                let channel = await props.createChannel({ variables: { title: data.input.name, message: 'channel created', description: data.input.description } });
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
                    size="r-default"
                    color="primary-sky-blue"
                    placeholder="Channel title"
                    field="input.name"
                />
                <XTextArea
                    placeholder="Description"
                    resize={false}
                    size="small"
                    valueStoreKey="fields.input.description"
                />
            </XVertical>
        </XModalForm>

    );
});

export class Scaffold extends React.Component<ScaffoldProps, { search: boolean, searchText: string }> {
    static Menu = ScaffoldMenu;
    static Content = ScaffoldContent;

    keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    contentRef: any | null = null;

    searchRef: any | null = null;

    constructor(props: ScaffoldProps) {
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
        el.onmousewheel = document.onmousewheel = this.preventDefault;
        el.ontouchmove = this.preventDefault;
        document.onkeydown = this.preventDefaultForScrollKeys;
    }

    enableScroll = (el: any) => {
        if (el.removeEventListener) {
            el.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        }
        el.onmousewheel = document.onmousewheel = null;
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
                    <NavigationScroller sidebarBorderColor={this.props.sidebarBorderColor}>
                        <NavigationContainer>
                            <XLink path="/">
                                <Logo picture={{ url: '/static/branding/logo_inverted_squared.png', retina: '/static/branding/logo_inverted_squared@2x.png' }} />
                            </XLink>

                            <NavigationDivider />
                            <AddMenu />
                            <NavigationDivider />

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
                                <NavigatorItem path="/directory">
                                    <DirecoryIcon />
                                </NavigatorItem>
                            </XPopper>

                            <XWithRole role={['feature-search-global']}>
                                <NavigatorItem onClick={this.handleSearch} active={this.state.search}>
                                    <NavigatorIcon icon={this.state.search ? 'close' : 'search'} />
                                </NavigatorItem>
                            </XWithRole>

                            <XWithRole role={['feature-map']}>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    style="dark"
                                    padding={-2}
                                    groupId="scaffold_tooltip"
                                    content={(
                                        <strong>{TextAppBar.items.map}</strong>

                                    )}
                                >
                                    <NavigatorItem path="/map">
                                        <NavigatorIcon icon="map" />
                                    </NavigatorItem>
                                </XPopper>
                            </XWithRole>
                            <XWithRole role={['feature-folders']}>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    style="dark"
                                    padding={-2}
                                    groupId="scaffold_tooltip"
                                    content={(
                                        <strong>{TextAppBar.items.folders}</strong>

                                    )}
                                >
                                    <NavigatorItem path="/folders" activateForSubpaths={true}>
                                        <NavigatorIcon icon="folder" />
                                    </NavigatorItem>
                                </XPopper>
                            </XWithRole>

                            <XWithRole role={['feature-prospecting']}>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    style="dark"
                                    padding={-2}
                                    groupId="scaffold_tooltip"
                                    content={(
                                        <strong>{TextAppBar.items.prospecting}</strong>

                                    )}
                                >
                                    <NavigatorItem path="/prospecting" activateForSubpaths={true}>
                                        <NavigatorIcon icon="sort" />
                                    </NavigatorItem>

                                </XPopper>
                            </XWithRole>
                            <XWithRole role={['feature-deals']}>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    groupId="scaffold_tooltip"
                                    style="dark"
                                    padding={-2}
                                    content={(
                                        <strong>{TextAppBar.items.deals}</strong>
                                    )}
                                >
                                    <NavigatorItem path="/deals" activateForSubpaths={true}>
                                        <NavigatorIcon icon="business_center" />
                                    </NavigatorItem>
                                </XPopper>
                            </XWithRole>
                            <XWithRole role={['feature-customer-kassita']}>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    style="dark"
                                    padding={-2}
                                    groupId="scaffold_tooltip"
                                    content={(
                                        <strong>{TextAppBar.items.reports}</strong>
                                    )}
                                >

                                    <NavigatorItem path="/reports/urbyn_mho_nyc" activateForSubpaths={true}>
                                        <div className="reports">
                                            <img src="/static/img/icons/reports/dh-icon-black.svg" className="no-hover" />
                                            <img src="/static/img/icons/reports/sh-iconblue.svg" className="hover" />
                                        </div>
                                    </NavigatorItem>

                                </XPopper>
                            </XWithRole>
                            <XWithRole role={['feature-favorites']}>
                                <XPopper
                                    placement="right"
                                    showOnHoverContent={false}
                                    showOnHover={true}
                                    style="dark"
                                    padding={-2}
                                    groupId="scaffold_tooltip"
                                    content={(
                                        <strong>{TextAppBar.items.favorites}</strong>
                                    )}
                                >
                                    <NavigatorItem path="/favorites" activateForSubpaths={true}>
                                        <NavigatorIcon icon="favorite" />
                                    </NavigatorItem>

                                </XPopper>
                            </XWithRole>
                            <BottomNavigation>

                                <XWithRole role={['super-admin', 'software-developer']}>
                                    <AdminMenu />
                                </XWithRole>
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
                    marginLeft={menu !== undefined ? 350 : 72}
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