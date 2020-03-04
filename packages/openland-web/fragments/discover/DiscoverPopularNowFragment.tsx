import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { JoinButton } from './components/JoinButton';

export const DiscoverPopularNowFragment = React.memo(() => {
    const client = useClient();

    // initial items
    const popularNow = client.useDiscoverPopularNow({ first: 20 });
    const { items: initialItems, cursor: initialCursor } = popularNow.discoverPopularNow;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState<DiscoverSharedRoom[]>(initialItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverPopularNow({ first, after });
        const { items, cursor } = loaded.discoverPopularNow;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <>
            <UHeader title="Popular now" maxWidth={555} />
            <UFlatList
                track="discover_popular_now"
                title="Popular now"
                loading={loading}
                loadMore={handleLoadMore}
                items={displayItems}
                renderItem={item => (
                    <UGroupView
                        group={item as DiscoverSharedRoom}
                        rightElement={<JoinButton group={item as DiscoverSharedRoom} />}
                    />
                )}
            />
        </>
    );
});
