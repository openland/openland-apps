import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { DiscoverOrganizationItem } from './components/DiscoverOrganizationItem';
import { getRandomSeed } from './utils/getRandomSeed';
import { DiscoverNoLoginProps } from './utils/DiscoverNoLoginContent';

export const DiscoverNewOrgsFragment = React.memo((props: DiscoverNoLoginProps) => {
    const client = useClient();
    const seed = getRandomSeed();

    // initial items
    const newOrgs = client.useDiscoverNewOrganizations({ first: 20, seed });
    const { items: initialItems, cursor: initialCursor } = newOrgs.discoverNewAndGrowingOrganizations;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState(initialItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = (await client.queryDiscoverNewOrganizations({ first, after, seed })).discoverNewAndGrowingOrganizations;
        const { items, cursor } = loaded;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(items));
        setLoading(false);

    }, [after, loading]);

    return (
        <>
            {!props.noLogin && <UHeader title="New communities" />}
            <UFlatList
                gap={16}
                track="discover_new_communities"
                title={props.noLogin ? undefined : 'New communities'}
                loading={loading}
                loadMore={handleLoadMore}
                items={displayItems}
                renderItem={item => (
                    <XView marginHorizontal={-16} maxWidth={560 + 16 * 2}>
                        <DiscoverOrganizationItem organization={item} />
                    </XView>
                )}
            />
        </>
    );
});
