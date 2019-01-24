import * as React from 'react';
import { XView } from 'react-mental';
import { MenuItem } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { tabs } from '../mail/tabs';
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
import { SortPicker } from 'openland-web/pages/main/directory/components/sortPicker';
import { XSubHeader } from 'openland-x/XSubHeader';
import { PeopleCards } from 'openland-web/pages/main/directory/people.page';
import { OrganizationCards } from 'openland-web/pages/main/directory/organizations.page';
import { CommunitiesCards } from 'openland-web/pages/main/directory/communities.page';
import { RoomProfile } from 'openland-web/pages/main/profile/RoomProfileComponent';
import { Rooms } from 'openland-web/fragments/RoomsExploreComponent';
import { UniversalNavigation } from '../UniversalNavigation';

const DirectoryContent = React.memo(
    ({
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
                        <SearchBox
                            value={query}
                            onChange={setQuery}
                            placeholder={searchPlaceholder}
                        />
                        {query.length <= 0 && (
                            <XSubHeader
                                title={noQueryText}
                                right={
                                    <SortPicker
                                        sort={sort}
                                        onPick={setSort}
                                        withoutFeatured={true}
                                    />
                                }
                            />
                        )}
                        {query.length > 0 && orgCount > 0 && (
                            <XSubHeader
                                title={hasQueryText}
                                counter={orgCount}
                                right={
                                    <SortPicker
                                        sort={sort}
                                        onPick={setSort}
                                        withoutFeatured={true}
                                    />
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
    },
);

const SearchUserProfileComponent = React.memo(({ id }: { id: string }) => (
    <UserProfile userId={id} onDirectory={true} />
));

const SearchOrganizationProfileComponent = React.memo(({ id }: { id: string }) => (
    <OrganizationProfile organizationId={id} onDirectory={true} />
));

const SearchRoomsProfileComponent = React.memo(({ id }: { id: string }) => (
    <RoomProfile conversationId={id} onDirectory={true} />
));

const ComponentWithSort = (Component: any) =>
    React.memo(({ featuredFirst, orderBy, variables, tagsCount }: any) => {
        return (
            <Component
                tagsCount={(n: number) => {
                    tagsCount(n);
                }}
                variables={{
                    prefix: variables.query,
                    sort: JSON.stringify([
                        ...(featuredFirst ? [{ ['featured']: { order: 'desc' } } as any] : []),
                        { [orderBy]: { order: 'desc' } },
                    ]),
                }}
            />
        );
    });

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    return myPath.split(substring)[1];
};

const getOrganizationProfile = (path: string) => getId(path, '/directory/o/');

const isOrganization = (path: string) =>
    path.endsWith('/organizations') || !!getOrganizationProfile(path);

const getPeopleProfile = (path: string) => getId(path, '/directory/u/');

const isPeople = (path: string) => path.endsWith('/people') || !!getPeopleProfile(path);

const getRoomProfile = (path: string) =>
    getId(path, '/directory/r/') || getId(path, '/directory/p/') || null;

const isRoom = (path: string) => path.endsWith('/directory') || !!getRoomProfile(path);

const getCommunityProfile = (path: string) => getId(path, '/directory/c/');

const isCommunity = (path: string) => path.endsWith('/communities') || !!getCommunityProfile(path);

export const DirectoryUniversalNavigation = React.memo(({ path }: { path: string }) => {
    let ProfileComponent;
    let CardsComponent;
    let searchPlaceholder = '';
    let noQueryText = '';
    let hasQueryText = '';
    let id: string | null = '';
    let title = '';

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
        CardsComponent = ComponentWithSort(OrganizationCards);
        searchPlaceholder = 'Search organizations';
        noQueryText = 'All organizations';
        hasQueryText = 'Organizations';
    } else if (isCommunity(path)) {
        title = 'Communities';
        ProfileComponent = SearchOrganizationProfileComponent;
        CardsComponent = ComponentWithSort(CommunitiesCards);
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
                    content={
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
                    }
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
                </XView>
            }
        />
    );
});
