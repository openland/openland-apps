import React from 'react';
import { Page } from 'openland-unicorn/Page';
import { USlider } from 'openland-web/components/unicorn/USlider';
import { css } from 'linaria';
import { ListingCompact } from './components/ListingCompact';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';

const slide = css`
    width: 100%;
    height: 200px;
    background: grey;
    flex-shrink: 0;
`;

const slideNarrow = css`
    width: 200px;
    height: 200px;
    background: grey;
    flex-shrink: 0;
`;

export const DiscoverHomeFragment = React.memo(() => {
    const client = useClient();

    const popularNow = client.useDiscoverPopularNow({ first: 3 });
    const popularNowItems = popularNow.discoverPopularNow.items || [];

    return (
        <Page track="discover_home">
            <UHeader title="Home" />

            <USlider>
                <div className={slide}>one</div>
                <div className={slide}>two</div>
                <div className={slide}>three</div>
                <div className={slide}>four</div>
            </USlider>

            <XView flexDirection="row" justifyContent="space-between" marginTop={24} marginBottom={16}>
                <ListingCompact title="New and growing" items={popularNowItems} />
                <ListingCompact title="Popular now" items={popularNowItems} />
            </XView>

            <USlider>
                <div className={slideNarrow}>one</div>
                <div className={slideNarrow}>two</div>
                <div className={slideNarrow}>three</div>
                <div className={slideNarrow}>four</div>
            </USlider>

            <XView flexDirection="row" justifyContent="space-between" marginTop={24} marginBottom={56}>
                <ListingCompact title="Top premium" items={popularNowItems} />
                <ListingCompact title="Top free" items={popularNowItems} />
            </XView>

        </Page>
    );
});
