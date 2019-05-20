import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';

const RoomsList = () => {
    let resp = getClient().useAccountSettings({ fetchPolicy: 'cache-and-network' });
    let isSuper = (resp.me!.primaryOrganization && (resp.me!.primaryOrganization!.id === '61gk9KRrl9ComJkvYnvdcddr4o' || resp.me!.primaryOrganization!.id === 'Y9n1D03kB0umoQ0xK4nQcwjLyQ'));

    let rooms = getClient().useAvailableRooms();
    let availableRooms = rooms.availableRooms || [];
    let myRooms = rooms.userRooms || [];
    return (
        <>
            {/* <ZListItem text="Organizations" path="ExploreOrganizations" /> */}
            {isSuper && <ZListItem text="Tasks" path="Apps/Tasks" />}
            <ZListItemGroup header="Available Groups" divider={false}>
                {availableRooms.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title,
                        }}
                        title={v.organization ? v.organization.name : undefined}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
                {(availableRooms.length >= 3) && (
                    <ZListItem
                        leftIcon={require('assets/ic-more-24.png')}
                        text="All groups"
                        path="GroupList"
                        pathParams={{
                            query: 'available',
                            initial: availableRooms,
                            title: 'Available groups',
                        }}
                        navigationIcon={false}
                    />
                )}
            </ZListItemGroup>

            <ZListItemGroup header="Your Groups" divider={false}>
                {myRooms.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title,
                        }}
                        title={v.organization ? v.organization!.name : undefined}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
                {(myRooms.length >= 3) && (
                    <ZListItem
                        leftIcon={require('assets/ic-more-24.png')}
                        text="All groups"
                        path="GroupList"
                        pathParams={{
                            initial: myRooms,
                            query: 'rooms',
                            title: 'Your groups',
                        }}
                        navigationIcon={false}
                    />
                )}
            </ZListItemGroup>

            {/* <ZListItemGroup header="Featured" divider={false}>
                {featured.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title,
                        }}
                        title={v.organization ? v.organization.name : undefined}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListItemGroup> */}
        </>
    );
};

const ExplorePage = (props: PageProps) => {
    return (
        <>
            {Platform.OS === 'ios' && <SHeader title="Browse" />}
            {Platform.OS === 'android' && <CenteredHeader title="Browse" padding={98} />}
            <SHeaderButton
                title="New"
                icon={
                    Platform.OS === 'ios'
                        ? require('assets/ic-compose-26.png')
                        : require('assets/ic-edit.png')
                }
                onPress={() => props.router.push('Compose')}
            />
            <SSearchControler
                searchRender={(p) => (
                    <GlobalSearch
                        query={p.query}
                        router={props.router}
                        onUserPress={(id: string) => props.router.push('ProfileUser', { id: id })}
                    />
                )}
            >
                <SScrollView>
                    <SDeferred>
                        <RoomsList />
                    </SDeferred>
                </SScrollView>
            </SSearchControler>
        </>
    );
};

export const Explore = withApp(ExplorePage, { navigationAppearance: 'large' });
