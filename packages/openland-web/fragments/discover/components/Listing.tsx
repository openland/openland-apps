import React from 'react';
import { useClient } from 'openland-api/useClient';
import { XView } from 'react-mental';
import { RoomShort_SharedRoom } from 'openland-api/spacex.types';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';

export const Listing = React.memo(() => {
    const client = useClient();
    const popularNow = client.useDiscoverPopularNow({ first: 0 });

    console.warn({ popularNow });

    return (
        <XView marginTop={16}>
            {popularNow.discoverPopularNow.items.map(item => (
                <UGroupView
                    key={'group-' + item.id}
                    group={item as RoomShort_SharedRoom}
                />
            ))}
        </XView>
    );
});
