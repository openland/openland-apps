import * as React from 'react';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { useClient } from 'openland-api/useClient';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { XView } from 'react-mental';
import { DiscoverCollection } from 'openland-web/fragments/discover/components/DiscoverCollection';

const AuthDiscoverCollectionsInner = React.memo(() => {
    const client = useClient();
    const collections = client.useDiscoverCollections({ first: 20 }).discoverCollections;

    const initialItems = collections ? collections.items : [];
    const initialCursor = collections ? collections.cursor : null;

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
        <UFlatList
            padded={true}
            track="discover_collections"
            grid={true}
            loading={loading}
            loadMore={handleLoadMore}
            items={displayItems}
            renderItem={item => (
                <XView marginBottom={32} marginRight={16}>
                    <DiscoverCollection {...item} />
                </XView>
            )}
        />
    );
});

export const AuthDiscoverCollectionsFragment = React.memo(() => {
    return (
        <AuthDiscoverContainer title="Collections" showBack={true}>
            <AuthDiscoverCollectionsInner />
        </AuthDiscoverContainer>
    );
});
