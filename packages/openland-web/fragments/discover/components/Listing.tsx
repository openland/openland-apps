import React from 'react';
import { XView } from 'react-mental';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';

interface ListingProps {
    items: DiscoverSharedRoom[];
}

export const Listing = React.memo((props: ListingProps) => {
    return (
        <XView marginTop={16}>
            {props.items.map(item => (
                <UGroupView
                    key={'group-' + item.id}
                    group={item as DiscoverSharedRoom}
                />
            ))}
        </XView>
    );
});
