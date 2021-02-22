// import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showRoomView } from './RoomView';

export const useJoinRoom = () => {
    const client = useClient();
    const router = React.useContext(SRouterContext)!;
    const messenger = getMessenger().engine;

    return async (id: string) => {
        if (await checkPermissions('microphone')) {
            let room = (await client.mutateVoiceChatJoin({ id })).voiceChatJoin;
            messenger.calls.joinCall(id);
            showRoomView(room, router);
        }
    };
};
