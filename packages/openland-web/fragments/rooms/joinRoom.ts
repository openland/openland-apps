import { MessengerContext } from 'openland-engines/MessengerEngine';
import * as React from 'react';
import { XViewRouteContext, XViewRouterContext } from 'react-mental';

export const useJoinRoom = (allowSamePath: boolean = false) => {
    const router = React.useContext(XViewRouterContext)!;
    const messenger = React.useContext(MessengerContext);
    const route = React.useContext(XViewRouteContext)!;

    return async (id: string, audioEnabled?: boolean) => {
        let targetPath = `/room/${id}`;
        if (!allowSamePath && route.path === targetPath) {
            return;
        }

        messenger.voiceChat.join(id, audioEnabled);

        if (!allowSamePath) {
            router.navigate(targetPath);
        }
    };
};
