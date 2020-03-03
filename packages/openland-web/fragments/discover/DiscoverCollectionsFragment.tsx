import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { DiscoverCollection } from './components/DiscoverCollection';
import { XView } from 'react-mental';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';

export const DiscoverCollectionsFragment = React.memo(() => {
    const client = useClient();

    const collections = client.useDiscoverCollections({ first: 20 });

    if (!collections || !collections.discoverCollections) {
        // TODO replace with empty placeholder
        return null;
    }

    const { items: initialItems, cursor: initialCursor } = collections.discoverCollections;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);

    const [displayItems, setDisplayItems] = React.useState(initialItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverCollections({ first, after });
        const { items, cursor } = loaded.discoverCollections!;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <>
            <UHeader title="Collections" />
            <XView height={16} />
            <UFlatList
                track="discover_collections"
                title="Collections"
                grid={true}
                loading={loading}
                loadMore={handleLoadMore}
                items={displayItems}
                renderItem={item => (
                    <XView marginBottom={32} marginLeft={16}>
                        <DiscoverCollection {...item} />
                    </XView>
                )}
            />
        </>
    );
});
