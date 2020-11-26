import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { normalizePopularOrgItems } from 'openland-y-utils/discover/normalizePopularItems';
import { DiscoverOrganizationItem } from './components/DiscoverOrganizationItem';
import { DiscoverNoLoginProps } from './utils/DiscoverNoLoginContent';

export const DiscoverPopularOrgsFragment = React.memo((props: DiscoverNoLoginProps) => {
    const client = useClient();

    // initial items
    const popularOrgs = client.useDiscoverPopularOrganizations({ first: 20 });
    const { items: initialItems, cursor: initialCursor } = popularOrgs.discoverTopOrganizations;
    const normalizedItems = normalizePopularOrgItems(initialItems);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState(normalizedItems);

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = (await client.queryDiscoverPopularOrganizations({ first, after })).discoverTopOrganizations;
        const { items, cursor } = loaded;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(normalizePopularOrgItems(items)));
        setLoading(false);

    }, [after, loading]);

    return (
        <>
            {!props.noLogin && <UHeader title="Top communities" />}
            <UFlatList
                gap={16}
                track="discover_top_communities"
                title={props.noLogin ? undefined : 'Top communities'}
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
