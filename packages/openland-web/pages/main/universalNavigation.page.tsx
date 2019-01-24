import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withApp } from 'openland-web/components/withApp';
import { withRouter } from 'openland-x-routing/withRouter';
import { Menu, MenuItem } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { tabs, tabsT } from './mail/tabs';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { withRoom } from 'openland-web/api/withRoom';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { MessagesStateContextProps } from 'openland-web/components/messenger/MessagesStateContext';
import { ChatHeaderView } from 'openland-web/fragments/chat/ChatHeaderView';
import { XLoader } from 'openland-x/XLoader';
import { MainLayout } from 'openland-web/components/MainLayout';
import { Room, UserShort } from 'openland-api/Types';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { PopperOptionsButton } from 'openland-web/pages/main/directory/components/PopperOptionsButton';
import { XMenuItem } from 'openland-x/XMenuItem';
import { TextDirectory } from 'openland-text/TextDirectory';
import { UserProfile } from 'openland-web/pages/main/profile/UserProfileComponent';
import { OrganizationProfile } from 'openland-web/pages/main/profile/OrganizationProfileComponent';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchBox } from 'openland-web/pages/main/directory/components/SearchBox';
import { SortPicker } from 'openland-web/pages/main/directory/sortPicker';
import { XSubHeader } from 'openland-x/XSubHeader';
import { PeopleCards } from 'openland-web/pages/main/directory/people.page';
import { OrganizationCards } from 'openland-web/pages/main/directory/organizations.page';
import { CommunitiesCards } from 'openland-web/pages/main/directory/communities.page';
import { RoomProfile } from 'openland-web/pages/main/profile/RoomProfileComponent';
import { Rooms } from 'openland-web/fragments/RoomsExploreComponent';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

export const LinkOverwriteContext = React.createContext<{
    prefix: string;
}>({
    prefix: '',
});

// TODO
// need to add prefix universalNavigation to all routes somehow

const containerStyle = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 344px;
    flex-shrink: 0;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #ececec;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
