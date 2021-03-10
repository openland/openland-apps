// import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showRoomView } from './RoomView';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { useVoiceChatsFeed } from 'openland-y-utils/voiceChat/voiceChatsFeedWatcher';
import { isPad } from 'openland-mobile/pages/Root';

export const useJoinRoom = () => {
    const client = useClient();
    const router = React.useContext(SRouterContext)!;
    const messenger = getMessenger().engine;
    const { modalOpen, setModalOpen } = useVoiceChatsFeed();
    const modalOpenRef = React.useRef(modalOpen);

    modalOpenRef.current = modalOpen;

    return async (id: string) => {
        if (await checkPermissions('microphone')) {
            if (modalOpenRef.current && !isPad) {
                return;
            }
            setModalOpen(true);
            let status = (await client.queryVoiceChatControls({ id })).voiceChat.me?.status;
            let didJoin = [VoiceChatParticipantStatus.ADMIN, VoiceChatParticipantStatus.SPEAKER, VoiceChatParticipantStatus.LISTENER, VoiceChatParticipantStatus.KICKED].includes(status!);
            if (!messenger.calls.currentMediaSession || messenger.calls.currentMediaSession && !didJoin) {
                messenger.calls.joinCall(id);
                await client.mutateVoiceChatJoin({ id });
            }
            showRoomView(id, router, () => setModalOpen(false));
        }
    };
};
