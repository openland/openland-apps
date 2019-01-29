import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { AvailableRooms_rooms_SharedRoom } from 'openland-api/Types';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';

const RoomsList = React.memo((props) => {

    let rooms = getClient().useAvailableRooms().rooms as AvailableRooms_rooms_SharedRoom[];
    let featureds = getClient().useRoomSearch({ sort: JSON.stringify([{ featured: { order: 'desc' } }, { createdAt: { order: 'desc' } }]) }).items.edges.map((v) => v.node);

    let src = rooms
        .filter((v) => !!v.membersCount)
        .sort((a, b) => ((b.membersCount || 0) - (a.membersCount || 0)));

    let newRooms = src
        .filter((v) => v.membership === 'NONE' || v.membership === 'REQUESTED')
    let existingRooms = src
        .filter((v) => v.membership === 'MEMBER')

    let featured = featureds
        .filter((v) => newRooms.find((v2) => v.id !== v2.id))
        .filter((v) => existingRooms.find((v2) => v.id !== v2.id))
        .sort((a, b) => ((b.membersCount || 0) - (a.membersCount || 0)));

    return (
        <>
            <ZListItem text="Organizations" path="ExploreOrganizations" />
            <ZListItemGroup header="Available Groups">
                {newRooms.map((v) => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title
                        }}
                        title={v.organization!.name}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListItemGroup>

            <ZListItemGroup header="Your Groups" divider={false}>
                {existingRooms.map((v) => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title
                        }}
                        title={v.organization!.name}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListItemGroup>

            <ZListItemGroup header="Featured" divider={false}>
                {featured.map((v) => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            key: v.id,
                            title: v.title
                        }}
                        title={v.organization!.name}
                        description={v.membersCount + ' members'}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListItemGroup>
        </>
    )
});

const ExplorePage = (props: PageProps) => {
    return (
        <>
            {Platform.OS === 'ios' && (
                <SHeader title="Browse" />
            )}
            {Platform.OS === 'android' && (
                <CenteredHeader title="Browse" padding={48} />
            )}
            <SHeaderButton
                title="New"
                icon={Platform.OS === 'ios' ? require('assets/ic-compose-26.png') : require('assets/ic-edit.png')}
                onPress={() => props.router.push('Compose')}
            />
            <SSearchControler searchRender={(p) => null}>
                <SScrollView>
                    <RoomsList />
                </SScrollView>
            </SSearchControler>
        </>
    );
}

export const Explore = withApp(ExplorePage, { navigationAppearance: 'large' });