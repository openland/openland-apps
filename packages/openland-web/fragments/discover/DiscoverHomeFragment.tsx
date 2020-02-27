import React from 'react';
import { Page } from 'openland-unicorn/Page';
import { USlider } from 'openland-web/components/unicorn/USlider';

export const DiscoverHomeFragment = React.memo(() => {
    return (
        <Page track="discover_home">
            <USlider />
        </Page>
    );
});
