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
    width: 33%;
    height: 200px;
    background: grey;
    flex-shrink: 0;
`;

const listingsContainer = css`
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    margin-bottom: 16px;

    margin-left: -16px;
    margin-right: -16px;

    & > * {
        width: 100%;
        flex-shrink: 2;
    }

    @media (max-width: 600px) {
        flex-wrap: wrap;
    }
`;

export const DiscoverHomeFragment = React.memo(() => {
    const client = useClient();

    // temporary seed
    const newAndGrowing = client.useDiscoverNewAndGrowing({ first: 3, seed: 123 });
    const newAndGrowingItems = newAndGrowing.discoverNewAndGrowing.items || [];

    const popularNow = client.useDiscoverPopularNow({ first: 3 });
    const popularNowItems = popularNow.discoverPopularNow.items || [];

    const topPremium = client.useDiscoverTopPremium({ first: 5 });
    const topPremiumItems = topPremium.discoverTopPremium.items;

    const topFree = client.useDiscoverTopFree({ first: 5 });
    const topFreeItems = topFree.discoverTopFree.items;

    return (
        <Page track="discover_home">
            <UHeader title="Home" />

            <XView paddingHorizontal={16}>
                <USlider title="Editors choice">
                    <div className={slide}>one</div>
                    <div className={slide}>two</div>
                    <div className={slide}>three</div>
                    <div className={slide}>four</div>
                </USlider>

                <div className={listingsContainer}>
                    <ListingCompact title="New and growing" items={newAndGrowingItems} path="/discover/new" />
                    <ListingCompact title="Popular now" items={popularNowItems} path="/discover/popular" />
                </div>

                <USlider title="Collections" path="/discover/collections">
                    <div className={slideNarrow}>one</div>
                    <div className={slideNarrow}>two</div>
                    <div className={slideNarrow}>three</div>
                    <div className={slideNarrow}>four</div>
                </USlider>

                <XView marginBottom={40}>
                    <div className={listingsContainer}>
                        <ListingCompact title="Top premium" items={topPremiumItems} />
                        <ListingCompact title="Top free" items={topFreeItems} />
                    </div>
                </XView>

            </XView>

        </Page>
    );
});
