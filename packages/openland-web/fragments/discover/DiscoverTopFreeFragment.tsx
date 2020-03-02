import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { Listing } from './components/Listing';

export const DiscoverTopFreeFragment = React.memo(() => {
    const client = useClient();
    const topFree = client.useDiscoverTopFree({ first: 20 });
    const topFreeItems = topFree.discoverTopFree.items;

    return (
        <Page track="discover_top_free">
            <UHeader title="Top free" />
            <Listing items={topFreeItems} />
        </Page>
    );
});
