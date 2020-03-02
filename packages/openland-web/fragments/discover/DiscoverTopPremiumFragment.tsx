import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { Listing } from './components/Listing';

export const DiscoverTopPremiumFragment = React.memo(() => {
    const client = useClient();
    const topPremium = client.useDiscoverTopPremium({ first: 20 });
    const topPremiumItems = topPremium.discoverTopPremium.items;

    return (
        <Page track="discover_top_premium">
            <UHeader title="Top premium" />
            <Listing items={topPremiumItems} />
        </Page>
    );
});
