import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import * as React from 'react';
// import { XViewRouteContext, XViewRouterContext } from 'react-mental';

export const useJoinRoom = () => {
    const client = useClient();
    // const router = React.useContext(XViewRouterContext)!;
    const messenger = React.useContext(MessengerContext);
    // const route = React.useContext(XViewRouteContext)!;

    return async (id: string) => {
        // let targetPath = `/rooms/${id}`;
        // if (route.path === targetPath) {
        //     return;
        // }

        let status = (await client.queryVoiceChatControls({ id })).voiceChat.me?.status;
        let didJoin = [VoiceChatParticipantStatus.ADMIN, VoiceChatParticipantStatus.SPEAKER, VoiceChatParticipantStatus.LISTENER, VoiceChatParticipantStatus.KICKED].includes(status!);
        const mediaSession = messenger.calls.currentMediaSession;
        if (!mediaSession || mediaSession && !didJoin || id !== mediaSession.conversationId) {
            messenger.calls.joinCall(id, 'voice-chat');
            await client.mutateVoiceChatJoin({ id });
        }
        // router.navigate(targetPath);
    };
};
