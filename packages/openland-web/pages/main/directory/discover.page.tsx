import * as React from 'react';
import { DirectoryNavigation } from './components/DirectoryNavigation';
import { withApp } from 'openland-web/components/withApp';
import { useClient } from 'openland-web/utils/useClient';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { XView } from 'react-mental';

export default withApp('Discover', 'viewer', () => {
    const client = useClient();
    const data = client.useSuggestedRooms();

    return (
        <DirectoryNavigation>
            <XContentWrapper withPaddingBottom={true}>
                <XView fontSize={16} marginTop={32} marginBottom={27}>
                    Chats for you
                </XView>
                {data.suggestedRooms.map((room, key) => {
                    if (room.__typename === 'SharedRoom') {
                        return (
                            <XRoomCard
                                key={key}
                                room={room as any}
                                // path={'/directory/p/' + room.id}
                            />
                        );
                    } else {
                        return (
                            <XRoomCard
                                key={key}
                                room={room as any}
                                // path={'/directory/p/' + room.id}
                            />
                        );
                    }
                })}
            </XContentWrapper>
        </DirectoryNavigation>
    );
});
