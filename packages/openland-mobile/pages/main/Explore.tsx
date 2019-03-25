import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { AvailableRooms_rooms } from 'openland-api/Types';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';

const RoomsList = () => {
    return null;
    let rooms = getClient().useAvailableRooms().rooms as AvailableRooms_rooms[];
    let featureds = getClient()
        .useRoomSearch({
            sort: JSON.stringify([
                { featured: { order: 'desc' } },
                { createdAt: { order: 'desc' } },
            ]),
        })
        .items.edges.map(v => v.node);

    let src = rooms
        .filter(v => !!v.membersCount)
        .sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0));

    let newRooms = src.filter(v => v.membership === 'NONE' || v.membership === 'REQUESTED');
    let newRoomsLimited = newRooms.length > 3 ? [newRooms[0], newRooms[1], newRooms[2]] : newRooms;
    let existingRooms = src.filter(v => v.membership === 'MEMBER');
    let existingRoomsLimited = existingRooms.length > 3 ? [existingRooms[0], existingRooms[1], existingRooms[2]] : existingRooms;

    let featured = featureds
        .filter(v => !newRooms.find(v2 => v.id !== v2.id))
        .filter(v => !existingRooms.find(v2 => v.id !== v2.id))
        .sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0));

    return (
        <>
            {/* <ZListItem text="Organizations" path="ExploreOrganizations" /> */}
            <ZListItemGroup header="Available Groups" divider={false}>
                {newRoomsLimited.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title,
                        }}
                        title={v.organization!.name}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
                {(newRoomsLimited.length < newRooms.length) && (
                    <ZListItem
                        leftIcon={require('assets/ic-more-24.png')}
                        text="All groups"
                        path="GroupList"
                        pathParams={{
                            groups: newRooms,
                            title: 'Available groups',
                        }}
                        navigationIcon={false}
                    />
                )}
            </ZListItemGroup>

            <ZListItemGroup header="Your Groups" divider={false}>
                {existingRoomsLimited.map(v => (
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
                {(existingRoomsLimited.length < existingRooms.length) && (
                    <ZListItem
                        leftIcon={require('assets/ic-more-24.png')}
                        text="All groups"
                        path="GroupList"
                        pathParams={{
                            groups: existingRooms,
                            title: 'Your groups',
                        }}
                        navigationIcon={false}
                    />
                )}
            </ZListItemGroup>

            <ZListItemGroup header="Featured" divider={false}>
                {featured.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title,
                        }}
                        title={v.organization!.name}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListItemGroup>
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
