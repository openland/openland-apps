// import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
// import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showRoomView } from './RoomView';

export const useJoinRoom = () => {
    const client = useClient();
    const router = React.useContext(SRouterContext)!;
    // const messenger = getMessenger().engine;

    return async (id: string) => {
        let room = (await client.queryVoiceChat({ id })).voiceChat;
        let listeners = (await client.queryVoiceChatListeners({ id, first: 20 })).voiceChatListeners;

        if (!room.speakers.some(x => x.user.id) && !listeners.items.some(x => x.user.id)) {
            room = (await client.mutateVoiceChatJoin({ id })).voiceChatJoin;
        }

        // let conferenceId = ''; // room.conferenceId
        // messenger.calls.joinCall(conferenceId, 'voice-chat');
        console.log('@@ JOIN', room);
        showRoomView(room, router);
    };
};
