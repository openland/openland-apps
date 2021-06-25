import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { XViewRouterContext } from 'react-mental';

export function useSupportRoom() {
    const client = useClient();
    const supportRoom = client.useRoomPico({ id: 'mJMk3EkbzBs7dyPBPp9Bck0pxn' });
    const router = React.useContext(XViewRouterContext)!;

    const navigateToSupport = React.useCallback(() => {
        if (supportRoom.room?.id) {
            router.navigate(`/mail/${supportRoom.room.id}`);
        }
    }, [supportRoom.room]);

    return navigateToSupport;
};