`;

const DesktopDialogContainer = ({ children }: { children: any }) => (
    <div className={containerStyle}>{children}</div>
);
interface MessengerComponentLoaderProps {
    variables: { id: string };
    state?: MessagesStateContextProps;
    user: UserShort;
    loading: boolean;
    data: Room;
}

const ChatHeaderViewLoader = withRoom(withQueryLoader(
    withUserInfo(({ user, data, loading }: MessengerComponentLoaderProps) => {
        if (!data || !data.room || loading) {
            if (loading) {
                return <XLoader loading={true} />;
            }
            return <div />;
        }

        return (
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                height={55}
                paddingLeft={20}
                paddingRight={20}
            >
                <ChatHeaderView room={data.room} me={user} />
            </XView>
        );
    }),
) as any) as React.ComponentType<{
    variables: { id: string };
    state?: MessagesStateContextProps;
}>;

type PageInnerProps = {
    swapFragmentsOnMobile?: boolean;
    firstFragmentMenu: any;
    firstFragment: any;
    secondFragment: any;
    secondFragmentHeader: any;
    tab: string;
    conversationId: string | null | undefined;
    oid: string | null | undefined;
    uid: string | null | undefined;
    cid: string | null | undefined;
};

const MobilePageInner = ({
    tab,
    firstFragmentMenu,
    secondFragmentHeader,
    firstFragment,
    secondFragment,
    swapFragmentsOnMobile,
}: PageInnerProps) => {
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100%"
        >
            {tab === tabs.empty ? (
                <XView width="100%">
                    {firstFragmentMenu}
                    {swapFragmentsOnMobile ? secondFragment : firstFragment}
                </XView>
            ) : (
                <XView flexDirection="column" flexGrow={1}>
                    {secondFragmentHeader}
                    {swapFragmentsOnMobile ? firstFragment : secondFragment}
                </XView>
            )}
        </XView>
    );
};

const DesktopPageInner = ({
    firstFragmentMenu,
    firstFragment,
    secondFragment,
    secondFragmentHeader,
}: PageInnerProps) => {
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100%"
            width="100%"
        >
            <DesktopDialogContainer>
                {firstFragmentMenu}
                {firstFragment}
            </DesktopDialogContainer>
            <XView flexDirection="column" flexGrow={1}>
                {secondFragmentHeader}
                {secondFragment}
            </XView>
        </XView>
    );
};

const PageInner = AdaptiveHOC({
    DesktopComponent: DesktopPageInner,
    MobileComponent: MobilePageInner,
    fullWidth: true,
});

const DirectoryContent = ({
    id,
    searchPlaceholder,
    noQueryText,
    hasQueryText,
    CardsComponent,
    ProfileComponent,
}: {
    id?: string | null;
    searchPlaceholder: string;
    noQueryText: string;
    hasQueryText: string;
    CardsComponent: any;
    ProfileComponent: any;
}) => {
    const [orgCount, setOrgCount] = React.useState(0);
    const [query, setQuery] = React.useState('');
    const [sort, setSort] = React.useState({
        orderBy: 'createdAt',
        featured: true,
    });

    const tagsCount = (n: number) => {
        if (orgCount !== n) {
            setOrgCount(n);
        }
    };

    return (
        <>
            {!id && (
                <XVertical separator={0} height="100%">
                    <SearchBox value={query} onChange={setQuery} placeholder={searchPlaceholder} />
                    {query.length <= 0 && (
                        <XSubHeader
                            title={noQueryText}
                            right={
                                <SortPicker sort={sort} onPick={setSort} withoutFeatured={true} />
                            }
                        />
                    )}
                    {query.length > 0 && orgCount > 0 && (
                        <XSubHeader
                            title={hasQueryText}
                            counter={orgCount}
                            right={
                                <SortPicker sort={sort} onPick={setSort} withoutFeatured={true} />
                            }
                        />
                    )}
                    <CardsComponent
                        featuredFirst={sort.featured}
                        orderBy={sort.orderBy}
                        tagsCount={tagsCount}
                        variables={{
                            query,
                        }}
                    />
                </XVertical>
            )}
            {id && <ProfileComponent id={id} />}
        </>
    );
};

const SearchUserProfileComponent = ({ id }: { id: string }) => (
    <UserProfile userId={id} onDirectory={true} />
);

const SearchOrganizationProfileComponent = ({ id }: { id: string }) => (
    <OrganizationProfile organizationId={id} onDirectory={true} />
);

const SearchRoomsProfileComponent = ({ id }: { id: string }) => (
    <RoomProfile conversationId={id} onDirectory={true} />
);

class Communities extends React.PureComponent<any> {
    tagsCount = (n: number) => {
        this.props.tagsCount(n);
    };

    render() {
        let sort = [{ [this.props.orderBy]: { order: 'desc' } }];
        if (this.props.featuredFirst) {
            sort.unshift({ ['featured']: { order: 'desc' } } as any);
        }

        return (
            <CommunitiesCards
                tagsCount={this.tagsCount}
                variables={{
                    query: this.props.variables.query,
                    sort: JSON.stringify(sort),
                }}
            />
        );
    }
}
class Organizations extends React.PureComponent<any> {
    tagsCount = (n: number) => {
        this.props.tagsCount(n);
    };

    render() {
        let sort = [{ [this.props.orderBy]: { order: 'desc' } }];
        if (this.props.featuredFirst) {
            sort.unshift({ ['featured']: { order: 'desc' } } as any);
        }

        return (
            <OrganizationCards
                tagsCount={this.tagsCount}
                variables={{
                    prefix: this.props.variables.query,
                    sort: JSON.stringify(sort),
                }}
            />
        );
    }
}

const UniversalNavigation = ({
    tab,
    title,
    menuRightContent,
    menuChildrenContent,
    swapFragmentsOnMobile,
    secondFragmentHeader,
    firstFragment,
    secondFragment,
}: {
    tab?: any;
    title: string;
    menuRightContent?: any;
    menuChildrenContent?: any;
    swapFragmentsOnMobile?: any;
    secondFragmentHeader?: any;
    firstFragment?: any;
    secondFragment?: any;
}) => {
    return (
        <>
            <XDocumentHead title={title} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <XView
                        flexDirection="row"
                        flexGrow={1}
                        flexShrink={0}
                        overflow="hidden"
                        alignItems="stretch"
                        height="100%"
                        width="100%"
                    >
                        <PageInner
                            tab={tab}
                            swapFragmentsOnMobile={swapFragmentsOnMobile}
                            firstFragmentMenu={
                                <Menu title={title} rightContent={menuRightContent}>
                                    {menuChildrenContent}
                                </Menu>
                            }
                            secondFragmentHeader={secondFragmentHeader}
                            firstFragment={firstFragment}
                            secondFragment={secondFragment}
                        />
                    </XView>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
};

const MessagesUniversalNavigation = ({
    tab,
    showDebugFragments,
}: {
    tab?: any;
    showDebugFragments: boolean;
}) => {
    return (
        <UniversalNavigation
            title="Messages"
            tab={tab}
            menuRightContent={
                <PopperOptionsButton
                    path="/mail/new"
                    icon={<PlusIcon />}
                    title={TextDirectory.create.title}
                />
            }
            secondFragmentHeader={
                <>
                    <ChatHeaderViewLoader
                        variables={{
                            id: 'Jlb4AOJBWEc5MvaQWkjLhlALo0',
                        }}
                    />
                    <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                </>
            }
            firstFragment={showDebugFragments && <XView color="red">firstFragment</XView>}
            secondFragment={showDebugFragments && <XView color="blue">secondFragment</XView>}
        />
    );
};

const DirectoryUniversalNavigation = ({
    showDebugFragments,
    path,
}: {
    showDebugFragments: boolean;
    path: string;
}) => {
    let ProfileComponent;
    let CardsComponent;
    let searchPlaceholder = '';
    let noQueryText = '';
    let hasQueryText = '';
    let id: string | null = '';
    let title = '';

    const directoryRightContent = (
        <>
            <XMenuItem
                query={{
                    field: 'createOrganization',
                    value: 'true',
                }}
                icon="x-dropdown-organization"
            >
                {TextDirectory.create.organization}
            </XMenuItem>
            <XMenuItem
                query={{
                    field: 'createRoom',
                    value: 'true',
                }}
                icon="x-dropdown-room"
            >
                {TextDirectory.create.room}
            </XMenuItem>
            <XMenuItem
                query={{
                    field: 'createOrganization',
                    value: 'community',
                }}
                icon="x-dropdown-community"
            >
                {TextDirectory.create.community}
            </XMenuItem>
        </>
    );

    const getDirectoryId = (myPath: string, substring: string) => {
        if (!myPath.includes(substring)) {
            return null;
        }
        return path.split(substring)[1];
    };

    const getOrganizationProfile = (myPath: string) => getDirectoryId(myPath, '/directory/o/');

    const isOrganization = (myPath: string) => {
        return myPath.endsWith('/organizations') || !!getOrganizationProfile(myPath);
    };

    const getPeopleProfile = (myPath: string) => getDirectoryId(myPath, '/directory/u/');

    const isPeople = (myPath: string) => {
        return myPath.endsWith('/people') || !!getPeopleProfile(myPath);
    };

    const getRoomProfile = (myPath: string) => {
        return (
            getDirectoryId(myPath, '/directory/r/') ||
            getDirectoryId(myPath, '/directory/p/') ||
            null
        );
    };

    const isRoom = (myPath: string) => {
        return myPath.endsWith('/directory') || !!getRoomProfile(myPath);
    };

    const getCommunityProfile = (myPath: string) => getDirectoryId(myPath, '/directory/c/');

    const isCommunity = (myPath: string) => {
        return myPath.endsWith('/communities') || !!getCommunityProfile(myPath);
    };

    if (getOrganizationProfile(path)) {
        id = getOrganizationProfile(path);
    } else if (getPeopleProfile(path)) {
        id = getPeopleProfile(path);
    } else if (getRoomProfile(path)) {
        id = getRoomProfile(path);
    } else if (getCommunityProfile(path)) {
        id = getCommunityProfile(path);
    }

    if (isOrganization(path)) {
        title = 'Organizations';
        ProfileComponent = SearchOrganizationProfileComponent;
        CardsComponent = Organizations;
        searchPlaceholder = 'Search organizations';
        noQueryText = 'All organizations';
        hasQueryText = 'Organizations';
    } else if (isCommunity(path)) {
        title = 'Communities';
        ProfileComponent = SearchOrganizationProfileComponent;
        CardsComponent = Communities;
        searchPlaceholder = 'Search communities';
        noQueryText = 'All communities';
        hasQueryText = 'Communities';
    } else if (isPeople(path)) {
        title = 'People';
        ProfileComponent = SearchUserProfileComponent;
        CardsComponent = PeopleCards;
        searchPlaceholder = 'Search people';
        noQueryText = 'All people';
        hasQueryText = 'People';
    } else if (isRoom(path)) {
        title = 'Rooms';
        ProfileComponent = SearchRoomsProfileComponent;
        CardsComponent = Rooms;
        searchPlaceholder = 'Search rooms';
        noQueryText = 'All rooms';
        hasQueryText = 'Rooms';
    }

    return (
        <UniversalNavigation
            title={title}
            swapFragmentsOnMobile
            tab={tabs.empty}
            menuRightContent={
                <PopperOptionsButton
                    path="/mail/new"
                    icon={<PlusIcon />}
                    title={TextDirectory.create.title}
                    content={directoryRightContent}
                />
            }
            menuChildrenContent={
                <>
                    <MenuItem path="/directory" title="Rooms" icon={<RoomIcon />} />
                    <MenuItem path="/directory/people" title="People" icon={<PeopleIcon />} />
                    <MenuItem
                        path="/directory/organizations"
                        title="Organizations"
                        icon={<OrganizationsIcon />}
                    />
                    <MenuItem
                        path="/directory/communities"
                        title="Communities"
                        icon={<CommunityIcon />}
                    />
                    <XWithRole role="feature-non-production">
                        <MenuItem
                            path="/directory/explore"
                            title="Explore"
                            icon={<CommunityIcon />}
                        />
                    </XWithRole>
                </>
            }
            firstFragment={showDebugFragments && <XView color="red">firstFragment</XView>}
            secondFragment={
                <XView flexGrow={1}>
                    <DirectoryContent
                        id={id}
                        ProfileComponent={ProfileComponent}
                        CardsComponent={CardsComponent}
                        searchPlaceholder={searchPlaceholder}
                        noQueryText={noQueryText}
                        hasQueryText={hasQueryText}
                    />
                    {showDebugFragments && <XView color="blue">secondFragment</XView>}
                </XView>
            }
        />
    );
};

export default withApp(
    'Mail',
    'viewer',
    withRouter(
        withQueryLoader((props: any) => {
            let { router, organizationId, userId } = props;
            const { path, routeQuery } = router;

            let isCompose = path.endsWith('/new');
            let pageTitle = isCompose ? 'New chat' : undefined;

            if (!canUseDOM) {
                return (
                    <>
                        <XDocumentHead title={pageTitle} />
                        <Scaffold>{}</Scaffold>
                    </>
                );
            }

            let isRooms = path.endsWith('/channels');
            let isCall = path.endsWith('/call');
            let isInvite = path.includes('joinChannel');
            let isChat = path.includes('/mail');
            let isDirectory = path.includes('/directory');

            let cid = routeQuery.conversationId;
            let oid = organizationId || routeQuery.organizationId;
            let uid = userId || routeQuery.userId;
            let tab: tabsT = tabs.empty;
            if (isCompose) {
                tab = tabs.compose;
            }

            if (!isCompose && !cid) {
                tab = tabs.empty;
            }

            if (!isCompose && cid) {
                tab = tabs.conversation;
            }

            if (isInvite) {
                tab = tabs.invite;
            }

            if (isRooms) {
                tab = tabs.rooms;
            }

            if (isCall) {
                tab = tabs.conference;
            }

            if (oid) {
                tab = tabs.organization;
            }

            if (uid) {
                tab = tabs.user;
            }

            if (cid && isChat) {
                tab = tabs.chat;
            }

            if (tab === tabs.empty) {
                pageTitle = undefined;
            }

            const showDebugFragments = false;

            return (
                <LinkOverwriteContext.Provider
                    value={{
                        prefix: '/universalNavigation',
                    }}
                >
                    {isDirectory ? (
                        <DirectoryUniversalNavigation
                            path={path}
                            showDebugFragments={showDebugFragments}
                        />
                    ) : (
                        <MessagesUniversalNavigation
                            tab={tab}
                            showDebugFragments={showDebugFragments}
                        />
                    )}
                </LinkOverwriteContext.Provider>
            );
        }),
    ),
);
