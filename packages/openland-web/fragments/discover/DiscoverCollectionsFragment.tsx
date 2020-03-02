import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';

export const DiscoverCollectionsFragment = React.memo(() => {
    return (
        <Page track="discover_collections">
            <UHeader title="Collections" />
        </Page>
    );
});
