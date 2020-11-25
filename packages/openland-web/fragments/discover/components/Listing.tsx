import React from 'react';
import { XView } from 'react-mental';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { JoinButton, JoinButtonSimple } from './JoinButton';

interface ListingProps {
    items: DiscoverSharedRoom[];
    noLogin?: boolean;
}

export const Listing = React.memo((props: ListingProps) => {
    return (
        <XView marginTop={16} maxWidth={600} marginBottom={56}>
            {props.items.map((item) => (
                <UGroupView
                    key={'group-' + item.id}
                    group={item as DiscoverSharedRoom}
                    rightElement={
                        props.noLogin ? (
                            <JoinButtonSimple group={item as DiscoverSharedRoom} />
                        ) : (
                            <JoinButton group={item as DiscoverSharedRoom} />
                        )
                    }
                />
            ))}
        </XView>
    );
});
