import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { JoinButton, JoinButtonSimple } from './components/JoinButton';
import { DiscoverNoLoginProps } from './utils/DiscoverNoLoginContent';
import {
    normalizePopularItems,
    DiscoverRoom,
} from 'openland-y-utils/discover/normalizePopularItems';

export const DiscoverPopularNowFragment = React.memo((props: DiscoverNoLoginProps) => {
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

        const loaded = (await client.queryDiscoverPopularNow({ first, after })).discoverPopularNow;
        const { items, cursor } = loaded;

        setAfter(cursor);
        setDisplayItems((prev) => prev.concat(normalizePopularItems(items)));
        setLoading(false);
    }, [after, loading]);

    return (
        <>
            {!props.noLogin && <UHeader title="Popular now" />}
            <UFlatList
                gap={16}
                track="discover_popular_now"
                title={props.noLogin ? undefined : 'Popular now'}
                loading={loading}
                loadMore={handleLoadMore}
                items={displayItems}
                renderItem={(item) => (
                    <XView marginHorizontal={-16} maxWidth={560 + 16 * 2}>
                        <UGroupView
                            group={item as DiscoverRoom}
                            rightElement={
                                props.noLogin ? (
                                    <JoinButtonSimple group={item as DiscoverSharedRoom} />
                                ) : (
                                    <JoinButton group={item as DiscoverSharedRoom} />
                                )
                            }
                        />
                    </XView>
                )}
            />
        </>
    );
});
