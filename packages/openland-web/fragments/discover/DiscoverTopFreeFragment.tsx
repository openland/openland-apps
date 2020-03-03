import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';

export const DiscoverTopFreeFragment = React.memo(() => {
    const client = useClient();

    // initial items
    const topFree = client.useDiscoverTopFree({ first: 20 });
    const { items: initialItems, cursor: initialCursor } = topFree.discoverTopFree;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState<DiscoverSharedRoom[]>(initialItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverTopFree({ first, after });
        const { items, cursor } = loaded.discoverTopFree;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <>
            <UHeader title="Top free" maxWidth={540} />
            <UFlatList
                track="discover_top_free"
                title="Top free"
                loading={loading}
                loadMore={handleLoadMore}
                items={displayItems}
                renderItem={item => (
                    <UGroupView group={item as DiscoverSharedRoom} />
                )}
            />
        </>
    );
});
