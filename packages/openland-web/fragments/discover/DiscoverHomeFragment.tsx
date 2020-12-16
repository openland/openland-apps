import React from 'react';
import { Page } from 'openland-unicorn/Page';
import { USlider } from 'openland-web/components/unicorn/USlider';
import { css } from 'linaria';
import { ListingCompact, OrgsListingCompact } from './components/ListingCompact';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { DiscoverCollection } from './components/DiscoverCollection';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { EditorsChoiceItem } from './components/EditorsChoiceItem';
import { getRandomSeed } from './utils/getRandomSeed';
import { normalizePopularItems, normalizePopularOrgItems } from 'openland-y-utils/discover/normalizePopularItems';
import { CreateEntitySlider } from './components/CreateEntitySlider';

export const editorsChoiceItem = css`
    width: calc(100% + 16px);
    max-width: 576px;
    flex-shrink: 0;

    &:last-child {
        max-width: 560px;
        width: 100%;
    }
`;

export const sliderCollectionItem = css`
    width: 192px;
    flex-shrink: 0;

    &:last-child {
        width: 176px;
    }
`;

export const listingsContainer = css`
    margin: 0 -16px;

    & > * {
        width: 50%;
        display: inline-block;
    }

    @media (max-width: 1051px) {
        & > * {
            display: block;
            width: 100%;
        }
    }
`;

export const DiscoverHomeFragment = React.memo(() => {
    const client = useClient();
    const seed = getRandomSeed();

    let rooms = client.useExploreRooms({ seed: seed }, { fetchPolicy: 'cache-and-network' });

    const collections = client.useDiscoverCollectionsShort({ first: 20 });
    const collectionsItems = collections.discoverCollections!.items;

    const editorsChoice = client.useDiscoverEditorsChoice();
    const editorsChoiceItems = editorsChoice.discoverEditorsChoice;

    const isTabVisible = useVisibleTab();

    return (
        <Page track="discover_home">
            <UHeader title="Home" />
            <XView maxWidth={560} paddingTop={24}>
                <CreateEntitySlider />

                <XView marginTop={10} marginBottom={24}>
                    <div className={listingsContainer}>
                        <ListingCompact title="Popular now" items={normalizePopularItems(rooms.discoverPopularNow.items)} path="/discover/popular" />
                        <OrgsListingCompact title="Top communities" items={normalizePopularOrgItems(rooms.discoverTopOrganizations.items)} path="/discover/top-communities" />
                    </div>
                </XView>

                {isTabVisible && (
                    <USlider title="Collections" path="/discover/collections" childrenCount={collectionsItems.length}>
                        {collectionsItems.map(i => (
                            <div className={sliderCollectionItem} key={i.id}>
                                <DiscoverCollection {...i} />
                            </div>
                        ))}
                    </USlider>
                )}

                <XView marginTop={20} marginBottom={25}>
                    <div className={listingsContainer}>
                        <ListingCompact title="New groups" items={rooms.discoverNewAndGrowing.items || []} path="/discover/new" />
                        <ListingCompact title="Top groups" items={rooms.discoverTopFree.items || []} path="/discover/free" />
                    </div>
                </XView>

                {isTabVisible && (
                    <USlider title="Featured" childrenCount={editorsChoiceItems.length}>
                        {editorsChoiceItems.map(i => (
                            <div className={editorsChoiceItem} key={i.id}>
                                <EditorsChoiceItem {...i} />
                            </div>
                        ))}
                    </USlider>
                )}

                <XView marginBottom={40} marginTop={20}>
                    <div className={listingsContainer}>
                        <OrgsListingCompact title="New communities" items={rooms.discoverNewAndGrowingOrganizations.items || []} path="/discover/new-communities" />
                        <ListingCompact title="Top premium" items={rooms.discoverTopPremium.items || []} path="/discover/premium" />
                    </div>
                </XView>
            </XView>
        </Page>
    );
});
