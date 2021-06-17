import * as React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { RoomChat_room_SharedRoom, RoomNano_PrivateRoom, RoomChat_room } from 'openland-api/spacex.types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';

export let resolveConversationProfilePath = (room: RoomChat_room) => {
    let path: string | undefined = undefined;
    let pathArgs: any = {};
    let sharedRoom = room.__typename === 'SharedRoom' ? room as RoomChat_room_SharedRoom : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? room as RoomNano_PrivateRoom : null;
    let isSavedMessages = privateRoom && privateRoom.user.id === getMessenger().engine.user.id;

    if (isSavedMessages) {
        path = 'SharedMedia';
        pathArgs = { chatId: room.id };
    } else if (privateRoom) {
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

const ChatHeaderAvatarContent = React.memo((props: { conversationId: string, router: SRouter }) => {
    let room = getClient().useRoomChat({ id: props.conversationId });

    let path = resolveConversationProfilePath(room.room!);

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room! as RoomChat_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room! as RoomNano_PrivateRoom : null;

    return (
        <TouchableOpacity disabled={!path.path} onPress={() => props.router.push(path.path!!, path.pathArgs)} style={{ marginLeft: 16, marginRight: 12 }}>
            <View style={{ height: Platform.OS === 'android' ? 56 : 44, alignItems: 'center', justifyContent: 'center' }}>
                <ZAvatar
                    photo={privateRoom ? privateRoom.user.photo : sharedRoom!.photo}
                    size="small"
                    id={privateRoom ? privateRoom.user.id : sharedRoom!.id}
                    savedMessages={privateRoom ? privateRoom.user.id === getMessenger().engine.user.id : false}
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
