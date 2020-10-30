import * as React from 'react';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { useClient } from 'openland-api/useClient';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { XView } from 'react-mental';
import { DiscoverOrganization } from 'openland-api/spacex.types';
import { DiscoverOrganizationItem } from 'openland-web/fragments/discover/components/DiscoverOrganizationItem';
import { normalizePopularOrgItems } from 'openland-y-utils/discover/normalizePopularItems';

const AuthDiscoverPopularOrgsInner = React.memo(() => {
    const client = useClient();

    // initial items
    const newAndGrowing = client.useDiscoverPopularOrganizations({ first: 20 });
    const { items: initialItems, cursor: initialCursor } = newAndGrowing.discoverTopOrganizations;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [displayItems, setDisplayItems] = React.useState<DiscoverOrganization[]>(normalizePopularOrgItems(initialItems));

    const handleLoadMore = React.useCallback(async () => {
        if (loading || !after) {
            return;
        }
        setLoading(true);
        const first = 10;

        const loaded = await client.queryDiscoverPopularOrganizations({ first, after });
        const { items, cursor } = loaded.discoverTopOrganizations;

        setAfter(cursor);
        setDisplayItems(prev => prev.concat(normalizePopularOrgItems(items)));
        setLoading(false);

    }, [after, loading]);

    return (
        <UFlatList
            gap={16}
            track="discover_top_communities"
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

export const AuthDiscoverPopularOrgsFragment = React.memo(() => {
    return (
        <AuthDiscoverContainer title="Top communities" showBack={true}>
            <AuthDiscoverPopularOrgsInner />
        </AuthDiscoverContainer>
    );
});
