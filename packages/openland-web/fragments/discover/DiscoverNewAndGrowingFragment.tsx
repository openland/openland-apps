import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';

export const DiscoverNewAndGrowingFragment = React.memo(() => {
    const client = useClient();

    // initial items
    const newAndGrowing = client.useDiscoverNewAndGrowing({ first: 20, seed: 123 });
    const { items: initialItems, cursor: initialCursor } = newAndGrowing.discoverNewAndGrowing;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState<DiscoverSharedRoom[]>(initialItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverNewAndGrowing({ first, seed: 123, after });
        const { items, cursor } = loaded.discoverNewAndGrowing;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <>
            <UHeader title="New and growing" />
            <UFlatList
                track="discover_new_and_growing"
                title="New and growing"
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
