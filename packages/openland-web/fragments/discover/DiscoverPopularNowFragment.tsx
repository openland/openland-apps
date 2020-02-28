import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { Listing } from './components/Listing';

export const DiscoverPopularNowFragment = React.memo(() => {
    return (
        <Page track="discover_popular_now">
            <UHeader title="Popular now" />
            <Listing />
        </Page>
    );
});
