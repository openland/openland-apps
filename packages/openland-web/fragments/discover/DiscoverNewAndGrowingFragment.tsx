import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { getRandomSeed } from './utils/getRandomSeed';
import { DiscoverNoLoginProps } from './utils/DiscoverNoLoginContent';
import { GroupJoinButton, GroupJoinButtonSimple } from './components/JoinButton';
import { XView } from 'react-mental';

export const DiscoverNewAndGrowingFragment = React.memo((props: DiscoverNoLoginProps) => {
    const client = useClient();
    const seed = getRandomSeed();

    // initial items
    const newAndGrowing = client.useDiscoverNewAndGrowing({ first: 20, seed });
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

        const loaded = await client.queryDiscoverNewAndGrowing({ first, seed, after });
        const { items, cursor } = loaded.discoverNewAndGrowing;

        setAfter(cursor);
        setDisplayItems((prev) => prev.concat(items));
        setLoading(false);
    }, [after, loading]);

    return (
        <>
            {!props.noLogin && <UHeader title="New groups" />}
            <UFlatList
                gap={16}
                track="discover_new_and_growing"
                title={props.noLogin ? undefined : 'New groups'}
                loading={loading}
                loadMore={handleLoadMore}
                items={displayItems}
                renderItem={(item) => (
                    <XView marginHorizontal={-16} maxWidth={560 + 16 * 2}>
                        <UGroupView
                            group={item as DiscoverSharedRoom}
                            rightElement={
                                props.noLogin ? (
                                    <GroupJoinButtonSimple group={item as DiscoverSharedRoom} />
                                ) : (
                                    <GroupJoinButton group={item as DiscoverSharedRoom} />
                                )
                            }
                        />
                    </XView>
                )}
            />
        </>
    );
});
