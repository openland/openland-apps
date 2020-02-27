import React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { USlider } from 'openland-web/components/unicorn/USlider';

export const DiscoverHomeFragment = React.memo(() => {
    return (
        <Page track="discover_home">
            <UHeader title="Home" />
            <USlider />
        </Page>
    );
});
