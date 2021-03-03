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
            if (!didJoin) {
                await client.mutateVoiceChatJoin({ id });
            }
            if (didJoin && messenger.calls.currentMediaSession) {
                showRoomView(id, router);
            } else {
                showRoomView(id, router);
                messenger.calls.joinCall(id, async () => {
                    let roomToLeave = (await client.queryVoiceChat({ id })).voiceChat;
                    let admins = roomToLeave.speakers.filter(x => x.status === VoiceChatParticipantStatus.ADMIN);
                    if (admins.length <= 1 && roomToLeave.me?.status === VoiceChatParticipantStatus.ADMIN) {
                        client.mutateVoiceChatEnd({ id: roomToLeave.id });
                    } else {
                        client.mutateVoiceChatLeave({ id: roomToLeave.id });
                    }
                });
            }

        }
    }, 500, false);
};
