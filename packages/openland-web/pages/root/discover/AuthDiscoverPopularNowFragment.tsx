import * as React from 'react';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { useClient } from 'openland-api/useClient';
import { normalizePopularItems, DiscoverRoom } from 'openland-y-utils/discover/normalizePopularItems';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { XView } from 'react-mental';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { JoinButtonSimple } from 'openland-web/fragments/discover/components/JoinButton';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';

const AuthDiscoverPopularNowInner = React.memo(() => {
    const client = useClient();

    // initial items
    const popularNow = client.useDiscoverPopularNow({ first: 20 });
    const { items: initialItems, cursor: initialCursor } = popularNow.discoverPopularNow;
    const normalizedItems = normalizePopularItems(initialItems);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState(normalizedItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverPopularNow({ first, after });
        const { items, cursor } = loaded.discoverPopularNow;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(normalizePopularItems(items)));
        setLoading(false);
    }, [after, loading]);

    return (
        <UFlatList
            padded={true}
            track="discover_popular_now"
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

export const AuthDiscoverPopularNowFragment = React.memo(() => {
    return (
        <AuthDiscoverContainer title="Popular now" showBack={true}>
            <AuthDiscoverPopularNowInner />
        </AuthDiscoverContainer>
    );
});
