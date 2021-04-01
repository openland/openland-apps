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
import Toast from 'openland-mobile/components/Toast';

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
            let status: VoiceChatParticipantStatus | undefined;
            try {
                status = (await client.queryVoiceChatControls({ id })).voiceChat.me?.status;
            } catch (e) {
                Toast.failure({ text: `Room doesn't exist`, duration: 2000 }).show();
            }
            let didJoin = [VoiceChatParticipantStatus.ADMIN, VoiceChatParticipantStatus.SPEAKER, VoiceChatParticipantStatus.LISTENER, VoiceChatParticipantStatus.KICKED].includes(status!);
            const mediaSession = messenger.calls.currentMediaSession;
            try {
                if (!mediaSession || (mediaSession && !didJoin) || (id !== mediaSession.conversationId)) {
                    await client.mutateVoiceChatJoin({ id });
                    messenger.calls.joinCall(id, 'voice-chat');
                }
                showRoomView(id, router, () => setModalOpen(false));
            } catch (e) {
                Toast.failure({ text: `Couldn't connect to room`, duration: 2000 }).show();
                setModalOpen(false);
            }
        }
    };
};
