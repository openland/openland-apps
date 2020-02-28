import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { Listing } from './components/Listing';

export const DiscoverPopularNowFragment = React.memo(() => {
    const client = useClient();
    const popularNow = client.useDiscoverPopularNow({ first: 0 });
    const popularNowItems = popularNow.discoverPopularNow.items;

    return (
        <Page track="discover_popular_now">
            <UHeader title="Popular now" />
            <Listing items={popularNowItems} />
        </Page>
    );
});
