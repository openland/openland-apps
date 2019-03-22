import * as React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { Room_room_SharedRoom, Room_room_PrivateRoom, RoomTiny_room } from 'openland-api/Types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';

export let resolveConversationProfilePath = (room: RoomTiny_room) => {
    let path: string | undefined = undefined;
    let pathArgs: any = {};
    let sharedRoom = room.__typename === 'SharedRoom' ? room as Room_room_SharedRoom : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? room as Room_room_PrivateRoom : null;

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

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room! as Room_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room! as Room_room_PrivateRoom : null;

    return (
        <TouchableOpacity disabled={!path.path} onPress={() => props.router.push(path.path!!, path.pathArgs)} style={{ marginRight: 10, marginLeft: 10 }}>
            <View height={Platform.OS === 'android' ? 56 : 44} alignItems="center" justifyContent="center">
                <ZAvatar
                    src={privateRoom ? privateRoom.user.picture : sharedRoom!.photo}
                    size={Platform.OS === 'android' ? 40 : 38}
                    placeholderKey={privateRoom ? privateRoom.user.id : sharedRoom!.id}
                    placeholderTitle={privateRoom ? privateRoom.user.name : sharedRoom!.title}
                    online={privateRoom ? privateRoom.user.online : false}
                    userId={privateRoom ? privateRoom.user.id : undefined}
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