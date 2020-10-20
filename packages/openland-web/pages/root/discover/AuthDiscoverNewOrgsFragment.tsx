import * as React from 'react';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { useClient } from 'openland-api/useClient';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { XView } from 'react-mental';
import { DiscoverOrganization } from 'openland-api/spacex.types';
import { getRandomSeed } from 'openland-web/fragments/discover/utils/getRandomSeed';
import { DiscoverOrganizationItem } from 'openland-web/fragments/discover/components/DiscoverOrganizationItem';

const AuthDiscoverNewOrgsInner = React.memo((props: { seed: number }) => {
    const client = useClient();

    // initial items
    const newAndGrowing = client.useDiscoverNewOrganizations({ first: 20, seed: props.seed });
    const { items: initialItems, cursor: initialCursor } = newAndGrowing.discoverNewAndGrowingOrganizations;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState<DiscoverOrganization[]>(initialItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverNewOrganizations({ first, seed: props.seed, after });
        const { items, cursor } = loaded.discoverNewAndGrowingOrganizations;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <UFlatList
            gap={16}
            track="discover_new_communities"
            loading={loading}
            loadMore={handleLoadMore}
            items={displayItems}
            renderItem={item => (
                <XView marginHorizontal={-16} maxWidth={560 + 16 * 2}>
                    <DiscoverOrganizationItem organization={item} />
                </XView>
            )}
        />
    );
});

export const AuthDiscoverNewOrgsFragment = React.memo(() => {
    const seed = React.useMemo(getRandomSeed, []);

    return (
        <AuthDiscoverContainer title="New communities" showBack={true}>
            <AuthDiscoverNewOrgsInner seed={seed} />
        </AuthDiscoverContainer>
    );
});
