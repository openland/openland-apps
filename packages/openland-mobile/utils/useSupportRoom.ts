import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';

import { getClient } from './graphqlClient';

export function useSupportRoom() {
    const client = getClient();
    const router = React.useContext(SRouterContext)!;
    const supportRoom = client.useRoomPico({ id: 'mJMk3EkbzBs7dyPBPp9Bck0pxn' });

    const navigateToSupport = React.useCallback(() => {
        if (supportRoom.room?.id) {
            router.push('Conversation', { id: supportRoom.room.id } );
        }
    }, [supportRoom.room]);

    return navigateToSupport;
}