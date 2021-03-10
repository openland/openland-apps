// import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showRoomView } from './RoomView';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { debounce } from 'openland-y-utils/timer';

export const useJoinRoom = () => {
    const client = useClient();
    const router = React.useContext(SRouterContext)!;
    const messenger = getMessenger().engine;

    return debounce(async (id: string) => {
        if (await checkPermissions('microphone')) {
            let status = (await client.queryVoiceChatControls({ id })).voiceChat.me?.status;
            let didJoin = [VoiceChatParticipantStatus.ADMIN, VoiceChatParticipantStatus.SPEAKER, VoiceChatParticipantStatus.LISTENER, VoiceChatParticipantStatus.KICKED].includes(status!);
            if (!messenger.calls.currentMediaSession || messenger.calls.currentMediaSession && !didJoin) {
                await client.mutateVoiceChatJoin({ id });
                messenger.calls.joinCall(id);
            }

            showRoomView(id, router);

        }
    }, 500, false);
};
