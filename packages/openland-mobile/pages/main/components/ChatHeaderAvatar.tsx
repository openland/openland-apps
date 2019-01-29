import * as React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { SRouter } from 'react-native-s/SRouter';
import { Room_room_SharedRoom, Room_room_PrivateRoom, RoomTiny_room } from 'openland-api/Types';
import { RoomTinyQuery } from 'openland-api';

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

export class ChatHeaderAvatar extends React.PureComponent<{ conversationId: string, router: SRouter }> {

    render() {
        return (
            <YQuery query={RoomTinyQuery} variables={{ id: this.props.conversationId }}>
                {res => {
                    if (res.loading) {
                        return null;
                    }
                    if (!res.data) {
                        return null;
                    }

                    let path = resolveConversationProfilePath(res.data!!.room!);

                    let sharedRoom = res.data!!.room!.__typename === 'SharedRoom' ? res.data!!.room! as Room_room_SharedRoom : null;
                    let privateRoom = res.data!!.room!.__typename === 'PrivateRoom' ? res.data!!.room! as Room_room_PrivateRoom : null;

                    return (
                        <TouchableOpacity disabled={!path.path} onPress={() => this.props.router.push(path.path!!, path.pathArgs)} style={{ marginRight: Platform.OS === 'ios' ? -5 : 10, marginLeft: Platform.OS === 'ios' ? 10 : 0 }}>
                            <View height={Platform.OS === 'android' ? 56 : 44} alignItems="center" justifyContent="center">
                                <XPAvatar
                                    src={privateRoom ? privateRoom.user.photo : sharedRoom!.photo}
                                    size={Platform.OS === 'android' ? 40 : 36}
                                    placeholderKey={privateRoom ? privateRoom.user.id : sharedRoom!.id}
                                    placeholderTitle={privateRoom ? privateRoom.user.name : sharedRoom!.title}
                                    userId={privateRoom ? privateRoom.user.id : undefined}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            </YQuery>
        );
    }
}