import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { ZQuery } from 'openland-mobile/components/ZQuery';
import { AvailableRoomsQuery } from 'openland-api';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { AvailableRooms_rooms_SharedRoom } from 'openland-api/Types';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

const RoomsList = (props: { rooms: AvailableRooms_rooms_SharedRoom[] }) => {

    let src = props.rooms
        .filter((v) => !!v.membersCount)
        .sort((a, b) => ((b.membersCount || 0) - (a.membersCount || 0)));

    let newRooms = src
        .filter((v) => v.membership === 'NONE' || v.membership === 'REQUESTED')
    let existingRooms = src
        .filter((v) => v.membership === 'MEMBER')

    return (
        <>
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

            <ZListItemGroup header="Your Groups">
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
        </>
    )
}

const ExplorePage = (props: PageProps) => {
    return (
        <>
            {Platform.OS === 'ios' && (
                <SHeader title="Browse" />
            )}
            {Platform.OS === 'android' && (
                <CenteredHeader title="Browse" padding={48} />
            )}
            <SHeaderButton title="New" icon={Platform.OS === 'ios' ? require('assets/ic-new.png') : require('assets/ic-edit.png')} onPress={() => props.router.push('ComposeInitial')} />
            <SSearchControler searchRender={(p) => null}>
                <SScrollView>
                    <ZQuery query={AvailableRoomsQuery}>
                        {resp => (<RoomsList rooms={resp.data.rooms as AvailableRooms_rooms_SharedRoom[]} />)}
                    </ZQuery>
                </SScrollView>
            </SSearchControler>
        </>
    );
}

export const Explore = withApp(ExplorePage, { navigationAppearance: 'large' });