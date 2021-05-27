import { checkPermissions } from 'openland-mobile/utils/permissions/checkPermissions';
import { getMessenger } from 'openland-mobile/utils/messenger';
import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showRoomView } from './RoomView';
import Toast from 'openland-mobile/components/Toast';

export const useJoinRoom = () => {
    const router = React.useContext(SRouterContext)!;
    const messenger = getMessenger().engine;

    return async (id: string, audioEnabled?: boolean) => {
        if (await checkPermissions('microphone')) {
            if (messenger.voiceChat.isJoining) {
                return;
            }
            try {
                messenger.voiceChat.join(id, audioEnabled);
                showRoomView(id, router);
            } catch (e) {
                Toast.failure({ text: `Couldn't connect to room`, duration: 2000 }).show();
            }
        }
    };
};
