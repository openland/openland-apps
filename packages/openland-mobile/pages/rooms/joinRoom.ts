import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showRoomView } from './RoomView';
import { useVoiceChatsFeed } from 'openland-y-utils/voiceChat/voiceChatsFeedWatcher';
import { isPad } from 'openland-mobile/pages/Root';
import Toast from 'openland-mobile/components/Toast';

export const useJoinRoom = () => {
    const router = React.useContext(SRouterContext)!;
    const messenger = getMessenger().engine;
    const { modalOpen, setModalOpen } = useVoiceChatsFeed();
    const modalOpenRef = React.useRef(modalOpen);

    modalOpenRef.current = modalOpen;

    return async (id: string, audioEnabled?: boolean) => {
        if (await checkPermissions('microphone')) {
            if (modalOpenRef.current && !isPad) {
                return;
            }
            setModalOpen(true);

            try {
                messenger.voiceChat.join(id, audioEnabled);
                showRoomView(id, router, () => setModalOpen(false));
            } catch (e) {
                Toast.failure({ text: `Couldn't connect to room`, duration: 2000 }).show();
                setModalOpen(false);
            }
        }
    };
};
