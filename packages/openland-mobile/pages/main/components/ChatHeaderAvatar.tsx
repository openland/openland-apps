import * as React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { RoomTiny_room_SharedRoom, RoomNano_PrivateRoom, RoomTiny_room } from 'openland-api/spacex.types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';

export let resolveConversationProfilePath = (room: RoomTiny_room) => {
    let path: string | undefined = undefined;
    let pathArgs: any = {};
    let sharedRoom = room.__typename === 'SharedRoom' ? room as RoomTiny_room_SharedRoom : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? room as RoomNano_PrivateRoom : null;

    if (privateRoom) {
        path = 'ProfileUser';
        pathArgs = { id: privateRoom.user.id };
    } else if (sharedRoom && sharedRoom.kind === 'INTERNAL') {
        path = 'ProfileOrganization';
        pathArgs = { id: sharedRoom.organization!.id, conversationId: room.id };
    } else if (sharedRoom && (sharedRoom.kind === 'GROUP' || sharedRoom.kind === 'PUBLIC')) {
        path = 'ProfileGroup';
        pathArgs = { id: room.id };
    }

    return { path, pathArgs };
};

const ChatHeaderAvatarContent = XMemo<{ conversationId: string, router: SRouter }>((props) => {
    let room = getClient().useRoomTiny({ id: props.conversationId });

    let path = resolveConversationProfilePath(room.room!);

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room! as RoomTiny_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room! as RoomNano_PrivateRoom : null;

    return (
        <TouchableOpacity disabled={!path.path} onPress={() => props.router.push(path.path!!, path.pathArgs)} style={{ marginLeft: 16, marginRight: 12 }}>
            <View height={Platform.OS === 'android' ? 56 : 44} alignItems="center" justifyContent="center">
                <ZAvatar
                    photo={privateRoom ? privateRoom.user.photo : sharedRoom!.photo}
                    size="small"
                    id={privateRoom ? privateRoom.user.id : sharedRoom!.id}
                    title={privateRoom ? privateRoom.user.name : sharedRoom!.title}
                />
            </View>
        </TouchableOpacity>
    );
});

export class ChatHeaderAvatar extends React.PureComponent<{ conversationId: string, router: SRouter }> {

    render() {
        return (
            <React.Suspense fallback={null}>
                <ChatHeaderAvatarContent {...this.props} />
            </React.Suspense>
        );
    }
}