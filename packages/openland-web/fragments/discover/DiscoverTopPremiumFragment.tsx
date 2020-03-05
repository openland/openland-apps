import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { JoinButtonPremium } from './components/JoinButtonPremium';

export const DiscoverTopPremiumFragment = React.memo(() => {
    const client = useClient();

    // initial items
    const topPremium = client.useDiscoverTopPremium({ first: 20 });
    const { items: initialItems, cursor: initialCursor } = topPremium.discoverTopPremium;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState<DiscoverSharedRoom[]>(initialItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverTopPremium({ first, after });
        const { items, cursor } = loaded.discoverTopPremium;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <>
            <UHeader title="Top premium" maxWidth={555} />
            <UFlatList
                track="discover_top_premium"
                title="Top premium"
                loading={loading}
                loadMore={handleLoadMore}
                items={displayItems}
                renderItem={item => (
                    <UGroupView
                        group={item as DiscoverSharedRoom}
                        rightElement={<JoinButtonPremium group={item as DiscoverSharedRoom} />}
                    />
                )}
            />
        </>
    );
});
