import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { SRouter } from 'react-native-s/SRouter';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getClient } from 'openland-mobile/utils/graphqlClient';

interface ChatJoinProps {
    room: Room_room_SharedRoom;
    theme: ThemeGlobal;
    router: SRouter;
}

export const ChatJoin = XMemo<ChatJoinProps>((props) => (
    <View flexDirection="column" height="100%" width="100%">
        <SHeaderView />
        <SHeaderButton />
        <ASSafeAreaView width="100%" height="100%" justifyContent="center" >
            <View alignSelf="center" alignItems="center" justifyContent="center" flexDirection="column" flexGrow={1}>
                <ZAvatar
                    src={props.room.photo}
                    size="xx-large"
                    placeholderKey={props.room.id}
                    placeholderTitle={props.room.title}
                />
                <View flexDirection="column" zIndex={-1}>
                    <Text style={{ fontSize: 20, fontWeight: '500', color: props.theme.foregroundPrimary, textAlign: 'center', marginTop: 22, marginLeft: 32, marginRight: 32 }} >{props.room.title}</Text>
                    <Text style={{ fontSize: 15, color: props.theme.foregroundPrimary, textAlign: 'center', marginTop: 7, marginLeft: 32, marginRight: 32, lineHeight: 22 }} >{props.room.description}</Text>
                    <Text style={{ fontSize: 14, color: props.theme.foregroundPrimary, textAlign: 'center', marginTop: 10, marginLeft: 32, marginRight: 32, lineHeight: 18 }} >{props.room.membersCount + (props.room.membersCount === 1 ? ' member' : ' members')}</Text>
                </View>
            </View>
            <View alignSelf="center" marginBottom={46}>
                <ZRoundedButton
                    title="Join"
                    size="large"
                    onPress={async () => {
                        startLoader();
                        try {
                            await getClient().mutateRoomJoin({ roomId: props.room.id });
                        } catch (e) {
                            Alert.alert(e.message);
                        } finally {
                            stopLoader();
                        }
                    }}
                />
            </View>

        </ASSafeAreaView>
    </View>
));