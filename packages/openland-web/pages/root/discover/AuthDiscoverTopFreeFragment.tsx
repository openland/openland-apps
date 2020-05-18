import * as React from 'react';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { useClient } from 'openland-api/useClient';
import { DiscoverRoom } from 'openland-y-utils/discover/normalizePopularItems';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { XView } from 'react-mental';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { JoinButtonSimple } from 'openland-web/fragments/discover/components/JoinButton';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';

const AuthDiscoverTopFreeInner = React.memo(() => {
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
        <UFlatList
            gap={16}
            padded={true}
            track="discover_top_free"
            loading={loading}
            loadMore={handleLoadMore}
            items={displayItems}
            renderItem={item => (
                <XView marginHorizontal={-16} maxWidth={560 + 16 * 2}>
                    <UGroupView
                        group={item as DiscoverRoom}
                        path={'/' + item.id}
                        rightElement={<JoinButtonSimple group={item as DiscoverSharedRoom} />}
                    />
                </XView>
            )}
        />
    );
});

export const AuthDiscoverTopFreeFragment = React.memo(() => {
    return (
        <AuthDiscoverContainer title="Top free" showBack={true}>
            <AuthDiscoverTopFreeInner />
        </AuthDiscoverContainer>
    );
});
