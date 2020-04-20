import * as React from 'react';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { useClient } from 'openland-api/useClient';
import { DiscoverRoom } from 'openland-y-utils/discover/normalizePopularItems';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { XView } from 'react-mental';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { JoinButtonSimple } from 'openland-web/fragments/discover/components/JoinButton';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { getRandomSeed } from 'openland-web/fragments/discover/utils/getRandomSeed';

const AuthDiscoverNewAndGrowingInner = React.memo((props: { seed: number }) => {
    const client = useClient();

    // initial items
    const newAndGrowing = client.useDiscoverNewAndGrowing({ first: 20, seed: props.seed });
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

        const loaded = await client.queryDiscoverNewAndGrowing({ first, seed: props.seed, after });
        const { items, cursor } = loaded.discoverNewAndGrowing;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <UFlatList
            padded={true}
            track="discover_new_and_growing"
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

export const AuthDiscoverNewAndGrowingFragment = React.memo(() => {
    const seed = React.useMemo(getRandomSeed, []);

    return (
        <AuthDiscoverContainer title="New and growing" showBack={true}>
            <AuthDiscoverNewAndGrowingInner seed={seed} />
        </AuthDiscoverContainer>
    );
});
