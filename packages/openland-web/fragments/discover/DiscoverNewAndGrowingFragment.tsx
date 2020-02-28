import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { Listing } from './components/Listing';

export const DiscoverNewAndGrowingFragment = React.memo(() => {
    const client = useClient();
    // temporary seed
    const newAndGrowing = client.useDiscoverNewAndGrowing({ first: 20, seed: 123 });
    const newAndGrowingItems = newAndGrowing.discoverNewAndGrowing.items || [];

    return (
        <Page track="discover_new_and_growing">
            <UHeader title="New and growing" />
            <Listing items={newAndGrowingItems} />
        </Page>
    );
});
